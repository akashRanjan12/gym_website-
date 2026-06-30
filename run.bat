@echo off
title IRON PEAK GYM - Launcher
echo ========================================================
echo   IRON PEAK GYM - DEVELOPMENT SERVER STARTER
echo ========================================================
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or is not present in your system PATH.
    echo Please download and install Node.js from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

:: Install dependencies if node_modules is missing
if not exist "node_modules\" (
    echo [INFO] node_modules directory not found. Installing project dependencies...
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] Dependency installation failed.
        echo.
        pause
        exit /b 1
    )
    echo [SUCCESS] Dependencies installed successfully.
    echo.
)

:: Start Vite development server
echo [INFO] Launching Vite development server...
echo.
call npm run dev

pause
