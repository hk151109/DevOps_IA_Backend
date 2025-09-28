// npm imports
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

// file imports
const router = require("./src/routers");
const customErrorHandler = require("./src/middlewares/errors/customErrorHandler");

// database
require("./src/configs/dbConnection");

// app settings
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: true, // Allow all origins for development
    credentials: true,
  })
);

// Serve static files (uploads) for external access
const path = require("path");
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// router
// router prefix /api
app.use("/api", router);

// health
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'backend', time: new Date().toISOString() });
});

// database test endpoint
app.get('/db-test', async (req, res) => {
  try {
    const mongoose = require('mongoose');
    const dbState = mongoose.connection.readyState;
    const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
    
    res.json({ 
      status: 'ok', 
      database: states[dbState] || 'unknown',
      mongoUri: process.env.MONGO_DB_URL ? 'configured' : 'missing'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// error handler
app.use(customErrorHandler);

// listen
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(PORT, " active"));

// simple health endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});
