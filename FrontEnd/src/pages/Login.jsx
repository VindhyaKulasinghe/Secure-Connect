import React, { useState } from 'react';
import './Css/Login.css';
import { TextField, Button, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((prev) => !prev);
    const handleMouseDownPassword = (event) => event.preventDefault();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setErrorMessage('Please enter both username and password.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage(errorData.detail || 'Invalid username or password');
            } else {
                const data = await response.json();
                setErrorMessage('');

                localStorage.setItem('username', username);

                navigate(data.redirect_url);
            }
        } catch (error) {
            console.error('Error during login:', error);
            setErrorMessage('An error occurred while logging in.');
        }
    };

    return (
        <div className="OuterLogin">
            <div className="login">
                <div className="part1"></div>
                <div className="part2">
                    <Box sx={{ padding: "2rem", borderRadius: "20px", width: "80%", maxWidth: "400px" }}>
                        <form onSubmit={handleSubmit}>
                            <h1 style={{ marginBottom: '40px' }}>Log In</h1>

                            <TextField
                                fullWidth
                                label="Email or Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                margin="normal"
                                required
                                placeholder="Enter your email or username"
                            />

                            <TextField
                                fullWidth
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                margin="normal"
                                required
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            {errorMessage && (
                                <div style={{ color: 'red', marginBottom: '10px' }}>
                                    {errorMessage}
                                </div>
                            )}

                            <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }} type="submit">
                                Log In
                            </Button>
                            <p id="loginpara" style={{ marginTop: '20px' }}>
                                Do not have an account? <Link to="/signup">Sign Up</Link>
                            </p>
                        </form>
                    </Box>
                </div>
            </div>
        </div>
    );
}

export default Login;
