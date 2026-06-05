# Contributing to AI GrowthOS

Thank you for contributing to AI GrowthOS. This document outlines development guidelines and workflow.

## Development Workflow

1. Create a feature branch from main
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make commits with clear, descriptive messages
   ```bash
   git commit -m "feat: add new connector for X platform"
   ```

3. Run tests and type checking
   ```bash
   pnpm type-check
   pnpm lint
   ```

4. Push to your branch and create a pull request

5. Code review and approval required before merging

## Code Standards

### TypeScript

- Strict mode enabled
- Avoid any types
- Use explicit return types on functions
- Prefer interfaces over type aliases for object shapes

### Database

- Always use Drizzle ORM, never raw SQL in application code
- Create migrations for all schema changes
- Never modify schema directly in production

### Queue Jobs

- Include workspaceId for multi-tenant isolation
- Add deduplication keys for idempotency
- Use exponential backoff for retries

### Connectors

- Implement all methods from BaseConnector
- Support mock, sandbox, and production modes
- Never expose API credentials in logs or errors

### Commit Messages

Follow conventional commits:

```
feat: add new feature
fix: bug fix
docs: documentation update
refactor: code restructuring
test: test additions
chore: dependency updates
```