import { execSync } from "child_process";

function getChangedFiles(): string[] {
  try {
    const output = execSync("git status --porcelain", { encoding: "utf-8" });
    return output
      .split("\n")
      .filter(Boolean)
      .map(line => line.slice(3));
  } catch (e) {
    return [];
  }
}

function getCommitMessage(files: string[]): string {
  if (files.length === 0) {
    return `chore: no changes (${new Date().toISOString()})`;
  }
  const fileList = files.join(", ");
  return `chore: update [${fileList}] (${new Date().toISOString()})`;
}

function main() {
  const changedFiles = getChangedFiles();
  if (changedFiles.length === 0) {
    console.log("没有检测到变更，无需提交。");
    return;
  }
  try {
    execSync("git add .", { stdio: "inherit" });
    const msg = getCommitMessage(changedFiles);
    execSync(`git commit -m "${msg}"`, { stdio: "inherit" });
    execSync("git push", { stdio: "inherit" });
    console.log("已自动提交并推送到远程仓库。");
  } catch (e) {
    console.error("自动提交或推送失败：", e);
  }
}

main();