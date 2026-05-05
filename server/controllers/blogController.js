import mongoose from 'mongoose';
import Blog from '../models/Blog.js';

export const getBlogs = async (req, res) => {
  try {
    const query = req.query.all === 'true' ? {} : { isVisible: true };
    const blogs = await Blog.find(query).sort({ date: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const query = { $or: [{ slug }] };
    
    // Only check _id if it's a valid MongoDB ID format
    if (mongoose.Types.ObjectId.isValid(slug)) {
      query.$or.push({ _id: slug });
    }

    const blog = await Blog.findOne(query);
    if (blog) res.json(blog);
    else res.status(404).json({ message: 'Blog not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBlog = async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (blog) res.json(blog);
    else res.status(404).json({ message: 'Blog not found' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (blog) res.json({ message: 'Blog removed' });
    else res.status(404).json({ message: 'Blog not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
