const CHALLENGES = [
  // ===== יסודות =====

  {
    id: "cmd_print_name",
    group: "basics",
    topic: "פקודה",
    title: "הדפס שלום",
    subtitle: "תרגול print",
    explain: "פקודה היא הוראה למחשב. בפייתון מדפיסים למסך עם print().",
    task: "כתוב שורה אחת שמדפיסה את שלום.",
    hint: "טקסט תמיד בתוך גרשיים: print(\"שלום\")",
    starter: `# כתבו כאן:
print("שלום")`,
    solution: `print("שלום")`,
    expectedOutput: "שלום"
  },

  {
    id: "var_zoo_total",
    group: "basics",
    topic: "משתנים",
    title: "גן חיות עם משתנים",
    subtitle: "3 משתנים + סכום",
    explain: "משתנה הוא קופסה בזיכרון עם שם. אפשר לשמור בו מספרים וטקסט.",
    task: "צור 3 משתנים של חיות (lions, monkeys, elephants) עם מספרים. בסוף הדפס את סכום כל החיות.",
    hint: "יוצרים סכום: total = lions + monkeys + elephants ואז print(total)",
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
    expectedOutput: "19"
  },

  {
    id: "for_5_rounds",
    group: "basics",
    topic: "לולאת for",
    title: "5 סיבובים",
    subtitle: "הדפס שם + מספר סיבוב",
    explain: "לולאת for עושה מספר חזרות ידוע מראש. range(1,6) נותן 1 עד 5.",
    task: "צור לולאת for שעושה 5 סיבובים. בכל סיבוב הדפס: 'יוסי סיבוב X'.",
    hint: "for i in range(1, 6):",
    starter: `# כתבו לולאה כאן:
`,
    solution: `for i in range(1, 6):
    print("יוסי סיבוב", i)`,
    expectedOutput: `יוסי סיבוב 1
יוסי סיבוב 2
יוסי סיבוב 3
יוסי סיבוב 4
יוסי סיבוב 5`
  },

  {
    id: "while_guess",
    group: "basics",
    topic: "לולאת while",
    title: "ניחוש מספר (בלי input)",
    subtitle: "while עד שמצליחים",
    explain: "while רצה כל עוד תנאי נכון. כאן נדמה משחק ניחוש בלי input כדי שנוכל לבדוק פלט.",
    task: "יש secret=7 ויש guesses=[2,7]. הדפס כל ניחוש. כשהניחוש נכון – הדפס 'ניצחת!' ועצור.",
    hint: "עוברים על guesses עם אינדקס. כל עוד guess != secret ממשיכים.",
    starter: `secret = 7
guesses = [2, 7]

# כתבו כאן:
`,
    solution: `secret = 7
guesses = [2, 7]

i = 0
guess = guesses[i]

while guess != secret:
    print("ניחוש:", guess)
    i = i + 1
    guess = guesses[i]

print("ניחוש:", guess)
print("ניצחת!")`,
    expectedOutput: `ניחוש: 2
ניחוש: 7
ניצחת!`
  },

  {
    id: "if_divide_by_zero",
    group: "basics",
    topic: "תנאים",
    title: "אסור לחלק באפס",
    subtitle: "if / else",
    explain: "תנאי מאפשר למחשב לבחור מה לעשות. אם משהו נכון – פעולה אחת, אחרת – פעולה אחרת.",
    task: "יש num2 = 0. אם num2 שווה 0 הדפס 'אי אפשר לחלק באפס' אחרת הדפס 'אפשר לחלק'.",
    hint: "if num2 == 0:",
    starter: `num2 = 0

# כתבו תנאי כאן:
`,
    solution: `num2 = 0

if num2 == 0:
    print("אי אפשר לחלק באפס")
else:
    print("אפשר לחלק")`,
    expectedOutput: "אי אפשר לחלק באפס"
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
    expectedOutput: "שלום יוסי"
  },

  // ===== “פרויקטים” (תרגול ארוך יותר) =====
  {
    id: "project_calculator_demo",
    group: "projects",
    topic: "מחשבון",
    title: "מחשבון קטן (דמו בלי input)",
    subtitle: "חישוב + הדפסת תרגיל",
    explain: "בגלל שבדפדפן input פחות נוח לבדיקה אוטומטית, נעשה דמו עם ערכים מוכנים מראש.",
    task: "יש a=5, op='+', b=10. אם op הוא '+' הדפס: '5+10 = 15'.",
    hint: "result = a + b ואז print עם f-string",
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
    expectedOutput: "5+10 = 15"
  }
];
