// // Importing the database connection
// const db = require("../config/db");

// // Function to handle student registration
// exports.registerStudent = (req, res) => {
//   // Destructure the incoming data from the request body
//   const { name, qualification, university, grade, yearsOfStudy } = req.body;

//   // Validate that all required fields are provided
//   if (!name || !qualification || !university || !grade || !yearsOfStudy || yearsOfStudy.length !== 2) {
//     return res.status(400).json({
//       message: "Please provide all required fields: name, qualification, university, grade, and years of study (start and end)."
//     });
//   }

//   // Extract start and end years from yearsOfStudy
//   const [years_of_study_start, years_of_study_end] = yearsOfStudy;

//   // Validation: Check if the name only contains letters and spaces
//   const nameRegex = /^[A-Za-z\s]+$/;
//   if (!nameRegex.test(name)) {
//     return res.status(400).json({
//       message: "Name can only contain letters and spaces, and cannot contain numbers or special characters."
//     });
//   }

//   // Validation: Check if the university only contains letters and spaces
//   const universityRegex = /^[A-Za-z\s]+$/;
//   if (!universityRegex.test(university)) {
//     return res.status(400).json({
//       message: "University can only contain letters and spaces, and cannot contain numbers or special characters."
//     });
//   }
 
//   // Validation: Check if the years are valid dates
//   const isValidDate = (date) => !isNaN(new Date(date).getTime());
//   if (!isValidDate(years_of_study_start) || !isValidDate(years_of_study_end)) {
//     return res.status(400).json({
//       message: "Invalid years of study. Dates must be in YYYY-MM-DD format."
//     });
//   }

//   // Validation: Check that the end year is after the start year
//   if (new Date(years_of_study_start) >= new Date(years_of_study_end)) {
//     return res.status(400).json({
//       message: "End year must be after start year."
//     });
//   }

//   // Validation: Check if grade is a number between 0 and 10
//   if (isNaN(grade) || grade < 0 || grade > 10) {
//     return res.status(400).json({
//       message: "Grade must be a number between 0 and 10."
//     });
//   }
   
  
//   // Prepare the SQL query and data for insertion
//   const query = "INSERT INTO students (name, qualification, university, grade, years_of_study_start, years_of_study_end) VALUES (?, ?, ?, ?, ?, ?)";
//   const values = [name, qualification, university, grade, years_of_study_start, years_of_study_end];

//   // Execute the SQL query to insert the student record
//   db.query(query, values, (err) => {
//     if (err) {
//       console.error("Error inserting student:", err); // Log the error for debugging
//       return res.status(500).json({
//         message: "Error inserting student into the database.",
//         error: err
//       });
//     }
//     // Send success response if no errors occur
//     res.status(201).json({ message: "Student Registered Successfully" });
//   });
// };


// CHANGE 1

// const db = require("../config/db");
// const validator = require("validator");

// // Function to generate a 6-digit random number as registration ID
// const generateRegistrationId = () => {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// };

// exports.registerStudent = (req, res) => {
//   try {
//     const { name, qualification, university, grade, yearsOfStudy } = req.body;

//     // Validate input
//     if (!name || !qualification || !university || !grade || !yearsOfStudy || yearsOfStudy.length !== 2) {
//       return res.status(400).json({
//         message: "Please provide all required fields: name, qualification, university, grade, and years of study.",
//       });
//     }

//     const [yearsOfStudyStart, yearsOfStudyEnd] = yearsOfStudy;

//     if (!/^[A-Za-z\s]+$/.test(name) || !/^[A-Za-z\s]+$/.test(university)) {
//       return res.status(400).json({ message: "Name and University can only contain letters and spaces." });
//     }

//     if (!validator.isFloat(grade.toString(), { min: 0, max: 10 })) {
//       return res.status(400).json({ message: "Grade must be between 0 and 10." });
//     }

//     if (!validator.isDate(yearsOfStudyStart) || !validator.isDate(yearsOfStudyEnd)) {
//       return res.status(400).json({ message: "Dates must be in YYYY-MM-DD format." });
//     }

//     if (new Date(yearsOfStudyStart) >= new Date(yearsOfStudyEnd)) {
//       return res.status(400).json({ message: "End year must be after start year." });
//     }

//     // Generate a unique 6-digit registration ID
//     const checkAndGenerateId = () => {
//       return new Promise((resolve, reject) => {
//         const registrationId = generateRegistrationId();

