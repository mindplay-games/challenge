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
      options: [
        'echo("שלום")',
        'print("שלום")',
        'console.log("שלום")',
        'say("שלום")'
      ],
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
      options: [
        "כפתור באתר",
        "קופסה עם שם ששומרת מידע",
        "שגיאה בקוד",
        "לולאה שחוזרת"
      ],
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
      pieces: [
        "    print(i)",
        "for i in range(1, 6):"
      ],
      correct: [
        "for i in range(1, 6):",
        "    print(i)"
      ],
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
      options: [
        "if (x === 10) {}",
        "if x = 10:",
        "if x == 10:",
        "if x != 10:"
      ],
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
      options: [
        "היא עושה את המחשב יותר כבד",
        "אפשר להשתמש בקוד שוב ושוב בלי לשכפל",
        "היא מוחקת משתנים",
        "היא רק ללולאות"
      ],
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
    hint: "print(f\"{a}{op}{b} = {result}\")",
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
      options: [
        "כי אחרת התוצאה תמיד 0",
        "כי אי אפשר לחלק באפס",
        "כי print לא יעבוד",
        "כי for לא יעבוד"
      ],
      correctIndex: 1,
      explainCorrect: "חילוק באפס גורם לשגיאה, ולכן בודקים לפני שמחלקים."
    }
  }
];
