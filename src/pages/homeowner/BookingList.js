import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';

export default function BookingList() {
    const [bookings, setBookings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedBooking, setSelectedBooking] = useState(null); // For tracking selected booking
    const [actionDisabled, setActionDisabled] = useState({});

    const homeownerId = localStorage.getItem("userId");
    const saveBookingIdToLocalStorage = (bookingId) => {
        localStorage.setItem('bookingId', JSON.stringify(bookingId));
    };

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/bookings', {
                    params: {
                        homeownerId,
                        page: currentPage,
                        limit: 5
                    },
                });
                setBookings(response.data.bookings); // Update state with bookings data
                setTotalPages(Math.ceil(response.data.total / 5)); // Calculate total pages
                const bookingId = response.data.bookings.map(booking => booking.id);

                // Save booking IDs to local storage
                saveBookingIdToLocalStorage(bookingId);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchBookings();
    }, [currentPage, homeownerId]);

    // const updateStatus = async (bookingId, status) => {
    //     try {
    //         const endpoint =
    //             status === 'Booked'
    //                 ? 'http://localhost:5000/api/bookings/accept'
    //                 : 'http://localhost:5000/api/bookings/decline';

    //         const response = await axios.post(endpoint, { bookingId });
    //         console.log('Booking status updated:', response.data);

    //         alert(`Booking has been ${status === 'Booked' ? 'accepted' : 'rejected'}.`);

    //         // Update the status in the bookings list
    //         setBookings((prevBookings) =>
    //             prevBookings.map((booking) =>
    //                 booking.id === bookingId ? { ...booking, status } : booking
    //             )
    //         );

    //         // Update the selected booking status if it's the same
    //         if (selectedBooking?.id === bookingId) {
    //             setSelectedBooking({ ...selectedBooking, status });
    //         }
    //         // Disable the action buttons for this booking
    //         setActionDisabled((prevState) => ({
    //             ...prevState,
    //             [bookingId]: {
    //                 accept: status === 'Booked',
    //                 reject: status === 'Rejected',
    //             },
    //         }));

    //     } catch (error) {
    //         console.error('Error updating booking status:', error);
    //     }
    // };
    const updateStatus = async (bookingId, status) => {
        try {
            const endpoint =
                status === 'Booked'
                    ? 'http://localhost:5000/api/bookings/accept'
                    : 'http://localhost:5000/api/bookings/decline';

            const response = await axios.post(endpoint, { bookingId });
            console.log('Booking status updated:', response.data);

            alert(`Booking has been ${status === 'Booked' ? 'accepted' : 'rejected'}.`);

            // Update the booking status
            setBookings((prevBookings) =>
                prevBookings.map((booking) =>
                    booking.id === bookingId ? { ...booking, status } : booking
                )
            );

            // Update selected booking
            if (selectedBooking?.id === bookingId) {
                setSelectedBooking({ ...selectedBooking, status });
            }

            // Toggle button states
            setActionDisabled((prevState) => ({
                ...prevState,
                [bookingId]: {
                    accept: status === 'Booked', // Disable "Accept" if clicked
                    reject: status === 'Rejected', // Disable "Reject" if clicked
                },
            }));
        } catch (error) {
            console.error('Error updating booking status:', error);
        }
    };



    const handleToggleDetails = (booking) => {
        if (selectedBooking?.id === booking.id) {
            setSelectedBooking(null);
        } else {
            setSelectedBooking(booking);
        }
    };

    // const openChat = (booking) => {
    //     // Redirect to the chat page or open a chat modal
    //     // Pass booking.user_id as a parameter for identifying the chat
    //     navigate(`/homeowner-chat-page/${booking.user_id}`);
    // };

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
                                            {/* <th>Chat</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bookings.length > 0 ? (
                                            bookings.map((booking) => (
                                                <tr key={booking.id}>
                                                    <td>{booking.id}</td>
                                                    <td>{booking.room_id}</td>
                                                    <td>{booking.status}</td>
                                                    <td>
                                                        <button
                                                            className="btn-list"
                                                            onClick={() => handleToggleDetails(booking)}
                                                        >
                                                            {selectedBooking?.id === booking.id ? "Hide" : "View"}
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" style={{ textAlign: "center", padding: "10px", color: "red" }}>
                                                    No bookings available
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>

                                </table>
                            </div>

                            {selectedBooking && (
                                <div className="list-details">
                                    <div className="list-user-bio">
                                        <div className="user-bio-img">

                                        </div>
                                        <div className="user-bio-txt">
                                            <div className="row">
                                                <span>Room ID : {selectedBooking.room_id}</span>
                                                <span>Name : {selectedBooking.full_name}</span>
                                                <span>Email: {selectedBooking.email_address}</span>
                                                <span>Contact: {selectedBooking.phone_number}</span>
                                            </div>


                                        </div>
                                        <div className="user-bio-btn">

                                            <button
                                                className="btn-accept bk-btn"
                                                onClick={() => updateStatus(selectedBooking.id, 'Booked')}
                                                disabled={selectedBooking.status === 'Booked' || actionDisabled[selectedBooking.id]?.accept}
                                            >
                                                Accept
                                            </button>

                                            <button
                                                className="btn-decline bk-btn"
                                                onClick={() => updateStatus(selectedBooking.id, 'Rejected')}
                                                disabled={selectedBooking.status === 'Rejected' || actionDisabled[selectedBooking.id]?.reject}
                                            >
                                                Reject
                                            </button>

                                        </div>
                                    </div>
                                    <div className="list-user-doc">
                                        <div className="user-doc-img">

                                            <img
                                                src={`http://localhost:5000/uploads/${selectedBooking.document_path}`}
                                                alt="Document"
                                                style={{
                                                    width: "550px",
                                                    height: "360px",
                                                    borderRadius: "5px",
                                                    cursor: "pointer"
                                                }}
                                            />

                                        </div >
                                    </div >
                                </div >
                            )
                            }

                            <nav className="book-paging" style={{ marginTop: "20px" }}>
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
                        </div >
                    </div >
                </div >
            </div >
        </div >
    );
}
