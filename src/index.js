const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
require('dotenv').config()

const logger = require('./utils/logger')
const config = require('./config/default')
const sampleRoute = require('./routes/sampleRoute')

const app = express()

// Security middleware
app.use(helmet())

// CORS middleware
app.use(cors({
  origin: config.cors.origin,
  credentials: true
}))

// Logging middleware
app.use(morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim())
  }
}))

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/sample', sampleRoute)

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    version: process.env.npm_package_version || '1.0.0'
  })
})

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to TABX Express API v5',
    version: '5.0.0',
    status: 'running'
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method
  })
})

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', err)
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  })
})

const PORT = config.server.port
app.listen(PORT, () => {
  logger.info(`🚀 TABX Express API v5 server running on port ${PORT}`)
  logger.info(`📝 Environment: ${process.env.NODE_ENV || 'development'}`)
  logger.info(`🌐 Access URL: http://localhost:${PORT}`)
})

module.exports = app
