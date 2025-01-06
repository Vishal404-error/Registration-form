// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import Form from "./components/Form";
// import Login from "./components/Login";
// import backgroundImage from "./assets/bg.png";
// import StudentDashboard from "./components/StudentDashboard";


// // Reusable styles
// const containerStyle = {
//   backgroundColor: "rgba(255, 255, 255, 0.8)",
//   borderRadius: "30px",
//   boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//   padding: "10px 30px",
//   width: "100%",
//   maxWidth: "500px",
//   boxSizing: "border-box",
// };

// const linkContainerStyle = {
//   marginTop: "0px",
//   textAlign: "center",
// };

// const App = () => {
//   return (
//     <Router>
//       <div
//         style={{
//           backgroundImage: `url(${backgroundImage})`,
//           backgroundSize: "cover", // Use cover for better responsiveness
//           backgroundPosition: "center",
//           height: "100vh",
//           width: "100%",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           padding: "20px", // Padding for mobile screens
//         }}
//       >
//         <Routes>
//           {/* Registration Page */}
//           <Route
//             path="/"
//             element={
//               <div style={containerStyle}>
//                 <Form />
//                 <div style={linkContainerStyle}>
//                   <p>
//                     Already have an account?{" "}
//                     <Link to="/login" style={{ color: "blue" }}>
//                       Login
//                     </Link>
//                   </p>
//                 </div>
//               </div>
//             }
//           />

//           {/* Login Page */}
//           <Route
//             path="/login"
//             element={
//               <div style={containerStyle}>
//                 <Login />
//                 <div style={linkContainerStyle}>
//                   <p>
//                     Don't have an account?{" "}
//                     <Link to="/" style={{ color: "blue" }}>
//                       Register
//                     </Link>
//                   </p>
//                 </div>
//               </div>
//             }
//           />

//            <Route path="/dashboard" element={<StudentDashboard />} />

//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;



// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import Form from "./components/Form";
// import Login from "./components/Login";
// import backgroundImage from "./assets/bg.png";
// import StudentDashboard from "./components/StudentDashboard";

// // Reusable styles
// const containerStyle = {
//   backgroundColor: "rgba(255, 255, 255, 0.8)",
//   borderRadius: "30px",
//   boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//   padding: "10px 30px",
//   width: "100%",
//   maxWidth: "500px",
//   boxSizing: "border-box",
// };

// const linkContainerStyle = {
//   marginTop: "0px",
//   textAlign: "center",
// };

// const App = () => {
//   return (
//     <Router>
//       <div
//         style={{
//           backgroundImage: `url(${backgroundImage})`,
//           backgroundSize: "cover", // Use cover for better responsiveness
//           backgroundPosition: "center",
//           height: "100vh",
//           width: "100%",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           padding: "20px", // Padding for mobile screens
//         }}
//       >
//         <Routes>
//           {/* Registration Page */}
//           <Route
//             path="/"
//             element={
//               <div style={containerStyle}>
//                 <Form />
//                 <div style={linkContainerStyle}>
//                   <p>
//                     Already have an account?{" "}
//                     <Link to="/login" style={{ color: "blue" }}>
//                       Login
//                     </Link>
//                   </p>
//                 </div>
//               </div>
//             }
//           />

//           {/* Login Page */}
//           <Route
//             path="/login"
//             element={
//               <div style={containerStyle}>
//                 <Login />
//                 <div style={linkContainerStyle}>
//                   <p>
//                     Don't have an account?{" "}
//                     <Link to="/" style={{ color: "blue" }}>
//                       Register
//                     </Link>
//                   </p>
//                 </div>
//               </div>
//             }
//           />

//           {/* Student Dashboard Page */}
//           <Route
//             path="/dashboard"
//             element={
//               // Check if the user is logged in by verifying if the authToken exists
//               localStorage.getItem("authToken") ? (
//                 <StudentDashboard />
//               ) : (
//                 // Redirect to login if no authToken is found
//                 <div>
//                   <h2>You need to log in first.</h2>
//                   <Link to="/login">Login</Link>
//                 </div>
//               )
//             }
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;




import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Form from "./components/Form";
import Login from "./components/Login";
// import backgroundImage from "./assets/bg.png";
import StudentDashboard from "./components/StudentDashboard";



// const linkContainerStyle = {
//   marginTop: "0px",
//   textAlign: "center",
// };

const App = () => {
  return (
    <Router>
      <div
      
      >
        <Routes>
          {/* Registration Page */}
          <Route path="/"element={<Form/>}/>

          {/* Login Page */}
          <Route
            path="/login"
            element={
               <Login />
            }
          />

          {/* Protected Student Dashboard Page */}
          <Route
            path="/dashboard"
            element={
              localStorage.getItem("authToken") ? (
                <StudentDashboard />
              ) : (
                <div>
                  <h2>You need to log in first.</h2>
                  <Link to="/login">Login</Link>
                </div>
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
