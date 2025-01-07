import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import { showSuccessMessage } from '../../utils/Notification';
import { validateEmail } from '../../utils/Common';
import ViMessage from '../../components/ViMessage';
import FileInput from '../../components/FileInput';
import SelectBox from '../../components/SelectBox';

export default function Register() {
    const navigate = useNavigate();
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState(''); // Add state for user type
    const [image, setImage] = useState(null);
    const [errorMessages, setErrorMessages] = useState({});

    const handleInputChange = (event) => {
        const { name, value, files } = event.target;
        if (name === 'fullname') {
            setFullname(value);
        } else if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        } else if (name === 'image') {
            setImage(files[0]);
        } else if (name === 'userType') {
            setUserType(value); // Update user type state
        }
    };

    const handleRegister = async (event) => {
        event.preventDefault();

        // Validation checks
        const errors = {};
        if (!fullname) {
            errors.fullname = "Fullname is required";
        }
        if (!email) {
            errors.email = "Email is required";
        } else if (!validateEmail(email)) {
            errors.email = "Invalid email format";
        }
        if (!password) {
            errors.password = "Password is required";
        }
        if (!userType) {
            errors.userType = 'User type is required';
        }
        if (!image) {
            errors.image = 'Image file is required';
        }
        setErrorMessages(errors);
        if (Object.keys(errors).length > 0) {
            return;
        }

        const formData = new FormData();
        formData.append('fullname', fullname);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('userType', userType); // Append user type
        formData.append('image', image);
        try {
            const response = await axios.post('http://localhost:5000/api/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data.message);
            navigate('/login-page');
            showSuccessMessage("Registration Successful");
        } catch (error) {
            console.error("Registration error", error);
            setErrorMessages({ general: "Registration failed, please try again!" });
        }
    };

    return (
        <div className="main-container">
            <div className="container register-container">
                <div className="Form Register-form">
                    <h2>Register</h2>
                    {errorMessages.general && <ViMessage message={errorMessages.general} />}
                    <form>
                        <TextInput
                            logo='bx bxs-user'
                            label='Full Name'
                            name='fullname'
                            type='text'
                            placeholder='Enter Your Full Name'
                            onChange={handleInputChange}
                            errorMessage={errorMessages.fullname}
                        />

                        <TextInput
                            logo='bx bxs-envelope'
                            label='Email'
                            name='email'
                            type='email'
                            placeholder='Enter Your Email'
                            onChange={handleInputChange}
                            errorMessage={errorMessages.email}
                        />

                        <TextInput
                            logo='bx bxs-lock-alt'
                            label='Password'
                            name='password'
                            type='password'
                            placeholder='Enter Your Password'
                            onChange={handleInputChange}
                            errorMessage={errorMessages.password}
                        />

                        <FileInput
                            label='Photo'
                            name='image'
                            onChange={handleInputChange}
                            errorMessage={errorMessages.image}
                        />

                        <SelectBox
                            name="userType"
                            label="User Type"
                            value={userType}
                            onChange={handleInputChange}
                            options={[
                                { value: "homeowner", label: "Homeowner" },
                                { value: "user", label: "User" },
                            ]}
                            placeholder="Select User Type"
                            errorMessage={errorMessages.userType}
                        />

                        <div className="forgot-section">
                            <span><input type="checkbox" name="remember" id="checked" />Remember Me</span>
                            <span><a href="/">Forgot Password ?</a></span>
                        </div>

                        <Button
                            id='register-btn'
                            name='Register'
                            onClick={handleRegister}
                        />
                    </form>
                    <p className="LoginBtn"><Link to='/login-page'>Go back to login</Link></p>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
