const params = new URLSearchParams(location.search);
const id = params.get("id");
const ch = CHALLENGES.find(x => x.id === id);

function getNextChallengeId(currentId){
  const idx = CHALLENGES.findIndex(x => x.id === currentId);
  if (idx === -1) return null;
  return CHALLENGES[idx + 1]?.id ?? null;
}

function goNextChallenge(){
  const nextId = getNextChallengeId(id);
  if (!nextId) {
    alert("🎉 סיימתם את כל האתגרים!");
    location.href = "./index.html";
    return;
  }
  location.href = `./challenge.html?id=${encodeURIComponent(nextId)}`;
}

if (!ch) {
  document.body.innerHTML = "<h2 style='padding:20px'>לא נמצא אתגר 😅</h2>";
} else {
  document.title = ch.title;

  // אלמנטים
  const title = document.getElementById("title");
  const subtitle = document.getElementById("subtitle");
  const explain = document.getElementById("explain");
  const task = document.getElementById("task");
  const hint = document.getElementById("hint");
  const solution = document.getElementById("solution");

  const editor = document.getElementById("editor");
  const output = document.getElementById("output");
  const status = document.getElementById("status");
  const codeCard = document.getElementById("codeCard");

  const topicBadge = document.getElementById("topicBadge");
  const progressBadge = document.getElementById("progressBadge");

  // כותרות
  title.textContent = ch.title;
  subtitle.textContent = ch.subtitle;
  explain.textContent = ch.explain;
  task.textContent = ch.task;
  hint.textContent = ch.hint;
  solution.textContent = ch.solution;

  topicBadge.textContent = `# ${ch.topic}`;
  const idx = CHALLENGES.findIndex(x => x.id === ch.id);
  progressBadge.textContent = `אתגר ${idx + 1} מתוך ${CHALLENGES.length}`;

  // שמירה מקומית (רק אם יש editor)
  const key = "code_" + ch.id;
  if (editor) {
    editor.value = localStorage.getItem(key) ?? ch.starter;
    editor.addEventListener("input", () => localStorage.setItem(key, editor.value));
  }

  // רמז/פתרון
  document.getElementById("hintBtn").onclick = () => hint.classList.toggle("hidden");
  document.getElementById("solutionBtn").onclick = () => solution.classList.toggle("hidden");

  // איפוס
  document.getElementById("resetBtn").onclick = () => {
    if (editor) {
      editor.value = ch.starter;
      localStorage.setItem(key, editor.value);
    }
    if (output) output.textContent = "";
    if (status) {
      status.textContent = "";
      status.className = "status";
    }
  };

  // הבא (אתגר הבא)
  document.getElementById("nextBtn").onclick = goNextChallenge;
  const nextBtnFallback = document.getElementById("nextBtnFallback");
  if (nextBtnFallback) nextBtnFallback.onclick = goNextChallenge;

  // ✅ אם זה fallbackOnly (שנה ג' SQL) — מציגים ישר את ה-steps
  if (ch.mode === "fallbackOnly") {
    codeCard?.classList.add("hidden");
    showFallback(ch);
    return;
  }

  // אחרת — מסלול הרצה רגיל
  document.getElementById("runBtn").onclick = async () => {
    status.textContent = "טוען/מריץ…";
    status.className = "status";

    try {
      const res = await runUserCode(editor.value);
      output.textContent = res.output;

      const check = checkExpected(res.output, ch.expectedOutput);

      if (!res.ok) {
        status.textContent = "❌ יש שגיאה בקוד";
        status.className = "status bad";
        return;
      }

      if (!check.canCheck) {
        status.textContent = "✅ רץ! (אין בדיקה אוטומטית לתרגיל הזה)";
        status.className = "status good";
        return;
      }

      if (check.passed) {
        status.textContent = "✅ הצלחת! מעולה!";
        status.className = "status good";
      } else {
        status.textContent = "❌ עוד לא… בדוק פלט";
        status.className = "status bad";
      }
    } catch {
      codeCard.classList.add("hidden");
      showFallback(ch);
    }
  };

  // טעינת Pyodide מראש
  (async () => {
    status.textContent = "טוען מנוע Python…";
    status.className = "status";
    try {
      await Promise.race([
        initPyodide(),
        new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), 12000))
      ]);
      status.textContent = "✅ Python מוכן! אפשר להריץ";
      status.className = "status good";
    } catch {
      codeCard.classList.add("hidden");
      showFallback(ch);
    }
  })();
}

/* =========================
   Fallback + Steps
   ========================= */

let __stepIndex = 0;

