import React, { useState, useEffect } from 'react';
import axios from 'axios';
import userProfile from "../../assets/images/avatar.png"

export default function UserDetail() {
    const [showDetails, setShowDetails] = useState(false); // State to control visibility
    const [userData, setUserData] = useState(null); // State to store user data
    const userId = localStorage.getItem("userId");

    const handleToggleDetails = () => {
        setShowDetails(!showDetails); // Toggle the visibility of user details
    };

    useEffect(() => {
        if (userId) {
            axios.get(`http://localhost:5000/api/user/${userId}`)
                .then(response => {
                    setUserData(response.data);
                })
                .catch(error => {
                    console.error("Error fetching user details:", error);
                });
        } else {
            console.error("No user ID found in localStorage");
        }
    }, [userId]);

    return (
        <>
            {/* <Navbar /> */}
            <div>
                <div className='large_container_heading'>
                    <h1>About User</h1>
                </div>
                <div className="large_container">
                    {/* Left part - User profile */}
                    <div className="user_profile">
                        <div className="avatar">
                            <img
                                src={userProfile}
                                alt="User Avatar"
                                style={{
                                    height: "100px",
                                    width: "100px",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                }}
                            />

                        </div>
                        <div className="name">{userData ? userData.fullname : "Loading..."}</div>
                        {/* <div className="profession">Full Stack Developer</div> */}
                        <button className="buttonPreview" onClick={handleToggleDetails}>
                            {showDetails ? 'Hide Details' : 'Preview'}
                        </button>
                    </div>

                    {/* Right part - User details */}
                    {showDetails && userData && ( // Render only if `showDetails` is true and userData exists
                        <div className="user_details">
                            <div className='us-cl'>
                                <p><strong>Name:</strong> {userData.fullname}</p>
                                <p><strong>Email:</strong> {userData.email}</p>
                                <p><strong>Phone:</strong> +1 234 567 890</p>
                                <p><strong>Mobile:</strong> +977 9741710841</p>
                                <p><strong>Address:</strong> Afaldol Dhobighat, Lalitpur, Bagmati, Nepal</p>
                                {/* <button className="buttonedit">Edit</button> */}
                            </div>
                            <div className='us-dc'>
                                {userData && userData.image ? (
                                    <img
                                        src={`http://localhost:5000/uploads/${userData.image}`}
                                        alt="User Avatar"
                                        style={{
                                            height: "200px",
                                            width: "400px",
                                            borderRadius: "5px",
                                            objectFit: "cover",
                                        }}
                                    />
                                ) : (
                                    <div className="avatar_placeholder">No Image</div>
                                )}
                            </div>

                        </div>
                    )}
                </div>
            </div>
            {/* <Footer /> */}
        </>
    );
}