//         // Check if registrationId already exists
//         db.query(
//           "SELECT registration_id FROM students WHERE registration_id = ?",
//           [registrationId],
//           (err, results) => {
//             if (err) return reject(err);

//             if (results.length > 0) {
//               // If ID exists, recursively generate a new one
//               resolve(checkAndGenerateId());
//             } else {
//               resolve(registrationId);
//             }
//           }
//         );
//       });
//     };

//     checkAndGenerateId()
//       .then((registrationId) => {
//         // SQL query to insert student data
//         const query = `
//           INSERT INTO students 
//           (registration_id, name, qualification, university, grade, years_of_study_start, years_of_study_end) 
//           VALUES (?, ?, ?, ?, ?, ?, ?)
//         `;
//         const values = [
//           registrationId,
//           name.trim(),
//           qualification,
//           university.trim(),
//           grade,
//           yearsOfStudyStart,
//           yearsOfStudyEnd,
//         ];

//         // Execute the query
//         db.query(query, values, (err) => {
//           if (err) {
//             console.error("Error inserting student:", err.message);
//             return res.status(500).json({ message: "Error inserting student into the database." });
//           }

//           // Send success response
//           res.status(201).json({
//             message: "Student Registered Successfully",
//             registrationId: registrationId,
//           });
//         });
//       })
//       .catch((err) => {
//         console.error("Error generating registration ID:", err.message);
//         res.status(500).json({ message: "Failed to generate a unique registration ID." });
//       });
//   } catch (error) {
//     console.error("Unexpected server error:", error.message);
//     res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
//   }
// };

// // Function to fetch all students
// exports.getStudents = (req, res) => {
//   db.query("SELECT * FROM students", (err, results) => {
//     if (err) {
//       console.error("Error fetching students:", err.message);
//       return res.status(500).json({ message: "Error fetching students." });
//     }
//     res.status(200).json(results); // Send the list of students
//   });
// };

// // Function to delete a student by ID
// exports.deleteStudent = (req, res) => {
//   const { id } = req.params;
//   db.query("DELETE FROM students WHERE id = ?", [id], (err) => {
//     if (err) {
//       console.error("Error deleting student:", err.message);
//       return res.status(500).json({ message: "Error deleting student." });
//     }
//     res.status(200).json({ message: "Student deleted successfully" });
//   });
// };

// CHANGE 2

// const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing
// const validator = require('validator'); // For email and other validations
// const db = require("../config/db"); // Ensure your database connection is correctly imported

// // Function to generate a unique registration ID
// const generateRegistrationId = () => {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// };

// // Async function to check and generate a unique registration ID
// const checkAndGenerateId = async () => {
//   const registrationId = generateRegistrationId(); // Generate registration ID
//   try {
//     const [results] = await db.promise().query("SELECT registration_id FROM students WHERE registration_id = ?", [registrationId]);
//     if (results.length > 0) {
//       return checkAndGenerateId(); // Regenerate ID if already exists
//     } else {
//       return registrationId;
//     }
//   } catch (err) {
//     console.error("Error checking registration ID:", err.message);
//     throw new Error("Error checking registration ID");
//   }
// };

// // Function to register a student
// exports.registerStudent = async (req, res) => {
//   const { name, qualification, university, grade, yearsOfStudy, email, password } = req.body;

//   // Validate required fields
//   if (!name || !qualification || !university || !grade || !yearsOfStudy || !email || !password || yearsOfStudy.length !== 2) {
//     return res.status(400).json({
//       message: "Please provide all required fields: name, qualification, university, grade, years of study, email, and password.",
//     });
//   }

//   const [yearsOfStudyStart, yearsOfStudyEnd] = yearsOfStudy;

//   // Validate name and university format
//   if (!/^[A-Za-z\s]+$/.test(name) || !/^[A-Za-z\s]+$/.test(university)) {
//     return res.status(400).json({ message: "Name and University can only contain letters and spaces." });
//   }

//   // Validate grade is a number between 0 and 10
//   if (!validator.isFloat(grade.toString(), { min: 0, max: 10 })) {
//     return res.status(400).json({ message: "Grade must be between 0 and 10." });
//   }

//   // Validate email format
//   if (!validator.isEmail(email)) {
//     return res.status(400).json({ message: "Invalid email format." });
//   }

//   // Hash the password before saving it
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10); // Using async/await for password hashing

//     // Generate a unique registration ID
//     const registrationId = await checkAndGenerateId();

