import React from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
    return (
        <>
            <div class="main-container">
                <div class="container">
                    <div class="Form login-form">
                        <h2>Login</h2>
                        <form action="/">
                            <div class="input-box">
                                <i class='bx bxs-envelope'></i>
                                <label for="/">Email</label>
                                <input type="email" placeholder="Enter Your Email*" />

                            </div>
                            <div class="input-box">
                                <i class='bx bxs-lock-alt'></i>
                                <label for="/">Password</label>
                                <input type="password" placeholder="Enter Your Password*" />
                            </div>
                            <div class="forgot-section">
                                <span><input type="checkbox" name="" id="checked" />Remember Me</span>
                                <span><a href="/">Forgot Password ?</a></span>
                            </div>
                            <button class="btn" id="login-btn">Login</button>
                        </form>
                        <p>Or Sign up using</p>
                        <div class="social-media">
                            <i class='bx bxl-facebook'></i>
                            <i class='bx bxl-google'></i>
                        </div>
                        <p class="RegisterBtn "><Link to='/register-page'>Don't have an account? Sign Up</Link></p>
                    </div>

                </div>
            </div>
        </>
    )
}

