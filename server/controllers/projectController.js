import Project from '../models/Project.js';

export const getProjects = async (req, res) => {
  try {
    const query = req.query.all === 'true' ? {} : { isVisible: true };
    const projects = await Project.find(query).sort({ sortOrder: 1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProjectBySlug = async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (project) res.json(project);
    else res.status(404).json({ message: 'Project not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (project) res.json(project);
    else res.status(404).json({ message: 'Project not found' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (project) res.json({ message: 'Project removed' });
    else res.status(404).json({ message: 'Project not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
