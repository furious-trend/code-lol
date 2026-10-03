const { Project, SyntaxKind } = require('ts-morph');
const fs = require('fs');
const path = require('path');

const project = new Project();

const files = [
  'beginner.ts', 'intermediate.ts', 'expert.ts', 'interview.ts',
  'beginner-python.ts', 'intermediate-python.ts', 'expert-python.ts', 'interview-python.ts'
];

const processFile = (fileName) => {
  const filePath = path.join('/home/shafi/projects/code lol/codelol/lib/lessons', fileName);
  if (!fs.existsSync(filePath)) return;
  
  const sourceFile = project.addSourceFileAtPath(filePath);
  
  const varDecls = sourceFile.getVariableDeclarations();
  for (const varDecl of varDecls) {
    const arrayExpr = varDecl.getInitializerIfKind(SyntaxKind.ArrayLiteralExpression);
    if (!arrayExpr) continue;
    
    const lessons = arrayExpr.getElements();
    for (const element of lessons) {
      if (element.getKind() !== SyntaxKind.ObjectLiteralExpression) continue;
      
      let meaning = '';
      let funnyEgTamil = '';
      
      const deepConceptProp = element.getProperty('deepConcept');
      if (deepConceptProp && deepConceptProp.getInitializer) {
        const init = deepConceptProp.getInitializerIfKind(SyntaxKind.ObjectLiteralExpression);
        if (init) {
          const whatIsIt = init.getProperty('whatIsIt');
          if (whatIsIt) meaning = whatIsIt.getInitializer().getText().replace(/^["']|["']$/g, '');
        }
      }
      
      const humorProp = element.getProperty('humor');
      if (humorProp && humorProp.getInitializer) {
        const init = humorProp.getInitializerIfKind(SyntaxKind.ObjectLiteralExpression);
        if (init) {
          const tamil = init.getProperty('tamil');
          if (tamil) {
            const tamilInit = tamil.getInitializerIfKind(SyntaxKind.ObjectLiteralExpression);
            if (tamilInit) {
              const daily = tamilInit.getProperty('dailyLifeAnalogy');
              if (daily) funnyEgTamil = daily.getInitializer().getText().replace(/^["']|["']$/g, '');
            }
          }
        }
      }
      
      const funnyExplanationTamilProp = element.getProperty('funnyExplanationTamil');
      if (funnyExplanationTamilProp && funnyExplanationTamilProp.getInitializer && !funnyEgTamil) {
        funnyEgTamil = funnyExplanationTamilProp.getInitializer().getText().replace(/^["']|["']$/g, '');
      }
      
      const funnyExplanationGeneralProp = element.getProperty('funnyExplanationGeneral');
      if (funnyExplanationGeneralProp && funnyExplanationGeneralProp.getInitializer && !meaning) {
        // Fallback meaning
        meaning = "A fundamental concept.";
      }
      
      // Cleanup old props
      ['funnyExplanationTamil', 'funnyExplanationGeneral', 'deepConcept', 'humor'].forEach(propName => {
        const prop = element.getProperty(propName);
        if (prop) prop.remove();
      });
      
      // Add biteSized
      element.addPropertyAssignment({
        name: 'biteSized',
        initializer: `{
          meaning: ${JSON.stringify(meaning || "Basic concept")},
          funnyEgTamil: ${JSON.stringify(funnyEgTamil || "Insert Tanglish joke here")}
        }`
      });
    }
  }
  
  sourceFile.saveSync();
  console.log(`Migrated ${fileName}`);
};

files.forEach(processFile);
