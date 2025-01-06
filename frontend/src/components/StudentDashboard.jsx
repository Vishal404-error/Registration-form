// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const StudentDashboard = () => {
//   const [students, setStudents] = useState([]);

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const fetchStudents = async () => {
//     const res = await axios.get("http://localhost:5000/api/students");
//     setStudents(res.data);
//   };

//   const handleDelete = async (id) => {
//     await axios.delete(`http://localhost:5000/api/students/${id}`);
//     fetchStudents();
//   };

//   return (
//     <div>
//       <h2>Student List</h2>
//       {students.map((student) => (
//         <div key={student.id}>
//           <p>Name: {student.name}</p>
//           <button onClick={() => handleDelete(student.id)}>Delete</button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default StudentDashboard;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import EditStudentForm from "./EditStudentForm"; // Assuming you will use a form component for editing

// const StudentDashboard = () => {
//   const [student, setStudent] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const navigate = useNavigate();

//   const studentId = localStorage.getItem("authToken"); // Assuming authToken is the logged-in student's ID

//   useEffect(() => {
//     if (!studentId) {
//       navigate("/login"); // Redirect if no student is logged in
//     } else {
//       fetchStudentDetails();
//     }
//   }, [studentId, navigate]);

//   const fetchStudentDetails = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/students/${studentId}`);
//       setStudent(response.data); // Set the student details to state
//     } catch (err) {
//       console.error("Error fetching student details:", err);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await axios.delete(`http://localhost:5000/api/students/${studentId}`);
//       localStorage.removeItem("authToken"); // Remove token on successful deletion
//       navigate("/"); // Redirect to registration page
//     } catch (err) {
//       console.error("Error deleting student:", err);
//     }
//   };

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleSave = async (updatedData) => {
//     try {
//       await axios.put(`http://localhost:5000/api/students/${studentId}`, updatedData);
//       setStudent(updatedData); // Update the student state with the new data
//       setIsEditing(false); // Close the edit form
//     } catch (err) {
//       console.error("Error saving student data:", err);
//     }
//   };

//   if (!student) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>Student Dashboard</h2>
//       {isEditing ? (
//         <EditStudentForm student={student} onSave={handleSave} />
//       ) : (
//         <div>
//           <p>Name: {student.name}</p>
//           <p>Email: {student.email}</p>
//           <p>Registration ID: {student.registration_id}</p>
//           <p>Qualification: {student.qualification}</p>
//           <p>University: {student.university}</p>
//           <p>Grade: {student.grade}</p>
//           <p>Years of Study: {student.years_of_study_start} - {student.years_of_study_end}</p>
//           <button onClick={handleEdit}>Edit</button>
//           <button onClick={handleDelete}>Delete Account</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StudentDashboard;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import EditStudentForm from "./EditStudentForm"; // Assuming you will use a form component for editing
// import "../styles/animations.css";

// const StudentDashboard = () => {
//   const [student, setStudent] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const navigate = useNavigate();

//   const authToken = localStorage.getItem("authToken"); // Assuming authToken is the JWT token

//   useEffect(() => {
//     if (!authToken) {
//       navigate("/login"); // Redirect if no token is present
//     } else {
//       fetchStudentDetails();
//     }
//   }, [authToken, navigate]);

//   // const fetchStudentDetails = async () => {
//   //   try {
//   //     const response = await axios.get("http://localhost:5000/api/students", {
//   //       headers: {
//   //         Authorization: `Bearer ${authToken}`, // Send token in Authorization header
//   //       },
//   //     });
//   //     setStudent(response.data); // Set the student details to state
//   //   } catch (err) {
//   //     console.error("Error fetching student details:", err);
//   //   }
//   // };

// const fetchStudentDetails = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/students", {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       });
//       console.log("Student data fetched:", response.data); // Debugging
//       setStudent(response.data);
//     } catch (err) {
//       console.error("Error fetching student details:", err);
//       if (err.response?.status === 401) {
//         localStorage.removeItem("authToken"); // Clear token if unauthorized
//         navigate("/login");
//       }
//     }
//   };


//   const handleDelete = async () => {
//     try {
//       await axios.delete("http://localhost:5000/api/students", {
//         headers: {
//           Authorization: `Bearer ${authToken}`, // Send token in Authorization header
//         },
//       });
//       localStorage.removeItem("authToken"); // Remove token on successful deletion
//       navigate("/"); // Redirect to registration page
//     } catch (err) {
//       console.error("Error deleting student:", err);
//     }
//   };  

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleSave = async (updatedData) => {
//     try {
//       await axios.put(
//         `http://localhost:5000/api/students/${student.registration_id}`, // Include registration_id in the URL
//         updatedData,
//         {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//         }
//       );
//       setStudent(updatedData); // Update state with new data
//       setIsEditing(false); // Close edit mode
//     } catch (err) {
//       console.error("Error saving student data:", err);
//     }
//   };


//   if (!student) {
//     return <div>Loading...</div>;
//   }



//   return (
//     <div>
//       <h2>Student Dashboard</h2>
//       {isEditing ? (
//         <EditStudentForm student={student} onSave={handleSave} />
//       ) : (
//         <div>
//           <p>Name: {student.name}</p>
//           <p>Email: {student.email}</p>
//           <p>Registration ID: {student.registration_id}</p>
//           <p>Qualification: {student.qualification}</p>
//           <p>University: {student.university}</p>
//           <p>Grade: {student.grade}</p>
//           <p>
//             Years of Study: {student.years_of_study_start} -{" "}
//             {student.years_of_study_end}
//           </p>
//           <button onClick={handleEdit}>Edit</button>
//           <button onClick={handleDelete}>Delete Account</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StudentDashboard;




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import EditStudentForm from "./EditStudentForm"; // Assuming you will use a form component for editing
// import "../styles/animations.css";

// const StudentDashboard = () => {
//   const [student, setStudent] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const navigate = useNavigate();


//   const authToken = localStorage.getItem("authToken"); // Assuming authToken is the JWT token

//   useEffect(() => {
//     if (!authToken) {
//       navigate("/login"); // Redirect if no token is present
//     } else {
//       fetchStudentDetails();
//     }
//   }, [authToken, navigate]);

//   // const fetchStudentDetails = async () => {
//   //   try {
//   //     const response = await axios.get("/students", {
//   //       headers: {
//   //         Authorization: `Bearer ${authToken}`,
//   //       },
//   //     });
//   //     console.log("Student data fetched:", response.data); // Debugging
//   //     setStudent(response.data);
//   //   } catch (err) {
//   //     console.error("Error fetching student details:", err);
//   //     if (err.response?.status === 401) {
//   //       localStorage.removeItem("authToken"); // Clear token if unauthorized
//   //       navigate("/login");
//   //     }
//   //   }
//   // };

//   // const fetchStudentDetails = async () => {
//   //   try {
//   //     const response = await axios.get("/api/student/students/me", {
//   //       headers: {
//   //         Authorization: `Bearer ${authToken}`,
//   //       },
//   //     });
//   //     console.log("Student data fetched:", response.data); // Debugging
//   //     setStudent(response.data);
//   //   } catch (err) {
//   //     console.error("Error fetching student details:", err);
//   //     if (err.response?.status === 401) {
//   //       localStorage.removeItem("authToken"); // Clear token if unauthorized
//   //       navigate("/login");
//   //     }
//   //   }
//   // };

//   const fetchStudentDetails = async () => {
//     try {
//       const response = await axios.get("/api/student/students/me", { // Update endpoint to /api/student/students/me
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       });
//       console.log("Student data fetched:", response.data); // Debugging
//       setStudent(response.data);
//     } catch (err) {
//       console.error("Error fetching student details:", err);
//       if (err.response?.status === 401) {
//         localStorage.removeItem("authToken"); // Clear token if unauthorized
//         navigate("/login");
//       }
//     }
//   };



//   const handleDelete = async () => {
//     try {
//       await axios.delete(`http://localhost:5000/api/students/${student.registration_id}`, {
//         headers: {
//           Authorization: `Bearer ${authToken}`, // Send token in Authorization header
//         },
//       });
//       localStorage.removeItem("authToken"); // Remove token on successful deletion
//       navigate("/"); // Redirect to registration page
//     } catch (err) {
//       console.error("Error deleting student:", err);
//     }
//   };

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleSave = async (updatedData) => {
//     try {
//       await axios.put(
//         `http://localhost:5000/api/students/${student.registration_id}`, // Include registration_id in the URL
//         updatedData,
//         {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//         }
//       );
//       setStudent(updatedData); // Update state with new data
//       setIsEditing(false); // Close edit mode
//     } catch (err) {
//       console.error("Error saving student data:", err);
//     }
//   };

//   if (!student) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>Student Dashboard</h2>
//       {isEditing ? (
//         <EditStudentForm student={student} onSave={handleSave} />
//       ) : (
//         <div>
//           <p>Name: {student.name}</p>
//           <p>Email: {student.email}</p>
//           <p>Registration ID: {student.registration_id}</p>
//           <p>Qualification: {student.qualification}</p>
//           <p>University: {student.university}</p>
//           <p>Grade: {student.grade}</p>
//           <p>
//             Years of Study: {student.years_of_study_start} - {student.years_of_study_end}
//           </p>
//           <button onClick={handleEdit}>Edit</button>
//           <button onClick={handleDelete}>Delete Account</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StudentDashboard;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import EditStudentForm from "./EditStudentForm";
// import "../styles/animations.css";

// const StudentDashboard = () => {
//   const [student, setStudent] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [error, setError] = useState(null); // For handling errors
//   const navigate = useNavigate();

//   // Get token from localStorage
//   const authToken = localStorage.getItem("authToken");

//   // useEffect(() => {
//   //   if (!authToken) {
//   //     navigate("/login");
//   //   } else {
//   //     fetchStudentDetails();  // Fetch student details if token exists
//   //   }
//   // }, [authToken, navigate]);

//   useEffect(() => {
//     if (!authToken) {
//       navigate("/login");
//     } else {
//       fetchStudentDetails();
//     }
//   }, [authToken, navigate]);

//   useEffect(() => {
//     console.log("Student state updated:", student); // Debugging log
//   }, [student]);


//   // Format date to a readable string
//   const formatDate = (date) => {
//     if (!date) return "N/A"; // Handle missing dates
//     const parsedDate = new Date(date);
//     return isNaN(parsedDate.getTime()) ? "Invalid Date" : parsedDate.toLocaleDateString();
//   };


//   // Fetch student details with the token
//   const fetchStudentDetails = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/students/me", {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       });
//       console.log("API Response:", response.data); // Debugging log
//       setStudent(response.data);
//     } catch (err) {
//       console.error("Error fetching student details:", err);
//       setError("Error fetching student details.");
//       if (err.response?.status === 401) {
//         localStorage.removeItem("authToken");
//         navigate("/login");
//       }
//     }
//   };


//   // Handle account deletion
//   const handleDelete = async () => {
//     try {
//       await axios.delete(`/api/students/${student.registration_id}`, {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       });
//       localStorage.removeItem("authToken");
//       navigate("/");
//     } catch (err) {
//       setError("Error deleting student account.");
//     }
//   };

//   // Enable edit mode
//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   // Handle saving updated student data
//   const handleSave = async (updatedData) => {
//     try {
//       await axios.put(`/api/students/${student.registration_id}`, updatedData, {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       });
//       setStudent(updatedData);
//       setIsEditing(false);
//     } catch (err) {
//       setError("Error saving student data.");
//     }
//   };

//   // Loading state if no student data is fetched yet
//   if (!student) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="form-container">
//       <h2>Student Dashboard</h2>
//       {error && <p className="error-message">{error}</p>}
//       {isEditing ? (
//         <EditStudentForm student={student} onSave={handleSave} />
//       ) : (
//         <div>
//           <p>Name: {student.name || "N/A"}</p>
//           <p>Email: {student.email || "N/A"}</p>
//           <p>Registration ID: {student.registration_id || "N/A"}</p>
//           <p>Qualification: {student.qualification || "N/A"}</p>
//           <p>University: {student.university || "N/A"}</p>
//           <p>Grade: {student.grade || "N/A"}</p>
//           <p>
//             Years of Study: {formatDate(student.years_of_study_start)} - {formatDate(student.years_of_study_end)}
//           </p>

//           <button onClick={handleEdit}>Edit</button>
//           <button onClick={handleDelete}>Delete Account</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StudentDashboard;




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import EditStudentForm from "./EditStudentForm"; // Assuming you will use a form component for editing
// import "../styles/animations.css";

// const StudentDashboard = () => {
//   const [student, setStudent] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   // Get token from localStorage
//   const authToken = localStorage.getItem("authToken");

//   useEffect(() => {
//     if (!authToken) {
//       navigate("/login");
//     } else {
//       fetchStudentDetails();
//     }
//   }, [authToken, navigate]);

//   const fetchStudentDetails = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/student/students/me", {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       });
//       console.log("API Response:", response.data);
//       setStudent(response.data);
//     } catch (err) {
//       console.error("Error fetching student details:", err.response || err.message);
//       setError("Error fetching student details.");
//       if (err.response?.status === 401) {
//         localStorage.removeItem("authToken");
//         navigate("/login");
//       }
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await axios.delete(`http://localhost:5000/api/student/students/${student.registration_id}`, {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       });
//       localStorage.removeItem("authToken");
//       navigate("/");
//     } catch (err) {
//       console.error("Error deleting student:", err);
//       setError("Error deleting student account.");
//     }
//   };

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleSave = async (updatedData) => {
//     try {
//       await axios.put(
//         `http://localhost:5000/api/student/students/${student.registration_id}`,
//         updatedData,
//         {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//         }
//       );
//       setStudent(updatedData);
//       setIsEditing(false);
//     } catch (err) {
//       console.error("Error saving student data:", err);
//       setError("Error saving student data.");
//     }
//   };

//   if (!student) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="form-container">
//       <h2>Student Dashboard</h2>
//       {error && <p className="error-message">{error}</p>}
//       {isEditing ? (
//         <EditStudentForm student={student} onSave={handleSave} />
//       ) : (
//         <div>
//           <p>Name: {student.name || "N/A"}</p>
//           <p>Email: {student.email || "N/A"}</p>
//           <p>Registration ID: {student.registration_id || "N/A"}</p>
//           <p>Qualification: {student.qualification || "N/A"}</p>
//           <p>University: {student.university || "N/A"}</p>
//           <p>Grade: {student.grade || "N/A"}</p>
//           <p>
//             Years of Study:{" "}
//             {student.years_of_study_start
//               ? new Date(student.years_of_study_start).toLocaleDateString()
//               : "N/A"}{" "}
//             -{" "}
//             {student.years_of_study_end
//               ? new Date(student.years_of_study_end).toLocaleDateString()
//               : "N/A"}
//           </p>
//           <button onClick={handleEdit}>Edit</button>
//           <button onClick={handleDelete}>Delete Account</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StudentDashboard;




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import EditStudentForm from "./EditStudentForm"; // Assuming you will use a form component for editing
// import "../styles/StudentDashboard.css"; // Import the new CSS file

// const StudentDashboard = () => {
//   const [student, setStudent] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   // Get token from localStorage
//   const authToken = localStorage.getItem("authToken");

//   useEffect(() => {
//     if (!authToken) {
//       navigate("/login");
//     } else {
//       fetchStudentDetails();
//     }
//   }, [authToken, navigate]);

//   const fetchStudentDetails = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/student/students/me", {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       });
//       console.log("API Response:", response.data);
//       setStudent(response.data);
//     } catch (err) {
//       console.error("Error fetching student details:", err.response || err.message);
//       setError("Error fetching student details.");
//       if (err.response?.status === 401) {
//         localStorage.removeItem("authToken");
//         navigate("/login");
//       }
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await axios.delete(`http://localhost:5000/api/student/students/${student.registration_id}`, {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       });
//       localStorage.removeItem("authToken");
//       navigate("/");
//     } catch (err) {
//       console.error("Error deleting student:", err);
//       setError("Error deleting student account.");
//     }
//   };

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleSave = async (updatedData) => {
//     try {
//       await axios.put(
//         `http://localhost:5000/api/student/students/${student.registration_id}`,
//         updatedData,
//         {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//         }
//       );
//       setStudent(updatedData);
//       setIsEditing(false);
//     } catch (err) {
//       console.error("Error saving student data:", err);
//       setError("Error saving student data.");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     navigate("/login");
//   };

//   if (!student) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="form-container animation-fade-in">
//       <h2>Student Dashboard</h2>
//       {error && <p className="error-message">{error}</p>}
//       {isEditing ? (
//         <EditStudentForm student={student} onSave={handleSave} />
//       ) : (
//         <div>
//           <p>Name: {student.name || "N/A"}</p>
//           <p>Email: {student.email || "N/A"}</p>
//           <p>Registration ID: {student.registration_id || "N/A"}</p>
//           <p>Qualification: {student.qualification || "N/A"}</p>
//           <p>University: {student.university || "N/A"}</p>
//           <p>Grade: {student.grade || "N/A"}</p>
//           <p>
//             Years of Study:{" "}
//             {student.years_of_study_start
//               ? new Date(student.years_of_study_start).toLocaleDateString()
//               : "N/A"}{" "}
//             -{" "}
//             {student.years_of_study_end
//               ? new Date(student.years_of_study_end).toLocaleDateString()
//               : "N/A"}
//           </p>
//           <button onClick={handleEdit}>Edit</button>
//           <button onClick={handleDelete}>Delete Account</button>
//         </div>
//       )}
//       <button className="logout-btn" onClick={handleLogout}>Logout</button>
//     </div>
//   );
// };

// export default StudentDashboard;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EditStudentForm from "./EditStudentForm";
import LogoutPopup from "./LogoutPopup";
import "../styles/StudentDashboard.css";

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false); // State for showing popup
  const [popupVisible, setPopupVisible] = useState(true); // Track popup visibility for smooth transition
  const navigate = useNavigate();

  // Get token from localStorage
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    if (!authToken) {
      navigate("/login");
    } else {
      fetchStudentDetails();
    }
  }, [authToken, navigate]);

  const fetchStudentDetails = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/student/students/me", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setStudent(response.data);
    } catch (err) {
      setError("Error fetching student details.");
      if (err.response?.status === 401) {
        localStorage.removeItem("authToken");
        navigate("/login");
      }
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/student/students/${student.registration_id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      localStorage.removeItem("authToken");
      navigate("/");
    } catch (err) {
      setError("Error deleting student account.");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async (updatedData) => {
    try {
      await axios.put(
        `http://localhost:5000/api/student/students/${student.registration_id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setStudent(updatedData);
      setIsEditing(false);
    } catch (err) {
      setError("Error saving student data.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setShowLogoutPopup(true); // Show the popup after logout
    setTimeout(() => {
      setPopupVisible(false); // Hide popup after 10 seconds
    }, 10000); // Increased the timeout to 10 seconds
    
    setTimeout(() => {
      navigate("/login"); // Redirect to login after 10 seconds
    }, 10000); // Ensure this happens after the popup hides
  };

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div className="form-container animation-fade-in">
    {/* Logout Popup */}
    {showLogoutPopup && popupVisible && (
      <LogoutPopup onClose={() => setShowLogoutPopup(false)} />
    )}
  
    {/* Page Title */}
    <h2 className="form-title"> Welcome! {student.name}</h2>
  
    {/* Logout Button Container */}
    <div className="logout-btn-container">
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  
    {/* Display error message if any */}
    {error && <p className="error-message">{error}</p>}
  
    {/* Conditional rendering for Edit Form or Details */}
    {isEditing ? (
      <EditStudentForm student={student} onSave={handleSave} />
    ) : (
      <div className="details-container">
        {/* Student Details */}
        <p>
          <span>Name:</span> {student.name || "N/A"}
        </p>
        <p>
          <span>Email:</span> {student.email || "N/A"}
        </p>
        <p>
          <span>Registration ID:</span> {student.registration_id || "N/A"}
        </p>
        <p>
          <span>Qualification:</span> {student.qualification || "N/A"}
        </p>
        <p>
          <span>University:</span> {student.university || "N/A"}
        </p>
        <p>
          <span>Grade:</span> {student.grade || "N/A"}
        </p>
        <p>
          <span>Years of Study:</span>{" "}
          {student.years_of_study_start
            ? new Date(student.years_of_study_start).toLocaleDateString()
            : "N/A"}{" "}
          -{" "}
          {student.years_of_study_end
            ? new Date(student.years_of_study_end).toLocaleDateString()
            : "N/A"}
        </p>
  
        {/* Action Buttons */}
        <div className="action-buttons">
          <button className="edit-btn" onClick={handleEdit}>
            Edit
          </button>
          <button className="delete-btn" onClick={handleDelete}>
            Delete Account
          </button>
        </div>
      </div>
    )}
  </div>
  
  );
};

export default StudentDashboard;
