import os

file_path = "app/api/roast/route.ts"
if not os.path.exists(file_path):
    print("File not found")
    exit(1)

with open(file_path, "r") as f:
    content = f.read()

# Replace the generationConfig block
old_block = """          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 500,
            responseMimeType: "application/json"
          }"""

new_block = """          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 500,
            ...(isSuccess ? { responseMimeType: "application/json" } : {})
          }"""

if old_block in content:
    content = content.replace(old_block, new_block)
    with open(file_path, "w") as f:
        f.write(content)
    print("Fixed responseMimeType in route.ts")
else:
    print("Could not find the block to replace")
