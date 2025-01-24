import React, { useState, useEffect } from 'react';
import { showInformationMessage } from '../../utils/Notification';
import { useNavigate, useParams } from 'react-router-dom';


export default function BookingForm() {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        additionalNotes: '',
        roomId: roomId,
        userId: userId,
    });
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [errorMessages, setErrorMessages] = useState({});

    // Validate form inputs
    const validateForm = () => {
        const errors = {};

        // Full Name validation
        if (!formData.fullName.trim()) {
            errors.fullName = 'Full Name is required';
        }

        // Email validation
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = 'Invalid email format';
        }


        // Phone validation
        if (!formData.phone.trim()) {
            errors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone)) {
            errors.phone = 'Phone number must be 10 digits';
        }


        setErrorMessages(errors);
        return Object.keys(errors).length === 0;
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setErrorMessages((prev) => ({ ...prev, [name]: '' }));
    };

    // Handle file upload
    // const handleFileChange = (e) => {
    //     const file = e.target.files[0];
    //     const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    //     const maxSize = 2 * 1024 * 1024;

    //     if (file && (!allowedTypes.includes(file.type) || file.size > maxSize)) {
    //         setErrorMessages((prev) => ({
    //             ...prev,
    //             document: 'Please upload a valid file (PDF/JPEG/PNG, max 2MB)',
    //         }));
    //         return;
    //     }

    //     setFormData({
    //         ...formData,
    //         document: file,
    //     });
    //     setErrorMessages((prev) => ({ ...prev, document: '' }));
    // };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
            formDataToSend.append(key, formData[key]);
        });

        try {
            const response = await fetch('http://localhost:5000/api/bookings', {
                method: 'POST',
                body: formDataToSend,
            });

            if (response.ok) {
                setFormData({
                    fullName: '',
                    email: '',
                    phone: '',
                    additionalNotes: '',
                    roomId: roomId,
                    userId: userId,
                });

                showInformationMessage('Please check your booking status');
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
            <div className="booking-outlet">
                <div className="booking-form">
                    <h2>Book a Room</h2>

                    <form onSubmit={handleSubmit}>
                        {/* Full Name */}
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            {errorMessages.fullName && <p style={{ color: "red", fontSize: "12px" }}>{errorMessages.fullName}</p>}
                            <input
                                type="text"
                                id="name"
                                name="fullName"
                                placeholder="Enter your full name"
                                value={formData.fullName}
                                onChange={handleChange}

                            />
                        </div>

                        {/* Email */}
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            {errorMessages.email && (
                                <p style={{ color: "red", fontSize: "12px" }}>{errorMessages.email}</p>
                            )}
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Phone Number */}
                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            {errorMessages.phone && <p style={{ color: "red", fontSize: "12px" }}>{errorMessages.phone}</p>}
                            <input
                                type="number"
                                id="phone"
                                name="phone"
                                placeholder="Enter your phone number"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Document Upload */}
                        {/* <div className="form-group">
                            <label htmlFor="document">Upload Document</label>
                            <p style={{ fontSize: '12px', color: 'grey' }}>
                                {errorMessages.document ? (
                                    <p style={{ color: "red", fontSize: "12px" }}>{errorMessages.document}</p>
                                ) : (
                                    <p style={{ fontSize: "10px", color: "grey" }}>
                                        You can upload a picture of your valid ID, citizenship, etc.
                                    </p>
                                )}
                            </p>
                            <input
                                type="file"
                                id="document"
                                name="document"
                                onChange={handleFileChange}
                            />
                        </div> */}

                        {/* Additional Notes */}
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

                        {/* Submit Button */}
                        <div className="form-group-btn">
                            <button type="submit">Submit Booking</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
