const CHALLENGES = [
  {
    id: "cmd_print_name",
    group: "basics",
    topic: "פקודה",
    title: "הדפס שלום",
    subtitle: "print בפייתון",
    explain: "פקודה היא הוראה למחשב. בפייתון מדפיסים למסך עם print().",
    task: 'כתוב שורה אחת שמדפיסה את המילה "שלום".',
    hint: 'טקסט תמיד בתוך גרשיים: print("שלום")',
    starter: `# כתבו כאן:
print("...")`,
    solution: `print("שלום")`,
    expectedOutput: "שלום",
    fallback: {
      type: "quiz",
      question: 'איזו שורה מדפיסה בפייתון את המילה "שלום"?',
      options: ['echo("שלום")', 'print("שלום")', 'console.log("שלום")', 'say("שלום")'],
      correctIndex: 1,
      explainCorrect: 'בפייתון מדפיסים עם print() והטקסט בתוך גרשיים.'
    }
  },

  {
    id: "var_zoo_total",
    group: "basics",
    topic: "משתנים",
    title: "גן חיות עם משתנים",
    subtitle: "3 משתנים + סכום",
    explain: "משתנה הוא קופסה בזיכרון עם שם. אפשר לשמור בו מספרים.",
    task: "צור 3 משתנים (lions, monkeys, elephants) עם מספרים. בסוף הדפס את סכום כל החיות.",
    hint: "total = lions + monkeys + elephants ואז print(total)",
    starter: `lions = 5
monkeys = 12
elephants = 2

# חשבו סכום והדפיסו:
`,
    solution: `lions = 5
monkeys = 12
elephants = 2

total = lions + monkeys + elephants
print(total)`,
    expectedOutput: "19",
    fallback: {
      type: "quiz",
      question: "מה זה משתנה בפייתון?",
      options: ["כפתור באתר", "קופסה עם שם ששומרת מידע", "שגיאה בקוד", "לולאה שחוזרת"],
      correctIndex: 1,
      explainCorrect: "משתנה הוא קופסה בזיכרון: נותנים שם ושומרים ערך."
    }
  },

  {
    id: "for_5_rounds",
    group: "basics",
    topic: "לולאת for",
    title: "5 סיבובים",
    subtitle: "הדפס 1 עד 5",
    explain: "לולאת for עושה מספר חזרות ידוע מראש. range(1,6) נותן 1 עד 5.",
    task: "צור לולאת for שמדפיסה את המספרים 1 עד 5.",
    hint: "for i in range(1, 6): ואז print(i)",
    starter: `# כתבו לולאה כאן:
`,
    solution: `for i in range(1, 6):
    print(i)`,
    expectedOutput: `1
2
3
4
5`,
    fallback: {
      type: "order",
      prompt: "סדר את השורות כדי ליצור לולאת for שמדפיסה 1 עד 5",
      pieces: ["    print(i)", "for i in range(1, 6):"],
      correct: ["for i in range(1, 6):", "    print(i)"],
      explainCorrect: "קודם שורת for עם :, ואז שורה מוזחת (4 רווחים) עם print."
    }
  },

  {
    id: "if_divide_by_zero",
    group: "basics",
    topic: "תנאים",
    title: "אסור לחלק באפס",
    subtitle: "if / else",
    explain: "תנאי מאפשר למחשב לבחור מה לעשות. אם משהו נכון – פעולה אחת, אחרת – פעולה אחרת.",
    task: "יש num2 = 0. אם num2 שווה 0 הדפס 'אי אפשר לחלק באפס' אחרת הדפס 'אפשר לחלק'.",
    hint: "if num2 == 0: ... else: ...",
    starter: `num2 = 0

# כתבו תנאי כאן:
`,
    solution: `num2 = 0

if num2 == 0:
    print("אי אפשר לחלק באפס")
else:
    print("אפשר לחלק")`,
    expectedOutput: "אי אפשר לחלק באפס",
    fallback: {
      type: "quiz",
      question: "איזה קוד בודק אם x שווה ל-10 בפייתון?",
      options: ["if (x === 10) {}", "if x = 10:", "if x == 10:", "if x != 10:"],
      correctIndex: 2,
      explainCorrect: "בפייתון משווים עם == (לא עם =)."
    }
  },

  {
    id: "func_greet",
    group: "basics",
    topic: "פונקציות",
    title: "פונקציה שמברכת",
    subtitle: "def greet(name)",
    explain: "פונקציה היא מתכון: כותבים פעם אחת ומפעילים שוב ושוב.",
    task: "צור פונקציה greet שמקבלת name ומדפיסה 'שלום NAME'. ואז קרא לה עם השם שלך.",
    hint: "def greet(name): ואז print בתוך הפונקציה",
    starter: `# כתבו כאן פונקציה ואז קריאה אליה:
`,
    solution: `def greet(name):
    print("שלום", name)

greet("יוסי")`,
    expectedOutput: "שלום יוסי",
    fallback: {
      type: "quiz",
      question: "מה היתרון של פונקציה?",
      options: ["היא עושה את המחשב יותר כבד", "אפשר להשתמש בקוד שוב ושוב בלי לשכפל", "היא מוחקת משתנים", "היא רק ללולאות"],
      correctIndex: 1,
      explainCorrect: "פונקציה חוסכת כתיבה כפולה ועוזרת לסדר קוד."
    }
  },

  // ===== פרויקט (לרוב בלי בדיקה קשיחה) =====
  {
    id: "project_calculator_demo",
    group: "projects",
    topic: "מחשבון",
    title: "מחשבון קטן (דמו בלי input)",
    subtitle: "חישוב + הדפסת תרגיל",
    explain: "כאן זה תרגול ארוך יותר. נעשה דמו עם ערכים מוכנים מראש.",
    task: "יש a=5, op='+', b=10. הדפס: 5+10 = 15",
    hint: 'print(f"{a}{op}{b} = {result}")',
    starter: `a = 5
op = "+"
b = 10

# כתבו כאן:
`,
    solution: `a = 5
op = "+"
b = 10

if op == "+":
    result = a + b

print(f"{a}{op}{b} = {result}")`,
    expectedOutput: "5+10 = 15",
    fallback: {
      type: "quiz",
      question: "במחשבון, למה צריך לבדוק לפני חילוק שהמספר השני לא 0?",
      options: ["כי אחרת התוצאה תמיד 0", "כי אי אפשר לחלק באפס", "כי print לא יעבוד", "כי for לא יעבוד"],
      correctIndex: 1,
      explainCorrect: "חילוק באפס גורם לשגיאה, ולכן בודקים לפני שמחלקים."
    }
  },

  /* ======================
     SQL – 5 שאלונים + 5 fill (practice.html)
     ====================== */

  {
    id: "sql_quiz_1",
    group: "grade3",
    topic: "SQL",
    title: "שאלה 1: מזה sql?",
    subtitle: "שאלון",
    explain: "",
    task: "בחרו את התשובה הנכונה.",
    hint: "",
    mode: "practiceOnly",
    starter: "",
    solution: "",
    expectedOutput: null,
    fallback: {
      type: "quiz",
      question: "מה זה SQL?",
      options: ["שפת ציור למשחקים", "שפה לעבודה עם בסיס נתונים", "שפת עיצוב אתרים", "מערכת הפעלה"],
      correctIndex: 1,
      explainCorrect: "SQL היא שפה שבעזרתה עובדים עם מידע בבסיס נתונים."
    }
  },

  {
    id: "sql_quiz_2",
    group: "grade3",
    topic: "SQL",
    title: "שאלה 2: מזה בסיס נתונים?",
    subtitle: "שאלון",
    explain: "",
    task: "בחרו את התשובה הנכונה.",
    hint: "",
    mode: "practiceOnly",
    starter: "",
    solution: "",
    expectedOutput: null,
    fallback: {
      type: "quiz",
      question: "מה התיאור הכי נכון לבסיס נתונים?",
      options: ["משחק מחשב", "סרטון", "ציור", "מקום לשמור מידע בצורה מסודרת"],
      correctIndex: 3,
      explainCorrect: "בסיס נתונים שומר מידע בצורה מסודרת."
    }
  },

  {
    id: "sql_quiz_3",
    group: "grade3",
    topic: "SQL",
    title: "שאלה 3: מהי commit",
    subtitle: "שאלון",
    explain: "",
    task: "בחרו את התשובה הנכונה.",
    hint: "",
    mode: "practiceOnly",
    starter: "",
    solution: "",
    expectedOutput: null,
    fallback: {
      type: "quiz",
      question: "מה עושה פקודת commit",
      options: ["מוחקת את בסיס הנתונים", "מוסיפה פריט חדש לבסיס הנתונים", "שומרת את השינויים שנעשו בבסיס הנתונים", "מביאה את התוצאות שבסיס הנתונים החזיר לנו"],
      correctIndex: 2,
      explainCorrect: "commit היא כמו סייב—שומרת את השינויים שעשינו בבסיס הנתונים."
    }
  },

  {
    id: "sql_quiz_4",
    group: "grade3",
    topic: "SQL",
    title: "שאלה 4: מזה cursor",
    subtitle: "שאלון",
    explain: "",
    task: "בחרו את התשובה הנכונה.",
    hint: "",
    mode: "practiceOnly",
    starter: "",
    solution: "",
    expectedOutput: null,
    fallback: {
      type: "quiz",
      question: "למה משתמשים ב־cursor?",
      options: ["כדי לצייר", "כדי להדפיס", "כדי להפעיל משחק", "כדי להריץ פקודות SQL"],
      correctIndex: 3,
      explainCorrect: "cursor מאפשר להריץ פקודות על בסיס הנתונים (execute)."
    }
  },

  {
    id: "sql_quiz_5",
    group: "grade3",
    topic: "SQL",
    title: "שאלה 5: מזה SELECT",
    subtitle: "שאלון",
    explain: "",
    task: "בחרו את התשובה הנכונה.",
    hint: "",
    mode: "practiceOnly",
    starter: "",
    solution: "",
    expectedOutput: null,
    fallback: {
      type: "quiz",
      question: "מה עושה SELECT?",
      options: ["מוחק מידע", "מוסיף מידע", "שולף מידע", "סוגר את המחשב"],
      correctIndex: 2,
      explainCorrect: "SELECT משמש לשליפת מידע מהטבלה."
    }
  },

  // ===== SQL fill (בנק מילים + חורים) =====

  {
    id: "sql_order_1",
    group: "grade3",
    topic: "SQL",
    title: "שאלה 6: בונים שאילתה",
    subtitle: "SELECT בסיסי",
    explain: "נבנה שאילתת SELECT פשוטה.",
    task: "להציג את כל העמודות בטבלה (books).",
    hint: "קודם SELECT ואז FROM.",
    mode: "practiceOnly",
    starter: "",
    solution: "",
    expectedOutput: null,
    fallback: {
      type: "fill",
      promptParts: ["", " ", ""],
      blanks: [{ correct: "SELECT *" }, { correct: "FROM books;" }],
      bank: ["SELECT *", "FROM books;", "WHERE id = 1;", "INSERT INTO books"],
      explainCorrect: "קודם SELECT ואז FROM."
    }
  },

  {
    id: "sql_order_2",
    group: "grade3",
    topic: "SQL",
    title: "שאלה 7: בונים שאילתה",
    subtitle: "SELECT עם עמודות",
    explain: "",
    task: "להציג רק את העמודות (title) ו-(author) מכל הרשומות בטבלה (books).",
    hint: "קודם SELECT ואז FROM.",
    mode: "practiceOnly",
    starter: "",
    solution: "",
    expectedOutput: null,
    fallback: {
      type: "fill",
      promptParts: ["", " ", ""],
      blanks: [{ correct: "SELECT title, author" }, { correct: "FROM books;" }],
      bank: ["SELECT title, author", "SELECT *", "FROM books;", "WHERE id = 1;"],
      explainCorrect: "קודם SELECT ואז FROM."
    }
  },

  {
    id: "sql_order_3",
    group: "grade3",
    topic: "SQL",
    title: "שאלה 8: WHERE",
    subtitle: "סינון מידע",
    explain: "WHERE מסנן מידע לפי תנאי.",
    task: "להציג את הרשומה שה-(id) שלה שווה ל-(1) מתוך הטבלה (books).",
    hint: "WHERE מגיע אחרי FROM.",
    mode: "practiceOnly",
    starter: "",
    solution: "",
    expectedOutput: null,
    fallback: {
      type: "fill",
      promptParts: ["", " ", " ", ""],
      blanks: [{ correct: "SELECT *" }, { correct: "FROM books" }, { correct: "WHERE id = 1;" }],
      bank: ["SELECT *", "FROM books", "WHERE id = 1;", "VALUES (...);", "CREATE TABLE"],
      explainCorrect: "WHERE מגיע אחרי FROM."
    }
  },

  {
    id: "sql_order_4",
    group: "grade3",
    topic: "SQL",
    title: "שאלה 9: INSERT",
    subtitle: "הוספת מידע",
    explain: "",
    task: "להוסיף רשומה חדשה לטבלה (books) עם ערכים חדשים.",
    hint: "קודם INSERT INTO ואז VALUES.",
    mode: "practiceOnly",
    starter: "",
    solution: "",
    expectedOutput: null,
    fallback: {
      type: "fill",
      promptParts: ["", " ", ""],
      blanks: [{ correct: "INSERT INTO books" }, { correct: "VALUES (...);" }],
      bank: ["INSERT INTO books", "VALUES (...);", "SELECT *", "FROM books;"],
      explainCorrect: "קודם INSERT INTO ואז VALUES."
    }
  },

  {
    id: "sql_order_5",
    group: "grade3",
    topic: "SQL",
    title: "שאלה 10: CREATE TABLE",
    subtitle: "יצירת טבלה",
    explain: "",
    task: "ליצור טבלה חדשה בשם (books) עם .",
    hint: "קודם CREATE TABLE ואז שם הטבלה.",
    mode: "practiceOnly",
    starter: "",
    solution: "",
    expectedOutput: null,
    fallback: {
      type: "fill",
      promptParts: ["", " ", ""],
      blanks: [{ correct: "CREATE TABLE" }, { correct: "books;" }],
      bank: ["CREATE TABLE", "books;", "INSERT INTO books", "VALUES (...);"],
      explainCorrect: "קודם CREATE TABLE ואז שם הטבלה."
    }
  }
];