function showFallback(ch){
  const card = document.getElementById("fallbackCard");
  const area = document.getElementById("fallbackArea");
  card.classList.remove("hidden");
  area.innerHTML = "";

  if (!ch.fallback) {
    area.innerHTML = "<p class='mini'>אין תרגול חלופי לאתגר הזה.</p>";
    return;
  }

  if (ch.fallback.type === "steps") {
    __stepIndex = 0;
    renderStep(ch);
    return;
  }

  if (ch.fallback.type === "quiz") renderQuiz(ch.fallback, area);
  if (ch.fallback.type === "order") renderOrder(ch.fallback, area);
}

function renderStep(ch){
  const area = document.getElementById("fallbackArea");
  const steps = ch.fallback.steps;
  const step = steps[__stepIndex];

  area.innerHTML = "";

  const header = document.createElement("div");
  header.className = "row";
  header.style.justifyContent = "space-between";
  header.innerHTML = `
    <span class="badge">${step.title ?? "משימה"}</span>
    <span class="badge">משימה ${__stepIndex + 1} מתוך ${steps.length}</span>
  `;
  area.appendChild(header);

  if (step.type === "quiz") renderQuiz(step, area);
  if (step.type === "order") renderOrder(step, area);

  const nav = document.createElement("div");
  nav.className = "row";
  nav.style.justifyContent = "flex-end";

  const btn = document.createElement("button");
  btn.className = "btn btnGreen";
  const isLast = __stepIndex === steps.length - 1;
  btn.textContent = isLast ? "סיימתי ➜ אתגר הבא" : "הבא ➜";

  btn.onclick = () => {
    if (isLast) {
      goNextChallenge();
      return;
    }
    __stepIndex++;
    renderStep(ch);
  };

  nav.appendChild(btn);
  area.appendChild(nav);
}

function renderQuiz(fb, root){
  const box = document.createElement("div");
  box.className = "text";
  box.innerHTML = `<p><b>${fb.question}</b></p>`;

  const list = document.createElement("div");
  list.className = "grid";

  fb.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = "tile";
    btn.type = "button";
    btn.textContent = opt;

    btn.onclick = () => {
      const ok = idx === fb.correctIndex;
      root.querySelectorAll(".status, .mini.answer").forEach(el => el.remove());

      const msg = document.createElement("div");
      msg.className = ok ? "status good" : "status bad";
      msg.textContent = ok ? "✅ נכון!" : "❌ לא… נסה שוב";

      const exp = document.createElement("p");
      exp.className = "mini answer";
      exp.textContent = ok ? fb.explainCorrect : "רמז: חזור להסבר למעלה 😉";

      root.appendChild(msg);
      root.appendChild(exp);
    };

    list.appendChild(btn);
  });

  root.appendChild(box);
  root.appendChild(list);
}

function renderOrder(fb, root){
  const p = document.createElement("p");
  p.className = "text";
  p.innerHTML = `<b>${fb.prompt}</b>`;
  root.appendChild(p);

  const ul = document.createElement("ul");
  ul.style.listStyle = "none";
  ul.style.padding = "0";
  ul.style.display = "grid";
  ul.style.gap = "10px";

  const pieces = [...fb.pieces].sort(() => Math.random() - 0.5);

  pieces.forEach(line => {
    const li = document.createElement("li");
    li.className = "tile";
    li.draggable = true;
    li.textContent = line;
    li.dataset.value = line;

    li.addEventListener("dragstart", (e) => e.dataTransfer.setData("text/plain", line));
    li.addEventListener("dragover", (e) => e.preventDefault());
    li.addEventListener("drop", (e) => {
      e.preventDefault();
      const draggedValue = e.dataTransfer.getData("text/plain");
      const draggedEl = [...ul.children].find(x => x.dataset.value === draggedValue);
      if (!draggedEl || draggedEl === li) return;
      ul.insertBefore(draggedEl, li);
    });

    ul.appendChild(li);
  });

  const checkBtn = document.createElement("button");
  checkBtn.className = "btn";
  checkBtn.textContent = "בדוק סדר ✅";

  checkBtn.onclick = () => {
    root.querySelectorAll(".status, .mini.answer").forEach(el => el.remove());

    const current = [...ul.children].map(li => li.dataset.value);
    const ok = current.join("\n") === fb.correct.join("\n");

    const result = document.createElement("div");
    result.className = ok ? "status good" : "status bad";
    result.textContent = ok ? "✅ מעולה! הסדר נכון" : "❌ כמעט… נסה שוב";

    const exp = document.createElement("p");
    exp.className = "mini answer";
    exp.textContent = ok ? fb.explainCorrect : "רמז: import → connect → cursor 😉";

    root.appendChild(result);
    root.appendChild(exp);
  };

  root.appendChild(ul);
  root.appendChild(checkBtn);
}
