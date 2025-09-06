# TABX Express API v5

A modern, scalable Node.js Express API built with best practices for the TABX platform.

## 🚀 Features

- **RESTful API** with Express.js
- **Environment-based Configuration** (development, staging, production)
- **Comprehensive Logging** with Winston
- **Security First** with Helmet and CORS
- **Docker Support** with multi-stage builds
- **Testing Suite** (Unit, Integration, E2E)
- **CI/CD Pipeline** with GitHub Actions
- **Code Quality** with ESLint
- **Health Check Endpoints**

## 📋 Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- Docker (optional)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/TABXPRESS/Tabx.5.git
cd Tabx.5
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment file:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration.

## 🏃‍♂️ Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

### Using Docker
```bash
# Build and run with Docker Compose
docker-compose up --build

# Or build and run manually
docker build -t tabx-api .
docker run -p 3000:3000 tabx-api
```

## 🧪 Testing

Run all tests:
```bash
npm test
```

Run specific test suites:
```bash
npm run test:unit        # Unit tests
npm run test:integration # Integration tests
npm run test:e2e         # End-to-end tests
```

## 🔍 Code Quality

Lint the code:
```bash
npm run lint
```

Fix linting issues:
```bash
npm run lint:fix
```

## 📁 Project Structure

```
/tabx
├── .env.example             # Environment variables template
├── .env.staging.example     # Staging environment template
├── .env.production.example  # Production environment template
├── .eslintrc.js             # ESLint configuration
├── Dockerfile               # Docker configuration
├── docker-compose.yml       # Docker Compose setup
├── package.json             # Project dependencies and scripts
├── README.md                # Project documentation
├── src/                     # Source code
│   ├── index.js             # Application entry point
│   ├── utils/               # Utility modules
│   │   └── logger.js        # Winston logger configuration
│   ├── routes/              # Express routes
│   │   └── sampleRoute.js   # Sample API routes
│   ├── controllers/         # Request controllers
│   │   └── sampleController.js # Sample controller
│   ├── models/              # Data models
│   │   └── sampleModel.js   # Sample model
│   └── config/              # Configuration files
│       ├── default.js       # Default configuration
│       ├── staging.js       # Staging configuration
│       └── production.js    # Production configuration
└── tests/                   # Test files
    ├── unit/                # Unit tests
    │   └── sample.test.js   # Sample unit tests
    ├── integration/         # Integration tests
    │   └── sample.integration.test.js # Sample integration tests
    └── e2e/                 # End-to-end tests
        └── sample.e2e.spec.js # Sample E2E tests
```

## 🌐 API Endpoints

### Health Check
- `GET /health` - Application health status

### Sample API
- `GET /api/sample` - Get all samples
- `GET /api/sample/:id` - Get sample by ID
- `POST /api/sample` - Create new sample
- `PUT /api/sample/:id` - Update sample
- `DELETE /api/sample/:id` - Delete sample

### Example Sample Object
```json
{
  "id": "1",
  "name": "Sample Item",
  "description": "Sample description",
  "category": "demo",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## ⚙️ Configuration

The application supports multiple environments through configuration files:

- `src/config/default.js` - Default configuration
- `src/config/staging.js` - Staging overrides
- `src/config/production.js` - Production overrides

Environment variables can be set in `.env` files:

- `.env` - Local development
- `.env.staging` - Staging environment
- `.env.production` - Production environment

## 🔐 Security

- **Helmet** for security headers
- **CORS** configuration
- **Rate limiting** ready (configurable)
- **Environment-based secrets**
- **Docker security** with non-root user

## 📊 Logging

The application uses Winston for structured logging:

- **Console logging** in development
- **File logging** for all environments
- **Log levels**: error, warn, info, debug
- **Log rotation** ready for production

## 🚀 Deployment

### Docker Deployment
```bash
docker build -t tabx-api:latest .
docker run -d -p 3000:3000 --name tabx-api tabx-api:latest
```

### Docker Compose
```bash
docker-compose up -d
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please open an issue in the GitHub repository.

---

**TABX Express API v5** - Built with ❤️ by the TABXPRESS team