import React from 'react'
import { Link } from 'react-router-dom'
import TextInput from '../components/TextInput'
import PasswordInput from '../components/PasswordInput'
import Button from '../components/Button'

export default function Login() {
    return (
        <>
            <div class="main-container">
                <div class="container">
                    <div class="Form login-form">
                        <h2>Login</h2>
                        <form action="/">

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
                                id='login-btn'
                                name='Login'
                            />
                        </form>
                        <p class="RegisterBtn "><Link to='/register-page'>Don't have an account? Sign Up</Link></p>
                    </div>

                </div>
            </div>
        </>
    )
}

