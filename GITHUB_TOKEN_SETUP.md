# GitHub Personal Access Token 权限配置指南

## 🔐 快速访问链接
- [PAT 管理页面](https://github.com/settings/tokens)
- [GitHub Settings](https://github.com/settings/profile)

## 📋 当前Token状态
- Token: `github_pat_11AB2V7JI...` (已识别)
- 账户: susuyan
- 协议: https
- CLI状态: ✅ 已登录

## ⚙️ 必需权限配置

### 仓库权限 (Repository permissions)
```
✅ repo (Full control of private repositories)
✅ repo:status (Access commit status)
✅ repo_deployment (Access deployment status)
✅ public_repo (Access public repositories)
✅ repo:invite (Access repository invitations)
✅ security_events (Access security events)
```

### Pull Request 权限
```
✅ workflow (Update GitHub Action workflows)
⚠️ 这个权限对于PR创建很重要
```

### 组织权限 (Organization permissions)
```
✅ write:discussion (Write team discussions)
✅ write:org_project (Write organization projects)
```

### 用户权限 (User permissions)
```
✅ write:public_key (Write user public keys)
✅ write:repo_hook (Write repository hooks)
✅ write:security (Write security vulnerabilities)
✅ admin:public_key (Admin user public keys)
✅ admin:repo_hook (Admin repository hooks)
```

## 🚀 更新步骤

### 1. 编辑现有Token
1. 访问 [https://github.com/settings/tokens](https://github.com/settings/tokens)
2. 找到您的token并点击"Edit"
3. 确保勾选上述所有权限

### 2. 生成新Token (如果需要)
1. 点击"Generate new token" > "Generate new token (classic)"
2. 选择权限范围
3. 复制生成的token

### 3. 更新本地配置
```bash
# 如果token有变化，更新远程URL
git remote set-url origin https://token:NEW_TOKEN_HERE@github.com/susuyan/wiki.susuyan.git

# 验证远程URL
git remote -v
```

### 4. 测试权限
```bash
# 测试读取权限
git ls-remote origin

# 测试写入权限
git push -u origin wegent-test-1768448662

# 测试PR创建
gh pr create --title "Test PR" --body "Testing after token update"
```

## 📊 权限检查清单

完成配置后，请检查：
- [ ] repo 权限已启用
- [ ] workflow 权限已启用
- [ ] 可以读取远程仓库 (`git ls-remote origin`)
- [ ] 可以推送代码 (`git push`)
- [ ] 可以创建PR (`gh pr create`)

## 🔍 故障排除

### 如果仍然收到403错误：
1. 确认token没有过期
2. 检查token是否有正确的权限
3. 尝试生成新的token
4. 确认账户对仓库有写入权限

### 如果PR创建失败：
1. 确认有repository权限
2. 确认有workflow权限
3. 检查是否已推送到远程分支

## 📝 测试建议

更新token后，建议测试以下操作：
```bash
# 1. 测试基本连接
git ls-remote origin

# 2. 测试推送
git push -u origin wegent-test-1768448662

# 3. 测试PR创建
gh pr create --title "Token update test" --body "验证token权限更新"

# 4. 检查CLI状态
gh auth status
```

---
*生成时间: 2026-01-15*