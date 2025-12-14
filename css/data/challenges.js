const CHALLENGES = [
  // ✅ יסודות
  {
    id: "cmd_print_name",
    group: "basics",
    topic: "פקודה",
    title: "הדפס את השם שלך",
    subtitle: "תרגול console.log",
    explain: "פקודה היא הוראה למחשב. כאן נתרגל פקודת הדפסה למסך בעזרת JavaScript.",
    task: "כתוב שורה אחת שמדפיסה את השם שלך.",
    hint: "ב-JS מדפיסים עם console.log(\"טקסט\").",
    starter: `// כתבו כאן:
console.log("השם שלי");`,
    solution: `console.log("יוסי");`,
    expectedOutput: "יוסי"
  },
  {
    id: "var_zoo",
    group: "basics",
    topic: "משתנים",
    title: "גן חיות עם משתנים",
    subtitle: "3 משתנים עם מספרים",
    explain: "משתנה הוא קופסה עם שם. בתוך הקופסה שמים ערך (למשל מספר).",
    task: "צור 3 משתנים של חיות (למשל lions, monkeys, elephants) ושמור בהם מספרים. בסוף הדפס את סכום כל החיות.",
    hint: "סכום עושים עם +, ואז console.log(total).",
    starter: `let lions = 5;
let monkeys = 12;
let elephants = 2;

// חשבו סכום והדפיסו:
`,
    solution: `let lions = 5;
let monkeys = 12;
let elephants = 2;

let total = lions + monkeys + elephants;
console.log(total);`,
    expectedOutput: "19"
  },
  {
    id: "if_divide_by_zero",
    group: "basics",
    topic: "תנאים",
    title: "אסור לחלק באפס",
    subtitle: "if / else",
    explain: "תנאי מאפשר למחשב לבחור: אם משהו נכון – תעשה X, אחרת – תעשה Y.",
    task: "יש משתנה num2. אם num2 שווה 0 הדפס: 'אי אפשר לחלק באפס' אחרת הדפס 'אפשר לחלק'.",
    hint: "if (num2 === 0) { ... } else { ... }",
    starter: `let num2 = 0;

// כתבו תנאי כאן:
`,
    solution: `let num2 = 0;

if (num2 === 0) {
  console.log("אי אפשר לחלק באפס");
} else {
  console.log("אפשר לחלק");
}`,
    expectedOutput: "אי אפשר לחלק באפס"
  },
  {
    id: "for_5_rounds",
    group: "basics",
    topic: "לולאת for",
    title: "5 סיבובים",
    subtitle: "הדפס שם + מספר סיבוב",
    explain: "for רצה מספר פעמים ידוע מראש.",
    task: "צור לולאת for שעושה 5 סיבובים. בכל סיבוב הדפס: 'יוסי סיבוב X' (במקום X מספר הסיבוב).",
    hint: "for (let i = 1; i <= 5; i++) { ... }",
    starter: `// כתבו לולאה:
`,
    solution: `for (let i = 1; i <= 5; i++) {
  console.log("יוסי סיבוב " + i);
}`,
    expectedOutput: "יוסי סיבוב 1\nyוסי סיבוב 2"
  },
  {
    id: "func_greet",
    group: "basics",
    topic: "פונקציות",
    title: "פונקציה שמברכת",
    subtitle: "function greet(name)",
    explain: "פונקציה היא מתכון. נותנים לה שם, ואפשר להשתמש בה שוב ושוב.",
    task: "צור פונקציה greet שמקבלת name ומדפיסה: 'שלום NAME'. ואז תקרא לה עם השם שלך.",
    hint: "function greet(name){ console.log('שלום ' + name); }",
    starter: `// כתבו כאן פונקציה ואז קריאה אליה:
`,
    solution: `function greet(name){
  console.log("שלום " + name);
}
greet("יוסי");`,
    expectedOutput: "שלום יוסי"
  },

  // ✅ “פרויקטים” (כפתורים של תרגול מתקדם)
  {
    id: "project_calculator_intro",
    group: "projects",
    topic: "מחשבון",
    title: "מחשבון: תרגיל + תוצאה",
    subtitle: "בונים מחשבון פשוט",
    explain: "פה מתחילים פרויקט. ב-Web נשתמש ב-prompt כדי לקבל קלט, ו-console.log כדי להדפיס.",
    task: "קבל שני מספרים (prompt), קבל פעולה (+,-,*,/), וכתוב את התרגיל והתוצאה.",
    hint: "Number(prompt('...')) הופך טקסט למספר.",
    starter: `// דוגמה:
let a = Number(prompt("מספר ראשון:"));
let op = prompt("פעולה: + - * /");
let b = Number(prompt("מספר שני:"));

// כתבו כאן חישוב והדפסה:
`,
    solution: `let a = Number(prompt("מספר ראשון:"));
let op = prompt("פעולה: + - * /");
let b = Number(prompt("מספר שני:"));

let result;

if (op === "+") result = a + b;
else if (op === "-") result = a - b;
else if (op === "*") result = a * b;
else if (op === "/") {
  if (b === 0) {
    console.log("אי אפשר לחלק באפס");
    result = null;
  } else result = a / b;
}

if (result !== null) console.log(a + op + b + " = " + result);`,
    expectedOutput: null // בפרויקט כזה לא בודקים פלט קבוע
  }
];
