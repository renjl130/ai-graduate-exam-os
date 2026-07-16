@echo off
setlocal EnableExtensions
set "ROOT=%~dp0"

echo ========================================
echo   Jiale Graduate
echo ========================================
echo.

where python >nul 2>&1 || (echo [ERROR] Python 3.11+ was not found. & pause & exit /b 1)
where node >nul 2>&1 || (echo [ERROR] Node.js 18+ was not found. & pause & exit /b 1)

for /f %%P in ('powershell -NoProfile -Command "$p=8000; while(Get-NetTCPConnection -State Listen -LocalPort $p -ErrorAction SilentlyContinue){$p++}; $p"') do set "BACKEND_PORT=%%P"
for /f %%P in ('powershell -NoProfile -Command "$p=3000; while(Get-NetTCPConnection -State Listen -LocalPort $p -ErrorAction SilentlyContinue){$p++}; $p"') do set "FRONTEND_PORT=%%P"

> "%ROOT%.runtime-ports" echo BACKEND_PORT=%BACKEND_PORT%
>> "%ROOT%.runtime-ports" echo FRONTEND_PORT=%FRONTEND_PORT%

if not exist "%ROOT%backend\venv\Scripts\python.exe" (
  echo [1/4] Creating backend virtual environment...
  python -m venv "%ROOT%backend\venv" || (echo [ERROR] Could not create virtual environment. & pause & exit /b 1)
  "%ROOT%backend\venv\Scripts\python.exe" -m pip install -r "%ROOT%backend\requirements.txt" || (echo [ERROR] Backend install failed. & pause & exit /b 1)
) else (
  echo [1/4] Backend environment is ready.
)

if not exist "%ROOT%frontend-next\node_modules" (
  echo [2/4] Installing frontend dependencies...
  pushd "%ROOT%frontend-next"
  call npm install || (popd & echo [ERROR] Frontend install failed. & pause & exit /b 1)
  popd
) else (
  echo [2/4] Frontend environment is ready.
)

echo [3/4] Starting API on port %BACKEND_PORT%...
start "JialeGraduate-Backend" cmd /k call "%ROOT%start-backend.bat" "%BACKEND_PORT%" "%FRONTEND_PORT%"

echo [4/4] Starting web app on port %FRONTEND_PORT%...
timeout /t 3 /nobreak >nul
start "JialeGraduate-Frontend" cmd /k call "%ROOT%start-frontend.bat" "%FRONTEND_PORT%" "%BACKEND_PORT%"

echo.
echo ========================================
echo   Started successfully
echo   App : http://localhost:%FRONTEND_PORT%
echo   API : http://localhost:%BACKEND_PORT%
echo   Docs: http://localhost:%BACKEND_PORT%/docs
echo ========================================
echo.
start "" "http://localhost:%FRONTEND_PORT%"
pause
