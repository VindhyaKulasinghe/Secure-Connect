import React, { useState } from "react";
import { Box, Typography, TextField, Button, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const validate = (field, value) => {
    let newErrors = { ...errors };

    if (field === "username") {
      newErrors.username = value.length < 8 ? "Username must be at least 8 characters long." : "";
    }

    if (field === "password") {
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      newErrors.password = !hasUpperCase || !hasLowerCase || !hasSpecialChar
        ? "Password must contain at least 1 uppercase, 1 lowercase, and 1 special character."
        : "";
    }

    if (field === "confirmPassword") {
      newErrors.confirmPassword = value !== formData.password ? "Passwords do not match." : "";
    }

    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validate(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const hasErrors = Object.values(errors).some((error) => error !== "");
    const hasEmptyFields = Object.values(formData).some((field) => field === "");
    if (hasErrors || hasEmptyFields) {
      setApiError("Please fix errors before signing up.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.username + "@example.com",
          password: formData.password,
          confirm_password: formData.confirmPassword,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "An error occurred during signup.");
      
      setSuccessMessage("Signup successful! You can now log in.");
      setApiError("");
    } catch (error) {
      setApiError(error.message);
      setSuccessMessage("");
    }
  };

  return (
    <div className="signup">
      <div className="outer">
        <div className="inner1"></div>
        <div className="inner2">
          <Box sx={{ padding: "2rem", borderRadius: "20px", width: "80%", maxWidth: "400px" }}>
            <h1 style={{ marginBottom: '40px' }}>Sign Up</h1>
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
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={toggleConfirmPasswordVisibility} edge="end">
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {apiError && <Typography color="error" textAlign="center" mt={2}>{apiError}</Typography>}
              {successMessage && <Typography color="success" textAlign="center" mt={2}>{successMessage}</Typography>}
              <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }} type="submit">
                SIGN UP
              </Button>
            </form>
            <Typography textAlign="center" mt={2}>Already have an account? <Link to="/">Log in</Link></Typography>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;