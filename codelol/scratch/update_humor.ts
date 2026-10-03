import { Project, SyntaxKind } from 'ts-morph';

const updates: Record<string, { meaning: string; funnyEgTamil: string }> = {
  "Data Types": {
    meaning: "The specific category of data (Number, Text, True/False) so the computer knows how to handle it.",
    funnyEgTamil: "Ration shop-la rice, kerosene, and sugar-ah orey dabba-la pottu mix panna koodaadhu la? Adhey dhaan!"
  },
  "Comments": {
    meaning: "Secret notes inside code for human eyes only; the computer completely ignores them.",
    funnyEgTamil: "Question paper munnadi teacher paakaama friend-kku bit la ezhudhi pass panra dialogue maari."
  },
  "Input/Output Basics": {
    meaning: "Input is data given to the computer; Output is the final result it prints back.",
    funnyEgTamil: "Sugar cane juice machine-la karumbu thalluradhu Input, glass-la chilled juice vara vekkuradhu Output."
  },
  "Workout: Basics Builder": {
    meaning: "Small exercises to verify you know how to store data and print it properly.",
    funnyEgTamil: "Bike otta kathukura munnadi, main stand poda theriyudhaanu check panra test!"
  },
  "For Loops": {
    meaning: "Code that repeats an exact, pre-determined number of times.",
    funnyEgTamil: 'PET master: "Ground-ah exact-ah 5 round adichitu vaa da" nu whistle adikira punishment.'
  },
  "While Loops": {
    meaning: "Code that keeps repeating continuously until a specific condition stops it.",
    funnyEgTamil: 'Amma plate-la saapaadu vechukitte irupaanga, "Vayiru full aayiduchu" nu neenga kaiya vechu thadukura varaikkum!'
  },
  "Conditionals (if/else)": {
    meaning: "Branching decisions: do one action if a condition is true, otherwise do something else.",
    funnyEgTamil: "if (bus vandhuchu) college-ku po; else return room-ku poi bedsheet eduthu thoongu!"
  },
  "Switch Statements": {
    meaning: "Cleanly picking one exact match out of a long list of choices.",
    funnyEgTamil: "Tea shop token system: 1 na Plain Tea, 2 na Samosa, 3 na Boost. Direct order, no confusion!"
  },
  "Workout: Logic & Flow": {
    meaning: "Combining loops and conditions to solve puzzles without getting trapped in infinite loops.",
    funnyEgTamil: "Signal illadha T-Nagar junction-la police kitta maattama bike-ah correct route-la thiruppura trial."
  },
  "Arrays": {
    meaning: "An ordered list holding multiple items under a single variable name.",
    funnyEgTamil: "College canteen bench-la varisaiya ukkandhirukura gang: 0th index-la topper, last index-la sleeper!"
  },
  "Objects": {
    meaning: "Data stored as labeled Key-Value pairs describing one single entity.",
    funnyEgTamil: 'College ID card: { name: "Mano", dept: "Mech", arrears: 5, status: "Vera Maari" }.'
  },
  "Array Push/Pop Methods": {
    meaning: "push adds an item to the end; pop kicks the last item out.",
    funnyEgTamil: "Crowded bus footboard: Pinnediyirundhu yeruradhu push, conductor thitti kadasila erakkividuradhu pop!"
  },
  "String Slice/Split Methods": {
    meaning: "slice cuts out a specific portion; split chops text into a list using a divider.",
    funnyEgTamil: "Biryani packet-la chicken piece-ah mattum thaedi edukradhu slice; parotta-va kothu parotta panna pichi podradhu split."
  },
  "Workout: Data Mastery": {
    meaning: "Practice slicing, filtering, and organizing collections of raw data.",
    funnyEgTamil: "Room cupboard-la kotti kedakura thuni-kulla thevaana formal shirt-ah mattum uruvi eduka kathukura skill!"
  },
  "Functions": {
    meaning: "A reusable mini-machine that takes inputs, does work, and returns an answer whenever called.",
    funnyEgTamil: "Hostel kettle: Thanni oothu, Maggi podu, 2 minutes-la saapadu ready. Whenever hungry, just call makeMaggi()."
  },
  "Variable Scope": {
    meaning: "Boundary rules defining where a variable exists and where it cannot be accessed.",
    funnyEgTamil: "Veetukulla amma thitturadhu 'Local Scope' (room kulla mattum kekkum); theruvula loud-speaker 'Global Scope'!"
  },
  "Constants vs Variables": {
    meaning: "const is locked forever; let can be reassigned whenever you want.",
    funnyEgTamil: "Date of Birth eppovume const (maatha mudiyaadhu); Bank balance eppovume let (innaiku ₹500, naalaiku ₹2)!"
  },
  "Workout: Function Architect": {
    meaning: "Structuring clean, reusable blocks of code that don't depend on outside mess.",
    funnyEgTamil: "Orey formula vechu class-la irukra 60 perukum observation calculations pottu thara setup!"
  },
  "Type Conversion": {
    meaning: "Forcing data to switch from one type to another (e.g., text \"5\" into actual number 5).",
    funnyEgTamil: 'Vadivelu comedy: "Naan collector illa, auto driver" nu makeup pottu vesham maarura maari!'
  },
  "Null vs Undefined": {
    meaning: "undefined means you forgot to assign a value; null means you intentionally marked it empty.",
    funnyEgTamil: "undefined = Pocket-la wallet vekkave marandhutaen; null = Wallet irukku, aana ulla kaasu illa nu unmaiya othukitaen!"
  },
  "Truthy/Falsy Values": {
    meaning: "Sneaky values that act as true or false when dumped inside an if statement.",
    funnyEgTamil: '"Naalaikku kaalaila 5 manikku kandippa padikka poren" nu solradhu Falsy value—pesumbodhu true maari irukkum, aana matter zero!'
  },
  "Basic Debugging": {
    meaning: "Finding where the code blew up, understanding error logs, and removing the bug.",
    funnyEgTamil: "Bike start aagala-na, plug-ah kazhatti oodhi paathu petrol tank-ah thatti paakura detective vela!"
  },
  "Workout: Bug Hunter": {
    meaning: "Deliberately reading broken stack traces and fixing errors until the build succeeds.",
    funnyEgTamil: "Midnight hostel room-la light-ah off pannitu orey oru kosu-va thedi adichi thoongura operation!"
  },
  "Operators": {
    meaning: "Symbols that perform calculations or comparisons (+, -, *, &&, ===).",
    funnyEgTamil: "Canteen master bill potutu extra ₹10 add panra andha calculator keys maari."
  },
  "String Basics": {
    meaning: "Wrapping letters and sentences safely inside quotes (\" \" or ' ').",
    funnyEgTamil: 'Auto pinnadi ezhudhurukura evergreen dialogues: "Thaai Paasam", "Kandupidi En Manadhai".'
  },
  "Basic Math Operations": {
    meaning: "Standard arithmetic: addition, subtraction, division, and modulo (% for remainder).",
    funnyEgTamil: "Bill split-up: Motha canteen bill ₹150; 3 friends divide pannaa aalukku ₹50, meedhi irukaadhu!"
  },
  "Ternary Operator": {
    meaning: "A compact, one-line shortcut for a basic if / else statement.",
    funnyEgTamil: 'attendance >= 75 ? "Exam Hall" : "HOD Room Condonation Fine".'
  },
  "Template Literals": {
    meaning: "Using backticks and ${} to cleanly drop variables directly inside sentences.",
    funnyEgTamil: 'Invitation template: "Dear ${crush_name}, un kooda tea kudikka ready-ah irukken!"'
  },
  "Nested Loops": {
    meaning: "Placing one loop inside another loop so it repeats completely on every single outer step.",
    funnyEgTamil: "Semester exam week: Monday to Friday outer loop; adhukulla daily 3 hours inner loop torture!"
  },
  "Final Workout: The Ultimate Trial": {
    meaning: "The boss level requiring you to combine every tool in the syllabus to build a project.",
    funnyEgTamil: "Climax action scene-la hero ellathayum thooki potu midhichu single shot-la movie-ah mudikkira Padayappa moment!"
  }
};

