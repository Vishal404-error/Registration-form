// Import the mysql2 library to interact with MySQL
const mysql = require("mysql2");

// Import environment variables from the .env file
require("dotenv").config();

// Create a connection to the MySQL database using environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST, // Host address of the MySQL database (e.g., localhost)
  user: process.env.DB_USER, // MySQL username
  password: process.env.DB_PASSWORD, // Password for the MySQL user
  database: process.env.DB_NAME, // Name of the database to connect to
});

// Attempt to connect to the MySQL database
db.connect((err) => {
  if (err) {
    // Log the error message if the connection fails
    console.error("Error connecting to MySQL:", err.message);
    process.exit(1); // Exit the process to prevent the application from continuing
  }
  // Log a success message if the connection is established
  console.log("MySQL Connected...");
});

// Export the database connection object so it can be used in other parts of the application
module.exports = db;




