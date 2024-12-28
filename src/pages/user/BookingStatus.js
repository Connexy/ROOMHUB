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
                console.log('Bookings fetched:', response.data);
                setBookings(response.data.bookings);
                setTotalPages(Math.ceil(response.data.total / 5));
            } catch (error) {
                console.error('Error fetching bookings:', error);
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
                            <th>ID</th>
                            <th>FullName</th>
                            <th>Email</th>
                            <th>Phone_No</th>
                            <th>Check_in Date</th>
                            <th>Check_out Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(booking => (
                            <tr key={booking.id}>
                                <td>{booking.id}</td>
                                <td>{booking.full_name}</td>
                                <td>{booking.email_address}</td>
                                <td>{booking.phone_number}</td>
                                <td>{booking.check_in_date}</td>
                                <td>{booking.check_out_date}</td>
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
