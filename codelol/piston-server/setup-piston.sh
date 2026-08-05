#!/bin/bash

echo "Warming up Piston and fetching available runtimes..."

# We use Node.js (already installed since this is a Next.js project) to parse and install the runtimes reliably.
node -e '
const http = require("http");
const { execSync } = require("child_process");

// Language mapping to Piston package names
const targets = {
  javascript: "node",
  python: "python",
  typescript: "typescript",
  java: "java",
  c: "gcc",
  "c++": "gcc",
  csharp: "dotnet",
  go: "go",
  rust: "rust",
  ruby: "ruby",
  php: "php",
  kotlin: "kotlin",
  swift: "swift",
  bash: "bash",
  sqlite: "sqlite3"
};

http.get("http://localhost:2000/api/v2/packages", (res) => {
  let data = "";
  res.on("data", chunk => data += chunk);
  res.on("end", () => {
    try {
      const packages = JSON.parse(data);
      const installed = new Set();
      
      for (const [friendlyName, pistonName] of Object.entries(targets)) {
        if (installed.has(pistonName)) continue; // e.g. gcc for c and c++
        
        // Find the package in the API response
        const pkg = packages.find(p => p.language === pistonName || p.name === pistonName);
        
        if (pkg) {
          const latestVersion = pkg.version;
          console.log(`Installing ${friendlyName} (${pistonName}@${latestVersion})...`);
          
          try {
             // Using docker exec to run the cli inside the container as requested by the spirit of the command, 
             // but using the exact format if running inside. 
             // Inside the container, the cli is at /piston/cli/index.js
             execSync(`docker exec piston-execution-engine /piston/cli/index.js ppman install ${pistonName}=${latestVersion}`, { stdio: "inherit" });
             installed.add(pistonName);
          } catch (e) {
             console.error(`Failed to install ${pistonName}`);
          }
        } else {
          console.log(`Warning: Could not find package ${pistonName} in Piston API.`);
        }
      }
      
      console.log("\\nAll requested runtimes installed! Verify at http://localhost:2000/api/v2/runtimes");
    } catch (e) {
      console.error("Failed to parse packages from Piston API:", e);
    }
  });
}).on("error", (e) => {
  console.error("Could not connect to Piston API. Is the container running on port 2000?", e.message);
});
'
