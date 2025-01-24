import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { showInformationMessage } from '../../utils/Notification';

export default function AdminRoomList() {
    const [rooms, setRooms] = useState([]);
    const [totalRooms, setTotalRooms] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const limit = 10; // Number of rooms per page

    useEffect(() => {
        const fetchRooms = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await axios.get(`http://localhost:5000/api/admin/rooms`, {
                    params: { page: currentPage, limit },
                });
                setRooms(response.data.rooms);
                setTotalRooms(response.data.total);
            } catch (err) {
                console.error('Error fetching admin rooms:', err);
                setError('Failed to fetch rooms. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, [currentPage]);

    const handleStatusChange = async (id, status) => {

        try {
            const response = await axios.put(`http://localhost:5000/api/admin/rooms/${id}/status`, { status });

            // Show information message for approval/rejection
            showInformationMessage(`Room ${status === 'approve' ? 'Approved' : 'Rejected'}`);

            // Refresh room list after status update
            setRooms((prevRooms) =>
                prevRooms.map((room) =>
                    room.id === id ? { ...room, approval: status } : room
                )
            );
        } catch (err) {
            console.error(`Failed to ${status} room:`, err);
            showInformationMessage(`Failed to ${status} room. Please try again later.`);
        }
    };

    const totalPages = Math.ceil(totalRooms / limit);

    return (
        <>
            <div id="mySidebar" className="sidebar">
                <div>
                    <Link to='/super-admin-dashboard'><i className="fa fa-tachometer"></i> Dashboard</Link>
                    <Link to='/admin-user-list'> <i className="fa fa-users"></i> User List</Link>
                    <Link to='/admin-room-list' style={{ backgroundColor: "#ddd" }}> <i className="fa fa-home"></i> Room List</Link>
                </div>
                <div className="logout">
                    <Link to="/login-page"><i className="fa fa-sign-out"></i> Logout</Link>
                </div>
            </div>

            <div id="main-content">
                <div className="dashboard-header">
                    <h1>List of Rooms</h1>
                </div>

                <div className="dash-content">
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p className="error">{error}</p>
                    ) : (
                        <div className="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Room Id</th>
                                        <th>Owner Id</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rooms.length > 0 ? (
                                        rooms.map((room) => (
                                            <tr key={room.id}>
                                                <td>{room.id}</td>
                                                <td>{room.homeowner_id}</td>
                                                <td>{room.approval}</td>
                                                <td>
                                                    <button
                                                        className="btn-edit ap-btn"
                                                        onClick={() => handleStatusChange(room.id, 'approve')}
                                                        disabled={room.approval === 'approve'}
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        className="btn-delete ap-btn"
                                                        onClick={() => handleStatusChange(room.id, 'reject')}
                                                        disabled={room.approval === 'reject'}
                                                    >
                                                        Reject
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" style={{ textAlign: 'center', color: "red" }}>No rooms data available</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                <nav className="pagination-container">
                    <button
                        className="pagination-button"
                        id="prev-button"
                        aria-label="Previous page"
                        title="Previous page"
                        onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
                        disabled={currentPage === 1}
                    >
                        &lt;
                    </button>

                    <div id="pagination-numbers">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                            <button
                                key={number}
                                className={`pagination-number ${currentPage === number ? 'active' : ''}`}
                                onClick={() => setCurrentPage(number)}
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
                        onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        &gt;
                    </button>
                </nav>
            </div>
        </>
    );
}