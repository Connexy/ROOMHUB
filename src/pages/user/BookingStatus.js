import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function BookingStatus() {
    const [bookings, setBookings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchBookings = async () => {
            const userId = localStorage.getItem('userId'); // Get the userId from localStorage

            if (!userId) {
                console.error('User ID not found');
                return;
            }

            try {
                const response = await axios.get('http://localhost:5000/api/bookings/status', {
                    params: { page: currentPage, limit: 5, userId }
                });
                console.log("Booking data fetched");
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

    // const handleChat = (bookingId, homeownerId) => {
    //     // Redirect to the chat page with booking and homeowner information
    //     navigate(`/user-chat-page/${bookingId}`, { state: { bookingId, homeownerId } });
    // };

    return (
        <>
            {/* <Navbar /> */}
            <div className="status-heading">
                <h1 style={{ paddingTop: "100px" }}>Check your room status!</h1>
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
                            <th>Status</th>
                            {/* <th>Chat</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length > 0 ? (
                            bookings.map((booking) => (
                                <tr key={booking.id}>
                                    <td>{booking.id}</td>
                                    <td>{booking.room_id}</td>
                                    <td>{booking.full_name}</td>
                                    <td>{booking.email_address}</td>
                                    <td>{booking.phone_number}</td>
                                    <td>
                                        <img
                                            src={`http://localhost:5000/uploads/${booking.document_path}`}
                                            alt="Document"
                                            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                                        />
                                    </td>
                                    <td>{booking.status}</td>
                                    {/* <td>
                                        <button
                                            className="btn-chat"
                                            onClick={() => handleChat(booking.id, booking.homeowner_id)}
                                        >
                                            Chat
                                        </button>
                                    </td> */}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" style={{ textAlign: "center", color: "red" }}>
                                    No booking status available
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>
            <nav className="status-container">
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
