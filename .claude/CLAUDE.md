# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a personal wiki/documentation site built using Next.js, Fumadocs and MDX. It serves as a knowledge base with searchable documentation content.

## Dual-Purpose Architecture

This codebase serves two distinct roles that require different working modes:

### 1. Documentation System (文档系统构建)
A knowledge management system for organizing, writing, and publishing content.
- Focus: Content structure, writing workflow, information architecture
- Key concerns: Navigation, categorization, readability, content lifecycle
- Primary output: MDX documents in `/content/docs`

### 2. Website Construction (网站建设构建)
A web application project with UI components, styling, and functionality.
- Focus: Frontend development, UI/UX, performance, deployment
- Key concerns: Components, routing, styling, build optimization
- Primary output: Next.js app in `/app` and React components

## Project Structure

- `/app` - Next.js application files
  - `/app/(docs)` - Documentation routes and layouts
  - `/app/api/search` - Search API endpoint for docs
- `/content/docs` - MDX documentation content organized in folders
- `/components` - Reusable React components
- `/lib` - Utility functions (string cleaning, formatting helpers)
- `/scripts` - Development and automation scripts
- `/.cursorrules` - Cursor/Future Skills directory

## Key Technologies

- **Next.js** (16.1.1) - Full-stack React framework
- **Fumadocs** (16.4.7) - Documentation framework and UI components
- **MDX** - Markdown with embedded React components
- **Tailwind CSS** (4.1.18) - Utility-first CSS framework
- **bun** (v1.0.25) - Package manager and runtime

## Commands

### Development
- `bun dev` - Start development server with Turbopack
- `bun build` - Build production bundle
- `bun start` - Start production server

### Scripts
- `bun run post` - Create new MDX file from template
- `bun run push` - Build, commit, and push changes
- `bun run format` - Format MDX files
- `bun run postinstall` - Initialize Fumadocs MDX after install

## Documentation Management

### Adding New Documentation
1. Add MDX files to `/content/docs` - Fumadocs will auto-generate routes
2. Update `/content/docs/meta.json` to organize navigation structure
3. Use `bun run post` to generate from template (prompts for title and section)

### Formatting
- MDX files use automatic formatting via `format` script
- String utilities for title-to-ID conversion and emoji removal
- Fumadocs handles code highlighting and interactive components

## Code Architecture

### App Structure
- Uses Next.js App Router with grouped routes `(docs)`
- Search functionality via API route with client-side interaction
- Custom layout configuration in `layout.config.tsx`
- Global styles in `global.css`

### Component System
- Uses Lucide React icons and Heroicons
- Sonner for toast notifications
- Custom utilities in `/lib` for consistent formatting
- Fumadocs UI components for documentation layout

## Development Workflow

### Role-Based Working Modes

When working in this repository, identify which role the current task belongs to:

#### Documentation System Mode
Use when the task involves content management, writing, or information architecture.

1. **Content Creation**: Use `bun run post` to generate properly formatted MDX files
2. **Organization**: Update `/content/docs/meta.json` to structure navigation
3. **Publishing**: Use `bun run push` to build, commit, and deploy content changes
4. **Formatting**: Run `bun run format` after MDX modifications

#### Website Construction Mode
Use when the task involves UI development, component building, or site functionality.

1. **Component Development**: Create/modify React components in `/components`
2. **App Changes**: Update routes, layouts, and pages in `/app`
3. **Dependencies**: Check component dependencies and shared utilities
4. **Testing**: Verify with `bun dev` before building

### Universal Guidelines
- Always identify which role the current task serves
- Keep documentation content separate from app implementation concerns
- Run `bun build` to verify before committing changes

## Deployment

Vercel-ready Next.js application. Built artifacts include `.next`, `node_modules` dependencies, and static content from `/content`.