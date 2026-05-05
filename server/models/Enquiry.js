import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  interest: {
    type: String,
    enum: ['General', 'Residential', 'Commercial', 'Industrial', 'Silver', 'Gold', 'Platinum'],
    default: 'General'
  },
  status: {
    type: String,
    enum: ['New', 'In-Progress', 'Closed'],
    default: 'New'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Enquiry', enquirySchema);
