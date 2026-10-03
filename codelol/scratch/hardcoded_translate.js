const { Project, SyntaxKind } = require('ts-morph');

const translations = {
  "College canteen bench-la varisaiya ukkandhirukura gang: 0th index-la topper, last index-la sleeper!": {
    meaningGeneral: "An ordered list holding multiple items under a single variable name.",
    funnyEgGeneral: "Like students sitting in a row at the cafeteria: the 0th index is the valedictorian, the last index is the class clown!"
  },
  "College ID card: { name: \"Mano\", dept: \"Mech\", arrears: 5, status: \"Vera Maari\" }.": {
    meaningGeneral: "Data stored as labeled Key-Value pairs describing one single entity.",
    funnyEgGeneral: "Student ID card: { name: \"John\", major: \"Engineering\", missed_classes: 5, status: \"Legend\" }."
  },
  "PET master: \"Ground-ah exact-ah 5 round adichitu vaa da\" nu whistle adikira punishment.": {
    meaningGeneral: "Code that repeats an exact, pre-determined number of times.",
    funnyEgGeneral: "Gym teacher blowing the whistle: \"Run exactly 5 laps around the field!\""
  },
  "Amma plate-la saapaadu vechukitte irupaanga, \"Vayiru full aayiduchu\" nu neenga kaiya vechu thadukura varaikkum!": {
    meaningGeneral: "Code that keeps repeating continuously until a specific condition stops it.",
    funnyEgGeneral: "Grandma serving food on your plate endlessly, until you physically block it saying \"I'm full!\""
  },
  "if (bus vandhuchu) college-ku po; else return room-ku poi bedsheet eduthu thoongu!": {
    meaningGeneral: "Branching decisions: do one action if a condition is true, otherwise do something else.",
    funnyEgGeneral: "if (bus arrives) go to college; else return to room and go back to sleep!"
  },
  "Hostel kettle: Thanni oothu, Maggi podu, 2 minutes-la saapadu ready. Whenever hungry, just call makeMaggi().": {
    meaningGeneral: "A reusable mini-machine that takes inputs, does work, and returns an answer whenever called.",
    funnyEgGeneral: "Dorm room microwave: Add water, add noodles, ready in 2 mins. Whenever hungry, just call makeNoodles()."
  },
  "Canteen master bill potutu extra ₹10 add panra andha calculator keys maari.": {
    meaningGeneral: "Symbols that perform calculations or comparisons (+, -, *, &&, ===).",
    funnyEgGeneral: "The calculator keys a cashier uses to sneakily add a $2 tip to your bill."
  },
  "Auto pinnadi ezhudhurukura evergreen dialogues: \"Thaai Paasam\", \"Kandupidi En Manadhai\".": {
    meaningGeneral: "Wrapping letters and sentences safely inside quotes (\" \" or ' ').",
    funnyEgGeneral: "Bumper stickers on the back of a truck: \"Mom's Gift\", \"Catch Me If You Can\"."
  },
  "Crowded bus footboard: Pinnediyirundhu yeruradhu push, conductor thitti kadasila erakkividuradhu pop!": {
    meaningGeneral: "push adds an item to the end; pop kicks the last item out.",
    funnyEgGeneral: "Crowded train: pushing your way in is 'push', the conductor kicking you out at the last stop is 'pop'!"
  },
  "Biryani packet-la chicken piece-ah mattum thaedi edukradhu slice; parotta-va kothu parotta panna pichi podradhu split.": {
    meaningGeneral: "slice copies a portion; split breaks a string into an array.",
    funnyEgGeneral: "slice is like picking only the pepperoni off a pizza; split is like cutting the pizza into individual slices."
  },
  "Bike otta kathukura munnadi, main stand poda theriyudhaanu check panra test!": {
    meaningGeneral: "Validating conditions before executing a block of code.",
    funnyEgGeneral: "Testing if you know how to put the kickstand down before letting you ride the motorcycle!"
  },
  "Signal illadha T-Nagar junction-la police kitta maattama bike-ah correct route-la thiruppura trial.": {
    meaningGeneral: "Making complex branching decisions using multiple conditions.",
    funnyEgGeneral: "Trying to navigate a 4-way intersection with broken traffic lights without getting pulled over."
  },
  "Room cupboard-la kotti kedakura thuni-kulla thevaana formal shirt-ah mattum uruvi eduka kathukura skill!": {
    meaningGeneral: "Searching and retrieving specific elements from an array or object.",
    funnyEgGeneral: "The skill of pulling out the exact dress shirt you need from a completely messy closet!"
  },
  "Orey formula vechu class-la irukra 60 perukum observation calculations pottu thara setup!": {
    meaningGeneral: "Using a function to perform the same operation on multiple data points.",
    funnyEgGeneral: "Using one formula in Excel to calculate the grades for all 60 students in the class!"
  },
  "Midnight hostel room-la light-ah off pannitu orey oru kosu-va thedi adichi thoongura operation!": {
    meaningGeneral: "Debugging a specific issue in a large block of code.",
    funnyEgGeneral: "Turning the lights off in your dorm room and hunting down that one single mosquito so you can sleep!"
  },
  "Climax action scene-la hero ellathayum thooki potu midhichu single shot-la movie-ah mudikkira Padayappa moment!": {
    meaningGeneral: "Using advanced array methods (like map, filter, reduce) to process data in one line.",
    funnyEgGeneral: "The climax action scene where the hero takes out everyone in a single, continuous camera shot!"
  }
};

async function processFile(filePath) {
  const project = new Project();
  const sourceFile = project.addSourceFileAtPath(filePath);
  
  const arrayDecl = sourceFile.getVariableDeclaration('beginnerLessons') || sourceFile.getVariableDeclaration('pythonBeginnerLessons') || sourceFile.getVariableDeclaration('pythonLessons');
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
  await processFile('/home/shafi/projects/code lol/codelol/lib/lessons/beginner.ts');
  await processFile('/home/shafi/projects/code lol/codelol/lib/lessons/beginner-python.ts');
}

main().catch(console.error);
