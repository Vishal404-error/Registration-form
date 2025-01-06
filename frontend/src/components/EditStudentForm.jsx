// import React, { useState } from 'react';

// const EditStudentForm = ({ student, onSave }) => {
//   const [updatedStudent, setUpdatedStudent] = useState({ ...student });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedStudent({ ...updatedStudent, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(updatedStudent);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>Name:</label>
//       <input
//         type="text"
//         name="name"
//         value={updatedStudent.name}
//         onChange={handleChange}
//         required
//       />
//       <label>Email:</label>
//       <input
//         type="email"
//         name="email"
//         value={updatedStudent.email}
//         onChange={handleChange}
//         required
//       />
//       <label>Qualification:</label>
//       <input
//         type="text"
//         name="qualification"
//         value={updatedStudent.qualification}
//         onChange={handleChange}
//         required
//       />
//       <label>University:</label>
//       <input
//         type="text"
//         name="university"
//         value={updatedStudent.university}
//         onChange={handleChange}
//         required
//       />
//       <label>Grade:</label>
//       <input
//         type="number"
//         name="grade"
//         value={updatedStudent.grade}
//         onChange={handleChange}
//         min="0"
//         max="10"
//         required
//       />
//       <label>Years of Study:</label>
//       <input
//         type="number"
//         name="years_of_study_start"
//         value={updatedStudent.years_of_study_start}
//         onChange={handleChange}
//         required
//       />
//       <input
//         type="number"
//         name="years_of_study_end"
//         value={updatedStudent.years_of_study_end}
//         onChange={handleChange}
//         required
//       />
//       <button type="submit">Save</button>
//     </form>
//   );
// };

// export default EditStudentForm;



// import React, { useState, useEffect } from 'react';

// const EditStudentForm = ({ student, onSave }) => {
//   const [updatedStudent, setUpdatedStudent] = useState({ ...student });
//   const [isSubmitting, setIsSubmitting] = useState(false); // To handle loading state
//   const [error, setError] = useState(null); // To handle errors

//   useEffect(() => {
//     // Reset the form if student changes
//     setUpdatedStudent({ ...student });
//   }, [student]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedStudent({ ...updatedStudent, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true); // Start loading

//     try {
//       await onSave(updatedStudent); // Save the data
//       setIsSubmitting(false); // Stop loading
//     } catch (err) {
//       setError('An error occurred while saving the data.'); // Error handling
//       setIsSubmitting(false); // Stop loading
//     }
//   };

//   const isFormChanged = () => {
//     return Object.keys(updatedStudent).some(
//       (key) => updatedStudent[key] !== student[key]
//     );
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>Name:</label>
//       <input
//         type="text"
//         name="name"
//         value={updatedStudent.name}
//         onChange={handleChange}
//         required
//       />

//       <label>Email:</label>
//       <input
//         type="email"
//         name="email"
//         value={updatedStudent.email}
//         onChange={handleChange}
//         required
//       />

//       <label>Qualification:</label>
//       <input
//         type="text"
//         name="qualification"
//         value={updatedStudent.qualification}
//         onChange={handleChange}
//         required
//       />

//       <label>University:</label>
//       <input
//         type="text"
//         name="university"
//         value={updatedStudent.university}
//         onChange={handleChange}
//         required
//       />

//       <label>Grade:</label>
//       <input
//         type="number"
//         name="grade"
//         value={updatedStudent.grade}
//         onChange={handleChange}
//         min="0"
//         max="10"
//         required
//       />

//       <label>Years of Study (Start):</label>
//       <input
//         type="number"
//         name="years_of_study_start"
//         value={updatedStudent.years_of_study_start}
//         onChange={handleChange}
//         required
//       />

//       <label>Years of Study (End):</label>
//       <input
//         type="number"
//         name="years_of_study_end"
//         value={updatedStudent.years_of_study_end}
//         onChange={handleChange}
//         required
//       />

//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       <button type="submit" disabled={isSubmitting || !isFormChanged()}>
//         {isSubmitting ? 'Saving...' : 'Save'}
//       </button>
//     </form>
//   );
// };

// export default EditStudentForm;



