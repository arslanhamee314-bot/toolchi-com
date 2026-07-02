# Elite Web Development Workstation Setup Script (Windows PowerShell)
# Run in PowerShell to install/reproduce all runtimes and environment configurations.

Write-Output "=========================================================="
Write-Output "   Executing Station Environment Setup & Replication"
Write-Output "=========================================================="

# 1. Elevate or warn about admin privileges
$isAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if ($isAdmin) {
    Write-Output "[+] Running with Administrator privileges."
} else {
    Write-Output "[!] Running with User privileges. Setup will install runtimes in User Space."
}

# 2. Check and install winget package provider if missing
if (!(Get-Command winget -ErrorAction SilentlyContinue)) {
    Write-Output "[!] WinGet is not available. Please install App Installer from Microsoft Store."
    exit 1
}

# 3. Define Winget Package list
$packages = @(
    @{ Id = "Python.Python.3.12"; Name = "Python 3.12" },
    @{ Id = "jqlang.jq"; Name = "jq JSON Utility" },
    @{ Id = "BurntSushi.ripgrep.MSVC"; Name = "ripgrep MSVC" },
    @{ Id = "sharkdp.fd"; Name = "fd Tool" }
)

foreach ($pkg in $packages) {
    Write-Output "Checking installation of $($pkg.Name) ($($pkg.Id))..."
    $check = winget list --id $pkg.Id -e 2>$null
    if ($check -match $pkg.Id) {
        Write-Output "   [ok] Already installed."
    } else {
        Write-Output "   [+] Installing $($pkg.Name)..."
        if ($pkg.Id -eq "sharkdp.fd") {
            # Skip dependencies for fd since VC++ Redistributable check can error out in user space
            winget install $pkg.Id --scope user --silent --accept-package-agreements --accept-source-agreements --skip-dependencies
        } else {
            winget install $pkg.Id --scope user --silent --accept-package-agreements --accept-source-agreements
        }
    }
}

# 4. Install UV (Astral Python Package Manager) via official powershell script
if (!(Get-Command uv -ErrorAction SilentlyContinue) -and -not (Test-Path "$env:USERPROFILE\.local\bin\uv.exe")) {
    Write-Output "[+] Installing Astral uv Package Manager..."
    powershell -ExecutionPolicy Bypass -c "irm https://astral.sh/uv/install.ps1 | iex"
} else {
    Write-Output "[ok] uv package manager already installed."
}

# 5. Install Bun JS Runtime via official powershell script
if (!(Get-Command bun -ErrorAction SilentlyContinue) -and -not (Test-Path "$env:USERPROFILE\.bun\bin\bun.exe")) {
    Write-Output "[+] Installing Bun JavaScript Runtime..."
    powershell -c "irm https://bun.sh/install.ps1 | iex"
} else {
    Write-Output "[ok] Bun runtime already installed."
}

# 6. Build the PATH changes permanently for user
$newPaths = @(
    "$env:USERPROFILE\AppData\Local\Programs\Python\Python312",
    "$env:USERPROFILE\AppData\Local\Programs\Python\Python312\Scripts",
    "$env:USERPROFILE\.local\bin",
    "$env:USERPROFILE\.bun\bin"
)

# Read current User environment path
$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
$currentPaths = $userPath -split ";" | Where-Object { $_ -ne "" }

$modified = $false
foreach ($p in $newPaths) {
    if ($currentPaths -notcontains $p) {
        $currentPaths += $p
        $modified = $true
        Write-Output "Adding path: $p"
    }
}

# Update permanent environment variables
if ($modified) {
    $newUserPath = ($currentPaths -join ";") + ";"
    [Environment]::SetEnvironmentVariable("Path", $newUserPath, "User")
    Write-Output "[+] User PATH permanently updated in registry."
}

# Set current process paths for verification
$env:Path = ($currentPaths -join ";") + ";" + [Environment]::GetEnvironmentVariable("Path", "Machine")

Write-Output "=========================================================="
Write-Output "                  Verification Dashboard"
Write-Output "=========================================================="

$verifiers = @(
    "python --version",
    "uv --version",
    "bun --version",
    "jq --version",
    "rg --version",
    "fd --version",
    "node -v",
    "npm -v"
)

foreach ($v in $verifiers) {
    try {
        $output = Invoke-Expression $v 2>&1
        Write-Output "[ok] $v : $($output.ToString().Trim())"
    } catch {
        Write-Output "[!] Failed to execute $v"
    }
}

Write-Output "=========================================================="
Write-Output "Setup is completed! Please restart your terminal/editor to"
Write-Output "refresh the PATH changes globally."
Write-Output "=========================================================="
