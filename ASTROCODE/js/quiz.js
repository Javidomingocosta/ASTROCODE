(() => {
  const form = document.getElementById("quizForm");
  const result = document.getElementById("result");
  const certName = document.getElementById("certName");
  const certDate = document.getElementById("certDate");
  const printBtn = document.getElementById("printBtn");

  if (!form) return;

  const today = new Date();
  const niceDate = today.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  // Respuestas correctas
  const key = {
    q1: "b", // Batch se ejecuta con cmd.exe
    q2: "a", // set variable=valor
    q3: "c", // if exist
    q4: "b", // for %%i in (...) do ...
    q5: "a"  // @echo off oculta comandos
  };

  function clearMarks() {
    form.querySelectorAll(".q").forEach((box) => {
      box.classList.remove("is-wrong", "is-right");
    });
  }

  function scoreAndMark(data) {
    clearMarks();

    let score = 0;

    Object.keys(key).forEach((k) => {
      const val = data.get(k); // null si no respondió
      const qBox = form.querySelector(`input[name="${k}"]`)?.closest(".q");
      if (!qBox) return;

      const isCorrect = val === key[k];

      if (isCorrect) {
        score++;
        qBox.classList.add("is-right");
      } else {
        // si no contestó o contestó mal, la marcamos roja
        qBox.classList.add("is-wrong");
      }
    });

    return score;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const name = (data.get("name") || "").toString().trim();

    if (!name) {
      result.textContent = "Escribe tu nombre para poder emitir el certificado.";
      result.style.color = "rgba(255,190,190,.95)";
      clearMarks();
      return;
    }

    const score = scoreAndMark(data);
    const total = Object.keys(key).length;
    const pass = score >= 4;

    if (!pass) {
      result.textContent = `Resultado: ${score}/${total}. Necesitas 4/${total} para aprobar. Repasa el curso y vuelve a intentarlo.`;
      result.style.color = "rgba(255,210,150,.95)";

      certName.textContent = "—";
      certDate.textContent = "—";

      printBtn.disabled = true;
      printBtn.style.opacity = ".5";

      // llevar a la primera incorrecta para que se vea
      const firstWrong = form.querySelector(".q.is-wrong");
      firstWrong?.scrollIntoView({ behavior: "smooth", block: "center" });

      return;
    }

    // Aprobado
    result.textContent = `¡Aprobado! ${score}/${total}. Certificado generado abajo.`;
    result.style.color = "rgba(190,255,210,.95)";

    certName.textContent = name;
    certDate.textContent = niceDate;

    // guarda para que se mantenga si recarga
    localStorage.setItem("batchCertName", name);
    localStorage.setItem("batchCertDate", niceDate);

    printBtn.disabled = false;
    printBtn.style.opacity = "1";

    // opcional: bajar al certificado al aprobar
    document.querySelector(".cert")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // Cargar certificado anterior
  const savedName = localStorage.getItem("batchCertName");
  const savedDate = localStorage.getItem("batchCertDate");
  if (savedName && savedDate) {
    certName.textContent = savedName;
    certDate.textContent = savedDate;
    printBtn.disabled = false;
    printBtn.style.opacity = "1";
  }

  printBtn?.addEventListener("click", () => window.print());
})();
