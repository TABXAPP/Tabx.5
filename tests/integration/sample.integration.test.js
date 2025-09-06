const request = require('supertest')
const app = require('../../src/index')

describe('Sample Routes Integration Tests', () => {
  describe('GET /api/sample', () => {
    test('should return all samples', async () => {
      const response = await request(app)
        .get('/api/sample')
        .expect(200)

      expect(response.body.success).toBe(true)
      expect(Array.isArray(response.body.data)).toBe(true)
      expect(response.body.count).toBeDefined()
    })
  })

  describe('GET /api/sample/:id', () => {
    test('should return a specific sample', async () => {
      const response = await request(app)
        .get('/api/sample/1')
        .expect(200)

      expect(response.body.success).toBe(true)
      expect(response.body.data).toBeDefined()
      expect(response.body.data.id).toBe('1')
    })

    test('should return 404 for non-existent sample', async () => {
      const response = await request(app)
        .get('/api/sample/999')
        .expect(404)

      expect(response.body.success).toBe(false)
      expect(response.body.error).toBe('Sample not found')
    })
  })

  describe('POST /api/sample', () => {
    test('should create a new sample', async () => {
      const newSample = {
        name: 'Integration Test Sample',
        description: 'Created via integration test',
        category: 'test'
      }

      const response = await request(app)
        .post('/api/sample')
        .send(newSample)
        .expect(201)

      expect(response.body.success).toBe(true)
      expect(response.body.data.name).toBe(newSample.name)
      expect(response.body.message).toBe('Sample created successfully')
    })
  })

  describe('PUT /api/sample/:id', () => {
    test('should update an existing sample', async () => {
      const updateData = {
        name: 'Updated Integration Test Sample',
        description: 'Updated via integration test'
      }

      const response = await request(app)
        .put('/api/sample/1')
        .send(updateData)
        .expect(200)

      expect(response.body.success).toBe(true)
      expect(response.body.data.name).toBe(updateData.name)
      expect(response.body.message).toBe('Sample updated successfully')
    })

    test('should return 404 when updating non-existent sample', async () => {
      const updateData = { name: 'Updated Name' }

      const response = await request(app)
        .put('/api/sample/999')
        .send(updateData)
        .expect(404)

      expect(response.body.success).toBe(false)
      expect(response.body.error).toBe('Sample not found')
    })
  })

  describe('DELETE /api/sample/:id', () => {
    test('should delete an existing sample', async () => {
      const response = await request(app)
        .delete('/api/sample/2')
        .expect(200)

      expect(response.body.success).toBe(true)
      expect(response.body.message).toBe('Sample deleted successfully')
    })

    test('should return 404 when deleting non-existent sample', async () => {
      const response = await request(app)
        .delete('/api/sample/999')
        .expect(404)

      expect(response.body.success).toBe(false)
      expect(response.body.error).toBe('Sample not found')
    })
  })

  describe('Health Check', () => {
    test('should return health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200)

      expect(response.body.status).toBe('OK')
      expect(response.body.timestamp).toBeDefined()
      expect(response.body.environment).toBeDefined()
    })
  })

  describe('Root Endpoint', () => {
    test('should return welcome message', async () => {
      const response = await request(app)
        .get('/')
        .expect(200)

      expect(response.body.message).toBe('Welcome to TABX Express API v5')
      expect(response.body.version).toBe('5.0.0')
      expect(response.body.status).toBe('running')
    })
  })

  describe('404 Handler', () => {
    test('should return 404 for non-existent routes', async () => {
      const response = await request(app)
        .get('/non-existent-route')
        .expect(404)

      expect(response.body.error).toBe('Route not found')
      expect(response.body.path).toBe('/non-existent-route')
      expect(response.body.method).toBe('GET')
    })
  })
})
