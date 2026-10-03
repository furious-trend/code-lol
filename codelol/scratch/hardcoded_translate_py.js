const { Project, SyntaxKind } = require('ts-morph');

const translations = {
  "Data types are like the cast in a Hari movie—you've got the hero (string), the comedian (boolean), and a hundred side actors (numbers) doing their own thing.": {
    meaningGeneral: "Different categories of data like numbers, strings, and booleans that the computer handles differently.",
    funnyEgGeneral: "Data types are like the cast in an action movie—you've got the hero (string), the comic relief (boolean), and a hundred side characters (numbers) doing their own thing."
  },
  "Ration kadai queue—first person index 0!": {
    meaningGeneral: "An ordered collection of items, starting at index 0.",
    funnyEgGeneral: "A deli line—the first person is index 0!"
  },
  "Contractor biodata: { name: \"Nesamani\", weakness: \"Spanner\" }.": {
    meaningGeneral: "A collection of key-value pairs (like a dictionary).",
    funnyEgGeneral: "Employee profile: { name: \"John\", weakness: \"Mondays\" }."
  },
  "Kaipulla in Winner: \"Naanum evvalo dhaan adivaanguradhu...\" without a break.": {
    meaningGeneral: "A loop that repeats continuously until a condition is met.",
    funnyEgGeneral: "Like a cartoon character getting hit on the head repeatedly without a break."
  },
  "Conditionals are like dealing with a strict dad: 'If (marks > 90) get a bike, Else get an umbrella for walking'.": {
    meaningGeneral: "Executing different code blocks based on conditions.",
    funnyEgGeneral: "Conditionals are like dealing with strict parents: 'If (grades > 90) get a car, Else get a bus pass'."
  },
  "Madurai tea master: Milk & sugar in, hot tea return.": {
    meaningGeneral: "A reusable block of code that takes inputs and returns an output.",
    funnyEgGeneral: "Barista: Espresso and milk in, hot latte return."
  },
  "Operators are like the fight scene gravity in Boyapati movies—they push, pull, and multiply things in ways that defy logic.": {
    meaningGeneral: "Symbols that perform operations on variables and values.",
    funnyEgGeneral: "Operators are like physics in action movies—they push, pull, and multiply things in ways that defy logic."
  },
  "Strings are like Dhanush singing 'Why This Kolaveri Di'—you just keep adding words together until it becomes a massive hit.": {
    meaningGeneral: "Text data that can be concatenated and manipulated.",
    funnyEgGeneral: "Strings are like a pop song chorus—you just keep adding words together until it becomes a massive hit."
  },
  "Comments are like the director's cut explanations—nobody reads them during the movie, but without them, you have no idea what's happening.": {
    meaningGeneral: "Text in code intended for humans, ignored by the computer.",
    funnyEgGeneral: "Comments are like the director's commentary track—nobody listens to them during the movie, but without them, you have no idea why things happened."
  },
  "Type conversion is like Kamal Haasan's Dasavatharam—suddenly a number dresses up as a string and you're just confused about who is who.": {
    meaningGeneral: "Converting data from one type to another.",
    funnyEgGeneral: "Type conversion is like an actor in a spy movie—suddenly a number dresses up as a string and you're confused about who is who."
  },
  "Input/Output is like a press meet—you throw a question (input) and get a pre-planned political answer (output) on the console.": {
    meaningGeneral: "Taking data in from the user and printing results back out.",
    funnyEgGeneral: "Input/Output is like a press conference—you throw a question (input) and get a pre-planned political answer (output) on the screen."
  },
  "Variable scope is like local rowdy vs international don—a local 'let' has no power outside its own street (block).": {
    meaningGeneral: "The context in which a variable is accessible.",
    funnyEgGeneral: "Variable scope is like a local gang vs an international syndicate—a local variable has no power outside its own neighborhood."
  },
  "Appa-oda TV remote—touch panna TypeError adi vizhum!": {
    meaningGeneral: "Values that cannot be changed after creation (like tuples).",
    funnyEgGeneral: "Dad's TV remote—if you touch it, you'll get a TypeError slap!"
  },
  "Division is like sharing biryani with friends—someone always takes the 'leg piece' (remainder) and you use modulo to find who took it.": {
    meaningGeneral: "Mathematical division and finding the remainder.",
    funnyEgGeneral: "Division is like sharing pizza with friends—someone always takes the last slice (remainder) and you use modulo to find out how many are left."
  },
  "Ternary operator is like a quick punch dialogue—short, sharp, and hits you with either 'Success' or 'Failure' in one line.": {
    meaningGeneral: "A shorthand one-line if-else statement.",
    funnyEgGeneral: "A ternary operator is like a quick action movie one-liner—short, sharp, and hits you with either 'Success' or 'Failure' instantly."
  },
  "Template literals are like a Harris Jayaraj song—you just plug in some random English words \\`\\${here}\\` and it sounds beautiful.": {
    meaningGeneral: "String formatting with embedded expressions.",
    funnyEgGeneral: "Template literals are like a mad libs game—you just plug in some random words \\`\\${here}\\` and it makes a sentence."
  },
  "Null is like saying 'I have no money', None is like opening your waland finding a moth flying out.": {
    meaningGeneral: "Representing the intentional absence of any value.",
    funnyEgGeneral: "Null is like saying 'I have no cash', None is like opening your wallet and finding a moth flying out."
  },
  "Truthy values are like a 'mass' hero entry—everyone believes it. Falsy values are like the villain's henchmen—completely useless.": {
    meaningGeneral: "Values that evaluate to true or false in a boolean context.",
    funnyEgGeneral: "Truthy values are like the hero's entrance—everyone believes it. Falsy values are like the villain's henchmen—completely useless."
  },
  "Vadivelu dialogue: \"Build-up bayangarama irukku... aana output varala!\"": {
    meaningGeneral: "Debugging code when it runs but produces no results.",
    funnyEgGeneral: "When you hype up your code so much... but the output is completely blank!"
  },
  "Switch statements are like going to a Saravana Bhavan—you have 10 cases (idli, dosa, pongal) and a default (just coffee).": {
    meaningGeneral: "A control structure for selecting one of many code blocks to execute.",
    funnyEgGeneral: "Switch statements are like going to a diner—you have 10 cases (burger, fries, shake) and a default (just water)."
  },
  "Nested loops are like a Tamil serial plot—loops inside loops inside loops, and it runs for 5 years.": {
    meaningGeneral: "A loop inside another loop.",
    funnyEgGeneral: "Nested loops are like a soap opera plot—loops inside loops inside loops, and it runs for 5 years."
  },
  "Push/Pop is like boarding a crowded Chennai local train—someone gets pushed in at the back, and someone else pops out at the next station.": {
    meaningGeneral: "Adding and removing items from the end of an array.",
    funnyEgGeneral: "Push/Pop is like boarding a crowded subway train—someone gets pushed in at the back, and someone else pops out at the next stop."
  },
  "String slice/split methods are like autocorrecting a text message—you think you're fixing it, but now it's worse": {
    meaningGeneral: "Extracting parts of a string or breaking it into a list.",
    funnyEgGeneral: "String slice/split methods are like autocorrecting a text message—you think you're slicing out the bad part, but now it's worse."
  },
  "Coding is like climbing the Palani steps—you start with energy, but halfway through you're wondering why you started.": {
    meaningGeneral: "The perseverance required to write and debug code.",
    funnyEgGeneral: "Coding is like climbing a mountain—you start with energy, but halfway through you're wondering why you even started."
  },
  "Workout logic is like a Surya training montage—lots of sweat, background music, and eventually you get the six-pack (solution).": {
    meaningGeneral: "Applying problem-solving logic to code.",
    funnyEgGeneral: "Coding logic is like a sports training montage—lots of sweat, background music, and eventually you get the trophy (solution)."
  },
  "Mastering data is like packing for a trip to native—you try to fit a grinder, 3 sarees, and a TV into one array.": {
    meaningGeneral: "Handling complex data structures.",
    funnyEgGeneral: "Mastering data is like packing for a family trip—you try to fit a blender, 3 suitcases, and a TV into one array."
  },
  "Function architect is like being a director—you call the shots, pass the script (parameters), and hope the actors don't throw an error.": {
    meaningGeneral: "Designing and structuring functions.",
    funnyEgGeneral: "Function architect is like being a movie director—you call the shots, pass the script (parameters), and hope the actors don't throw an error."
  },
  "Bug hunter is like being a CID—you investigate the missing semicolon while the rest of the code plays dead.": {
    meaningGeneral: "Debugging and finding errors in code.",
    funnyEgGeneral: "Bug hunter is like being a detective—you investigate the missing semicolon while the rest of the code plays dead."
  },
  "Final workout is the climax fight scene—you vs the compiler, flying cars, exploding objects, and only one will survive.": {
    meaningGeneral: "Completing a complex coding challenge.",
    funnyEgGeneral: "Final workout is the climax fight scene—you vs the compiler, flying cars, exploding objects, and only one will survive."
  }
};

