import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { showSuccessMessage } from '../../utils/Notification';
import { useNavigate } from 'react-router-dom';

export default function BookingForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        checkinDate: '',
        checkoutDate: '',
        additionalNotes: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Booking submitted successfully!');
                setFormData({
                    fullName: '',
                    email: '',
                    phone: '',
                    checkinDate: '',
                    checkoutDate: '',
                    additionalNotes: ''
                });
                showSuccessMessage("Booking successful");
                navigate(`/user-booking-status-page`);
            } else {
                alert('Failed to submit booking. Please try again.');
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
                            <label htmlFor="notes">Additional Notes</label>
                            <textarea
                                id="notes"
                                name="additionalNotes"
                                placeholder="Enter any additional information..."
                                value={formData.additionalNotes}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <button type="submit">Submit Booking</button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}
