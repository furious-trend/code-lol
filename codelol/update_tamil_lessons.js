const fs = require('fs');
const path = require('path');

const explanations = {
  1: "Variables are like a Rajini movie intro—oru thadava sonna nooru thadava sonna mathiri, unless you use 'let' to change it!",
  2: "Data types are like the cast in a Hari movie—you've got the hero (string), the comedian (boolean), and a hundred side actors (numbers) doing their own thing.",
  3: "Arrays are like the seats in a local bus—everyone is packed in order, and there's always that one guy taking up three indexes.",
  4: "Objects are like a typical Tamil mom's kitchen cabinet—everything is labeled, but only she knows what property holds the 'murukku'.",
  5: "For loops are like a Vijay movie dance step—repeat the same 'Dappankuthu' 100 times until the director says cut!",
  6: "While loops are like waiting for an Ajith movie update—you just keep looping and waiting until the condition (producer tweets) finally becomes true.",
  7: "Conditionals are like dealing with a strict dad: 'If (marks > 90) get a bike, Else get an umbrella for walking'.",
  8: "Functions are like calling Vadivelu for help—you pass in the problem, and he returns an epic disaster, but at least it's reusable!",
  9: "Operators are like the fight scene gravity in Boyapati movies—they push, pull, and multiply things in ways that defy logic.",
  10: "Strings are like Dhanush singing 'Why This Kolaveri Di'—you just keep adding words together until it becomes a massive hit.",
  11: "Comments are like the director's cut explanations—nobody reads them during the movie, but without them, you have no idea what's happening.",
  12: "Type conversion is like Kamal Haasan's Dasavatharam—suddenly a number dresses up as a string and you're just confused about who is who.",
  13: "Input/Output is like a press meet—you throw a question (input) and get a pre-planned political answer (output) on the console.",
  14: "Variable scope is like local rowdy vs international don—a local 'let' has no power outside its own street (block).",
  15: "Constants are like the villain's promise in a masala film—it never changes until the hero breaks it (which throws a TypeError).",
  16: "Division is like sharing biryani with friends—someone always takes the 'leg piece' (remainder) and you use modulo to find who took it.",
  17: "Ternary operator is like a quick punch dialogue—short, sharp, and hits you with either 'Success' or 'Failure' in one line.",
  18: "Template literals are like a Harris Jayaraj song—you just plug in some random English words \\`\\${here}\\` and it sounds beautiful.",
  19: "Null is like saying 'I have no money', undefined is like opening your wallet and finding a moth flying out.",
  20: "Truthy values are like a 'mass' hero entry—everyone believes it. Falsy values are like the villain's henchmen—completely useless.",
  21: "Debugging is like ACP Raghavan finding the killer in Vettaiyaadu Vilaiyaadu—you look at every console log until the culprit is caught.",
  22: "Switch statements are like going to a Saravana Bhavan—you have 10 cases (idli, dosa, pongal) and a default (just coffee).",
  23: "Nested loops are like a Tamil serial plot—loops inside loops inside loops, and it runs for 5 years.",
  24: "Push/Pop is like boarding a crowded Chennai local train—someone gets pushed in at the back, and someone else pops out at the next station.",
  25: "String slice/split methods are like autocorrecting a text message—you think you're fixing it, but now it's worse",
  101: "Coding is like climbing the Palani steps—you start with energy, but halfway through you're wondering why you started.",
  102: "Workout logic is like a Surya training montage—lots of sweat, background music, and eventually you get the six-pack (solution).",
  103: "Mastering data is like packing for a trip to native—you try to fit a grinder, 3 sarees, and a TV into one array.",
  104: "Function architect is like being a director—you call the shots, pass the script (parameters), and hope the actors don't throw an error.",
  105: "Bug hunter is like being a CID—you investigate the missing semicolon while the rest of the code plays dead.",
  106: "Final workout is the climax fight scene—you vs the compiler, flying cars, exploding objects, and only one will survive."
};

const filePath = path.join(__dirname, 'lib/lessons/beginner.ts');
let content = fs.readFileSync(filePath, 'utf8');

// The file has a structure where each lesson is an object with an 'id'.
// We can parse the file or do some regex. 
// Let's replace each 'funnyExplanationTamil: "..."' by finding the ID nearby.
// Actually, since we know the order, we can replace sequentially, but ID matching is safer.
for (const [id, expl] of Object.entries(explanations)) {
  const regex = new RegExp(`id:\\s*${id},[\\s\\S]*?funnyExplanationTamil:\\s*"([^"\\\\]|\\\\.)*"`, 'g');
  content = content.replace(regex, (match) => {
    const replacement = 'funnyExplanationTamil: "' + expl.replace(/"/g, '\\"') + '"';
    return match.replace(/funnyExplanationTamil:\s*"([^"\\]|\\.)*"/, replacement);
  });
}

fs.writeFileSync(filePath, content);
console.log('Updated beginner.ts with Tamil humor!');
