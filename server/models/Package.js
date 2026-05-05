import mongoose from 'mongoose';

const detailItemSchema = new mongoose.Schema({
  label: String,
  value: String,
  included: Boolean
});

const packageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: String, required: true },
  icon: { type: String },
  isPopular: { type: Boolean, default: false },
  features: [{
    text: String,
    included: { type: Boolean, default: true }
  }],
  details: {
    design: [detailItemSchema],
    civil: [detailItemSchema],
    finishing: [detailItemSchema]
  },
  isVisible: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 }
}, {
  timestamps: true
});

const Package = mongoose.model('Package', packageSchema);

export default Package;
