import Enquiry from '../models/Enquiry.js';

export const createEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.create(req.body);
    res.status(201).json(enquiry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEnquiryStatus = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id, 
      { status: req.body.status },
      { new: true }
    );
    if (enquiry) res.json(enquiry);
    else res.status(404).json({ message: 'Enquiry not found' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (enquiry) res.json({ message: 'Enquiry removed' });
    else res.status(404).json({ message: 'Enquiry not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
