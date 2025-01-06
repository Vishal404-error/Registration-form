// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const LoginPage = () => {
//   const [credentials, setCredentials] = useState({ username: "", password: "" });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/login", credentials);
//       alert("Login successful!");
//       navigate("/dashboard");
//     } catch (err) {
//       setError("Invalid credentials. Please try again.");
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           onChange={handleChange}
//           required
//         />
//         <button type="submit">Login</button>
//         {error && <p style={{ color: "red" }}>{error}</p>}
//       </form>
//     </div>
//   );
// };

// export default LoginPage;


import React from 'react';
import Login from '../components/Login';

const LoginPage = () => {
  return (
    <div>
      <h2>Welcome to the Login Page</h2>
      <Login />
    </div>
  );
};

export default LoginPage;
