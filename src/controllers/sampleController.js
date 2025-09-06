const sampleModel = require('../models/sampleModel')
const logger = require('../utils/logger')

const sampleController = {
  // Get all samples
  getAllSamples: async (req, res) => {
    try {
      const samples = await sampleModel.getAll()
      res.json({
        success: true,
        data: samples,
        count: samples.length
      })
    } catch (error) {
      logger.error('Error getting all samples:', error)
      res.status(500).json({
        success: false,
        error: 'Failed to retrieve samples'
      })
    }
  },

  // Get sample by ID
  getSampleById: async (req, res) => {
    try {
      const { id } = req.params
      const sample = await sampleModel.getById(id)

      if (!sample) {
        return res.status(404).json({
          success: false,
          error: 'Sample not found'
        })
      }

      res.json({
        success: true,
        data: sample
      })
    } catch (error) {
      logger.error('Error getting sample by ID:', error)
      res.status(500).json({
        success: false,
        error: 'Failed to retrieve sample'
      })
    }
  },

  // Create new sample
  createSample: async (req, res) => {
    try {
      const sampleData = req.body
      const newSample = await sampleModel.create(sampleData)

      res.status(201).json({
        success: true,
        data: newSample,
        message: 'Sample created successfully'
      })
    } catch (error) {
      logger.error('Error creating sample:', error)
      res.status(400).json({
        success: false,
        error: 'Failed to create sample'
      })
    }
  },

  // Update sample
  updateSample: async (req, res) => {
    try {
      const { id } = req.params
      const updateData = req.body
      const updatedSample = await sampleModel.update(id, updateData)

      if (!updatedSample) {
        return res.status(404).json({
          success: false,
          error: 'Sample not found'
        })
      }

      res.json({
        success: true,
        data: updatedSample,
        message: 'Sample updated successfully'
      })
    } catch (error) {
      logger.error('Error updating sample:', error)
      res.status(400).json({
        success: false,
        error: 'Failed to update sample'
      })
    }
  },

  // Delete sample
  deleteSample: async (req, res) => {
    try {
      const { id } = req.params
      const deleted = await sampleModel.delete(id)

      if (!deleted) {
        return res.status(404).json({
          success: false,
          error: 'Sample not found'
        })
      }

      res.json({
        success: true,
        message: 'Sample deleted successfully'
      })
    } catch (error) {
      logger.error('Error deleting sample:', error)
      res.status(500).json({
        success: false,
        error: 'Failed to delete sample'
      })
    }
  }
}

module.exports = sampleController
