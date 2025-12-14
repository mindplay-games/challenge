function runUserCode(code){
  const logs = [];
  const originalLog = console.log;

  console.log = (...args) => {
    logs.push(args.join(" "));
  };

  try {
    // מריצים קוד בתוך Function כדי לבודד scope
    new Function(code)();
    return { ok: true, output: logs.join("\n") };
  } catch (e) {
    return { ok: false, output: "שגיאה: " + e.message };
  } finally {
    console.log = originalLog;
  }
}

function normalize(s){
  return (s ?? "").toString().trim().replace(/\r\n/g, "\n");
}

function checkExpected(userOutput, expectedOutput){
  if (expectedOutput == null) return { canCheck:false, passed:false };
  return {
    canCheck: true,
    passed: normalize(userOutput) === normalize(expectedOutput)
  };
}
