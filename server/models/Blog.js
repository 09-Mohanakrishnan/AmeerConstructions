import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true }, // Rich text / HTML
  date: { type: String, required: true },
  author: { type: String, required: true },
  image: { type: String },
  category: { type: String },
  tags: [{ type: String }],
  isVisible: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 }
}, {
  timestamps: true
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