// import React, { useState, useEffect } from "react";

// const EditStudentForm = ({ student, onSave }) => {
//   const [updatedStudent, setUpdatedStudent] = useState({
//     ...student,
//     years_of_study_start: student.years_of_study_start
//       ? student.years_of_study_start.split("T")[0]
//       : "", // Format date for input
//     years_of_study_end: student.years_of_study_end
//       ? student.years_of_study_end.split("T")[0]
//       : "", // Format date for input
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false); // To handle loading state
//   const [error, setError] = useState(null); // To handle errors

//   useEffect(() => {
//     // Reset the form if student changes
//     setUpdatedStudent({
//       ...student,
//       years_of_study_start: student.years_of_study_start
//         ? student.years_of_study_start.split("T")[0]
//         : "",
//       years_of_study_end: student.years_of_study_end
//         ? student.years_of_study_end.split("T")[0]
//         : "",
//     });
//   }, [student]);

//   // const handleChange = (e) => {
//   //   const { name, value } = e.target;
  
//   //   // Format date fields if necessary
//   //   if (name === "years_of_study_start" || name === "years_of_study_end") {
//   //     const formattedDate = new Date(value).toISOString().split("T")[0]; // Convert to YYYY-MM-DD
//   //     setUpdatedStudent({ ...updatedStudent, [name]: formattedDate });
//   //   } else {
//   //     setUpdatedStudent({ ...updatedStudent, [name]: value });
//   //   }
//   // };
  

//   const handleChange = (e) => {
//     const { name, value } = e.target;
  
//     // Format date fields if necessary
//     if (name === "years_of_study_start" || name === "years_of_study_end") {
//       const formattedDate = new Date(value).toISOString().split("T")[0]; // Convert to ISO format YYYY-MM-DD
//       setUpdatedStudent({ ...updatedStudent, [name]: formattedDate });
//     } else {
//       setUpdatedStudent({ ...updatedStudent, [name]: value });
//     }
//   };
  
  

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   setIsSubmitting(true); // Start loading
//   //   console.log("Updated student data:", updatedStudent);

//   //   try {
//   //     await onSave(updatedStudent); // Save the data
//   //     setIsSubmitting(false); // Stop loading
//   //   } catch (err) {
//   //     setError("An error occurred while saving the data."); // Error handling
//   //     setIsSubmitting(false); // Stop loading
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true); // Start loading
//     console.log("Updated student data:", updatedStudent);
  
//     // Send yearsOfStudy as an array to match the backend's expected structure
//     const yearsOfStudy = [updatedStudent.years_of_study_start, updatedStudent.years_of_study_end];
    
//     // Create the updated student data with yearsOfStudy as an array
//     const updatedStudentData = { ...updatedStudent, yearsOfStudy };
  
//     try {
//       await onSave(updatedStudentData); // Save the data
//       setIsSubmitting(false); // Stop loading
//     } catch (err) {
//       setError("An error occurred while saving the data."); // Error handling
//       setIsSubmitting(false); // Stop loading
//     }
//   };
  

//   const isFormChanged = () => {
//     return Object.keys(updatedStudent).some(
//       (key) => updatedStudent[key] !== student[key]
//     );
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>Name:</label>
//       <input
//         type="text"
//         name="name"
//         value={updatedStudent.name}
//         onChange={handleChange}
//         required
//       />

//       <label>Email:</label>
//       <input
//         type="email"
//         name="email"
//         value={updatedStudent.email}
//         onChange={handleChange}
//         required
//       />

//       <label>Qualification:</label>
//       <input
//         type="text"
//         name="qualification"
//         value={updatedStudent.qualification}
//         onChange={handleChange}
//         required
//       />

//       <label>University:</label>
//       <input
//         type="text"
//         name="university"
//         value={updatedStudent.university}
//         onChange={handleChange}
//         required
//       />

//       <label>Grade:</label>
//       <input
//         type="number"
//         name="grade"
//         value={updatedStudent.grade}
//         onChange={handleChange}
//         min="0"
//         max="10"
//         step="0.1"
//         required
//       />

