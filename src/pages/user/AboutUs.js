import React from 'react'
import BG from '../../assets/images/bg.png';
import { useEffect } from 'react';

export default function AboutUs() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div style={{ marginTop: "100px" }} className="about-us-container">
                <div style={{ textAlign: "center", marginBottom: "20px" }} className="about-us-header">
                    <h1>About Us</h1>
                    <p style={{ color: "grey" }} >Your trusted platform for finding and renting the perfect room.</p>
                </div>
                <img src={BG} alt='network error' style={{ height: "500px", width: "100%" }} />
                <div className="safety-section">
                    <div className="safety">
                        <div className="section1">
                            <i className="fas fa-home"></i>
                            <h3>Verified apartment</h3>
                            <p>Our apartments are checked before listing to ensure they meet our standards.</p>
                        </div>
                        <div className="section2">
                            <i className="fas fa-mouse-pointer"></i>
                            <h3>Rent with one click</h3>
                            <p>Our online rental process is quick and easy. Just one click and you're done!</p>
                        </div>
                        <div className="section3">
                            <i className="fas fa-users"></i>
                            <h3>A team dedicated to you</h3>
                            <p>We have a dedicated team ready to assist you with any queries or issues.</p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
