import express from 'express';
import { createEnquiry, getEnquiries, updateEnquiryStatus, deleteEnquiry } from '../controllers/enquiryController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public route to submit enquiry
router.post('/', createEnquiry);

// Protected routes for admin
router.get('/', protect, getEnquiries);
router.put('/:id', protect, updateEnquiryStatus);
router.delete('/:id', protect, deleteEnquiry);

export default router;
