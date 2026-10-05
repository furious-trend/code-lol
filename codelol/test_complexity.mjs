const CODES = [
  {
    lang: 'javascript',
    code: `
function nestedLoops() {
  let arr = [];
  for(let i=0; i<10; i++) {
    for(let j=0; j<10; j++) {
      console.log(i, j);
    }
  }
}
`
  },
  {
    lang: 'python',
    code: `
def nested_loops():
  arr = []
  for i in range(10):
    for j in range(10):
      print(i, j)
`
  },
  {
    lang: 'cpp',
    code: `
void nestedLoops() {
  for(int i=0; i<10; i++) {
    for(int j=0; j<10; j++) {
      cout << i << j << endl;
    }
  }
}
`
  }
];

async function run() {
  for (const c of CODES) {
    const res = await fetch('http://localhost:3000/api/analyze-complexity', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: c.code, language: c.lang })
    });
    const data = await res.json();
    console.log(`Lang: ${c.lang} => Time: ${data.timeComplexity}, Space: ${data.spaceComplexity}`);
  }
}

run();
