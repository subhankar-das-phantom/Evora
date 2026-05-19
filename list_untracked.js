import { execSync } from "child_process";
import fs from "fs";

function getFiles() {
  const output = execSync("git ls-files --others --exclude-standard", { encoding: "utf8" });
  return output.split("\n").map(f => f.trim()).filter(Boolean);
}

const allFiles = getFiles();
console.log(`Total untracked files found: ${allFiles.length}`);
fs.writeFileSync("files.json", JSON.stringify(allFiles, null, 2));
console.log("Written to files.json");
