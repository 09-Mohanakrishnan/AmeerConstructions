import Service from '../models/Service.js';

export const getServices = async (req, res) => {
  try {
    const query = req.query.all === 'true' ? {} : { isVisible: true };
    const services = await Service.find(query).sort({ sortOrder: 1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getServiceBySlug = async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug });
    if (service) res.json(service);
    else res.status(404).json({ message: 'Service not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (service) res.json(service);
    else res.status(404).json({ message: 'Service not found' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (service) res.json({ message: 'Service removed' });
    else res.status(404).json({ message: 'Service not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
