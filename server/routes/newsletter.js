import express from 'express';
import Newsletter from '../models/Newsletter.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public subscribe
router.post('/', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });
    
    // Check if already subscribed
    const existing = await Newsletter.findOne({ email });
    if (existing) return res.status(400).json({ message: 'You are already subscribed!' });

    await Newsletter.create({ email });
    res.status(201).json({ message: 'Subscribed successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Subscription failed' });
  }
});

// Admin get subscribers
router.get('/', protect, async (req, res) => {
  try {
    const subscribers = await Newsletter.find().sort({ subscribedAt: -1 });
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin delete subscriber
router.delete('/:id', protect, async (req, res) => {
  try {
    await Newsletter.findByIdAndDelete(req.params.id);
    res.json({ message: 'Subscriber removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
