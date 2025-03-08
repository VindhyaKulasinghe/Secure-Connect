import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./css/Signup.css";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Function to validate inputs in real-time
  const validate = (field, value) => {
    let newErrors = { ...errors };

    if (field === "username") {
      if (value.length < 8) {
        newErrors.username = "Username must be at least 8 characters long.";
      } else {
        newErrors.username = "";
      }
    }

    if (field === "password") {
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

      if (!hasUpperCase || !hasLowerCase || !hasSpecialChar) {
        newErrors.password =
          "Password must contain at least 1 uppercase, 1 lowercase, and 1 special character.";
      } else {
        newErrors.password = "";
      }
    }

    if (field === "confirmPassword") {
      if (value !== formData.password) {
        newErrors.confirmPassword = "Passwords do not match.";
      } else {
        newErrors.confirmPassword = "";
      }
    }

    setErrors(newErrors);
  };

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validate(name, value);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if there are any validation errors
    const hasErrors = Object.values(errors).some((error) => error !== "");
    const hasEmptyFields = Object.values(formData).some((field) => field === "");

    if (hasErrors || hasEmptyFields) {
      setApiError("Please fix errors before signing up.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.username + "@example.com", // Modify based on backend requirements
          password: formData.password,
          confirm_password: formData.confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "An error occurred during signup.");
      }

      setSuccessMessage("Signup successful! You can now log in.");
      setApiError(""); // Clear error message
    } catch (error) {
      setApiError(error.message);
      setSuccessMessage(""); // Clear success message
    }
  };

  return (
    <div className="signup">
      <div className="outer">
        <div className="inner1"></div>

        <div className="inner2">
          <Box
            sx={{
              padding: "2rem",
              borderRadius: "20px",
              width: "80%",
              maxWidth: "400px",
            }}
          >
            <Typography variant="h4" textAlign="center" mb={3}>
              Sign Up
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                error={!!errors.username}
                helperText={errors.username}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                margin="normal"
              />

              {/* Display API error message */}
              {apiError && (
                <Typography color="error" textAlign="center" mt={2}>
                  {apiError}
                </Typography>
              )}

              {/* Display success message */}
              {successMessage && (
                <Typography color="success" textAlign="center" mt={2}>
                  {successMessage}
                </Typography>
              )}

              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                type="submit"
              >
                SIGN UP
              </Button>
            </form>

            <Typography textAlign="center" mt={2}>
              Already have an account? <Link to="/">Log in</Link>
            </Typography>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
