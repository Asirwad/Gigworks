import dotenv from "dotenv"
import { connect } from 'mongoose';
import cors from 'cors';
import express, { json } from 'express';
import bodyParser from 'body-parser';

import gigRoutes from './routes/gigRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import User from "./models/user.js";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const trebble = require('@treblle/express');
const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;


// Connect to the database
connect(process.env.MONGODB_URI).then(() => {
    console.log('MongoDB connected')
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  }).catch(err => console.log("Error connecting MongoDB",err));

// Middleware
app.use(trebble());
app.use(json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));


// Routes
app.use('/api/v1', gigRoutes);
app.use('/api/v1', profileRoutes);

