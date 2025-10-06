require('dotenv').config()

const app = require('./app')
const logger = require('./utils/logger')
const config = require('./config/default')

const PORT = config.server.port
app.listen(PORT, () => {
  logger.info(`🚀 TABX Express API v5 server running on port ${PORT}`)
  logger.info(`📝 Environment: ${process.env.NODE_ENV || 'development'}`)
  logger.info(`🌐 Access URL: http://localhost:${PORT}`)
})

module.exports = app
