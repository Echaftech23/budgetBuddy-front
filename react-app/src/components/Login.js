import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/login",
        formData
      );
      const { token } = response.data; // Extract token from response
      localStorage.setItem("token", token); // Store token in local storage
      console.log("Login successful:", response.data);
      navigate("/"); // Redirect to home page
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card p-5 shadow border-primary"
        style={{ maxWidth: "600px" }}
      >
        <h1 className="text-center mb-4">Login</h1>
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-12 text-start">
            <label htmlFor="email" className="form-label fs-4">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control form-control-lg"
              placeholder="Enter your email"
            />
          </div>
          <div className="col-md-12 text-start">
            <label htmlFor="password" className="form-label fs-4">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control form-control-lg"
              placeholder="Enter your password"
            />
          </div>
          <div className="col-md-2 text-start">
            <button className="btn btn-primary btn-lg" type="submit">
              Login
            </button>
          </div>
          <div className="col-md-2 text-start">
            <button className="btn btn-danger btn-lg" type="reset">
              reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;
