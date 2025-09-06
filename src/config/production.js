const defaultConfig = require('./default')

module.exports = {
  ...defaultConfig,
  server: {
    ...defaultConfig.server,
    environment: 'production'
  },
  database: {
    ...defaultConfig.database,
    host: process.env.DB_HOST || 'prod-db.example.com',
    name: process.env.DB_NAME || 'tabx_production'
  },
  cors: {
    origin: process.env.CORS_ORIGIN || 'https://tabx.com'
  },
  logging: {
    ...defaultConfig.logging,
    level: process.env.LOG_LEVEL || 'error'
  },
  rateLimit: {
    ...defaultConfig.rateLimit,
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 500
  }
}
