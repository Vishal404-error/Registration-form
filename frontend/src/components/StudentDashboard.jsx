


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
