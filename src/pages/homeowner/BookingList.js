import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';

export default function BookingList() {
    const [bookings, setBookings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedBooking, setSelectedBooking] = useState(null); // For tracking selected booking

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/bookings', {
                    params: { page: currentPage, limit: 5 },
                });
                setBookings(response.data.bookings);
                setTotalPages(Math.ceil(response.data.total / 5));
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchBookings();

    }, [currentPage]);


    const updateStatus = async (bookingId, status) => {
        try {
            const endpoint =
                status === 'Booked'
                    ? 'http://localhost:5000/api/bookings/accept'
                    : 'http://localhost:5000/api/bookings/decline';

            const response = await axios.post(endpoint, { bookingId });
            console.log('Booking status updated:', response.data);

            // Update the status in the bookings list
            setBookings((prevBookings) =>
                prevBookings.map((booking) =>
                    booking.id === bookingId ? { ...booking, status } : booking
                )
            );

            // Update the selected booking status if it's the same
            if (selectedBooking?.id === bookingId) {
                setSelectedBooking({ ...selectedBooking, status });
            }
        } catch (error) {
            console.error('Error updating booking status:', error);
        }
    };

    const handleToggleDetails = (booking) => {
        if (selectedBooking?.id === booking.id) {
            // If the selected booking is already shown, hide it
            setSelectedBooking(null);
        } else {
            // Otherwise, show the clicked booking details
            setSelectedBooking(booking);
        }
    };


    return (
        <div>
            <div className="admin-part">
                <Sidebar />
                <div id="main-content">
                    <div className="dashboard-header">
                        <h1>Booking Lists</h1>
                    </div>
                    <div className="dash-content">
                        <div className="table-detail-list">
                            <div className="booking-table bookingList">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Room ID</th>
                                            <th>Status</th>
                                            <th>Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bookings.map((booking) => (
                                            <tr key={booking.id}>
                                                <td>{booking.id}</td>
                                                <td>{booking.room_id}</td>
                                                <td>{booking.status}</td>
                                                <td>
                                                    <button
                                                        className="btn-list"
                                                        onClick={() => handleToggleDetails(booking)}
                                                    >
                                                        {selectedBooking?.id === booking.id
                                                            ? "Hide"
                                                            : "View"}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Render selected booking details */}
                            {selectedBooking && (
                                <div className="list-details">
                                    <div className="list-user-bio">
                                        <div className="user-bio-img">
                                            {/* user image */}
                                        </div>
                                        <div className="user-bio-txt">
                                            <span>{selectedBooking.full_name}</span>
                                            <span>{selectedBooking.email_address}</span>
                                            <span>{selectedBooking.phone_number}</span>
                                            <span>
                                                Check-In:{" "}
                                                {new Date(selectedBooking.check_in_date).toLocaleDateString()}
                                            </span>
                                            <span>
                                                Check-Out:{" "}
                                                {new Date(selectedBooking.check_out_date).toLocaleDateString()}
                                            </span>
                                            <div className="user-bio-btn">
                                                <button
                                                    className="btn-accept"
                                                    onClick={() =>
                                                        updateStatus(selectedBooking.id, "Booked")
                                                    }
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    className="btn-decline"
                                                    onClick={() =>
                                                        updateStatus(selectedBooking.id, "Rejected")
                                                    }
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="list-user-doc">
                                        <div className="user-doc-img">
                                            <a
                                                href={`http://localhost:5000/uploads/${selectedBooking.document_path}`}
                                                download
                                                style={{ display: "block", width: "400px", height: "340px" }}>


                                                <img
                                                    src={`http://localhost:5000/uploads/${selectedBooking.document_path}`}
                                                    alt="Document"
                                                    style={{
                                                        width: "400px",
                                                        height: "340px",
                                                        borderRadius: "5px",
                                                        cursor: "pointer"
                                                    }}

                                                />
                                            </a>

                                        </div>
                                    </div>
                                </div>
                            )}

                            <nav className="pagination-container">
                                <button
                                    className="pagination-button"
                                    onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    &lt;
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        className={`pagination-number ${currentPage === page ? "active" : ""}`}
                                        onClick={() => setCurrentPage(page)}
                                    >
                                        {page}
                                    </button>
                                ))}
                                <button
                                    className="pagination-button"
                                    onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    &gt;
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
