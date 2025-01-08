import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function RoomList() {
    const [rooms, setRooms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Match backend limit
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleDelete = (roomId) => {
        if (window.confirm("Are you sure you want to delete this room?")) {
            axios.delete(`http://localhost:5000/api/room/delete/${roomId}`)
                .then(() => {
                    setRooms(rooms.filter(room => room.id !== roomId));

                    alert("Room deleted successfully.");
                })
                .catch(error => {
                    console.error("Error deleting room:", error);
                    alert("Failed to delete room.");
                });
        }
    };


    useEffect(() => {
        // Fetch paginated room data from the backend
        const fetchRooms = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/room?page=${currentPage}&limit=${itemsPerPage}`
                );
                setRooms(response.data.rooms); // Update state with rooms data
                setTotalPages(Math.ceil(response.data.total / itemsPerPage)); // Calculate total pages
                setLoading(false);
            } catch (err) {
                console.error("Error fetching room data:", err);
                setError("Failed to load room data.");
                setLoading(false);
            }
        };

        fetchRooms();
    }, [currentPage, itemsPerPage]);

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


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading rooms: {error}</div>;
    }

    return (
        <>
            <div className="admin-part">
                <Sidebar />
                <div id="main-content">
                    <div className="dashboard-header">
                        <h1>Room Lists</h1>
                    </div>
                    <div className="dash-content">
                        <div className="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>City</th>
                                        <th>Address</th>
                                        <th>Price</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rooms.map(room => (
                                        <tr key={room.id}>
                                            <td>{room.id}</td>
                                            <td>{room.city}</td>
                                            <td>{room.room_address}</td>
                                            <td>{room.room_price}</td>
                                            <td>{room.status}</td>
                                            <td>
                                                <Link to={`/homeowner-edit-room/${room.id}`} className="btn-edit">Edit</Link>
                                                <Link onClick={() => handleDelete(room.id)} className="btn-delete"   >Delete </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {/* Pagination */}
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
            </div >
        </>
    );
}
