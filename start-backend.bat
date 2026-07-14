@echo off
setlocal EnableExtensions
set "ROOT=%~dp0"

set "BACKEND_PORT=8000"
set "FRONTEND_PORT=3000"
for /f "tokens=1,2 delims==" %%A in ('type "%ROOT%.runtime-ports" 2^>nul') do set "%%A=%%B"
if not "%~1"=="" set "BACKEND_PORT=%~1"
if not "%~2"=="" set "FRONTEND_PORT=%~2"

if "%~1"=="" (
  for /f %%P in ('powershell -NoProfile -Command "$p=%BACKEND_PORT%; while(Get-NetTCPConnection -State Listen -LocalPort $p -ErrorAction SilentlyContinue){$p++}; $p"') do set "BACKEND_PORT=%%P"
)

cd /d "%ROOT%backend" || (echo [ERROR] Backend directory was not found. & exit /b 1)
if not exist "venv\Scripts\python.exe" (
  echo [INFO] Creating backend environment...
  python -m venv venv || exit /b 1
  venv\Scripts\python.exe -m pip install -r requirements.txt || exit /b 1
)

set "PORT=%BACKEND_PORT%"
set "CORS_ORIGINS=http://localhost:%FRONTEND_PORT%,http://127.0.0.1:%FRONTEND_PORT%"
echo [INFO] API : http://localhost:%BACKEND_PORT%
echo [INFO] Docs: http://localhost:%BACKEND_PORT%/docs
venv\Scripts\python.exe main.py
