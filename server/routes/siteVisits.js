import express from 'express';
import SiteVisit from '../models/SiteVisit.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Get all visits
router.get('/', protect, async (req, res) => {
  try {
    const visits = await SiteVisit.find().sort({ date: 1 });
    res.json(visits);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create/Update visit
router.post('/', protect, async (req, res) => {
  try {
    const { date, title, notes, technician, status } = req.body;
    
    // Upsert logic: if visit exists for this date and title, update it. 
    // Otherwise create new.
    let visit = await SiteVisit.findOne({ date, title });
    
    if (visit) {
      visit.notes = notes;
      visit.technician = technician;
      visit.status = status;
      await visit.save();
    } else {
      visit = await SiteVisit.create({ date, title, notes, technician, status });
    }
    
    res.status(201).json(visit);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete visit
router.delete('/:id', protect, async (req, res) => {
  try {
    await SiteVisit.findByIdAndDelete(req.params.id);
    res.json({ message: 'Visit removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
