function groupMeta(group) {
  const map = {
    basics: { title: "תרגול יסודות", sub: "פקודות, משתנים, תנאים, לולאות, פונקציות…" },

    projects_y1: { title: "תרגול פרויקטים – שנה א׳", sub: "פרויקטים ראשונים בליווי מלא" },
    projects_y2: { title: "תרגול פרויקטים – שנה ב׳", sub: "יותר לוגיקה, זמן, משחקים ואקראיות" },
    projects_y3: { title: "תרגול פרויקטים – שנה ג׳", sub: "SQL שאלונים + תרגילי השלמה" },

    mini_projects: { title: "מיני־פרויקטים עצמאיים", sub: "פרויקטים פתוחים לביצוע עצמאי בליווי האתר" },
  };

  return map[group] ?? { title: "תרגול", sub: "" };
}

function makeTile(ch, groupFromPage) {
  const a = document.createElement("a");
  a.className = "tile";

  const page = (ch.mode === "practiceOnly") ? "practice.html" : "challenge.html";
  const g = ch.group ?? groupFromPage ?? "";
  const groupPart = g ? `&group=${encodeURIComponent(g)}` : "";

  a.href = `./${page}?id=${encodeURIComponent(ch.id)}${groupPart}`;

  a.innerHTML = `
    <div class="tag"># ${ch.topic ?? ""}</div>
    <div class="name">${ch.title ?? ""}</div>
    <div class="desc">${ch.subtitle ?? ""}</div>
  `;
  return a;
}

(function main() {
  if (typeof CHALLENGES === "undefined" || !Array.isArray(CHALLENGES)) {
    document.body.innerHTML = "<h2 style='padding:20px'>לא נטענו נתוני תרגילים 😅</h2>";
    return;
  }

  const params = new URLSearchParams(location.search);
  const group = params.get("group") || "basics";

  const meta = groupMeta(group);
  document.title = meta.title;

  const title = document.getElementById("catTitle");
  const sub = document.getElementById("catSub");
  const list = document.getElementById("list");

  if (title) title.textContent = meta.title;

  const items = CHALLENGES.filter(ch => (ch.group ?? "") === group);

  if (sub) {
    sub.textContent = `${meta.sub}${items.length ? ` • ${items.length} תרגילים` : ""}`;
  }

  if (!items.length) {
    list.innerHTML = "<p class='mini'>אין תרגילים בקטגוריה הזו עדיין.</p>";
    return;
  }

  items.forEach(ch => list.appendChild(makeTile(ch, group)));
})();
