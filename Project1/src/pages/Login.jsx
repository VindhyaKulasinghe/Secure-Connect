import React, { useState } from 'react';
import './Css/Login.css';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleClickShowPassword = () => setShowPassword((prev) => !prev);
    const handleMouseDownPassword = (event) => event.preventDefault();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Logging in with:', { username, password });
    };

    return (
        <div className="OuterLogin">
            <div className="login">
                <div className="part1">Part 1</div>
                <div className="part2">
                    <form onSubmit={handleSubmit}>
                        <h1 style={{ marginBottom: '40px' }}>Log In</h1>

                        <label htmlFor="username" style={{ marginBottom: '10px', display: 'block' }}>Email Or User Name</label>
                        <OutlinedInput
                            id="outlined-basic"
                            sx={{ marginBottom: 2, width: '90%', borderRadius: '10px' }}
                            variant="outlined"
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder='Enter your email or username'
                        />

                        <label htmlFor="password" style={{ marginBottom: '10px', display: 'block' }}>Password</label>
                        <FormControl sx={{ marginBottom: 5, width: '90%' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password"></InputLabel> {/* Empty label */}
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                sx={{ borderRadius: '10px' }}
                                required
                            />
                        </FormControl>

                        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, width: '90%', fontSize: '20px', borderRadius: '10px' }}>
                            Log In
                        </Button>
                        <p id="loginpara" style={{ marginTop: '20px' }}>
                            Do not have an account? <Link to="/signup">Signup</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
