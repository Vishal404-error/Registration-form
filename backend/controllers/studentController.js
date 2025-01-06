
const bcrypt = require("bcryptjs"); // Import bcrypt for password hashing
const validator = require("validator"); // For email and other validations
const db = require("../config/db"); // Ensure your database connection is correctly imported

// Function to generate a unique registration ID
const generateRegistrationId = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Async function to check and generate a unique registration ID
const checkAndGenerateId = async () => {
  const registrationId = generateRegistrationId(); // Generate registration ID
  try {
    const [results] = await db
      .promise()
      .query("SELECT registration_id FROM students WHERE registration_id = ?", [registrationId]);
    if (results.length > 0) {
      return checkAndGenerateId(); // Regenerate ID if already exists
    } else {
      return registrationId;
    }
  } catch (err) {
    console.error("Error checking registration ID:", err.message);
    throw new Error("Error checking registration ID");
  }
};

// Function to register a student
exports.registerStudent = async (req, res) => {
  const { name, qualification, university, grade, yearsOfStudy, email, password } = req.body;

  // Validate required fields
  if (!name || !qualification || !university || !grade || !yearsOfStudy || !email || !password || yearsOfStudy.length !== 2) {
    return res.status(400).json({
      message: "Please provide all required fields: name, qualification, university, grade, years of study, email, and password.",
    });
  }

  const [yearsOfStudyStart, yearsOfStudyEnd] = yearsOfStudy;

  // Validate name and university format
  if (!/^[A-Za-z\s]+$/.test(name) || !/^[A-Za-z\s]+$/.test(university)) {
    return res.status(400).json({ message: "Name and University can only contain letters and spaces." });
  }

  // Validate grade is a number between 0 and 10
  if (!validator.isFloat(grade.toString(), { min: 0, max: 10 })) {
    return res.status(400).json({ message: "Grade must be between 0 and 10." });
  }

  // Validate email format
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const registrationId = await checkAndGenerateId(); // Generate a unique registration ID

    const query = `
      INSERT INTO students 
      (registration_id, name, qualification, university, grade, years_of_study_start, years_of_study_end, email, password) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      registrationId,
      name.trim(),
      qualification,
      university.trim(),
      grade,
      yearsOfStudyStart,
      yearsOfStudyEnd,
      email,
      hashedPassword,
    ];

    await db.promise().query(query, values);

    res.status(201).json({
      message: "Student Registered Successfully",
      registrationId: registrationId,
    });
  } catch (err) {
    console.error("Error during registration:", err.message);
    res.status(500).json({ message: "Error during registration process." });
  }
};

// Function to fetch all students
exports.getAllStudents = async (req, res) => {
  try {
    const [results] = await db.promise().query("SELECT * FROM students");
    res.status(200).json(results); // Send the list of students
  } catch (err) {
    console.error("Error fetching students:", err.message);
    res.status(500).json({ message: "Error fetching students." });
  }
};

// Function to fetch details of logged-in student
exports.getStudentDetails = async (req, res) => {
  const registrationId = req.user.registration_id; // Use registration_id from JWT token

  try {
    const [results] = await db.promise().query("SELECT * FROM students WHERE registration_id = ?", [registrationId]);


    if (results.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(results[0]); // Return the student's details
  } catch (err) {
    console.error("Error fetching student details:", err.message);
    res.status(500).json({ message: "Error fetching student details." });
  }
};

// Function to delete a student by registration_id
exports.deleteStudent = async (req, res) => {
  const { registration_id } = req.params;
  try {
    await db.promise().query("DELETE FROM students WHERE registration_id = ?", [registration_id]);
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (err) {
    console.error("Error deleting student:", err.message);
    res.status(500).json({ message: "Error deleting student." });
  }
};

// Function to update student details
// exports.updateStudent = async (req, res) => {
//   const { registration_id } = req.params; // Match the route parameter with registration_id
//   const { name, qualification, university, grade, yearsOfStudy, email } = req.body;

//   if (!name || !qualification || !university || !grade || !yearsOfStudy || !email || yearsOfStudy.length !== 2) {
//     return res.status(400).json({ message: "Please provide all required fields." });
//   }

//   const [yearsOfStudyStart, yearsOfStudyEnd] = yearsOfStudy;

//   try {
//     const query = `
//       UPDATE students 
//       SET name = ?, qualification = ?, university = ?, grade = ?, years_of_study_start = ?, years_of_study_end = ?, email = ? 
//       WHERE registration_id = ?
//     `;
//     await db.promise().query(query, [
//       name.trim(),
//       qualification,
//       university.trim(),
//       grade,
//       yearsOfStudyStart,
//       yearsOfStudyEnd,
//       email,
//       registration_id,
//     ]);

//     res.status(200).json({ message: "Student details updated successfully" });
//   } catch (err) {
//     console.error("Error updating student details:", err.message);
//     res.status(500).json({ message: "Error updating student details." });
//   }
// };

// Function to update student details
exports.updateStudent = async (req, res) => {
  const { registration_id } = req.params; // Match the route parameter with registration_id
  const { name, qualification, university, grade, yearsOfStudy, email } = req.body;

  // Check for all required fields
  if (!name || !qualification || !university || !grade || !yearsOfStudy || !email || yearsOfStudy.length !== 2) {
    return res.status(400).json({ message: "Please provide all required fields." });
  }

  const [yearsOfStudyStart, yearsOfStudyEnd] = yearsOfStudy;

  // Log the years of study to check the values
  console.log("Updating student with registration_id:", registration_id);
  console.log("Start year:", yearsOfStudyStart, "End year:", yearsOfStudyEnd);

  try {
    const query = `
      UPDATE students 
      SET name = ?, qualification = ?, university = ?, grade = ?, years_of_study_start = ?, years_of_study_end = ?, email = ? 
      WHERE registration_id = ?
    `;
    await db.promise().query(query, [
      name.trim(),
      qualification,
      university.trim(),
      grade,
      yearsOfStudyStart,
      yearsOfStudyEnd,
      email,
      registration_id,
    ]);

    res.status(200).json({ message: "Student details updated successfully" });
  } catch (err) {
    console.error("Error updating student details:", err.message);
    res.status(500).json({ message: "Error updating student details." });
  }
};


// Function to update student's password
exports.updatePassword = async (req, res) => {
  const { registration_id } = req.params; // Use registration_id from the route parameter
  const { currentPassword, newPassword } = req.body;

  try {
    const [results] = await db.promise().query("SELECT * FROM students WHERE registration_id = ?", [registration_id]);
    if (results.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    const student = results[0];
    const isMatch = await bcrypt.compare(currentPassword, student.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.promise().query("UPDATE students SET password = ? WHERE registration_id = ?", [hashedPassword, registration_id]);

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Error updating password:", err.message);
    res.status(500).json({ message: "Error updating password." });
  }
};
