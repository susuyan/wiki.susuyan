# Example App

iOS 基建平台的示例 App

## 骨架搭建小型/中型单体 App（Monolithic）

场景：单个团队、功能不复杂、想快速上手 TCA。
思路：按 feature 分文件夹，整个工程在同一个 Xcode target 内管理，方便迭代。

### 目录结构
- Modules (local swift packages)
  用于存放项目的本地 Swift Package 模块（组件化）
- ExampleApp (target)
- ExampleAppTests (target)
- Config (project config files)
- Frameworks (third-party frameworks)
- Products (built products)

#### /ExampleApp

- App 
- Constants (constant values)
- Dependencies (tca dependencies)
- Helpers (utility functions)
- Features (tca feature)
- Views (ui views)
- Models (data models)
- Resources (resource files/assets)





