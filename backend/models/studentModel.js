//It defines the structure and queries for interacting with the db.
// provides reusable methods for db interactions like creating a new student

const db = require("../config/db");

const Student = {
  create: (data, callback) => {
    const sql = `
      INSERT INTO students (name, qualification, university, grade, years_of_study_start, years_of_study_end)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, [
      data.name,
      data.qualification,
      data.university,
      data.grade,
      data.years_of_study_start,
      data.years_of_study_end,
    ], callback);
  },
};

module.exports = Student;
