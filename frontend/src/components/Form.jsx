


import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/animations.css";
import api from "../api/api";  // Importing the axios API instance
import backgroundImage from "../assets/bg.png"
import { Link } from "react-router-dom";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    qualification: "",
    university: "",
    grade: "",
    yearsOfStudy: [null, null],
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [registrationId, setRegistrationId] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let formErrors = {};
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(formData.name)) {
      formErrors.name = "Name can only contain letters and spaces.";
    }

    const universityRegex = /^[A-Za-z\s]+$/;
    if (!universityRegex.test(formData.university)) {
      formErrors.university = "University can only contain letters and spaces.";
    }

    if (isNaN(formData.grade) || formData.grade < 0 || formData.grade > 10) {
      formErrors.grade = "Grade must be a number between 0 and 10.";
    }

    const isValidDate = (date) => !isNaN(new Date(date).getTime());
    const [startYear, endYear] = formData.yearsOfStudy;
    if (!isValidDate(startYear) || !isValidDate(endYear)) {
      formErrors.yearsOfStudy = "Please select valid start and end dates for the years of study.";
    } else if (new Date(startYear) >= new Date(endYear)) {
      formErrors.yearsOfStudy = "End year must be after the start year.";
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      formErrors.email = "Please enter a valid email address.";
    }

    if (formData.password !== formData.confirmPassword) {
      formErrors.password = "Passwords do not match.";
      formErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const { name, qualification, university, grade, yearsOfStudy, email, password } = formData;
      const formattedYearsOfStudy = [
        yearsOfStudy[0]?.toISOString().split("T")[0],
        yearsOfStudy[1]?.toISOString().split("T")[0],
      ];

      // Send data to the backend using the api instance
      const response = await api.post("/student/students", {
        name,
        qualification,
        university,
        grade,
        yearsOfStudy: formattedYearsOfStudy,
        email,
        password,
      });

      setRegistrationId(response.data.registrationId);  // Set the registrationId from the response
      setSuccessMessage("Registration Successful!");
      setTimeout(() => setSuccessMessage(""), 3000);

      setFormData({
        name: "",
        qualification: "",
        university: "",
        grade: "",
        yearsOfStudy: [null, null],
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      setErrors({
        ...errors,
        api: error.response?.data?.message || "Error submitting the form. Please try again.",
      });
      console.error("API Error:", error.response || error.message);
    }
    
  };

  return (
    <div className="maindiv">
    <img src={backgroundImage} className="back"></img>
    <div className="form-container">
      
      <h1 className="form-title">Student Registration</h1>
      {successMessage && <p className="success-text">{successMessage}</p>}
      {errors.api && <p className="error-text">{errors.api}</p>}
      {registrationId && <p className="success-text">Your Registration ID: {registrationId}</p>}

      <form onSubmit={handleSubmit} className="registration-form">
        {/* Name Input */}
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
          className="form-input"
        />
        {errors.name && <p className="error-text">{errors.name}</p>}

        {/* Qualification Dropdown */}
        <label htmlFor="qualification">Qualification:</label>
        <select
          name="qualification"
          value={formData.qualification}
          onChange={handleChange}
          className="form-input"
        >
          <option value="">Select Highest Qualification</option>
          <option value="Secondary">Secondary</option>
          <option value="Higher Secondary">Higher Secondary</option>
          <option value="Bachelors">Bachelors</option>
          <option value="Masters">Masters</option>
          <option value="PhD">PhD</option>
        </select>

        {/* University Input */}
        <label htmlFor="university">University:</label>
        <input
          type="text"
          name="university"
          placeholder="Enter University"
          value={formData.university}
          onChange={handleChange}
          className="form-input"
        />
        {errors.university && <p className="error-text">{errors.university}</p>}

        {/* Grade Input */}
        <label htmlFor="grade">Grade:</label>
        <input
          type="text"
          name="grade"
          placeholder="Enter Grade"
          value={formData.grade}
          onChange={handleChange}
          className="form-input"
        />
        {errors.grade && <p className="error-text">{errors.grade}</p>}

        {/* Email Input */}
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          className="form-input"
        />
        {errors.email && <p className="error-text">{errors.email}</p>}

        {/* Password Input */}
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          className="form-input"
        />
        {errors.password && <p className="error-text">{errors.password}</p>}

        {/* Confirm Password Input */}
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="form-input"
        />
        {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}

        {/* Years of Study Date Range Picker */}
        <div className="years">
        <label htmlFor="yearsOfStudy">Years of Study:</label>
        <DatePicker
          selectsRange
          startDate={formData.yearsOfStudy[0]}
          endDate={formData.yearsOfStudy[1]}
          onChange={(update) => setFormData({ ...formData, yearsOfStudy: update })}
          placeholderText="Select Years of Study"
          className="form-input"
        />
        </div>
        {errors.yearsOfStudy && <p className="error-text">{errors.yearsOfStudy}</p>}

        {/* Submit Button */}
        <button type="submit" className="submit-button">Register</button>
        <div className="login_wrapper">
        <h className="log">Already have an account ? <Link to="/login"><h>Login</h></Link>  </h></div>
         {/* <h className="Reg">Not Registerd ? <Link to="/"><h className="reg">Register</h></Link></h>  */}
      </form>
    </div>
    </div>
  );
};

export default Form;
