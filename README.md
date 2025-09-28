# Chicago

Keep track of players score in the classic card game Chicago.

## Development

This is a monorepo built with pnpm and Turbo. The main application is a SvelteKit app located in `src/apps/chicago-game/`.

### Prerequisites

- Node.js 20+
- pnpm 8+

### Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm --filter chicago-game dev
```

### Scripts

```bash
# Build for production
pnpm --filter chicago-game build

# Run linting
pnpm --filter chicago-game lint

# Run type checking
pnpm --filter chicago-game check

# Format code
pnpm --filter chicago-game format
```
