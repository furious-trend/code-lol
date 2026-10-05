import { Project, SyntaxKind, ObjectLiteralExpression } from "ts-morph";

const project = new Project();
project.addSourceFilesAtPaths("lib/lessons/*.ts");

function validateExplanation(topic: string, text: string) {
  const wordCount = text.split(/\s+/).length;
  if (wordCount < 10) {
    console.error(`❌ [FAIL] ${topic}: Too short (${wordCount} words). Minimum is 10.`);
    return false;
  }
  if (wordCount > 20) {
    console.error(`❌ [FAIL] ${topic}: Too long (${wordCount} words). Maximum is 20.`);
    return false;
  }
  
  // Basic heuristic: check if it has a hyphen or dash, which usually indicates the "punchline twist" structure
  if (!text.includes('-') && !text.includes('—') && !text.includes('!')) {
    console.warn(`⚠️  [WARN] ${topic}: Might lack a punchline twist (no dash or exclamation mark).`);
  }

  console.log(`✅ [PASS] ${topic} (${wordCount} words)`);
  return true;
}

async function run() {
  const sourceFiles = project.getSourceFiles();
  let totalValid = 0;
  let totalInvalid = 0;

  for (const sourceFile of sourceFiles) {
    if (sourceFile.getBaseName() === 'index.ts' || sourceFile.getBaseName() === 'types.ts') {
      continue;
    }
    console.log(`\n=== Checking ${sourceFile.getBaseName()} ===`);

    const varDecls = sourceFile.getVariableDeclarations();

    for (const varDecl of varDecls) {
      const initializer = varDecl.getInitializerIfKind(SyntaxKind.ArrayLiteralExpression);

      if (initializer) {
        const elements = initializer.getElements();

        for (const element of elements) {
          if (element.getKind() === SyntaxKind.ObjectLiteralExpression) {
            const obj = element as ObjectLiteralExpression;
            const titleProp = obj.getProperty("title")?.asKind(SyntaxKind.PropertyAssignment);
            const funnyExplanationProp = obj.getProperty("funnyExplanation")?.asKind(SyntaxKind.PropertyAssignment);

            if (titleProp && funnyExplanationProp) {
              const title = titleProp.getInitializer()?.getText().replace(/^['"`]|['"`]$/g, '') || "";
              const currentExplanation = funnyExplanationProp.getInitializer()?.getText().replace(/^['"`]|['"`]$/g, '') || "";

              const isValid = validateExplanation(title, currentExplanation);
              if (isValid) {
                totalValid++;
              } else {
                totalInvalid++;
              }
            }
          }
        }
      }
    }
  }

  console.log(`\n=== Summary ===`);
  console.log(`✅ Passed: ${totalValid}`);
  console.log(`❌ Failed: ${totalInvalid}`);
  
  if (totalInvalid > 0) {
    process.exit(1);
  }
}

run().catch(console.error);
