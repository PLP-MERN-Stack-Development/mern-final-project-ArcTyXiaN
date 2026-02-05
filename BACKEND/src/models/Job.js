const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: Number },
  type: { 
    type: String, 
    enum: ['full-time', 'part-time', 'contract', 'internship'], 
    default: 'full-time' 
  },
  registrationDeadline: { 
    type: Date, 
    required: true 
  },
  verificationLink: {
    type: String,
    required: true
  },
  requirements: [String],
  benefits: [String],
  employerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  status: {
    type: String,
    enum: ['open', 'closed'],
    default: 'open'
  },
  createdAt: { type: Date, default: Date.now }
});

jobSchema.index({ title: 1, company: 1, employerId: 1 }, { unique: true });

jobSchema.virtual('isExpired').get(function() {
  return new Date() > this.registrationDeadline;
});

jobSchema.set('toJSON', { virtuals: true });
jobSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Job', jobSchema);