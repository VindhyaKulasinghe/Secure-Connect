import React, { useState } from 'react';
import './Signup.css';
import OutlinedInput from '@mui/material/OutlinedInput';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function Signup() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});

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
    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if there are any errors before submitting
        const hasErrors = Object.values(errors).some((error) => error !== "");
        const hasEmptyFields = Object.values(formData).some((field) => field === "");

        if (hasErrors || hasEmptyFields) {
            alert("Please fix errors before signing up.");
            return;
        }

        // If no errors, proceed with signup
        alert("Signup Successful!");
    };

    return (
        <div className="signup">
            <div className="outer">
                <div className="inner1"></div>
                <div className="inner2">
                    <form onSubmit={handleSubmit}>
                        <h1 style={{ marginTop: '30px', marginBottom: '20px' }}>Sign Up</h1>

                        <label htmlFor="username" style={{ marginBottom: '10px', display: 'block' }}>Email Or User Name</label>
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

                        <label htmlFor="password" style={{ marginBottom: '10px', display: 'block' }}>Password</label>
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

                        <label htmlFor="confirmPassword" style={{ marginBottom: '10px', display: 'block' }}>Confirm Password</label>
                        <TextField
                            fullWidth
                            label="ConfirmPassword"
                            type="password"
                            name="ConfirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            error={!!errors.password}
                            helperText={errors.password}
                            margin="normal"
                        />

                        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, width: '90%', fontSize: '20px', borderRadius: '10px', marginTop: '5px' }}>
                            SIGN UP
                        </Button>
                        <p id="Signuppara" style={{ marginTop: '15px' }}>
                            Already have an account? <Link to="/login">Log In</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;

