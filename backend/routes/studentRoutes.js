const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken"); // Import the middleware

const {
  registerStudent,
  getAllStudents, // Renamed for clarity
  getStudentDetails, // For logged-in student details
  deleteStudent,
  updateStudent,
  updatePassword, // Added update password handler
} = require("../controllers/studentController");

// Register a new student
router.post("/students", registerStudent);

// // Get all students (Admin-only functionality, if required)
// router.get("/students", getAllStudents);

// Get details of the logged-in student (protected route)
router.get("/students/me", verifyToken, getStudentDetails); // Protect the route with JWT verification

// Update student details by registration_id (changed from :id to :registration_id)
router.put("/students/:registration_id", updateStudent);

// Delete a student by registration_id (changed from :id to :registration_id)
router.delete("/students/:registration_id", deleteStudent);

// Update password for a student by registration_id (changed from :id to :registration_id)
router.put("/students/:registration_id/password", updatePassword);

module.exports = router;
