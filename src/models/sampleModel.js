// Sample model - In a real application, this would interact with a database
const logger = require('../utils/logger')

// In-memory storage for demonstration (replace with actual database)
const samples = [
  {
    id: '1',
    name: 'Sample Item 1',
    description: 'This is the first sample item',
    category: 'demo',
    createdAt: new Date('2024-01-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString()
  },
  {
    id: '2',
    name: 'Sample Item 2',
    description: 'This is the second sample item',
    category: 'test',
    createdAt: new Date('2024-01-02').toISOString(),
    updatedAt: new Date('2024-01-02').toISOString()
  }
]

const sampleModel = {
  // Get all samples
  getAll: async () => {
    logger.info('Fetching all samples')
    return samples
  },

  // Get sample by ID
  getById: async (id) => {
    logger.info(`Fetching sample with ID: ${id}`)
    return samples.find(sample => sample.id === id)
  },

  // Create new sample
  create: async (sampleData) => {
    logger.info('Creating new sample:', sampleData)

    const newSample = {
      id: (samples.length + 1).toString(),
      name: sampleData.name,
      description: sampleData.description || '',
      category: sampleData.category || 'general',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    samples.push(newSample)
    return newSample
  },

  // Update sample
  update: async (id, updateData) => {
    logger.info(`Updating sample with ID: ${id}`, updateData)

    const sampleIndex = samples.findIndex(sample => sample.id === id)
    if (sampleIndex === -1) {
      return null
    }

    const updatedSample = {
      ...samples[sampleIndex],
      ...updateData,
      updatedAt: new Date().toISOString()
    }

    samples[sampleIndex] = updatedSample
    return updatedSample
  },

  // Delete sample
  deleteById: async (id) => {
    logger.info(`Deleting sample with ID: ${id}`)

    const sampleIndex = samples.findIndex(sample => sample.id === id)
    if (sampleIndex === -1) {
      return false
    }

    samples.splice(sampleIndex, 1)
    return true
  }
}

module.exports = sampleModel
