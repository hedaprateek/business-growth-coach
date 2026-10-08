@echo off
cd /d "%~dp0"
where node.exe >nul 2>nul
if errorlevel 1 (
    echo Install Node.js 22 or newer, then reopen this launcher.
    pause
    exit /b 1
)
echo Open http://localhost:8790 in your browser.
echo Press Ctrl+C to stop the local server.
node server.mjs
