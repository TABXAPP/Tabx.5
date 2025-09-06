const express = require('express')
const router = express.Router()
const sampleController = require('../controllers/sampleController')

// GET /api/sample - Get all samples
router.get('/', sampleController.getAllSamples)

// GET /api/sample/:id - Get a specific sample
router.get('/:id', sampleController.getSampleById)

// POST /api/sample - Create a new sample
router.post('/', sampleController.createSample)

// PUT /api/sample/:id - Update a sample
router.put('/:id', sampleController.updateSample)

// DELETE /api/sample/:id - Delete a sample
router.delete('/:id', sampleController.deleteSample)

module.exports = router
