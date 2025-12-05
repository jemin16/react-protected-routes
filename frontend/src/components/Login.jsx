import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/Form.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      // Save token after successful login
      localStorage.setItem("token", data.token);
      setMessage(data.message);
      setIsError(false);

      // Redirect to dashboard after login success
      navigate("/dashboard");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error occurred");
      setIsError(true);
    }
  };

  return (
    <div className="form-wrapper">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
        />
        <button type="submit">Login</button>
      </form>

      {message && (
        <p className={isError ? "error-message" : "success-message"}>
          {message}
        </p>
      )}

      <p className="form-footer">
        Don't have an account? <Link to="/signup">Signup first</Link>
      </p>
    </div>
  );
};

export default Login;
