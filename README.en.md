# 🎨 Ant Card

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-14.2.3-black?style=flat-square&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Framer_Motion-0085CB?style=flat-square&logo=framer-motion&logoColor=white" alt="Framer Motion">
  <img src="https://img.shields.io/badge/MCP-Protocol-FF6B6B?style=flat-square&logo=protocol&logoColor=white" alt="MCP">
</div>

<div align="center">
  <p><strong>Modern Online Card Editor</strong> - Multiple beautiful templates, real-time preview, PDF export, AI-powered generation</p>
</div>

## ✨ Features

- 🎨 **15+ Beautiful Templates** - From minimal to creative, covering various scenarios
- 📝 **Real-time Editing** - WYSIWYG card editing experience
- 🌍 **Dark Mode** - Perfect support for light/dark theme switching
- 📱 **Responsive Design** - Perfect adaptation to various screen sizes
- 🌐 **Internationalization** - Support for Chinese and English
- 🤖 **AI Integration** - Intelligent content generation and optimization
- 📤 **Multi-format Export** - PNG, JPEG, PDF and other formats
- 🔄 **MCP Protocol** - Support for Model Context Protocol, usable in Claude Desktop and other tools
- 💾 **Local Storage** - Support for saving and loading card projects

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0+
- pnpm (recommended) or npm/yarn

### Installation

```bash
# Clone the project
git clone https://github.com/rpeng666/ant-card.git
cd ant-card

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to start using.

## 🎯 MCP Support

We provide a standalone MCP Server that can be used in AI tools like Claude Desktop, Cline, Cursor, etc.

### Install MCP Server

```bash
cd ant-card-mcp-server
npm install
npm run build
npm install -g .
```

### Configure Claude Desktop

Add to `~/.config/claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "ant-card": {
      "command": "ant-card-mcp-server"
    }
  }
}
```

Restart Claude Desktop to use all Ant Card MCP features!

## 📦 Project Structure

```
src/
├── app/(public)/[locale]/          # Internationalized routing
│   ├── app/card-editor/           # Card editor
│   ├── app/dashboard/             # User dashboard
│   └── app/settings/              # Application settings
├── components/
│   ├── ui/                        # Shadcn/ui components
│   ├── card-editor/               # Card editing components
│   ├── card-preview/              # Card preview components
│   │   ├── QuoteTemplate.tsx      # Quote template
│   │   ├── BookExcerptTemplate.tsx # Book excerpt template
│   │   ├── MemoTemplate.tsx       # Memo template
│   │   ├── BentoTemplate.tsx      # Bento template (optimized)
│   │   ├── DarkDayTemplate.tsx    # Dark day template (redesigned)
│   │   ├── FrameTemplate.tsx     # Frame template (fixed)
│   │   ├── StoryTemplate.tsx      # Story template (new)
│   │   └── CodeTemplate.tsx       # Code template (macOS style)
│   ├── landing/                   # Landing page components
│   └── ai/                        # AI related components
├── store/                         # Zustand state management
├── lib/mcp/                       # MCP protocol implementation
├── types/                         # TypeScript type definitions
├── config/                        # Configuration files
└── utils/                         # Utility functions
```

## 🛠️ Development

### Local Development

```bash
# Start development server
pnpm dev

# Code linting
pnpm lint

# Build for production
pnpm build

# Start production server
pnpm start
```

### Project Configuration

- **Next.js 14.2.3** - App Router architecture
- **TypeScript** - Strict mode, complete type checking
- **Tailwind CSS** - Custom themes and animations
- **Shadcn/ui** - Modern component library
- **Zustand** - State management
- **Framer Motion** - Animation library
- **next-intl** - Internationalization solution

### Core Dependencies

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

## 📚 API Documentation

### Core Interfaces

#### Card Data Structure

```typescript
interface CardData {
  id: string;
  template: string;
  form: {
    title: string;
    content: string;
    author?: string;
    date?: string;
    icon?: string;
  };
  style: CardStyle;
  switchConfig: {
    showAuthor: boolean;
    showDate: boolean;
    showTitle: boolean;
    showContent: boolean;
    showQRCode: boolean;
  };
}
```

#### Export Configuration

```typescript
interface ExportConfig {
  format: 'png' | 'jpeg' | 'pdf';
  quality?: number;
  scale?: number;
  backgroundColor?: string;
  width?: number;
  height?: number;
}
```

## 🌐 Deployment

### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Docker Deployment

```bash
# Build image
docker build -t ant-card .

# Run container
docker run -p 3000:3000 ant-card
```

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_API_URL=https://your-api.com
OPENAI_API_KEY=your_openai_key
```

## 🧪 Testing

### Unit Testing

```bash
pnpm test
pnpm test:watch
pnpm test:coverage
```

### E2E Testing

```bash
pnpm test:e2e
pnpm test:e2e:headless
```

### MCP Testing

```bash
cd ant-card-mcp-server
npm test
node verify-install.js
```

## 🤝 Contributing

We welcome contributions in all forms!

### Development Workflow

1. Fork the project
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Create a Pull Request

### Code Style

- Use 2-space indentation
- Follow ESLint rules
- Write unit tests
- Update relevant documentation

## 📄 License

This project is licensed under the [Apache License 2.0](LICENSE).

## 📞 Contact Us

- 🌐 Project Homepage: [https://antcard.airouter.tech](https://antcard.airouter.tech)
- 🐛 Issue Reporting: [GitHub Issues](https://github.com/rpeng666/ant-card/issues)

---

<div align="center">
  <p><a href="README.md">🏠 Home</a> | <a href="README.zh.md">🇨🇳 中文</a></p>
  <p>Made with ❤️ by Ant Card Team</p>
</div>