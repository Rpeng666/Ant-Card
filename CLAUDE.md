# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Ant Card is a modern online card editor built with Next.js 14+, TypeScript, and Tailwind CSS. It allows users to create professional cards with real-time preview, custom themes, and PDF export capabilities. The application supports internationalization (Chinese/English) and features a template system with 15+ pre-designed card layouts.

## Package Manager & Scripts

This project uses **pnpm** as the package manager (version 10.3.0).

```bash
# Development
pnpm dev          # Start development server on http://localhost:3000

# Production
pnpm build        # Build for production (standalone output for Docker)
pnpm start        # Start production server

# Code Quality
pnpm lint         # Run ESLint (extends next/core-web-vitals)
```

## Architecture Overview

### Next.js App Router Structure

- Uses App Router with internationalization via next-intl
- Route structure: `app/(public)/[locale]/` for localized content
- Middleware handles locale routing (default: Chinese, supports English)
- Standalone build output configured for Docker deployment

### State Management

- **Zustand** for global state with persistence middleware
- Key stores:
  - `useCardStore.ts`: Main card management (creation, editing, export)
  - `useAIConfigStore.ts`: AI model and API configuration
  - `useGrammarStore.ts`: Grammar checking functionality

### Component Architecture

- **Shadcn/ui** with New York style variant and Slate base color
- **Radix UI** primitives for accessibility
- **Framer Motion** for animations
- **Tiptap** rich text editor
- Components organized by feature: `card-editor/`, `landing/`, `ai/`, `ui/`

### Styling System

- **Tailwind CSS** with extensive custom CSS variables and HSL color system
- Dark mode support via class-based strategy
- Custom animations (accordion, fade-in/fade-out)
- Responsive design with mobile-friendly interface

## Key Directories

```
src/
├── app/(public)/[locale]/     # Internationalized pages
│   ├── app/card-editor/        # Main card editor interface
│   └── app/settings/           # Application settings
├── components/
│   ├── ui/                     # Shadcn/ui components
│   ├── card-editor/            # Card editing components
│   ├── landing/                # Landing page components
│   └── ai/                     # AI-related components
├── store/                      # Zustand state stores
├── lib/mcp/                    # Model Context Protocol implementation
├── utils/                      # Utility functions (image, file system, text)
├── types/template.ts           # Card and template type definitions
└── config/                     # Default templates and settings
```

## Core Features

### Template System

- 15+ pre-designed card templates in `src/config/index.ts`
- Customizable styles with aspect ratio support
- Template categories: business, creative, academic, etc.

### Export Capabilities

- PDF export using Puppeteer and html2canvas
- Multiple aspect ratios and export settings
- File system integration for save/load functionality

### AI Integration

- Grammar checking via `useGrammarStore.ts`
- AI configuration management
- Content assistance features

### Internationalization

- Chinese (zh) and English (en) support
- Locale-specific routing via middleware
- Translation files in `src/i18n/`

## Development Notes

### TypeScript Configuration

- Strict mode enabled
- Build errors ignored in Next.js config for deployment flexibility
- Path aliases configured for @/ imports

### Docker Deployment

- Standalone output configured in `next.config.mjs`
- Dockerfile and docker-compose setup available
- Images published to Docker Hub as `siyueqingchen/magic-resume`

### Code Style

- ESLint configuration extends Next.js core-web-vitals
- Component organization follows feature-based structure
- Consistent use of TypeScript for type safety

## Important Configuration Files

- `components.json`: Shadcn/ui configuration (New York style, Slate theme)
- `tailwind.config.ts`: Custom color system, animations, and dark mode
- `next.config.mjs`: Standalone build, i18n configuration
- `src/middleware.ts`: Locale routing logic
- `src/config/index.ts`: Default templates, aspect ratios, export settings
