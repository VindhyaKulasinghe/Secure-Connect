import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Css/Dashboard.css'; 

function Dashboard() {
    const username = localStorage.getItem('username');

    if (!username) {
        return <div className="error-message">You are not logged in. Redirecting...</div>;
    }

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('username');
        navigate('/');
    };

    return (
        <div className="dashboard-container">
            <div className="greeting-card">
                <h1 className="welcome-heading">Welcome, {username}!</h1>
                <p className="dashboard-description">
                    We're glad to have you here. This is your personalized dashboard.
                </p>

                <button className="logout-button" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Dashboard;
