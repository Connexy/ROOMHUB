import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar'; // Ensure you have a Sidebar component


export default function BookingList() {
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

    // const updateStatus = (bookingId, status) => {
    //     const endpoint = status === 'Booked' ? 'http://localhost:5000/api/bookings/accept' : 'http://localhost:5000/api/bookings/decline';
    //     axios.post(endpoint, { bookingId })
    //         .then(response => {
    //             setBookings(bookings.map(booking =>
    //                 booking.id === bookingId ? { ...booking, status } : booking
    //             ));
    //         })
    //         .catch(error => {
    //             console.error('Error updating booking status:', error);
    //         });
    // };
    const updateStatus = (bookingId, status) => {
        const endpoint = status === 'Booked' ? 'http://localhost:5000/api/bookings/accept' : 'http://localhost:5000/api/bookings/decline';
        console.log('Updating booking status:', bookingId, status);
        axios.post(endpoint, { bookingId })
            .then(response => {
                console.log('Booking status updated:', response.data);
                setBookings(bookings.map(booking =>
                    booking.id === bookingId ? { ...booking, status } : booking
                ));
            })
            .catch(error => {
                console.error('Error updating booking status:', error);
            });
    };





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
        <div>
            <div className='admin-part'>
                <Sidebar />
                <div id="main-content">
                    <div className="dashboard-header">
                        <h1>Booking Lists</h1>
                    </div>
                    <div className="dash-content">
                        <div style={{ margin: "0" }} className="booking-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Room ID</th>
                                        <th>FullName</th>
                                        <th>Email</th>
                                        <th>Phone_No</th>
                                        <th>Check_in Date</th>
                                        <th>Check_out Date</th>
                                        <th>Document</th>
                                        <th>Status</th>
                                        <th className="action">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.map(booking => (
                                        <tr key={booking.id}>
                                            <td>{booking.id}</td>
                                            <td>{booking.room_id}</td>
                                            <td>{booking.full_name}</td>
                                            <td>{booking.email_address}</td>
                                            <td>{booking.phone_number}</td>
                                            <td>{booking.check_in_date}</td>
                                            <td>{booking.check_out_date}</td>
                                            <td>{booking.document_path}</td>
                                            <td>{booking.status}</td>
                                            <td className="action">
                                                <div className="action-buttons">
                                                    <button className="btn-accept" onClick={() => updateStatus(booking.id, 'Booked')}>Accept</button>
                                                    <button className="btn-decline" onClick={() => updateStatus(booking.id, 'Rejected')}>Decline</button>
                                                </div>
                                            </td>
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
                    </div>
                </div>
            </div>
        </div>
    );
}
