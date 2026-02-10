@echo off
chcp 65001 > nul
title Mantenimiento del PC - Menú Interactivo
color 1F
mode con: cols=80 lines=25

:inicio
cls
echo =================================
echo      MANTENIMIENTO DEL PC
echo =================================
echo 1. Reparar imagen de Windows(DISM)
echo 2. volver
echo =================================
set /p opcion="Selecciona una opción (1-2): "

if "%opcion%" == "1" goto :DISM
if "%opcion%" == "2" goto volver

:DISM
cls
echo =================================
echo     REPARACIÓN DE WINDOWS (DISM)
echo =================================
echo Selecciona el tipo de reparación:
echo 1. Online (sistema en uso)
echo 2. Offline / Imagen interna
echo 3. Volver al menú principal
set /p tipo="Elige una opción (1-3): "

if "%tipo%"=="1" goto DISM_online
if "%tipo%"=="2" goto DISM_offline
if "%tipo%"=="3" goto inicio
goto DISM

:DISM_online
cls
echo =================================
echo     DISM ONLINE
echo =================================
echo Repara la imagen del sistema operativo en uso.
echo.
set /p confirmar="¿Deseas continuar? (s/n): "

if /I "%confirmar%"=="s" (
    echo Ejecutando DISM ONLINE...
    DISM /Online /Cleanup-Image /RestoreHealth
    echo Reparación ONLINE finalizada.
) else (
    echo Operación cancelada.
)
pause
goto inicio


:DISM_offline
cls
echo =================================
echo     DISM OFFLINE (RUTA FIJA)
echo =================================
echo Repara la imagen de Windows usando DISM.exe en ruta fija.
echo.

set /p confirmar="¿Deseas continuar con C:\Windows\System32\Dism.exe? (s/n): "

if /I "%confirmar%"=="s" (
    echo Ejecutando DISM OFFLINE...
    "C:\Windows\System32\Dism.exe" /Online /Cleanup-Image /RestoreHealth
    echo Reparación OFFLINE finalizada.
) else (
    echo Operación cancelada.
)

pause
goto inicio


:volver
call MantenimientoV.2.bat
