# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run build` - Build the component library using rolldown
- `npm run build:dev` - Build with development environment
- `npm run build:prod` - Build with production environment
- `npm run dev` - Run development playground (play directory)
- `npm run typecheck` - Run TypeScript type checking
- `npm run test` - Run tests with Vitest
- `npm run lint` - Run ESLint with auto-fix
- `npm run prettier` - Format code with Prettier
- `npm run doc:dev` - Run documentation site in development mode
- `npm run doc:build` - Build documentation site
- `npm run create` - Create a new component using the creation script

## Codebase Architecture

This is a Vue 3 component library built with TypeScript and packaged using rolldown.

### Key Directories

- `packages/` - Contains all library code
  - `packages/components/` - Individual component packages (button, checkbox, icon, input, radio, slider, upload, etc.)
  - `packages/yy-craft/` - Main library entry point and package configuration
  - `packages/composables/` - Vue composables for component logic
  - `packages/utils/` - Utility functions and helpers
- `play/` - Development playground with Vite for testing components
- `docs/` - Documentation site
- `scripts/` - Build and utility scripts including component creation tools

### Build System

- Uses rolldown for bundling (rolldown.config.ts)
- TypeScript compilation with vue-tsc
- Components are organized as individual packages with their own index.ts exports
- Outputs multiple formats: ES modules (ESM) and CommonJS (CJS)
- Generates TypeScript declaration files in dist/types
- Uses unplugin-vue and unplugin-vue-jsx for Vue SFC processing

### Component Structure

- Each component is in its own directory under `packages/components/[component-name]/`
- Components follow the pattern:
  - `index.ts` - Entry point that exports the component and its types
  - `src/[component-name].vue` - Main Vue component file
  - Additional files for component logic, types, etc.
- Components use `withInstall` utility for automatic Vue plugin installation
- Global component types are declared in module augmentation blocks

### Testing

- Vitest with jsdom environment
- Tests are colocated with components
- Uses @vue/test-utils for Vue component testing utilities

### Development Workflow

- Use `npm run dev` to start the playground for component development
- Components are developed in `packages/components/[component-name]/` directories
- The main entry point is `packages/yy-craft/index.ts` which re-exports all components
- New components can be created with `npm run create`
- Use the playground in `play/` directory to test components during development
