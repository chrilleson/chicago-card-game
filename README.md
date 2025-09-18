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

## Deployment

This project uses separate GitHub Actions workflows for CI and CD:

### CI Pipeline (`ci.yml`)
**Triggers:** Push to main/develop, Pull Requests
- Runs linting and code formatting checks
- Performs TypeScript type checking
- Builds the application to verify compilation
- **No deployment** - validation only

### CD Pipeline (`deploy.yml`)
**Triggers:** GitHub Releases (published)
- Runs full test suite before deployment
- Deploys to production on Vercel
- Comments on the release with deployment status

### Workflow Benefits
- **Clean Separation:** CI validates code quality, CD handles deployment
- **Release Control:** Production deploys only happen on tagged releases
- **Fast Feedback:** CI runs quickly without deployment overhead
- **Safety:** Tests must pass before any deployment

### Required GitHub Secrets

Add these secrets to your GitHub repository for deployment:

1. `VERCEL_TOKEN` - Vercel API token (create at https://vercel.com/account/tokens)
2. `VERCEL_ORG_ID` - Your Vercel organization ID
3. `VERCEL_PROJECT_ID` - Your Vercel project ID

### Getting Vercel IDs

```bash
# Install Vercel CLI
npm i -g vercel

# Login and link project
cd src/apps/chicago-game
vercel

# Get project info (shows org and project IDs)
vercel project ls
```

### Creating a Release

To deploy to production:

1. Merge your changes to `main`
2. Create a new release on GitHub:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```
3. Or use GitHub's web interface to create a release
4. The deployment workflow will automatically trigger
