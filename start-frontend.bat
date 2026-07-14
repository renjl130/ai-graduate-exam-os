@echo off
setlocal EnableExtensions
set "ROOT=%~dp0"

set "BACKEND_PORT=8000"
set "FRONTEND_PORT=3000"
for /f "tokens=1,2 delims==" %%A in ('type "%ROOT%.runtime-ports" 2^>nul') do set "%%A=%%B"
if not "%~1"=="" set "FRONTEND_PORT=%~1"
if not "%~2"=="" set "BACKEND_PORT=%~2"

if "%~1"=="" (
  for /f %%P in ('powershell -NoProfile -Command "$p=%FRONTEND_PORT%; while(Get-NetTCPConnection -State Listen -LocalPort $p -ErrorAction SilentlyContinue){$p++}; $p"') do set "FRONTEND_PORT=%%P"
)

cd /d "%ROOT%frontend-next" || (echo [ERROR] Frontend directory was not found. & exit /b 1)
if not exist "node_modules" (
  echo [INFO] Installing frontend dependencies...
  call npm install || exit /b 1
)

set "NEXT_PUBLIC_API_URL=http://localhost:%BACKEND_PORT%"
echo [INFO] App: http://localhost:%FRONTEND_PORT%
call npm run dev -- -p %FRONTEND_PORT%
