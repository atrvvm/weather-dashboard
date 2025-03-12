import dotenv from 'dotenv';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import routes from './routes/index.js';  

const app = express();
const PORT = process.env.PORT || 3001;

// ✅ Corrected path for serving static files
app.use(express.static(path.join(__dirname, '../client/dist')));

// ✅ Middleware for JSON parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ API routes
app.use('/api', routes);

// ✅ Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
