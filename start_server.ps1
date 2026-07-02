# Toolchi Server Launcher Script
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "Toolchi Next.js Production Server Startup" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan

# 1. Check if port 3000 is occupied and kill the process using it
$port = 3000
$portActive = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue

if ($portActive) {
    Write-Host "Port 3000 is currently occupied. Stopping old server process..." -ForegroundColor Yellow
    foreach ($conn in $portActive) {
        $pidToKill = $conn.OwningProcess
        if ($pidToKill -ne 0) {
            Stop-Process -Id $pidToKill -Force -ErrorAction SilentlyContinue
        }
    }
    Start-Sleep -Seconds 1
}

# 2. Start Next.js server in a background job or terminal window
Write-Host "Launching Next.js server on port 3000..." -ForegroundColor Green
Start-Process -FilePath "npm" -ArgumentList "run start" -WorkingDirectory $PSScriptRoot -WindowStyle Hidden

# 3. Wait for port to bind
Write-Host "Waiting for port binding..." -ForegroundColor Cyan
$retries = 10
while ($retries -gt 0) {
    $checkPort = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
    if ($checkPort) {
        Write-Host "Server successfully bound to Port 3000!" -ForegroundColor Green
        break
    }
    Start-Sleep -Seconds 1
    $retries--
}

# 4. Open default web browser
Write-Host "Opening Toolchi in your browser..." -ForegroundColor Green
Start-Process "http://localhost:3000"

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "Startup complete! Enjoy the styled design." -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
