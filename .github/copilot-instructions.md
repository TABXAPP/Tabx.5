# Copilot Instructions for TABX Express API v5

## Project Overview

This is a modern Node.js Express API for the TABX platform, which enables users to earn money by delivering parcels along their travel routes. The project emphasizes security, scalability, and best practices.

## Technology Stack

- **Runtime**: Node.js 18.x+
- **Framework**: Express.js 4.x
- **Testing**: Jest with Supertest
- **Logging**: Winston
- **Code Quality**: ESLint with Standard config
- **Security**: Helmet, CORS
- **Containerization**: Docker & Docker Compose

## Code Style and Conventions

### JavaScript Style
- Follow ESLint Standard configuration
- Use **single quotes** for strings
- **No semicolons** at end of statements
- **2-space indentation**
- Use arrow functions for callbacks
- Prefer `const` over `let`, avoid `var`
- Add space before function parentheses: `function example () {}`

### Naming Conventions
- **Files**: Use camelCase for JS files (e.g., `sampleController.js`)
- **Variables/Functions**: camelCase (e.g., `getUserData`)
- **Constants**: UPPER_SNAKE_CASE for true constants (e.g., `MAX_RETRIES`)
- **Classes**: PascalCase (e.g., `UserModel`)

### Code Organization
```
src/
├── index.js           # Application entry point
├── app.js             # Express app configuration
├── config/            # Environment-specific configurations
├── controllers/       # Request handlers (business logic)
├── routes/            # Express route definitions
├── models/            # Data models
└── utils/             # Shared utilities (logger, helpers)
```

## Development Workflow

### Running the Application
```bash
npm run dev          # Development mode with nodemon
npm start            # Production mode
```

### Testing
```bash
npm test             # Run all tests
npm run test:unit    # Unit tests only
npm run test:integration  # Integration tests only
npm run test:e2e     # End-to-end tests only
```

### Code Quality
```bash
npm run lint         # Check for linting errors
npm run lint:fix     # Auto-fix linting issues
```

**Always run linting before committing code.**

## Testing Guidelines

### Test Structure
- **Unit tests**: Located in `tests/unit/`, test individual functions/modules in isolation
- **Integration tests**: Located in `tests/integration/`, test API endpoints and component interactions
- **E2E tests**: Located in `tests/e2e/`, test complete user workflows

### Test Naming
- Test files should match the source file name with `.test.js` or `.spec.js` suffix
- Use descriptive test names: `describe('UserController', () => { test('should return 404 for non-existent user', ...) })`

### Test Coverage
- Aim for high test coverage, especially for controllers and critical business logic
- Always add tests when creating new features
- Update tests when modifying existing functionality

## Common Patterns

### Environment Configuration
- Use environment-specific configs in `src/config/`
- Load configuration based on `NODE_ENV`
- Never commit secrets; use `.env` files (excluded from git)

### Error Handling
- Use try-catch blocks in async controllers
- Return appropriate HTTP status codes
- Log errors with Winston logger
- Send consistent error responses with `success: false, error: { message, code }`

### Logging
- Use the Winston logger from `src/utils/logger.js`
- Log levels: `error`, `warn`, `info`, `debug`
- Include relevant context in logs (request ID, user ID, etc.)

### API Response Format
Consistent response structure:
```javascript
// Success
{ success: true, data: {...} }

// Error
{ success: false, error: { message: "...", code: "..." } }
```

## Docker and Deployment

- Docker configuration in `Dockerfile` (multi-stage build)
- Local development with `docker-compose.yml`
- Application runs as non-root user (`tabx`) for security
- Health check endpoint at `/health`

## Security Best Practices

- Use Helmet middleware for security headers
- Configure CORS appropriately per environment
- Validate all user inputs
- Never log sensitive data (passwords, tokens, etc.)
- Keep dependencies updated
- Use environment variables for secrets

## Key Files and Their Purposes

- `src/index.js`: Entry point, starts the server
- `src/app.js`: Express app setup, middleware configuration
- `src/utils/logger.js`: Winston logger configuration
- `.eslintrc.js`: Linting rules and configuration
- `jest.config.js`: Jest testing configuration
- `.env.example`: Template for environment variables

## When Making Changes

1. **Understand the context**: Read related code and tests
2. **Follow existing patterns**: Match the style of surrounding code
3. **Write tests**: Add/update tests for your changes
4. **Run lint and tests**: Ensure `npm run lint` and `npm test` pass
5. **Update documentation**: Modify README.md if adding features or changing behavior
6. **Keep changes minimal**: Make focused, single-purpose changes

## Common Commands Reference

```bash
# Install dependencies
npm install

# Development
npm run dev

# Testing
npm test
npm run test:unit
npm run test:integration
npm run test:e2e

# Code Quality
npm run lint
npm run lint:fix

# Docker
docker-compose up --build
docker build -t tabx-api .
docker run -p 3000:3000 tabx-api
```

## Additional Notes

- The application uses Winston for comprehensive logging to both console (dev) and files
- All routes should be organized under `src/routes/` with corresponding controllers
- Configuration is environment-aware (development, staging, production)
- Health checks are available at `/health` for monitoring
- CORS is configured per environment in config files
