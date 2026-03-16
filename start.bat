@echo off
echo ===================================================
echo   KHOI DONG NEN TANG E-COMMERCE - LE QUANG VIET
echo ===================================================

echo Dang khoi dong Backend Server...
start cmd /k "cd backend && npm run start || node server.js"

echo Dang khoi dong Frontend Server...
start cmd /k "cd frontend && npm run dev"

echo.
echo ===================================================
echo Truc tap vao giao dien tai: http://localhost:5173
echo ===================================================
pause
