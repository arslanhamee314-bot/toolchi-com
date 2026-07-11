"use client";

import React, { useState, useEffect, useCallback, createContext, useContext } from "react";
import { CheckCircle, AlertTriangle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue>({ showToast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "success") => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev.slice(-3), { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-6 right-4 z-[300] flex flex-col gap-2 pointer-events-none lg:bottom-6">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl border text-sm font-semibold min-w-[220px] max-w-[320px] pointer-events-auto animate-in slide-in-from-right-4 duration-300 ${
              toast.type === "success"
                ? "bg-white dark:bg-card border-emerald-500/30 text-foreground"
                : toast.type === "error"
                ? "bg-white dark:bg-card border-red-400/30 text-foreground"
                : "bg-white dark:bg-card border-primary/30 text-foreground"
            }`}
          >
            {toast.type === "success" && <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />}
            {toast.type === "error" && <AlertTriangle className="h-4 w-4 text-red-500 shrink-0" />}
            {toast.type === "info" && <Info className="h-4 w-4 text-primary shrink-0" />}
            <span className="flex-1 text-xs leading-snug">{toast.message}</span>
            <button
              onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
              className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer shrink-0"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