//     const query = `
//       INSERT INTO students 
//       (registration_id, name, qualification, university, grade, years_of_study_start, years_of_study_end, email, password) 
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;
//     const values = [
//       registrationId,
//       name.trim(),
//       qualification,
//       university.trim(),
//       grade,
//       yearsOfStudyStart,
//       yearsOfStudyEnd,
//       email,
//       hashedPassword,
//     ];

//     await db.promise().query(query, values);

//     res.status(201).json({
//       message: "Student Registered Successfully",
//       registrationId: registrationId,
//     });
//   } catch (err) {
//     console.error("Error during registration:", err.message);
//     res.status(500).json({ message: "Error during registration process." });
//   }
// };

// // Function to fetch all students
// exports.getStudents = async (req, res) => {
//   try {
//     const [results] = await db.promise().query("SELECT * FROM students");
//     res.status(200).json(results); // Send the list of students
//   } catch (err) {
//     console.error("Error fetching students:", err.message);
//     res.status(500).json({ message: "Error fetching students." });
//   }
// };

// // Function to delete a student by ID
// exports.deleteStudent = async (req, res) => {
//   const { id } = req.params;
//   try {
//     await db.promise().query("DELETE FROM students WHERE id = ?", [id]);
//     res.status(200).json({ message: "Student deleted successfully" });
//   } catch (err) {
//     console.error("Error deleting student:", err.message);
//     res.status(500).json({ message: "Error deleting student." });
//   }
// };


//change 3


// const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing
// const validator = require('validator'); // For email and other validations
// const db = require("../config/db"); // Ensure your database connection is correctly imported

// // Function to generate a unique registration ID
// const generateRegistrationId = () => {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// };

// // Async function to check and generate a unique registration ID
// const checkAndGenerateId = async () => {
//   const registrationId = generateRegistrationId(); // Generate registration ID
//   try {
//     const [results] = await db.promise().query("SELECT registration_id FROM students WHERE registration_id = ?", [registrationId]);
//     if (results.length > 0) {
//       return checkAndGenerateId(); // Regenerate ID if already exists
//     } else {
//       return registrationId;
//     }
//   } catch (err) {
//     console.error("Error checking registration ID:", err.message);
//     throw new Error("Error checking registration ID");
//   }
// };

// // Function to register a student
// exports.registerStudent = async (req, res) => {
//   const { name, qualification, university, grade, yearsOfStudy, email, password } = req.body;

//   // Validate required fields
//   if (!name || !qualification || !university || !grade || !yearsOfStudy || !email || !password || yearsOfStudy.length !== 2) {
//     return res.status(400).json({
//       message: "Please provide all required fields: name, qualification, university, grade, years of study, email, and password.",
//     });
//   }

//   const [yearsOfStudyStart, yearsOfStudyEnd] = yearsOfStudy;

//   // Validate name and university format
//   if (!/^[A-Za-z\s]+$/.test(name) || !/^[A-Za-z\s]+$/.test(university)) {
//     return res.status(400).json({ message: "Name and University can only contain letters and spaces." });
//   }

//   // Validate grade is a number between 0 and 10
//   if (!validator.isFloat(grade.toString(), { min: 0, max: 10 })) {
//     return res.status(400).json({ message: "Grade must be between 0 and 10." });
//   }

//   // Validate email format
//   if (!validator.isEmail(email)) {
//     return res.status(400).json({ message: "Invalid email format." });
//   }

//   // Hash the password before saving it
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10); // Using async/await for password hashing

//     // Generate a unique registration ID
//     const registrationId = await checkAndGenerateId();

//     const query = `
//       INSERT INTO students 
//       (registration_id, name, qualification, university, grade, years_of_study_start, years_of_study_end, email, password) 
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;
//     const values = [
//       registrationId,
//       name.trim(),
//       qualification,
//       university.trim(),
//       grade,
//       yearsOfStudyStart,
//       yearsOfStudyEnd,
//       email,
//       hashedPassword,
//     ];

//     await db.promise().query(query, values);

//     res.status(201).json({
//       message: "Student Registered Successfully",
//       registrationId: registrationId,
//     });
//   } catch (err) {
//     console.error("Error during registration:", err.message);
//     res.status(500).json({ message: "Error during registration process." });
//   }
// };

// // Function to fetch all students
// exports.getStudents = async (req, res) => {
//   try {
//     const [results] = await db.promise().query("SELECT * FROM students");
//     res.status(200).json(results); // Send the list of students
//   } catch (err) {
//     console.error("Error fetching students:", err.message);
//     res.status(500).json({ message: "Error fetching students." });
//   }
// };

