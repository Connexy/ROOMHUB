import React from 'react'
import { Link } from 'react-router-dom'
import PasswordInput from '../components/PasswordInput'
import TextInput from '../components/TextInput'
import Button from '../components/Button'

export default function Register() {
    return (
        <>
            <div class="main-container">
                <div class="container">
                    <div class="Form Register-form">
                        <h2>Register</h2>
                        <form action="/">

                            <TextInput
                                logo='bx bxs-user'
                                label='Full Name'
                                name='email'
                                type='email'
                                placeholder='Enter Your Email'
                            />

                            <TextInput
                                logo='bx bxs-envelope'
                                label='Email'
                                name='email'
                                type='email'
                                placeholder='Enter Your Email'
                            />

                            <PasswordInput
                                logo='bx bxs-lock-alt'
                                label='Password'
                                name='password'
                                placeholder='Enter Your Password'
                            />
                            <div class="forgot-section">
                                <span><input type="checkbox" name="" id="checked" />Remember Me</span>
                                <span><a href="/">Forgot Password ?</a></span>
                            </div>
                            <Button
                                id='register-btn'
                                name='Register'
                            />
                        </form>
                        <p class="LoginBtn"><Link to='/login-page'>Go back to login</Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}
