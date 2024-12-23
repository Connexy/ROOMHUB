import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function EditUser() {
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
        <div>
            <h1>Edit User</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Full Name:
                    <input
                        type="text"
                        name="fullname"
                        value={user.fullname || ''}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={user.email || ''}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={user.password || ''}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                {/* <label>
                    Image URL:
                    <input
                        type="text"
                        name="image"
                        value={user.image || ''}
                        onChange={handleInputChange}
                    />
                </label> */}
                <br />
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
}
