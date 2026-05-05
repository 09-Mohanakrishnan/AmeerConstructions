import Package from '../models/Package.js';

export const getPackages = async (req, res) => {
  try {
    const query = req.query.all === 'true' ? {} : { isVisible: true };
    const packages = await Package.find(query).sort({ sortOrder: 1 });
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPackageById = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (pkg) res.json(pkg);
    else res.status(404).json({ message: 'Package not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPackage = async (req, res) => {
  try {
    const pkg = await Package.create(req.body);
    res.status(201).json(pkg);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updatePackage = async (req, res) => {
  try {
    const pkg = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (pkg) res.json(pkg);
    else res.status(404).json({ message: 'Package not found' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deletePackage = async (req, res) => {
  try {
    const pkg = await Package.findByIdAndDelete(req.params.id);
    if (pkg) res.json({ message: 'Package removed' });
    else res.status(404).json({ message: 'Package not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