const project = new Project();
project.addSourceFilesAtPaths('lib/lessons/**/*.ts');
const sourceFile = project.getSourceFileOrThrow('lib/lessons/beginner.ts');

const arrayLiteral = sourceFile.getVariableDeclaration('beginnerLessons')?.getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);

if (arrayLiteral) {
  const elements = arrayLiteral.getElements();
  elements.forEach(element => {
    if (element.getKind() === SyntaxKind.ObjectLiteralExpression) {
      const obj = element.asKindOrThrow(SyntaxKind.ObjectLiteralExpression);
      const titleProp = obj.getProperty('title');
      if (titleProp && titleProp.getKind() === SyntaxKind.PropertyAssignment) {
        const titleAssignment = titleProp.asKindOrThrow(SyntaxKind.PropertyAssignment);
        const titleStr = titleAssignment.getInitializerIfKind(SyntaxKind.StringLiteral)?.getLiteralValue();
        
        if (titleStr && updates[titleStr]) {
          const biteSizedProp = obj.getProperty('biteSized');
          if (biteSizedProp && biteSizedProp.getKind() === SyntaxKind.PropertyAssignment) {
            const biteSizedObj = biteSizedProp.asKindOrThrow(SyntaxKind.PropertyAssignment).getInitializerIfKindOrThrow(SyntaxKind.ObjectLiteralExpression);
            
            const meaningProp = biteSizedObj.getProperty('meaning');
            if (meaningProp) {
              meaningProp.asKindOrThrow(SyntaxKind.PropertyAssignment).setInitializer(`"${updates[titleStr].meaning.replace(/"/g, '\\"')}"`);
            }
            
            const funnyEgProp = biteSizedObj.getProperty('funnyEgTamil');
            if (funnyEgProp) {
              funnyEgProp.asKindOrThrow(SyntaxKind.PropertyAssignment).setInitializer(`"${updates[titleStr].funnyEgTamil.replace(/"/g, '\\"')}"`);
            }
          }
        }
      }
    }
  });
}

sourceFile.saveSync();
console.log('Successfully updated beginner lessons.');
