import os

file_path = "app/api/run/route.ts"
with open(file_path, "r") as f:
    content = f.read()

old_block = """  try {
    const res = await fetch(`${baseUrl}/api/v2/runtimes`, { 
      headers,
      signal: AbortSignal.timeout(3000) 
    });
    if (!res.ok) throw new Error('Failed to fetch runtimes');
    runtimesCache = await res.json();
    runtimesLastFetched = now;
    return runtimesCache;
  } catch {
    throw new Error('Code runner is warming up, try again in a moment');
  }"""

new_block = """  try {
    const res = await fetch(`${baseUrl}/api/v2/runtimes`, { headers });
    if (!res.ok) throw new Error('Failed to fetch runtimes');
    runtimesCache = await res.json();
    runtimesLastFetched = now;
    return runtimesCache;
  } catch (e) {
    throw new Error(`Failed to connect to execution engine: ${e instanceof Error ? e.message : 'Unknown error'}`);
  }"""

if old_block in content:
    content = content.replace(old_block, new_block)
    with open(file_path, "w") as f:
        f.write(content)
    print("Fixed route.ts")
else:
    print("Could not find the block to replace")
