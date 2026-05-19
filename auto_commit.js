import fs from "fs";
import { execSync } from "child_process";
import path from "path";

// Read files.json
const files = JSON.parse(fs.readFileSync("files.json", "utf8"));

// Sort files to keep related files adjacent
files.sort();

const totalCommits = 50;
const chunks = [];

// Divide 133 files into exactly 50 chunks
const chunkSize = Math.floor(files.length / totalCommits);
let remainder = files.length % totalCommits;
let index = 0;

for (let i = 0; i < totalCommits; i++) {
  const size = chunkSize + (remainder > 0 ? 1 : 0);
  remainder--;
  const chunk = files.slice(index, index + size);
  chunks.push(chunk);
  index += size;
}

console.log(`Divided ${files.length} files into ${chunks.length} commits.`);

// Generate a descriptive commit message for a chunk of files
function getCommitMessage(chunkFiles, commitIndex) {
  const firstFile = chunkFiles[0];
  const lastFile = chunkFiles[chunkFiles.length - 1];
  
  let scope = "app";
  if (chunkFiles.every(f => f.startsWith("backend"))) {
    scope = "backend";
  } else if (chunkFiles.every(f => f.startsWith("frontend"))) {
    scope = "frontend";
  }

  // Get common folder if possible
  const dirNames = chunkFiles.map(f => path.dirname(f));
  const uniqueDirs = [...new Set(dirNames)];
  
  let details = "";
  if (uniqueDirs.length === 1) {
    const dir = uniqueDirs[0].replace(/\\/g, "/");
    details = `in ${dir}`;
  } else {
    // List file basenames
    const basenames = chunkFiles.map(f => path.basename(f));
    details = `add ${basenames.join(", ")}`;
    if (details.length > 50) {
      details = `update files from ${path.basename(firstFile)} to ${path.basename(lastFile)}`;
    }
  }

  return `feat(${scope}): [Part ${commitIndex + 1}/${totalCommits}] ${details}`;
}

// Execute commits
chunks.forEach((chunk, i) => {
  if (chunk.length === 0) return;

  const msg = getCommitMessage(chunk, i);
  console.log(`\nCommit ${i + 1}/${totalCommits}: ${msg}`);
  
  // Add files
  chunk.forEach(file => {
    console.log(`  Adding: ${file}`);
    execSync(`git add "${file}"`, { stdio: "ignore" });
  });

  // Commit
  try {
    execSync(`git commit -m "${msg}"`, { stdio: "inherit" });
  } catch (err) {
    console.error(`Failed to commit: ${msg}`, err.message);
  }
});

console.log("\nFinished making 50 commits!");
