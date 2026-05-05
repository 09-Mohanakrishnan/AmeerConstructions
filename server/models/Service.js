import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  icon: { type: String, required: true },
  shortDesc: { type: String, required: true },
  fullDesc: { type: String, required: true },
  features: [{ type: String }],
  image: { type: String },
  process: [{
    title: { type: String },
    desc: { type: String }
  }],
  benefits: [{ type: String }],
  isVisible: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 }
}, {
  timestamps: true
});

const Service = mongoose.model('Service', serviceSchema);

export default Service;
