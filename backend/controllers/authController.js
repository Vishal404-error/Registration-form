// const db = require("../config/db");

// exports.login = (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   const query = "SELECT * FROM users WHERE username = ? AND password = ?";
//   db.query(query, [username, password], (err, results) => {
//     if (err) return res.status(500).json({ message: "Database error" });
//     if (results.length > 0) {
//       res.status(200).json({ message: "Login successful" });
//     } else {
//       res.status(401).json({ message: "Invalid credentials" });
//     }
//   });
// };

// CHANGE 1


// const bcrypt = require('bcryptjs'); // Import bcrypt for password comparison

// exports.login = (req, res) => {
//   const { username, password } = req.body; // username could be either email or registration_id

//   if (!username || !password) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   // Check if username is email or registration_id
//   let query;
//   if (validator.isEmail(username)) {
//     query = "SELECT * FROM students WHERE email = ?";
//   } else {
//     query = "SELECT * FROM students WHERE registration_id = ?";
//   }

//   db.query(query, [username], (err, results) => {
//     if (err) return res.status(500).json({ message: "Database error" });

//     if (results.length > 0) {
//       const user = results[0];

//       // Compare password with hashed password
//       bcrypt.compare(password, user.password, (err, isMatch) => {
//         if (err) return res.status(500).json({ message: "Error comparing password." });

//         if (isMatch) {
//           res.status(200).json({ message: "Login successful" });
//         } else {
//           res.status(401).json({ message: "Invalid credentials" });
//         }
//       });
//     } else {
//       res.status(401).json({ message: "Invalid credentials" });
//     }
//   });
// };


// CHANGE 2

// const db = require("../config/db");
// const bcrypt = require('bcryptjs');
// const validator = require('validator'); // Ensure validator is required

// exports.login = (req, res) => {
//   const { username, password } = req.body; // username could be email or registration_id

//   if (!username || !password) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   // Check if username is email or registration_id
//   let query;
//   if (validator.isEmail(username)) {
//     query = "SELECT * FROM students WHERE email = ?";
//   } else {
//     query = "SELECT * FROM students WHERE registration_id = ?";
//   }

//   db.query(query, [username], (err, results) => {
//     if (err) {
//       console.error("Database error:", err.message);
//       return res.status(500).json({ message: "Database error" });
//     }

//     if (results.length > 0) {
//       const user = results[0];  // Get the first user from results

//       // Log user data (for debugging)
//       console.log("User fetched from DB:", user);

//       // Compare password with hashed password
//       bcrypt.compare(password, user.password, (err, isMatch) => {
//         if (err) {
//           console.error("Error comparing password:", err.message);
//           return res.status(500).json({ message: "Error comparing password." });
//         }

//         if (isMatch) {
//           // Log successful login attempt
//           console.log("Login successful for:", user.email);
//         //   res.status(200).json({ message: "Login successful" });
//         res.status(200).json({ message: "Login successful", token: jwtToken });

//         } else {
//           // Log invalid credentials attempt
//           console.log("Invalid credentials for:", user.email);
//           res.status(401).json({ message: "Invalid credentials" });
//         }
//       });
//     } else {
//       console.log("No user found with username:", username);
//       res.status(401).json({ message: "Invalid credentials" });
//     }
//   });
// };

// change
// const bcrypt = require('bcryptjs'); // Import bcrypt for password comparison
// const validator = require('validator'); // Import validator for email validation
// const db = require('../config/db'); // Make sure db is required if it's used for DB queries

// exports.login = (req, res) => {
//   const { username, password } = req.body; // username could be either email or registration_id

//   if (!username || !password) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   // Check if username is email or registration_id
//   let query;
//   if (validator.isEmail(username)) {
//     query = "SELECT * FROM students WHERE email = ?";
//   } else {
//     query = "SELECT * FROM students WHERE registration_id = ?";
//   }

//   db.query(query, [username], (err, results) => {
//     if (err) return res.status(500).json({ message: "Database error" });

//     if (results.length > 0) {
//       const user = results[0];

//       // Compare password with hashed password
//       bcrypt.compare(password, user.password, (err, isMatch) => {
//         if (err) return res.status(500).json({ message: "Error comparing password." });

//         // Log the password comparison result for debugging
//         console.log("Password comparison result:", isMatch); // Log the result

//         if (isMatch) {
//           res.status(200).json({ message: "Login successful", token: "your-token-here" });
//         } else {
//           res.status(401).json({ message: "Invalid credentials" });
//         }
//       });
//     } else {
//       res.status(401).json({ message: "Invalid credentials" });
//     }
//   });
// };


// const bcrypt = require('bcryptjs'); // Import bcrypt for password comparison
// const validator = require('validator'); // Import validator for email validation
// const db = require('../config/db'); // Make sure db is required if it's used for DB queries
// const jwt = require('jsonwebtoken'); // Import JWT for creating tokens

// // Secret key for signing JWTs (it should be kept safe and secret)
// const JWT_SECRET_KEY = 'your-secret-key'; // Change this to a secure secret key

// exports.login = (req, res) => {
//   const { username, password } = req.body; // username could be either email or registration_id

//   if (!username || !password) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   // Check if username is email or registration_id
//   let query;
//   if (validator.isEmail(username)) {
//     query = "SELECT * FROM students WHERE email = ?";
//   } else {
//     query = "SELECT * FROM students WHERE registration_id = ?";
//   }

//   db.query(query, [username], (err, results) => {
//     if (err) return res.status(500).json({ message: "Database error" });

//     if (results.length > 0) {
//       const user = results[0];

//       // Compare password with hashed password
//       bcrypt.compare(password, user.password, (err, isMatch) => {
//         if (err) return res.status(500).json({ message: "Error comparing password." });

//         if (isMatch) {
//           // Create a JWT token if password matches
//           const token = jwt.sign(
//             { id: user.id, username: user.username }, // Payload (user info to include in the token)
//             JWT_SECRET_KEY, // Secret key to sign the token
//             { expiresIn: '1h' } // Expiry time of the token (e.g., 1 hour)
//           );

//           res.status(200).json({
//             message: "Login successful",
//             token: token, // Send the generated token
//           });
//         } else {
//           res.status(401).json({ message: "Invalid credentials" });
//         }
//       });
//     } else {
//       res.status(401).json({ message: "Invalid credentials" });
//     }
//   });
// };




// backend/controllers/authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "your-secret-key"; // Use environment variables for security

// Login Controller
exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Check if username is an email or registration_id
    const query = /\S+@\S+\.\S+/.test(username)
      ? "SELECT * FROM students WHERE email = ?"
      : "SELECT * FROM students WHERE registration_id = ?";
    
    const [results] = await db.promise().query(query, [username]);

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const user = results[0];

    // Compare hashed passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, registration_id: user.registration_id },
      JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful.",
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        registration_id: user.registration_id,
      },
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Server error during login." });
  }
};

