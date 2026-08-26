const tests = [
  {
    name: "Test 2: Gibberish text",
    payload: { code: "akjsdhflakjshfdlkjahsdf kjhaskjdhf kjasdhf", output: "SyntaxError: Unexpected identifier", isSuccess: false }
  },
  {
    name: "Test 3: Stacked syntax errors",
    payload: { code: "def func() { if } == { return ( ] ; }", output: "SyntaxError: Unexpected token", isSuccess: false }
  }
];

async function runTests() {
  for (const test of tests) {
    console.log(`\n${test.name}`);
    try {
      const response = await fetch("http://localhost:3000/api/roast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(test.payload)
      });
      const data = await response.json();
      console.log(`ROAST: ${data.roast}`);
    } catch (e) {
      console.error(`ERROR: ${e.message}`);
    }
  }
}

runTests();
