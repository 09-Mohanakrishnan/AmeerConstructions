import Testimonial from '../models/Testimonial.js';

export const getTestimonials = async (req, res) => {
  try {
    const query = req.query.all === 'true' ? {} : { isVisible: true };
    const testimonials = await Testimonial.find(query).sort({ sortOrder: 1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json(testimonial);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (testimonial) res.json(testimonial);
    else res.status(404).json({ message: 'Testimonial not found' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (testimonial) res.json({ message: 'Testimonial removed' });
    else res.status(404).json({ message: 'Testimonial not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
