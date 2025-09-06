// Jest setup file
// This file is executed before each test file

// Suppress console.log during tests unless explicitly needed
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn()
}

// Set test environment variables
process.env.NODE_ENV = 'test'
process.env.LOG_LEVEL = 'error'

// Use random port for tests to avoid conflicts
process.env.PORT = String(3000 + Math.floor(Math.random() * 1000))

// Increase timeout for integration tests
jest.setTimeout(30000)
