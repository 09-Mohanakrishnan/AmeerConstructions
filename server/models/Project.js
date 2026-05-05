import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  img: { type: String, required: true }, // Main image
  description: { type: String, required: true },
  client: { type: String },
  location: { type: String },
  year: { type: String },
  challenge: { type: String },
  solution: { type: String },
  specifications: [{
    label: { type: String },
    value: { type: String }
  }],
  gallery: [{ type: String }], // Array of image URLs
  isVisible: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 }
}, {
  timestamps: true
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
