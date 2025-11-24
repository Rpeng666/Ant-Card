# 🎨 Ant Card

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-14.2.3-black?style=flat-square&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Framer_Motion-0085CB?style=flat-square&logo=framer-motion&logoColor=white" alt="Framer Motion">
  <img src="https://img.shields.io/badge/MCP-Protocol-FF6B6B?style=flat-square&logo=protocol&logoColor=white" alt="MCP">
</div>

<div align="center">
  <p><a href="README.en.md">🇺🇸 English README</a> </p>
  <p>Made with ❤️ by Ant Card Team</p>
</div>

<div align="center">
  <p><strong>现代化的在线卡片编辑器</strong> - 支持多种精美模板，实时预览，PDF导出，AI 智能生成</p>
</div>

## 悲乎

Gemini 3的出现，终结了这个以美感为卖点的产品的赛道

## ✨ 特性

- 🎨 **15+ 精美模板** - 从简约到创意，满足各种场景需求
- 📝 **实时编辑** - 所见即所得的卡片编辑体验
- 🌍 **深色模式** - 完美支持明暗主题切换
- 📱 **响应式设计** - 完美适配各种屏幕尺寸
- 🌐 **国际化** - 支持中英文双语
- 🤖 **AI 集成** - 智能内容生成和优化
- 📤 **多格式导出** - PNG、JPEG、PDF 等多种格式
- 🔄 **MCP 协议** - 支持 Model Context Protocol，可在 Claude Desktop 等工具中使用
- 💾 **本地存储** - 支持保存和加载卡片项目

## 🚀 快速开始

### 环境要求

- Node.js 18.0+
- pnpm (推荐) 或 npm/yarn

### 安装依赖

```bash
# 克隆项目
git clone https://github.com/rpeng666/ant-card.git
cd ant-card

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 开始使用。

## 🎯 MCP 支持

我们提供了独立的 MCP Server，可以在 Claude Desktop、Cline、Cursor 等 AI 工具中使用 Ant Card 功能。

### 安装 MCP Server

```bash
cd ant-card-mcp-server
npm install
npm run build
npm install -g .
```

### 配置 Claude Desktop

在 `~/.config/claude/claude_desktop_config.json` 中添加：

```json
{
  "mcpServers": {
    "ant-card": {
      "command": "ant-card-mcp-server"
    }
  }
}
```

重启 Claude Desktop 后即可使用 Ant Card 的所有 MCP 功能！

## 📦 项目结构

```
src/
├── app/(public)/[locale]/          # 国际化路由
│   ├── app/card-editor/           # 卡片编辑器
│   ├── app/dashboard/             # 用户仪表板
│   └── app/settings/              # 应用设置
├── components/
│   ├── ui/                        # Shadcn/ui 组件
│   ├── card-editor/               # 卡片编辑组件
│   ├── card-preview/              # 卡片预览组件
│   │   ├── QuoteTemplate.tsx      # 金句模板
│   │   ├── BookExcerptTemplate.tsx # 书摘模板
│   │   ├── MemoTemplate.tsx       # 备忘录模板
│   │   ├── BentoTemplate.tsx      # 便当模板 (优化版)
│   │   ├── DarkDayTemplate.tsx    # 黑日模板 (重设计)
│   │   ├── FrameTemplate.tsx     # 框架模板 (修复)
│   │   ├── StoryTemplate.tsx      # 故事模板 (新增)
│   │   └── CodeTemplate.tsx       # 代码模板 (macOS风格)
│   ├── landing/                   # 首页组件
│   └── ai/                        # AI 相关组件
├── store/                         # Zustand 状态管理
├── lib/mcp/                       # MCP 协议实现
├── types/                         # TypeScript 类型定义
├── config/                        # 配置文件
└── utils/                         # 工具函数
```

## 🛠️ 开发

### 本地开发

```bash
# 启动开发服务器
pnpm dev

# 代码检查
pnpm lint

# 构建生产版本
pnpm build

# 启动生产服务器
pnpm start
```

### 项目配置

- **Next.js 14.2.3** - App Router 架构
- **TypeScript** - 严格模式，完整类型检查
- **Tailwind CSS** - 自定义主题和动画
- **Shadcn/ui** - 现代化组件库
- **Zustand** - 状态管理
- **Framer Motion** - 动画库
- **next-intl** - 国际化方案

### 核心依赖

```json
{
  "next": "14.2.3",
  "react": "^18",
  "react-dom": "^18",
  "typescript": "^5",
  "tailwindcss": "^3.4.0",
  "@radix-ui/react-*": "^1.0.0",
  "framer-motion": "^11.0.0",
  "zustand": "^4.4.0",
  "next-intl": "^3.0.0",
  "html2canvas": "^1.4.1",
  "puppeteer": "^23.0.0",
  "jspdf": "^3.0.0"
}
```

## 🌐 部署

### Vercel 部署

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel --prod
```

### Docker 部署

```bash
# 构建镜像
docker build -t ant-card .

# 运行容器
docker run -p 3000:3000 ant-card
```

### 环境变量

```bash
# .env.local
NEXT_PUBLIC_API_URL=https://your-api.com
OPENAI_API_KEY=your_openai_key
```

## 🤝 贡献指南

我们欢迎各种形式的贡献！

### 开发流程

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

### 代码规范

- 使用 2 空格缩进
- 遵循 ESLint 规则
- 编写单元测试
- 更新相关文档

## 📄 许可证

本项目采用 [Apache License 2.0](LICENSE)。

## 📞 联系我们

- 🌐 项目主页: [https://antcard.airouter.tech](https://antcard.airouter.tech)
- 🐛 问题反馈: [GitHub Issues](https://github.com/rpeng666/ant-card/issues)

---
