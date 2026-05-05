import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// ES Module __dirname polyfill
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

import connectDB from './config/db.js';
import errorHandler from './middleware/errorHandler.js';
import upload from './middleware/upload.js';
import { protect } from './middleware/auth.js';

// Routes
import authRoutes from './routes/auth.js';
import serviceRoutes from './routes/services.js';
import blogRoutes from './routes/blogs.js';
import projectRoutes from './routes/projects.js';
import packageRoutes from './routes/packages.js';
import testimonialRoutes from './routes/testimonials.js';
import enquiryRoutes from './routes/enquiries.js';
import newsletterRoutes from './routes/newsletter.js';
import siteVisitRoutes from './routes/siteVisits.js';

const app = express();

// Set default fallback values for connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ameer-civil-engineers';

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/site-visits', siteVisitRoutes);

// File Upload Endpoint
app.post('/api/upload', protect, upload.single('image'), (req, res) => {
  if (req.file) {
    // Cloudinary returns the full URL in .path
    res.json({ filePath: req.file.path });
  } else {
    res.status(400).json({ message: 'No file uploaded' });
  }
});

app.post('/api/upload/multiple', protect, upload.array('images', 10), (req, res) => {
  const filePaths = req.files.map((file) => file.path);
  res.json({ filePaths });
});

// Serve Frontend in Production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'dist')));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'))
  );
} else {
  // Root
  app.get('/', (req, res) => {
    res.send('Ameer Civil Engineers API is running...');
  });
}

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
