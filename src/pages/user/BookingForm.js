import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export default function BookingForm() {
    return (
        <>
            <Navbar />
            <div className='booking-outlet'>
                <div class="booking-form">
                    <h2>Book a Room</h2>
                    <form>
                        <div class="form-group">
                            <label for="name">Full Name</label>
                            <input type="text" id="name" name="name" placeholder="Enter your full name" required />
                        </div>

                        <div class="form-group">
                            <label for="email">Email Address</label>
                            <input type="email" id="email" name="email" placeholder="Enter your email" required />
                        </div>

                        <div class="form-group">
                            <label for="phone">Phone Number</label>
                            <input type="tel" id="phone" name="phone" placeholder="Enter your phone number" required />
                        </div>

                        <div class="form-group">
                            <label for="checkin">Check-in Date</label>
                            <input type="date" id="checkin" name="checkin" required />
                        </div>

                        <div class="form-group">
                            <label for="checkout">Check-out Date</label>
                            <input type="date" id="checkout" name="checkout" required />
                        </div>

                        <div class="form-group">
                            <label for="notes">Additional Notes</label>
                            <textarea id="notes" name="notes" placeholder="Enter any additional information..."></textarea>
                        </div>

                        <div class="form-group">
                            <button type="submit">Submit Booking</button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}
