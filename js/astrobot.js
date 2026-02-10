(() => {
  const root = document.getElementById("astrobot");
  if (!root) return;

  const text = document.getElementById("astroText");
  const btnPrev = document.getElementById("astroPrev");
  const btnNext = document.getElementById("astroNext");
  const btnClose = document.getElementById("astroClose");
  const avatar = document.getElementById("astrobotAvatar");

  // “Guiones” por página (puedes ampliar)
  const scripts = {
    "curso-batch.html": [
      "¡Bienvenido a <b>AstroCode</b>! Soy AstroBot. Hoy aprenderás Batch sin perderte en el vacío.",

      "Échale un ojo a esta guía de Batch y, cuando te sientas listo, te propongo unos pequeños retos.",

      "Reto Módulo 1: abre el ejemplo y cambia el texto del <code>echo</code> para que diga “Hola, AstroCode”.",

      "Misión: descarga el ejemplo del Módulo 2 y cambia el mensaje final para que te salude por tu nombre.",

      "Reto Módulo 3: cambia el nombre del archivo que se comprueba por uno que exista en tu carpeta.",

      "Reto Módulo 4: modifica el bucle para que liste archivos <code>.bat</code> en lugar de <code>.txt</code>.",

      "Reto Módulo 5: cambia los textos del menú por otros a tu gusto (por ejemplo: Jugar, Ayuda, Salir)."
    ],
    "mantenimiento.html": [
      "Bienvenido al taller de mantenimiento. Vamos a construir un menú por opciones (MantenimientoV.2.bat).",
      "Regla de seguridad: borra solo temporales del usuario (%TEMP%) y avisa siempre antes de borrar.",
      "La opción Scanner usa SFC: normalmente requiere abrir CMD como administrador.",
      "Cuando tengas tu .BAT final, reemplaza los archivos en assets/downloads/ y listo."
    ],
    "certificado.html": [
      "Última órbita: el reto final. Necesitas 4/5 para generar el certificado.",
      "Si fallas, vuelve al curso y repasa: Variables, IF, FOR y Menús.",
      "Pro-tip: Batch se ejecuta en <code>cmd.exe</code> (no en PowerShell por defecto)."
    ]
  };

  const page = (location.pathname.split("/").pop() || "index.html");
  const lines = scripts[page] || [
    "Soy AstroBot. En esta página no tengo lección asignada, pero puedo ayudarte si me programáis 😉"
  ];

  // Estado (guardado)
  const KEY = "astrobot_state_" + page;
  const saved = JSON.parse(localStorage.getItem(KEY) || "{}");
  let i = Number.isFinite(saved.i) ? saved.i : 0;
  let visible = saved.visible !== false; // por defecto visible

  function render() {
    if (!visible) {
      root.classList.add("hidden");
      return;
    }
    root.classList.remove("hidden");
    i = Math.max(0, Math.min(lines.length - 1, i));
    text.innerHTML = lines[i] + `<div class="small" style="margin-top:10px;opacity:.8">Paso ${i+1}/${lines.length}</div>`;
    localStorage.setItem(KEY, JSON.stringify({ i, visible }));
  }

  btnPrev?.addEventListener("click", () => { i--; render(); });
  btnNext?.addEventListener("click", () => { i++; render(); });
  btnClose?.addEventListener("click", () => { visible = false; render(); });

  // Clic en avatar: toggle
  avatar?.addEventListener("click", () => {
    visible = !visible;
    // si lo activas, vuelve a mostrar en el mismo paso
    render();
  });

  // Atajos teclado (opcional)
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") { i--; render(); }
    if (e.key === "ArrowRight") { i++; render(); }
    if (e.key.toLowerCase() === "h") { visible = !visible; render(); } // h = hide/show
  });

  render();
})();
