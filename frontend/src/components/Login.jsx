// import React, { useState } from 'react';
// import axios from 'axios';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     username: '', // This will accept either email or registration_id
//     password: ''
//   });

//   const [errorMessage, setErrorMessage] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMessage('');

//     try {
//       const response = await axios.post("http://localhost:5000/api/auth/login", formData);
//       // Assuming the backend returns a token on successful login
//       localStorage.setItem("authToken", response.data.token);
//       // Redirect to dashboard or another page
//       window.location.href = "/dashboard"; 
//     } catch (error) {
//       setErrorMessage("Login failed. Please check your credentials.");
//     }
//   };

//   return (
//     <div className="login-container">
//       <h1>Login</h1>
//       {errorMessage && <p className="error-text">{errorMessage}</p>}
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="username">Email or Registration ID:</label>
//         <input
//           type="text"
//           name="username"
//           value={formData.username}
//           onChange={handleChange}
//           required
//         />
        
//         <label htmlFor="password">Password:</label>
//         <input
//           type="password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//         />
        
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;

// CHANGE 2 

// import React, { useState } from 'react';
// import axios from 'axios';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     username: '', // This will accept either email or registration_id
//     password: ''
//   });

//   const [errorMessage, setErrorMessage] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   setErrorMessage(''); // Reset any previous error message

//   //   try {
//   //     const response = await axios.post("http://localhost:5000/api/auth/login", formData);

//   //     if (response.status === 200) {
//   //       // Assuming the backend returns a token on successful login
//   //       localStorage.setItem("authToken", response.data.token);
//   //       window.location.href = "/dashboard"; // Redirect to dashboard or another page
//   //     }
//   //   } catch (error) {
//   //     console.error("Error during login:", error);
//   //     if (error.response && error.response.data) {
//   //       setErrorMessage(error.response.data.message || "Login failed. Please check your credentials.");
//   //     } else {
//   //       setErrorMessage("Login failed. Please check your credentials.");
//   //     }
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMessage('');
  
//     // Log the password to ensure it's correct
//     console.log("Password being sent:", formData.password); // Log password before sending
  
//     try {
//       const response = await axios.post("http://localhost:5000/api/auth/login", formData);
//       // Assuming the backend returns a token on successful login
//       localStorage.setItem("authToken", response.data.token);
//       // Redirect to dashboard or another page
//       window.location.href = "/dashboard"; 
//     } catch (error) {
//       setErrorMessage("Login failed. Please check your credentials.");
//     }
//   };
  

//   return (
//     <div className="login-container">
//       <h1>Login</h1>
//       {errorMessage && <p className="error-text">{errorMessage}</p>}
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="username">Email or Registration ID:</label>
//         <input
//           type="text"
//           name="username"
//           value={formData.username}
//           onChange={handleChange}
//           required
//         />

//         <label htmlFor="password">Password:</label>
//         <input
//           type="password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//         />

//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;


 // CHANGE 3

//  import React, { useState } from "react";
// import axios from "axios";

// const Login = () => {
//   const [formData, setFormData] = useState({
//     username: "", // Accepts email or registration_id
//     password: "",
//   });

//   const [errorMessage, setErrorMessage] = useState("");
//   const [loading, setLoading] = useState(false); // Loading state for UX

//   // Handle form inputs
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMessage("");
//     setLoading(true); // Start loading spinner

//     console.log("Form Data Being Sent:", formData); // Check payload

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/auth/login",
//         formData
//       );

//       console.log("Server Response:", response.data); // Log response for debugging

//       if (response.status === 200) {
//         localStorage.setItem("authToken", response.data.token);
//         window.location.href = "/dashboard"; // Redirect after successful login
//       }
//     } catch (error) {
//       setLoading(false); // Stop loading spinner
//       console.error("Login Error:", error);

//       if (error.response) {
//         // Backend error responses
//         setErrorMessage(error.response.data.message || "Invalid credentials");
//       } else {
//         // Network or other errors
//         setErrorMessage("Failed to connect to the server. Please try again.");
//       }
//     }
//   };

//   return (
//     <div className="login-container">
//       <h1>Login</h1>
//       {errorMessage && <p className="error-text">{errorMessage}</p>}
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="username">Email or Registration ID:</label>
//         <input
//           type="text"
//           name="username"
//           value={formData.username}
//           onChange={handleChange}
//           placeholder="Enter email or registration ID"
//           required
//         />

//         <label htmlFor="password">Password:</label>
//         <input
//           type="password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//           placeholder="Enter password"
//           required
//         />

//         <button type="submit" disabled={loading}>
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;




// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom"; // Import useNavigate for React Router navigation

// const Login = () => {
//   const [formData, setFormData] = useState({
//     username: "", // Accepts email or registration_id
//     password: "",
//   });

//   const [errorMessage, setErrorMessage] = useState("");
//   const [loading, setLoading] = useState(false); // Loading state for UX
//   const navigate = useNavigate(); // useNavigate for navigation

//   // Handle form inputs
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMessage("");
//     setLoading(true); // Start loading spinner

//     console.log("Form Data Being Sent:", formData); // Check payload

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/auth/login",
//         formData
//       );

//       console.log("Server Response:", response.data); // Log response for debugging

//       if (response.status === 200) {
//         localStorage.setItem("authToken", response.data.token);
//         navigate("/dashboard"); // Use navigate for React Router redirection
//       }
//     } catch (error) {
//       setLoading(false); // Stop loading spinner
//       console.error("Login Error:", error);

//       if (error.response) {
//         // Backend error responses
//         setErrorMessage(error.response.data.message || "Invalid credentials");
//       } else {
//         // Network or other errors
//         setErrorMessage("Failed to connect to the server. Please try again.");
//       }
//     }
//   };

//   return (
//     <div className="login-container">
//       <h1>Login</h1>
//       {errorMessage && <p className="error-text">{errorMessage}</p>}
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="username">Email or Registration ID:</label>
//         <input
//           type="text"
//           name="username"
//           value={formData.username}
//           onChange={handleChange}
//           placeholder="Enter email or registration ID"
//           required
//         />

//         <label htmlFor="password">Password:</label>
//         <input
//           type="password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//           placeholder="Enter password"
//           required
//         />

//         <button type="submit" disabled={loading}>
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;



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
