const express = require('express');
const router = express.Router();
const { 
  createJob, 
  getJobs, 
  getJobById, 
  updateJob, 
  deleteJob 
} = require('../controllers/jobController');
const protect = require('../middlewares/authMiddleware');

// CREATE job (employer only)
router.post('/', protect, createJob);

// GET all jobs (public)
router.get('/', getJobs);

// GET single job by ID (public)
router.get('/:id', getJobById);

// UPDATE job (employer only)
router.put('/:id', protect, updateJob);

// DELETE job (employer only)
router.delete('/:id', protect, deleteJob);

module.exports = router;
