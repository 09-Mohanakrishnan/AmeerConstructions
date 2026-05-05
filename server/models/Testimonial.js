import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  text: { type: String, required: true },
  image: { type: String },
  isVisible: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 }
}, {
  timestamps: true
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

export default Testimonial;
