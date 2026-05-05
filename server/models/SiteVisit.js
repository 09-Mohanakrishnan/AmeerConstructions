import mongoose from 'mongoose';

const siteVisitSchema = new mongoose.Schema({
  date: {
    type: String, // String format YYYY-MM-DD for easier matching
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    default: '',
  },
  technician: {
    type: String,
    default: 'Unassigned',
  },
  status: {
    type: String,
    enum: ['Scheduled', 'Completed', 'Cancelled'],
    default: 'Scheduled',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model('SiteVisit', siteVisitSchema);
