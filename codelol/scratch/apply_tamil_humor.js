const { Project, SyntaxKind } = require('ts-morph');
const fs = require('fs');
const path = require('path');

const project = new Project();

const jokes = {
  'Variables': {
    whatIsIt: 'Value that can change.',
    dailyLifeAnalogy: 'Ice-cream dabba with leftover puli kuzhambu inside—value eppo venaalum swap aagum.',
  },
  'Constants vs Variables': {
    whatIsIt: 'Locked forever value.',
    dailyLifeAnalogy: 'Appa-oda TV remote—touch panna TypeError adi vizhum!',
  },
  'Functions': {
    whatIsIt: 'Reusable task machine.',
    dailyLifeAnalogy: 'Madurai tea master: Milk & sugar in, hot tea return.',
  },
  'Arrays': {
    whatIsIt: 'Ordered list of items.',
    dailyLifeAnalogy: 'Ration kadai queue—first person index 0!',
  },
  'Objects': {
    whatIsIt: 'Key-value data packet.',
    dailyLifeAnalogy: 'Contractor biodata: { name: "Nesamani", weakness: "Spanner" }.',
  },
  'For Loops': { 
    whatIsIt: 'Code repeating until told to stop.',
    dailyLifeAnalogy: 'Kaipulla in Winner: "Naanum evvalo dhaan adivaanguradhu..." without a break.',
  },
  'While Loops': {
    whatIsIt: 'Code repeating until told to stop.',
    dailyLifeAnalogy: 'Kaipulla in Winner: "Naanum evvalo dhaan adivaanguradhu..." without a break.',
  },
  'Basic Debugging': {
    whatIsIt: 'Broken code crash.',
    dailyLifeAnalogy: 'Vadivelu dialogue: "Build-up bayangarama irukku... aana output varala!"',
  },
  'Closures': {
    whatIsIt: 'Inner function remembering outer memory.',
    dailyLifeAnalogy: 'Site vela mudinjalum Nesamani mandaila spanner vali apdiye retain aagum.',
  },
  'Promises': { 
    whatIsIt: 'Token for future result.',
    dailyLifeAnalogy: 'Parotta kadai token: Parcel vandhaa resolve, salna gaali-na reject!',
  },
  'Try/Catch': { 
    whatIsIt: 'Error safety net.',
    dailyLifeAnalogy: 'Night kitchen-la paathiram vizhundha udane, "Amma sleep-walking panren" nu cover panradhu.',
  },
};

const updateFile = (filePath) => {
  if (!fs.existsSync(filePath)) return;
  const sourceFile = project.addSourceFileAtPath(filePath);
  
  const varDecls = sourceFile.getVariableDeclarations();
  for (const varDecl of varDecls) {
    const arrayExpr = varDecl.getInitializerIfKind(SyntaxKind.ArrayLiteralExpression);
    if (!arrayExpr) continue;
    
    const lessons = arrayExpr.getElements();
    for (const element of lessons) {
      if (element.getKind() !== SyntaxKind.ObjectLiteralExpression) continue;
      
      const titleProp = element.getProperty('title');
      if (!titleProp) continue;
      
      const title = titleProp.getInitializer().getText().replace(/['"]/g, '');
      
      let match = jokes[title];
      if (!match) {
        for (const [key, joke] of Object.entries(jokes)) {
          if (title.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(title.toLowerCase())) {
            match = joke;
            break;
          }
        }
      }
      
      if (match) {
        const humorProp = element.getProperty('humor');
        if (humorProp) humorProp.remove();
        
        element.addPropertyAssignment({
          name: 'humor',
          initializer: `{ general: { analogy: "", punchline: "" }, tamil: { cinemaHook: "", dailyLifeAnalogy: ${JSON.stringify(match.dailyLifeAnalogy)}, deepTechBreakdown: "", buggyCodeRoast: "", successCelebration: "" } }`
        });

        const deepConceptProp = element.getProperty('deepConcept');
        if (deepConceptProp) deepConceptProp.remove();
        
        element.addPropertyAssignment({
          name: 'deepConcept',
          initializer: `{ whatIsIt: ${JSON.stringify(match.whatIsIt)}, underTheHood: "", gotchasAndBugs: "" }`
        });
        console.log(`Updated ${title} in ${path.basename(filePath)}`);
      }
    }
  }
  sourceFile.saveSync();
};

updateFile('/home/shafi/projects/code lol/codelol/lib/lessons/beginner.ts');
updateFile('/home/shafi/projects/code lol/codelol/lib/lessons/intermediate.ts');
updateFile('/home/shafi/projects/code lol/codelol/lib/lessons/beginner-python.ts');
updateFile('/home/shafi/projects/code lol/codelol/lib/lessons/intermediate-python.ts');
