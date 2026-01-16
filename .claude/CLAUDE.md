# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a personal wiki/documentation site built using Next.js, Fumadocs and MDX. It serves as a knowledge base with searchable documentation content.

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

When Claude assists with tasks in this repository:
1. **Documentation Creation**: Use the `post` script to create properly formatted MDX files
2. **Code Changes**: Always check component dependencies and update meta.json when needed
3. **Publishing**: The `push` script handles build verification, commits, and deployment
4. **Formatting**: Run `format` script after MDX modifications to maintain consistency

## Deployment

Vercel-ready Next.js application. Built artifacts include `.next`, `node_modules` dependencies, and static content from `/content`.