//       <label>Years of Study (Start):</label>
//       <input
//         type="date"
//         name="years_of_study_start"
//         value={updatedStudent.years_of_study_start}
//         onChange={handleChange}
//         required
//       />

//       <label>Years of Study (End):</label>
//       <input
//         type="date"
//         name="years_of_study_end"
//         value={updatedStudent.years_of_study_end}
//         onChange={handleChange}
//         required
//       />

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       <button type="submit" disabled={isSubmitting || !isFormChanged()}>
//         {isSubmitting ? "Saving..." : "Save"}
//       </button>
//     </form>
//   );
// };

// export default EditStudentForm;



import React, { useState, useEffect } from "react";
import "../styles/EditStudentForm.css"

const EditStudentForm = ({ student, onSave }) => {
  const [updatedStudent, setUpdatedStudent] = useState({
    ...student,
    years_of_study_start: student.years_of_study_start
      ? new Date(student.years_of_study_start).toLocaleDateString("en-CA") // Format to YYYY-MM-DD
      : "", 
    years_of_study_end: student.years_of_study_end
      ? new Date(student.years_of_study_end).toLocaleDateString("en-CA") // Format to YYYY-MM-DD
      : "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // To handle loading state
  const [error, setError] = useState(null); // To handle errors

  useEffect(() => {
    // Reset the form if student changes
    setUpdatedStudent({
      ...student,
      years_of_study_start: student.years_of_study_start
        ? new Date(student.years_of_study_start).toLocaleDateString("en-CA") // Format to YYYY-MM-DD
        : "",
      years_of_study_end: student.years_of_study_end
        ? new Date(student.years_of_study_end).toLocaleDateString("en-CA") // Format to YYYY-MM-DD
        : "",
    });
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle date fields properly
    if (name === "years_of_study_start" || name === "years_of_study_end") {
      const formattedDate = new Date(value).toLocaleDateString("en-CA"); // Format date to YYYY-MM-DD
      setUpdatedStudent({ ...updatedStudent, [name]: formattedDate });
    } else {
      setUpdatedStudent({ ...updatedStudent, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Start loading
    console.log("Updated student data:", updatedStudent);

    // Send yearsOfStudy as an array to match the backend's expected structure
    const yearsOfStudy = [updatedStudent.years_of_study_start, updatedStudent.years_of_study_end];
    
    // Create the updated student data with yearsOfStudy as an array
    const updatedStudentData = { ...updatedStudent, yearsOfStudy };

    try {
      await onSave(updatedStudentData); // Save the data
      setIsSubmitting(false); // Stop loading
    } catch (err) {
      setError("An error occurred while saving the data."); // Error handling
      setIsSubmitting(false); // Stop loading
    }
  };

  const isFormChanged = () => {
    return Object.keys(updatedStudent).some(
      (key) => updatedStudent[key] !== student[key]
    );
  };

  return (

    <div className="edit-student-form">
    <form onSubmit={handleSubmit}>
     
      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={updatedStudent.name}
        onChange={handleChange}
        required
      />

      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={updatedStudent.email}
        onChange={handleChange}
        required
      />

      <label>Qualification:</label>
      <input
        type="text"
        name="qualification"
        value={updatedStudent.qualification}
        onChange={handleChange}
        required
      />

      <label>University:</label>
      <input
        type="text"
        name="university"
        value={updatedStudent.university}
        onChange={handleChange}
        required
      />

      <label>Grade:</label>
      <input
        type="number"
        name="grade"
        value={updatedStudent.grade}
        onChange={handleChange}
        min="0"
        max="10"
        step="0.1"
        required
      />

      <label>Years of Study (Start):</label>
      <input
        type="date"
        name="years_of_study_start"
        value={updatedStudent.years_of_study_start}
        onChange={handleChange}
        required
      />

      <label>Years of Study (End):</label>
      <input
        type="date"
        name="years_of_study_end"
        value={updatedStudent.years_of_study_end}
        onChange={handleChange}
        required
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit" disabled={isSubmitting || !isFormChanged()}>
        {isSubmitting ? "Saving..." : "Save"}
      </button>
    </form>

    </div>
  );
};

export default EditStudentForm;
