@echo off
title ASTROCODE - Nebula Run (Juego Batch)
setlocal EnableExtensions EnableDelayedExpansion

rem ====== Config ======
set "LOG=%temp%\astrocode_juego.log"

rem ====== Helpers ======
:log
>>"%LOG%" echo [%date% %time%] %*
exit /b

:pause
echo.
pause
exit /b

rem ====== Start ======
call :log === INICIO JUEGO ===
set /a energia=5
set /a creditos=0

:menu
cls
echo ==========================================
echo        ASTROCODE - NEBULA RUN
echo ==========================================
echo Energia: !energia!    Creditos: !creditos!
echo.
echo 1^) Explorar una senal desconocida
echo 2^) Reparar la nave (gasta 1 credito)
echo 3^) Ver estado / guardar log
echo 4^) Salir
echo.
choice /c 1234 /n /m "Elige opcion: "
if errorlevel 4 goto fin
if errorlevel 3 goto estado
if errorlevel 2 goto reparar
if errorlevel 1 goto explorar

:explorar
cls
echo --- EXPLORACION ---
echo Sintonizas una senal entre la niebla...
set /a evento=%random% %% 4
if !evento! == 0 goto evento_meteoros
if !evento! == 1 goto evento_estacion
if !evento! == 2 goto evento_piratas
goto evento_artefacto

:evento_meteoros
echo Un campo de meteoritos aparece de repente.
choice /c 12 /n /m "1) Esquivar  2) Atravesar: "
if errorlevel 2 (
  echo Atravesando... mala idea.
  set /a energia-=2
  call :log Meteoritos: atravesar (-2 energia)
) else (
  echo Maniobra precisa. Sales ileso.
  call :log Meteoritos: esquivar (0)
)
call :chequeo
goto menu

:evento_estacion
echo Encuentras una estacion automatizada.
choice /c 12 /n /m "1) Acoplar  2) Seguir: "
if errorlevel 2 (
  echo Sigues tu ruta.
  call :log Estacion: ignorar
) else (
  echo Acoplas y consigues suministros.
  set /a creditos+=1
  set /a energia+=1
  call :log Estacion: acoplar (+1 credito, +1 energia)
)
goto menu

:evento_piratas
echo Señales hostiles: piratas espaciales.
choice /c 12 /n /m "1) Huir  2) Negociar: "
if errorlevel 2 (
  echo Negocias... pierdes recursos.
  if !creditos! GTR 0 (
    set /a creditos-=1
    call :log Piratas: negociar (-1 credito)
  ) else (
    set /a energia-=1
    call :log Piratas: negociar (sin creditos, -1 energia)
  )
) else (
  echo Huyes a maxima potencia.
  set /a energia-=1
  call :log Piratas: huir (-1 energia)
)
call :chequeo
goto menu

:evento_artefacto
echo Detectas un artefacto brillante en la nebulosa.
choice /c 12 /n /m "1) Recoger  2) No arriesgar: "
if errorlevel 2 (
  echo Lo dejas atras.
  call :log Artefacto: ignorar
) else (
  echo Lo recoges. Parece valioso.
  set /a creditos+=2
  call :log Artefacto: recoger (+2 creditos)
)
goto menu

:reparar
cls
echo --- REPARACION ---
if !creditos! LSS 1 (
  echo No tienes creditos suficientes.
  call :log Reparar: sin creditos
  call :pause
  goto menu
)
set /a creditos-=1
set /a energia+=2
echo Reparacion completada. Energia +2, Creditos -1.
call :log Reparar: ok (+2 energia, -1 credito)
goto menu

:estado
cls
echo --- ESTADO ---
echo Energia:   !energia!
echo Creditos:  !creditos!
echo.
echo Log guardado en:
echo %LOG%
call :log Estado consultado (E=!energia!, C=!creditos!)
call :pause
goto menu

:chequeo
if !energia! LEQ 0 goto derrota
if !creditos! GEQ 5 goto victoria
exit /b

:derrota
cls
echo ==========================================
echo                 DERROTA
echo ==========================================
echo Te quedaste sin energia en la nebulosa.
call :log FIN: derrota (energia<=0)
call :pause
goto fin

:victoria
cls
echo ==========================================
echo                 VICTORIA
echo ==========================================
echo Has reunido suficientes creditos para
echo volver a una zona segura. Bien jugado.
call :log FIN: victoria (creditos>=5)
call :pause
goto fin

:fin
echo Saliendo del juego...
call :log === SALIDA JUEGO ===
endlocal
exit /b
