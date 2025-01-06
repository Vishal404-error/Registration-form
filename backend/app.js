// // main server file that initializes the backend

// const express = require("express");
// const bodyParser = require("body-parser"); //set up middleware
// const cors = require("cors");
// const studentRoutes = require("./routes/studentRoutes");
// const authRoutes = require("./routes/authRoutes");
// require("dotenv").config();

// const app = express();

// // Middleware setup
// app.use(bodyParser.json());// Parses incoming JSON requests and makes the data accessible in `req.body`


// app.use(cors());// Allows your backend server to handle requests from different origins (like your frontend)


// app.use("/api", studentRoutes); //defines the base route for student related operations
// app.use("/api", authRoutes);

// // Defining the port number
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// backend/app.js
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const authRoutes = require('./routes/authRoutes');
// const studentRoutes = require('./routes/studentRoutes');
// const db = require('./config/db');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Routes
// app.use('/api/auth', authRoutes);  // Authentication routes
// app.use('/api/student', studentRoutes);  // Student-related routes

// // Test the connection
// db.connect((err) => {
//   if (err) {
//     console.error('Database connection failed: ' + err.stack);
//     return;
//   }
//   console.log('Connected to database');
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });



const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const protectedRoutes = require('./routes/protectedRoutes'); // Import your protected routes
const db = require('./config/db');

dotenv.config(); // Load environment variables from .env file

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);       // Authentication routes
app.use('/api/student', studentRoutes); // Student-related routes
app.use('/api/protected', protectedRoutes); // Protected routes

// Test the database connection
db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database');
});

// Root route (optional, for sanity check)
app.get('/', (req, res) => {
  res.send('Welcome to the Student Management System API');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
