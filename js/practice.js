const params = new URLSearchParams(location.search);
const id = params.get("id");
const ch = (typeof CHALLENGES !== "undefined") ? CHALLENGES.find(x => x.id === id) : null;

function getNextChallengeId(currentId){
  const idx = CHALLENGES.findIndex(x => x.id === currentId);
  if (idx === -1) return null;
  return CHALLENGES[idx + 1]?.id ?? null;
}

function goNext(){
  const nextId = getNextChallengeId(id);
  if (!nextId) {
    alert("🎉 סיימתם את כל האתגרים!");
    location.href = "./index.html";
    return;
  }
  const nextCh = CHALLENGES.find(x => x.id === nextId);
  const page = (nextCh?.mode === "practiceOnly") ? "practice.html" : "challenge.html";
  location.href = `./${page}?id=${encodeURIComponent(nextId)}`;
}

if (!ch) {
  document.body.innerHTML = "<h2 style='padding:20px'>לא נמצא תרגול 😅</h2>";
} else {
  document.title = ch.title;

  // כותרות
  document.getElementById("title").textContent = ch.title ?? "";
  document.getElementById("subtitle").textContent = ch.subtitle ?? "";
  document.getElementById("explain").textContent = ch.explain ?? "";
  document.getElementById("task").textContent = ch.task ?? "";

  const hintEl = document.getElementById("hint");
  hintEl.textContent = ch.hint ?? "";
  document.getElementById("hintBtn").onclick = () => hintEl.classList.toggle("hidden");

  const topicBadge = document.getElementById("topicBadge");
  const progressBadge = document.getElementById("progressBadge");
  topicBadge.textContent = `# ${ch.topic ?? ""}`;
  const idx = CHALLENGES.findIndex(x => x.id === ch.id);
  progressBadge.textContent = `אתגר ${idx + 1} מתוך ${CHALLENGES.length}`;

  // render practice
  const area = document.getElementById("practiceArea");
  area.innerHTML = "";

  if (!ch.fallback) {
    area.innerHTML = "<p class='mini'>אין תרגול לאתגר הזה.</p>";
  } else if (ch.fallback.type === "quiz") {
    renderQuiz(ch.fallback, area);
  } else if (ch.fallback.type === "order") {
    renderOrder(ch.fallback, area);
  } else {
    area.innerHTML = "<p class='mini'>סוג תרגול לא מוכר.</p>";
  }

  document.getElementById("nextBtn").onclick = goNext;
}

/* ---------- renderQuiz / renderOrder ---------- */

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

  const wrap = document.createElement("div");
  wrap.className = "orderWrap";

  const pieces = [...fb.pieces].sort(() => Math.random() - 0.5);

  pieces.forEach((line, i) => {
    const row = document.createElement("div");
    row.className = "orderItem";
    row.draggable = true;
    row.dataset.value = line;

    row.innerHTML = `
      <div class="orderGrip">≡</div>
      <div class="orderCode">${escapeHtml(line)}</div>
    `;

    row.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", line);
    });

    row.addEventListener("dragover", (e) => {
      e.preventDefault();
      row.classList.add("dragOver");
    });

    row.addEventListener("dragleave", () => row.classList.remove("dragOver"));

    row.addEventListener("drop", (e) => {
      e.preventDefault();
      row.classList.remove("dragOver");

      const draggedValue = e.dataTransfer.getData("text/plain");
      const draggedEl = [...wrap.children].find(x => x.dataset.value === draggedValue);
      if (!draggedEl || draggedEl === row) return;

      wrap.insertBefore(draggedEl, row);
    });

    wrap.appendChild(row);
  });

  root.appendChild(wrap);

  const actions = document.createElement("div");
  actions.className = "orderActions";

  const checkBtn = document.createElement("button");
  checkBtn.className = "btn";
  checkBtn.textContent = "בדוק סדר ✅";

  checkBtn.onclick = () => {
    root.querySelectorAll(".status, .mini.answer").forEach(el => el.remove());

    const current = [...wrap.children].map(el => el.dataset.value);
    const ok = current.join("\n") === fb.correct.join("\n");

    const result = document.createElement("div");
    result.className = ok ? "status good" : "status bad";
    result.textContent = ok ? "✅ מעולה! הסדר נכון" : "❌ כמעט… נסה שוב";

    const exp = document.createElement("p");
    exp.className = "mini answer";
    exp.textContent = ok ? fb.explainCorrect : "רמז: נסו לחשוב על הסדר הנכון 😉";

    root.appendChild(result);
    root.appendChild(exp);
  };

  actions.appendChild(checkBtn);
  root.appendChild(actions);
}

function escapeHtml(s){
  return (s ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