// // Function to delete a student by ID
// exports.deleteStudent = async (req, res) => {
//   const { id } = req.params;
//   try {
//     await db.promise().query("DELETE FROM students WHERE id = ?", [id]);
//     res.status(200).json({ message: "Student deleted successfully" });
//   } catch (err) {
//     console.error("Error deleting student:", err.message);
//     res.status(500).json({ message: "Error deleting student." });
//   }
// };

// // Function to get student details by email or registration_id
// exports.getStudentById = async (req, res) => {
//   const { identifier } = req.params; // Match the route parameter
//   if (!identifier) {
//     return res.status(400).json({ message: "Identifier (email or registration_id) is required." });
//   }

//   let query;
//   if (validator.isEmail(identifier)) {
//     query = "SELECT * FROM students WHERE email = ?";
//   } else {
//     query = "SELECT * FROM students WHERE registration_id = ?";
//   }

//   try {
//     const [results] = await db.promise().query(query, [identifier]);
//     if (results.length === 0) {
//       return res.status(404).json({ message: "Student not found" });
//     }
//     res.status(200).json(results[0]);
//   } catch (err) {
//     console.error("Error fetching student details:", err.message);
//     res.status(500).json({ message: "Error fetching student details." });
//   }
// };


// // Function to update student details
// exports.updateStudent = async (req, res) => {
//   const { id } = req.params; // Match the route parameter
//   const { name, qualification, university, grade, yearsOfStudy, email } = req.body;

//   if (!name || !qualification || !university || !grade || !yearsOfStudy || !email || yearsOfStudy.length !== 2) {
//     return res.status(400).json({ message: "Please provide all required fields." });
//   }

//   const [yearsOfStudyStart, yearsOfStudyEnd] = yearsOfStudy;

//   // Validation checks
//   if (!/^[A-Za-z\s]+$/.test(name) || !/^[A-Za-z\s]+$/.test(university)) {
//     return res.status(400).json({ message: "Name and University can only contain letters and spaces." });
//   }
//   if (!validator.isFloat(grade.toString(), { min: 0, max: 10 })) {
//     return res.status(400).json({ message: "Grade must be between 0 and 10." });
//   }
//   if (!validator.isEmail(email)) {
//     return res.status(400).json({ message: "Invalid email format." });
//   }

//   try {
//     const query = `
//       UPDATE students 
//       SET name = ?, qualification = ?, university = ?, grade = ?, years_of_study_start = ?, years_of_study_end = ?, email = ? 
//       WHERE registration_id = ? OR email = ?
//     `;

//     await db.promise().query(query, [
//       name.trim(),
//       qualification,
//       university.trim(),
//       grade,
//       yearsOfStudyStart,
//       yearsOfStudyEnd,
//       email,
//       id, // Match the parameter
//       id,
//     ]);

//     res.status(200).json({ message: "Student details updated successfully" });
//   } catch (err) {
//     console.error("Error updating student details:", err.message);
//     res.status(500).json({ message: "Error updating student details." });
//   }
// };


// // Function to update student's password
// exports.updatePassword = async (req, res) => {
//   const { username } = req.params; // username can be email or registration_id
//   const { currentPassword, newPassword } = req.body;

//   if (!currentPassword || !newPassword) {
//     return res.status(400).json({ message: "Please provide both current and new passwords." });
//   }

//   let query;
//   if (validator.isEmail(username)) {
//     query = "SELECT * FROM students WHERE email = ?";
//   } else {
//     query = "SELECT * FROM students WHERE registration_id = ?";
//   }

//   try {
//     const [results] = await db.promise().query(query, [username]);
//     if (results.length === 0) {
//       return res.status(404).json({ message: "Student not found" });
//     }

//     const user = results[0];
//     const isMatch = await bcrypt.compare(currentPassword, user.password);

//     if (!isMatch) {
//       return res.status(401).json({ message: "Current password is incorrect" });
//     }

//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     const updateQuery = "UPDATE students SET password = ? WHERE email = ? OR registration_id = ?";
//     await db.promise().query(updateQuery, [hashedPassword, username, username]);

//     res.status(200).json({ message: "Password updated successfully" });
//   } catch (err) {
//     console.error("Error updating password:", err.message);
//     res.status(500).json({ message: "Error updating password." });
//   }
// };


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
