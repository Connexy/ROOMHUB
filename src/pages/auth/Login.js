import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import { showSuccessMessage } from '../../utils/Notification';
import ViMessage from '../../components/ViMessage';
import { validateEmail } from '../../utils/Common';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessages, setErrorMessages] = useState({});

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
        setErrorMessages((prev) => ({ ...prev, [name]: '' })); // Clear individual error message on input change
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        const errors = {};
        let topErrorMessage = null;

        if (!email) {
            errors.email = "Email is required";
        } else if (!validateEmail(email)) {
            topErrorMessage = "Invalid email format";
        }
        if (!password) {
            errors.password = "Password is required";
        }
        setErrorMessages(errors);

        if (topErrorMessage || Object.keys(errors).length > 0) {
            setErrorMessages((prev) => ({ ...prev, topError: topErrorMessage }));
            return;
        }

        const formData = { email, password };
        try {

            if (email === "admin@gmail.com" && password === "admin") {
                localStorage.setItem('isLogin', 1);
                localStorage.setItem('userType', 'super-admin');
                navigate("/super-admin-dashboard");
                showSuccessMessage("Login Successful as Super Admin");
                return;
            }

            const response = await axios.post('http://localhost:5000/api/login', formData);
            const { message, userType, userId } = response.data;

            console.log(message);

            localStorage.setItem('isLogin', 1);
            localStorage.setItem('userType', userType);
            localStorage.setItem('userId', userId); // Save user ID for later use

            // Navigate to the appropriate dashboard with user ID in the path
            if (userType === 'homeowner') {
                navigate(`/homeowner-dashboard-page/${userId}`);
            } else if (userType === 'user') {
                navigate('/landing-page');
            }

            showSuccessMessage("Login Successful");
        } catch (error) {
            console.error("Login error", error);
            setErrorMessages({ topError: "Invalid email or password. Please try again." });
        }
    };


    return (
        <div className="main-container">
            <div className="container login-container">
                <div className="Form login-form">
                    <h2>Login</h2>
                    {/* Display top error message */}
                    {errorMessages.topError && <ViMessage message={errorMessages.topError} />}
                    <form>
                        <TextInput
                            logo="bx bxs-envelope"
                            label="Email"
                            name="email"
                            type="email"
                            placeholder='Enter Your Email'
                            onChange={handleInputChange}
                            errorMessage={errorMessages.email}
                        />
                        <TextInput
                            logo="bx bxs-lock-alt"
                            label="Password"
                            name="password"
                            type="password"
                            placeholder='Enter Your Password'
                            onChange={handleInputChange}
                            errorMessage={errorMessages.password}
                        />
                        <div className="forgot-section">
                            <span><input type="checkbox" name="remember" id="checked" /> Remember Me</span>
                            <span><a href="/">Forgot Password ?</a></span>
                        </div>

                        <Button
                            id="login-btn"
                            name="Login"
                            onClick={handleLogin}
                        />
                    </form>
                    <p className="RegisterBtn"><Link to="/register-page">Don't have an account? Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
}
