


import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for React Router navigation
import api from "../api/api"; // Correct import path to api.js in the src/api folder
import "../styles/login.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import message from "../assets/message.png";

import padlock from "../assets/padlock.png";


const Login = () => {
  const [formData, setFormData] = useState({
    username: "", // Accepts email or registration_id
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for UX
  const navigate = useNavigate(); // useNavigate for navigation
 

  // Handle form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true); // Start loading spinner

    console.log("Form Data Being Sent:", formData); // Check payload

    try {
      const response = await api.post("/auth/login", formData); // Use the api instance

      console.log("Server Response:", response.data); // Log response for debugging

      if (response.status === 200) {
        localStorage.setItem("authToken", response.data.token); // Store token in localStorage
        navigate("/dashboard"); // Use navigate for React Router redirection
      }
    } catch (error) {
      setLoading(false); // Stop loading spinner
      console.error("Login Error:", error);

      if (error.response) {
        // Backend error responses
        setErrorMessage(error.response.data.message || "Invalid credentials");
      } else {
        // Network or other errors
        setErrorMessage("Failed to connect to the server. Please try again.");
      }
    }
  };

  return (
    // <div className="login-container">
     
     
     
      
      
      
    //   <form onSubmit={handleSubmit}>
    //   <h className="login">Login</h>
    //      <div className="log"><img src={logo} alt="" className="logo" /></div>
    //     <label htmlFor="username">Email or Registration ID:</label>
    //    <div> <img src={message} alt="" className="message" /></div>
    //     < input
        
    //       type="text"
    //       name="username"
    //       value={formData.username}
    //       onChange={handleChange}
    //       placeholder="Enter email or registration ID"
    //       required
          
    //     />

    //     <label htmlFor="password">Password:</label>
    //     <input
    //       type="password"
    //       name="password"
    //       value={formData.password}
    //       onChange={handleChange}
    //       placeholder="Enter password"
    //       required
    //     />

    //     <button type="submit" disabled={loading}>

        
    //       {loading ? "Logging in..." : "Login"}
    //     </button>
    //     <h className="Reg">Not Registerd ? <Link to="/"><h className="reg">Register</h></Link></h> 
    //     {errorMessage && <p className="error-text-login">{errorMessage}</p>}
    //   </form>
    // </div>


    <div className="login-container">
  <form onSubmit={handleSubmit}>
    <h className="login">Login</h>
    <div className="log">
      <img src={logo} alt="" className="logo" />
    </div>
    
    <label htmlFor="username">Email or Registration ID:</label>
    <div className="input-container">
      <img src={message} alt="" className="message" />
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Enter email or registration ID"
        required
      />
    </div>

    <label htmlFor="password">Password:</label>
    <div className="password-input">

      <img src={padlock} alt="" className="padlock" />
    <input
      type="password"
      name="password"
      value={formData.password}
      onChange={handleChange}
      placeholder="Enter password"
      required
    />
    </div>

    <button type="submit" disabled={loading}>
      {loading ? "Logging in..." : "Login"}
    </button>
    <h className="Reg">
      Not Registered? <Link to="/"><h className="reg">Register</h></Link>
    </h>
    {errorMessage && <p className="error-text-login">{errorMessage}</p>}
  </form>
</div>

  );
};

export default Login;
