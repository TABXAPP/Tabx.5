const defaultConfig = require('./default')

module.exports = {
  ...defaultConfig,
  server: {
    ...defaultConfig.server,
    environment: 'staging'
  },
  database: {
    ...defaultConfig.database,
    host: process.env.DB_HOST || 'staging-db.example.com',
    name: process.env.DB_NAME || 'tabx_staging'
  },
  cors: {
    origin: process.env.CORS_ORIGIN || 'https://staging.tabx.com'
  },
  logging: {
    ...defaultConfig.logging,
    level: process.env.LOG_LEVEL || 'warn'
  },
  rateLimit: {
    ...defaultConfig.rateLimit,
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 200
  }
}
