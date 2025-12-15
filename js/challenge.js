const params = new URLSearchParams(location.search);
const id = params.get("id");
const ch = CHALLENGES.find(x => x.id === id);

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

  title.textContent = ch.title;
  subtitle.textContent = ch.subtitle;
  explain.textContent = ch.explain;
  task.textContent = ch.task;
  hint.textContent = ch.hint;
  solution.textContent = ch.solution;

  // שמירה מקומית כדי שילד לא יאבד עבודה
  const key = "code_" + ch.id;
  editor.value = localStorage.getItem(key) ?? ch.starter;

  editor.addEventListener("input", () => {
    localStorage.setItem(key, editor.value);
  });

  document.getElementById("hintBtn").onclick = () => {
    hint.classList.toggle("hidden");
  };

  document.getElementById("solutionBtn").onclick = () => {
    solution.classList.toggle("hidden");
  };

  document.getElementById("resetBtn").onclick = () => {
    editor.value = ch.starter;
    localStorage.setItem(key, editor.value);
    output.textContent = "";
    status.textContent = "";
    status.className = "status";
  };

 document.getElementById("runBtn").onclick = async () => {
  status.textContent = "טוען/מריץ…";
  status.className = "status";

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
};

}
