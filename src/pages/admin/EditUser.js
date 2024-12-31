import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { showSuccessMessage } from '../../utils/Notification';

export default function EditUser() {
    const navigate = useNavigate();
    const { userId } = useParams(); // Extract userId from URL
    const [user, setUser] = useState(null); // State to hold user data
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch the user details from the backend
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/edit/${userId}`);
                setUser(response.data);
            } catch (err) {
                console.error("Error fetching user details:", err);
                setError("Failed to load user details.");
            }
        };

        fetchUser();
    }, [userId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Update user details in the backend
            await axios.put(`http://localhost:5000/api/users/edit/${userId}`, user);
            alert("User updated successfully!");
            showSuccessMessage("user updated successfully");
            navigate(`/admin-user-list`);
        } catch (err) {
            console.error("Error updating user:", err);
            setError("Failed to update user.");
        }
    };

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    if (!user) {
        return <p>Loading user details...</p>;
    }

    return (
        <>
            <div className='admin-part'>
                <Sidebar />
                <div id="main-content">
                    <div className="dashboard-header">
                        <h1>Edit User</h1>
                    </div>

                    <div className="dash-content"></div>

                    <div className="box">
                        <form className="dProdAddFormBody fg1 flex fdc bor" onSubmit={handleSubmit}>
                            <label>
                                Full Name:
                            </label>
                            <input
                                type="text"
                                name="fullname"
                                value={user.fullname || ''}
                                onChange={handleInputChange}
                            />


                            <label>
                                Email:
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={user.email || ''}
                                onChange={handleInputChange}
                            />


                            <label>
                                Password:
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={user.password || ''}
                                onChange={handleInputChange}
                            />



                            <br />
                            <button type="submit">Save Changes</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
