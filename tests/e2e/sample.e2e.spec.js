// End-to-end tests would typically use a tool like Playwright, Cypress, or Puppeteer
// For this example, we'll simulate basic E2E scenarios

const request = require('supertest')
const app = require('../../src/app')

describe('TABX API E2E Tests', () => {
  describe('Complete API Workflow', () => {
    let createdSampleId

    test('should perform a complete CRUD workflow', async () => {
      // 1. Check initial state
      const initialResponse = await request(app)
        .get('/api/sample')
        .expect(200)

      const initialCount = initialResponse.body.count

      // 2. Create a new sample
      const newSample = {
        name: 'E2E Test Sample',
        description: 'Created during E2E testing',
        category: 'e2e-test'
      }

      const createResponse = await request(app)
        .post('/api/sample')
        .send(newSample)
        .expect(201)

      expect(createResponse.body.success).toBe(true)
      createdSampleId = createResponse.body.data.id

      // 3. Verify the sample was created
      const getResponse = await request(app)
        .get(`/api/sample/${createdSampleId}`)
        .expect(200)

      expect(getResponse.body.data.name).toBe(newSample.name)

      // 4. Update the sample
      const updateData = {
        name: 'Updated E2E Test Sample',
        description: 'Updated during E2E testing'
      }

      const updateResponse = await request(app)
        .put(`/api/sample/${createdSampleId}`)
        .send(updateData)
        .expect(200)

      expect(updateResponse.body.data.name).toBe(updateData.name)

      // 5. Verify the update
      const getUpdatedResponse = await request(app)
        .get(`/api/sample/${createdSampleId}`)
        .expect(200)

      expect(getUpdatedResponse.body.data.name).toBe(updateData.name)

      // 6. Delete the sample
      const deleteResponse = await request(app)
        .delete(`/api/sample/${createdSampleId}`)
        .expect(200)

      expect(deleteResponse.body.success).toBe(true)

      // 7. Verify the sample was deleted
      await request(app)
        .get(`/api/sample/${createdSampleId}`)
        .expect(404)

      // 8. Check final state
      const finalResponse = await request(app)
        .get('/api/sample')
        .expect(200)

      expect(finalResponse.body.count).toBe(initialCount)
    })
  })

  describe('API Error Handling', () => {
    test('should handle invalid JSON gracefully', async () => {
      const response = await request(app)
        .post('/api/sample')
        .set('Content-Type', 'application/json')
        .send('invalid json')
        .expect(500) // Express returns 500 for JSON parse errors by default

      expect(response.body.error).toBe('Internal Server Error')
    })
  })

  describe('API Performance', () => {
    test('should respond to health check quickly', async () => {
      const startTime = Date.now()

      await request(app)
        .get('/health')
        .expect(200)

      const responseTime = Date.now() - startTime
      expect(responseTime).toBeLessThan(1000) // Should respond within 1 second
    })

    test('should handle multiple concurrent requests', async () => {
      const promises = Array.from({ length: 10 }, () =>
        request(app).get('/api/sample').expect(200)
      )

      const responses = await Promise.all(promises)

      responses.forEach(response => {
        expect(response.body.success).toBe(true)
        expect(Array.isArray(response.body.data)).toBe(true)
      })
    })
  })

  describe('API Security', () => {
    test('should have security headers', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200)

      // Check for some common security headers (helmet middleware)
      expect(response.headers['x-content-type-options']).toBe('nosniff')
      expect(response.headers['x-frame-options']).toBeDefined()
    })

    test('should handle CORS properly', async () => {
      const response = await request(app)
        .options('/api/sample')
        .set('Origin', 'http://localhost:3000')

      expect(response.headers['access-control-allow-origin']).toBeDefined()
    })
  })
})