async function processFile(filePath) {
  const project = new Project();
  const sourceFile = project.addSourceFileAtPath(filePath);
  
  const arrayDecl = sourceFile.getVariableDeclaration('pythonBeginnerLessons');
  if (!arrayDecl) { console.log('not found in', filePath); return; }
  
  const arrayExpr = arrayDecl.getInitializerIfKind(SyntaxKind.ArrayLiteralExpression) 
                    || arrayDecl.getInitializerIfKindOrThrow(SyntaxKind.AsExpression).getExpressionIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);
  
  const lessons = arrayExpr.getElements();
  
  for (const element of lessons) {
    if (element.getKind() !== SyntaxKind.ObjectLiteralExpression) continue;
    
    const obj = element;
    const biteSizedProp = obj.getProperty('biteSized');
    
    if (biteSizedProp && biteSizedProp.getKind() === SyntaxKind.PropertyAssignment) {
      const biteSizedObj = biteSizedProp.getInitializerIfKind(SyntaxKind.ObjectLiteralExpression);
      if (biteSizedObj) {
        const meaningProp = biteSizedObj.getProperty('meaning');
        const funnyEgTamilProp = biteSizedObj.getProperty('funnyEgTamil');
        const meaningGeneralProp = biteSizedObj.getProperty('meaningGeneral');
        const funnyEgGeneralProp = biteSizedObj.getProperty('funnyEgGeneral');
        
        if (meaningProp && funnyEgTamilProp && (!meaningGeneralProp || !funnyEgGeneralProp)) {
          const funnyEgTamilText = funnyEgTamilProp.getInitializer().getText().replace(/^["']|["']$/g, '');
          
          const match = translations[funnyEgTamilText];
          if (match) {
            console.log(`Applying translations for: ${funnyEgTamilText.substring(0, 30)}...`);
            if (!meaningGeneralProp) {
              biteSizedObj.addPropertyAssignment({
                name: 'meaningGeneral',
                initializer: JSON.stringify(match.meaningGeneral)
              });
            }
            if (!funnyEgGeneralProp) {
              biteSizedObj.addPropertyAssignment({
                name: 'funnyEgGeneral',
                initializer: JSON.stringify(match.funnyEgGeneral)
              });
            }
          } else {
             console.log(`NO MATCH FOUND FOR: ${funnyEgTamilText}`);
          }
        }
      }
    }
  }
  
  await sourceFile.save();
  console.log(`Finished processing ${filePath}`);
}

async function main() {
  await processFile('/home/shafi/projects/code lol/codelol/lib/lessons/beginner-python.ts');
}

main().catch(console.error);
