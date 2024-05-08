const express = require('express');
const db = require('./src/db/db');
const userRoutes = require("./src/routes/userRoutes");
const flowRoutes = require("./src/routes/flowRoutes");
const cors = require('cors');
const morgan = require('morgan'); // Import the morgan middleware
require('dotenv').config();

const app = express();

app.use(express.json());

// Use Morgan middleware for logging HTTP requests
app.use(morgan('dev'));

// Enable CORS

app.use(cors());

// Define routes
app.use("/api", userRoutes);
app.use("/api", flowRoutes);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

