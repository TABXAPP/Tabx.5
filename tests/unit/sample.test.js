const sampleModel = require('../../src/models/sampleModel')

describe('Sample Model', () => {
  beforeEach(() => {
    // Reset samples to initial state before each test
    jest.clearAllMocks()
  })

  describe('getAll', () => {
    test('should return all samples', async () => {
      const samples = await sampleModel.getAll()
      expect(Array.isArray(samples)).toBe(true)
      expect(samples.length).toBeGreaterThan(0)
    })
  })

  describe('getById', () => {
    test('should return a sample when valid ID is provided', async () => {
      const sample = await sampleModel.getById('1')
      expect(sample).toBeDefined()
      expect(sample.id).toBe('1')
    })

    test('should return undefined when invalid ID is provided', async () => {
      const sample = await sampleModel.getById('999')
      expect(sample).toBeUndefined()
    })
  })

  describe('create', () => {
    test('should create a new sample', async () => {
      const newSampleData = {
        name: 'Test Sample',
        description: 'Test Description',
        category: 'test'
      }

      const createdSample = await sampleModel.create(newSampleData)

      expect(createdSample).toBeDefined()
      expect(createdSample.name).toBe(newSampleData.name)
      expect(createdSample.description).toBe(newSampleData.description)
      expect(createdSample.category).toBe(newSampleData.category)
      expect(createdSample.id).toBeDefined()
      expect(createdSample.createdAt).toBeDefined()
      expect(createdSample.updatedAt).toBeDefined()
    })
  })

  describe('update', () => {
    test('should update an existing sample', async () => {
      const updateData = {
        name: 'Updated Sample Name',
        description: 'Updated Description'
      }

      const updatedSample = await sampleModel.update('1', updateData)

      expect(updatedSample).toBeDefined()
      expect(updatedSample.name).toBe(updateData.name)
      expect(updatedSample.description).toBe(updateData.description)
      expect(updatedSample.id).toBe('1')
    })

    test('should return null when updating non-existent sample', async () => {
      const updateData = { name: 'Updated Name' }
      const result = await sampleModel.update('999', updateData)
      expect(result).toBeNull()
    })
  })

  describe('delete', () => {
    test('should delete an existing sample', async () => {
      const result = await sampleModel.delete('1')
      expect(result).toBe(true)

      // Verify sample is deleted
      const deletedSample = await sampleModel.getById('1')
      expect(deletedSample).toBeUndefined()
    })

    test('should return false when deleting non-existent sample', async () => {
      const result = await sampleModel.delete('999')
      expect(result).toBe(false)
    })
  })
})
