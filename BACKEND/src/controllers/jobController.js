const Job = require('../models/Job');

// CREATE JOB (Employer only)
exports.createJob = async (req, res) => {
  try {
    if (req.user.role !== 'employer') {
      return res.status(403).json({ msg: "Only employers can post jobs" });
    }

    const { title, company, registrationDeadline, verificationLink } = req.body;

    // Validate registration deadline
    if (!registrationDeadline) {
      return res.status(400).json({ msg: "Registration deadline is required" });
    }

    const deadline = new Date(registrationDeadline);
    if (deadline < new Date()) {
      return res.status(400).json({ msg: "Registration deadline must be in the future" });
    }

    // Validate verification link
    if (!verificationLink) {
      return res.status(400).json({ msg: "Application/verification link is required" });
    }

    // Basic URL validation
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (!urlPattern.test(verificationLink)) {
      return res.status(400).json({ msg: "Please provide a valid URL for the application link" });
    }

    // Check duplicate
    const existingJob = await Job.findOne({ title, company, employerId: req.user.id });
    if (existingJob) {
      return res.status(400).json({ msg: "You already posted this job." });
    }

    const job = new Job({ ...req.body, employerId: req.user.id });
    await job.save();

    res.status(201).json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// GET ALL JOBS (Public)
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('employerId', 'fullname email').sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// GET SINGLE JOB BY ID (Public)
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('employerId', 'fullname email');
    if (!job) return res.status(404).json({ msg: "Job not found" });
    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// UPDATE JOB (Employer only, owner)
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ msg: "Job not found" });

    if (job.employerId.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    // Validate registration deadline if provided
    if (req.body.registrationDeadline) {
      const deadline = new Date(req.body.registrationDeadline);
      if (deadline < new Date()) {
        return res.status(400).json({ msg: "Registration deadline must be in the future" });
      }
    }

    // Validate verification link if provided
    if (req.body.verificationLink) {
      const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      if (!urlPattern.test(req.body.verificationLink)) {
        return res.status(400).json({ msg: "Please provide a valid URL for the application link" });
      }
    }

    // Prevent duplicate when updating title + company
    const { title, company } = req.body;
    if (title && company) {
      const existingJob = await Job.findOne({ 
        _id: { $ne: req.params.id }, 
        title, 
        company, 
        employerId: req.user.id 
      });
      if (existingJob) {
        return res.status(400).json({ msg: "You already posted a job with this title and company." });
      }
    }

    Object.assign(job, req.body);
    await job.save();

    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// DELETE JOB (Employer only, owner)
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ msg: "Job not found" });

    if (job.employerId.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    await job.deleteOne();
    res.json({ msg: "Job deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
};