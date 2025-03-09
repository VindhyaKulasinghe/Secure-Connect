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

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePassword = () => setShowPassword(!showPassword);
  const handleToggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const validate = (field, value) => {
    let newErrors = { ...errors };

    if (field === "username") {
      newErrors.username = value.length < 8 ? "Username must be at least 8 characters long." : "";
    }

    if (field === "password") {
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?\":{}|<>]/.test(value);
      
      let passwordErrors = [];
      if (!hasUpperCase) passwordErrors.push("At least 1 uppercase letter required.");
      if (!hasLowerCase) passwordErrors.push("At least 1 lowercase letter required.");
      if (!hasSpecialChar) passwordErrors.push("At least 1 special character required.");
      
      newErrors.password = passwordErrors.join(" ");
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
      alert("Please fix errors before signing up.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Response from backend:", data);
      alert("Signup Successful!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className='signup'>
      <div className="outer">
        <div className="inner1"></div>
        <div className="inner2">
          <Box sx={{ padding: '2rem', borderRadius: '20px', width: '80%', maxWidth: '400px' }}>
            <Typography variant="h4" textAlign="center" mb={3}>Sign Up</Typography>
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
                      <IconButton onClick={handleTogglePassword} edge="end">
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
                      <IconButton onClick={handleToggleConfirmPassword} edge="end">
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }} type="submit">SIGN UP</Button>
            </form>
            <Typography textAlign="center" mt={2}>Already have an account? <Link to="/">Log in</Link></Typography>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
