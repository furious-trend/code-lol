import re
import os

files = ["intermediate", "expert", "interview"]

for file in files:
    with open(f"codelol/lib/lessons/{file}.ts", "r") as f:
        content = f.read()
    
    # Simple regex replacements to make JS code look like Python
    
    # Let/const/var -> nothing
    content = re.sub(r"(let|const|var)\s+", "", content)
    
    # console.log -> print
    content = content.replace("console.log", "print")
    
    # functions -> def
    content = re.sub(r"function\s+(\w+)", r"def \1", content)
    
    # Math.max -> max
    content = content.replace("Math.max(...arr)", "max(arr)")
    content = content.replace("Math.max", "max")
    
    # new Map() -> {}
    content = content.replace("new Map()", "{}")
    
    # new Set() -> set()
    content = content.replace("new Set()", "set()")
    content = content.replace("new Set(", "set(")
    
    # .length -> len()
    content = re.sub(r"(\w+)\.length", r"len(\1)", content)
    
    # arrays pushing/shifting
    content = content.replace(".push", ".append")
    content = content.replace(".shift", ".pop(0)")
    
    # Object setting
    content = content.replace("map.set", "map.update")
    content = content.replace("map.get", "map.get")
    content = content.replace("m.set", "m.update")
    content = content.replace("m.has", "m.get")
    
    # new Keyword
    content = content.replace("new ", "")
    
    # true / false / null -> True / False / None
    content = content.replace(" true", " True")
    content = content.replace(" false", " False")
    content = content.replace(" null", " None")
    content = content.replace("=== null", "is None")
    content = content.replace("!== null", "is not None")
    content = content.replace("===", "==")
    content = content.replace("!==", "!=")
    
    # this. -> self.
    content = content.replace("this.", "self.")
    content = content.replace("constructor", "__init__")
    
    # JS Comments to Python Comments inside code examples
    # (Since these are in string literals, we can replace "//" with "#")
    content = content.replace("//", "#")
    
    # Export name change
    content = content.replace(f"export const {file}Lessons", f"export const python{file.capitalize()}Lessons")
    
    with open(f"codelol/lib/lessons/{file}-python.ts", "w") as f:
        f.write(content)

# Update index.ts
with open("codelol/lib/lessons/index.ts", "r") as f:
    index_content = f.read()

# Add imports
index_content = index_content.replace(
    "import { expertLessons } from './expert';",
    "import { expertLessons } from './expert';\nimport { pythonExpertLessons } from './expert-python';"
)
index_content = index_content.replace(
    "import { intermediateLessons } from './intermediate';",
    "import { intermediateLessons } from './intermediate';\nimport { pythonIntermediateLessons } from './intermediate-python';"
)
index_content = index_content.replace(
    "import { interviewLessons } from './interview';",
    "import { interviewLessons } from './interview';\nimport { pythonInterviewLessons } from './interview-python';"
)

# Update pythonAllLessons array
index_content = index_content.replace(
    "...intermediateLessons,\n  ...expertLessons,\n  ...interviewLessons",
    "...pythonIntermediateLessons,\n  ...pythonExpertLessons,\n  ...pythonInterviewLessons"
)

# Update categories
index_content = index_content.replace(
    "lessons: intermediateLessons // TODO: Translate these",
    "lessons: isPython ? pythonIntermediateLessons : intermediateLessons"
)
index_content = index_content.replace(
    "lessons: expertLessons // TODO: Translate these",
    "lessons: isPython ? pythonExpertLessons : expertLessons"
)
index_content = index_content.replace(
    "lessons: interviewLessons // TODO: Translate these",
    "lessons: isPython ? pythonInterviewLessons : interviewLessons"
)

with open("codelol/lib/lessons/index.ts", "w") as f:
    f.write(index_content)
