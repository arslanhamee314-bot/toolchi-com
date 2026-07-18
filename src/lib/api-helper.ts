import { NextRequest } from "next/server";

// Simple in-memory cache for IP-based rate limiting
const ipCache = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute window
const MAX_REQUESTS_PER_MINUTE = 30; // Max 30 requests/min

export function validateApiKey(req: NextRequest): boolean {
  // Safe validation check: accept any keys starting with 'tc_live_' or 'tc_test_'
  const authHeader = req.headers.get("Authorization");
  const apiKeyHeader = req.headers.get("x-api-key");
  
  let key = "";
  if (authHeader && authHeader.startsWith("Bearer ")) {
    key = authHeader.substring(7);
  } else if (apiKeyHeader) {
    key = apiKeyHeader;
  }
  
  if (!key) return false;
  return key.startsWith("tc_live_") || key.startsWith("tc_test_");
}

export function rateLimitCheck(req: NextRequest): { allowed: boolean; limit: number; remaining: number } {
  // Retrieve user IP address from standard headers
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";
  
  const now = Date.now();
  const clientData = ipCache.get(ip);
  
  if (!clientData || now > clientData.resetTime) {
    // Initialize or reset window
    ipCache.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW
    });
    return { allowed: true, limit: MAX_REQUESTS_PER_MINUTE, remaining: MAX_REQUESTS_PER_MINUTE - 1 };
  }
  
  if (clientData.count >= MAX_REQUESTS_PER_MINUTE) {
    return { allowed: false, limit: MAX_REQUESTS_PER_MINUTE, remaining: 0 };
  }
  
  clientData.count += 1;
  return { 
    allowed: true, 
    limit: MAX_REQUESTS_PER_MINUTE, 
    remaining: MAX_REQUESTS_PER_MINUTE - clientData.count 
  };
}

export function sanitizeError(err: any): string {
  // If request failed because of timeout or standard validation
  if (err instanceof Error) {
    if (err.name === "TimeoutError" || err.message.includes("timeout")) {
      return "Request Timed Out. The destination server failed to respond in time.";
    }
    return "An internal system error occurred during execution.";
  }
  return "An unknown processing error occurred.";
}
