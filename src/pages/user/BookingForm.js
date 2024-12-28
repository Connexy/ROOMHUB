import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
// import { showSuccessMessage } from '../../utils/Notification';
// import { useNavigate } from 'react-router-dom';

export default function BookingForm() {




    return (
        <>
            <Navbar />
            <div className="booking-outlet">
                <div className="booking-form">
                    <h2>Book a Room</h2>
                    <form> {/* Use onSubmit here */}
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="fullName"
                                placeholder="Enter your full name"

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

                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="checkin">Check-in Date</label>
                            <input
                                type="date"
                                id="checkin"
                                name="checkinDate"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="checkout">Check-out Date</label>
                            <input
                                type="date"
                                id="checkout"
                                name="checkoutDate"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="notes">Additional Notes</label>
                            <textarea
                                id="notes"
                                name="additionalNotes"
                                placeholder="Enter any additional information..."

                            />
                        </div>

                        <div className="form-group">
                            <button type="submit">Submit Booking</button> {/* No onClick here */}
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}