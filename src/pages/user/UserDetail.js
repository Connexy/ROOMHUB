import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function UserDetail() {
    const [showDetails, setShowDetails] = useState(false); // State to control visibility

    const handleToggleDetails = () => {
        setShowDetails(!showDetails); // Toggle the visibility of user details
    };

    return (
        <>
            <Navbar />
            <div>
                <div className='large_container_heading'>
                    <h1>About User</h1>
                </div>
                <div className="large_container">
                    {/* Left part - User profile */}
                    <div className="user_profile">
                        <div className="avatar"></div>
                        <div className="name">Kiswor Chhetri</div>
                        <div className="profession">Full Stack Developer</div>
                        <button className="buttonPreview" onClick={handleToggleDetails}>
                            {showDetails ? 'Hide Details' : 'Preview'}
                        </button>
                    </div>

                    {/* Right part - User details */}
                    {showDetails && ( // Render only if `showDetails` is true
                        <div className="user_details">
                            <p><strong>Name:</strong> Kiswor Chhetri</p>
                            <p><strong>Email:</strong> kisworchhetri.2001@example.com</p>
                            <p><strong>Phone:</strong> +1 234 567 890</p>
                            <p><strong>Mobile:</strong> +977 9741710841</p>
                            <p><strong>Address:</strong> Afaldol Dhobighat, Lalitpur, Bagmati, Nepal</p>
                            <button className="buttonedit">Edit</button>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}
