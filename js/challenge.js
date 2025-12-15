const params = new URLSearchParams(location.search);
const id = params.get("id");
const ch = CHALLENGES.find(x => x.id === id);

function getNextChallengeId(currentId){
  const idx = CHALLENGES.findIndex(x => x.id === currentId);
  if (idx === -1) return null;
  const next = CHALLENGES[idx + 1];
  return next ? next.id : null;
}

function goNext(){
  const nextId = getNextChallengeId(id);
  if (!nextId) {
    // אם אין הבא
    alert("🎉 סיימתם את כל האתגרים! חזרו לדף הראשי כדי לבחור שוב.");
    location.href = "./index.html";
    return;
  }
  location.href = `./challenge.html?id=${encodeURIComponent(nextId)}`;
}

if (!ch) {
  document.body.innerHTML = "<h2 style='padding:20px'>לא נמצא אתגר 😅</h2>";
} else {
  document.title = ch.title;

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

  // badges
  topicBadge.textContent = `# ${ch.topic}`;
  const idx = CHALLENGES.findIndex(x => x.id === ch.id);
  progressBadge.textContent = `אתגר ${idx + 1} מתוך ${CHALLENGES.length}`;

  // שמירה מקומית
  const key = "code_" + ch.id;
  editor.value = localStorage.getItem(key) ?? ch.starter;

  editor.addEventListener("input", () => {
    localStorage.setItem(key, editor.value);
  });

  // רמז/פתרון
  document.getElementById("hintBtn").onclick = () => hint.classList.toggle("hidden");
  document.getElementById("solutionBtn").onclick = () => solution.classList.toggle("hidden");

  // איפוס
  document.getElementById("resetBtn").onclick = () => {
    editor.value = ch.starter;
    localStorage.setItem(key, editor.value);
    output.textContent = "";
    status.textContent = "";
    status.className = "status";
  };

  // כפתור הבא
  document.getElementById("nextBtn").onclick = goNext;
  const nextBtnFallback = document.getElementById("nextBtnFallback");
  if (nextBtnFallback) nextBtnFallback.onclick = goNext;

  // Run Python
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
    } catch (e) {
      codeCard.classList.add("hidden");
      showFallback(ch);
    }
  };

  // נסיון לטעון Pyodide מראש + fallback אם לא נטען
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
   תוכנית ב' (Fallback)
   ========================= */

function showFallback(ch){
  const card = document.getElementById("fallbackCard");
  const area = document.getElementById("fallbackArea");
  card.classList.remove("hidden");
  area.innerHTML = "";

  if (!ch.fallback) {
    area.innerHTML = "<p class='mini'>אין תרגול חלופי לאתגר הזה.</p>";
    return;
  }

  if (ch.fallback.type === "quiz") renderQuiz(ch.fallback, area);
  if (ch.fallback.type === "order") renderOrder(ch.fallback, area);
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
      exp.textContent = ok ? fb.explainCorrect : "רמז: חפש את הפקודה הנכונה בפייתון.";

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
    exp.textContent = ok ? fb.explainCorrect : "רמז: קודם השורה שמתחילה, ואז השורה המוזחת.";

    root.appendChild(result);
    root.appendChild(exp);
  };

  root.appendChild(ul);
  root.appendChild(checkBtn);
}
