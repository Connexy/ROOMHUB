import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { showSuccessMessage } from '../../utils/Notification';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function BookingForm() {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        checkinDate: '',
        checkoutDate: '',
        additionalNotes: '',
        document: null, // For storing the document file
        roomId: roomId,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png']; // Example types
        const maxSize = 2 * 1024 * 1024; // 2 MB

        if (file && (!allowedTypes.includes(file.type) || file.size > maxSize)) {
            alert('Please upload a valid file (PDF/JPEG/PNG, max 2MB).');
            return;
        }

        setFormData({
            ...formData,
            document: file,
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const userId = localStorage.getItem('userId'); // Get userId from localStorage or authentication state
        if (!userId) {
            alert('User ID is missing. Please log in again.');
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('fullName', formData.fullName);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('phone', formData.phone);
        formDataToSend.append('checkinDate', formData.checkinDate);
        formDataToSend.append('checkoutDate', formData.checkoutDate);
        formDataToSend.append('additionalNotes', formData.additionalNotes);
        formDataToSend.append('roomId', formData.roomId);
        formDataToSend.append('userId', userId); // Add userId to the form data
        if (formData.document) {
            formDataToSend.append('document', formData.document);
        }

        try {
            const response = await fetch('http://localhost:5000/api/bookings', {
                method: 'POST',
                body: formDataToSend, // Automatically sets "multipart/form-data"
            });

            if (response.ok) {
                alert('Booking submitted successfully!');
                setFormData({
                    fullName: '',
                    email: '',
                    phone: '',
                    checkinDate: '',
                    checkoutDate: '',
                    additionalNotes: '',
                    document: null,
                    roomId: roomId,
                });
                showSuccessMessage('Booking successful');
                navigate(`/user-booking-status-page`);
            } else {
                const errorData = await response.json();
                console.error('Error response from server:', errorData);
                alert(`Failed to submit booking: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Error submitting booking:', error);
            alert('An error occurred while submitting your booking.');
        }
    };


    return (
        <>
            <Navbar />
            <div className="booking-outlet">
                <div className="booking-form">
                    <h2>Book a Room</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="fullName"
                                placeholder="Enter your full name"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input
                                type="number"
                                id="phone"
                                name="phone"
                                placeholder="Enter your phone number"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="checkin">Check-in Date</label>
                            <input
                                type="date"
                                id="checkin"
                                name="checkinDate"
                                value={formData.checkinDate}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="checkout">Check-out Date</label>
                            <input
                                type="date"
                                id="checkout"
                                name="checkoutDate"
                                value={formData.checkoutDate}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="document">Upload Document</label>
                            <p style={{ fontSize: '10px', color: "grey" }}>You can upload picture of your valid Id, Citizenship.</p>
                            <input
                                type="file"
                                id="document"
                                name="document"
                                onChange={handleFileChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="notes">Additional Notes</label>
                            <textarea
                                id="notes"
                                name="additionalNotes"
                                placeholder="Enter any additional information..."
                                value={formData.additionalNotes}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group-btn">
                            <button type="submit">Submit Booking</button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}
