import React from "react";
import Form from "../components/Form";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div>
      <Form />
      <p style={{ textAlign: "center" }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
