import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import axios from 'axios';

export default function BookingStatus() {
    const [bookings, setBookings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/bookings', {
                    params: { page: currentPage, limit: 5 }
                });
                console.log('API Response:', response.data); // Log response data
                setBookings(response.data.bookings);
                setTotalPages(Math.ceil(response.data.total / 5));
            } catch (error) {
                console.error('Error fetching bookings:', error); // Log error details
            }
        };

        fetchBookings();
    }, [currentPage]);


    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <Navbar />
            <div className="status-heading">
                <h1>Check your room status!</h1>
            </div>
            <div className="booking-table">
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>RoomId</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Phone-No</th>
                            <th>Document</th>
                            <th>Check-In Date</th>
                            <th>Check-Out Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking.id}>
                                <td>{booking.id}</td>
                                <td>{booking.room_id}</td>
                                <td>{booking.full_name}</td>
                                <td>{booking.email_address}</td>
                                <td>{booking.phone_number}</td>
                                <td>
                                    <img src={`http://localhost:5000/uploads/${booking.document_path}`}
                                        alt='net Err'
                                        style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                                    />
                                </td>
                                <td>{new Date(booking.check_in_date).toLocaleDateString()}</td>
                                <td>{new Date(booking.check_out_date).toLocaleDateString()}</td>
                                <td>{booking.status}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>

            </div>
            <nav className="pagination-container">
                <button
                    className="pagination-button"
                    id="prev-button"
                    aria-label="Previous page"
                    title="Previous page"
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                >
                    &lt;
                </button>

                <div id="pagination-numbers">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                        <button
                            key={number}
                            className={`pagination-number ${currentPage === number ? 'active' : ''}`}
                            onClick={() => handlePageClick(number)}
                        >
                            {number}
                        </button>
                    ))}
                </div>

                <button
                    className="pagination-button"
                    id="next-button"
                    aria-label="Next page"
                    title="Next page"
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                >
                    &gt;
                </button>
            </nav>
        </>
    );
} 
