import os

file_path = "/home/shafi/projects/code lol/codelol/app/api/roast/route.ts"
with open(file_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

new_lines = lines[:19] # Keep up to line 19 (index 18)
new_lines.append("    // Always use fallback roasts as requested by the user\n")
new_lines.append("    return NextResponse.json(getRandomFallback(isSuccess, humorPref));\n")
new_lines.append("  } catch (error) {\n")
new_lines.append("    console.error('Error roasting code:', error);\n")
new_lines.append("    const fallback = {\n")
new_lines.append("      roast: \"Something went completely wrong, but honestly your code probably did too.\",\n")
new_lines.append("      fix: \"\",\n")
new_lines.append("      mood: \"dead\",\n")
new_lines.append("      gifKeyword: \"explosion\"\n")
new_lines.append("    };\n")
new_lines.append("    return NextResponse.json(fallback);\n")
new_lines.append("  }\n")
new_lines.append("}\n")

with open(file_path, "w", encoding="utf-8") as f:
    f.writelines(new_lines)
print("Updated route.ts to only use local jokes")
