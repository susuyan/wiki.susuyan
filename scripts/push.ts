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
    return `chore: no changes`;
  }
  
  const fileList = files
    .map(file => {
      const fileName = file.split('/').pop() || file;
      return fileName.replace(/\.mdx?$/, '');
    })
    .join(', ');
    
  // 根据文件类型和变更内容确定提交类型
  const commitType = (() => {
    if (files.some(file => file.endsWith('.mdx'))) {
      return 'docs';
    } else if (files.some(file => file.includes('package.json'))) {
      return 'feat';
    } else if (files.some(file => file.includes('fix'))) {
      return 'fix';
    } else {
      return 'chore';
    }
  })();
  
  const fileCount = files.length;
  const isSingleFile = fileCount === 1;
  
  // 根据提交类型生成不同的描述
  const description = (() => {
    switch (commitType) {
      case 'docs':
        return isSingleFile ? '更新文档' : `更新 ${fileCount} 个文档`;
      case 'feat':
        return isSingleFile ? '新增功能' : `新增 ${fileCount} 个功能`;
      case 'fix':
        return isSingleFile ? '修复问题' : `修复 ${fileCount} 个问题`;
      default:
        return isSingleFile ? '更新文件' : `更新 ${fileCount} 个文件`;
    }
  })();
  
  return `${commitType}: ${description}

${fileList}

变更文件:
${files.map(file => `- ${file}`).join('\n')}`;
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