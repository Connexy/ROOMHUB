import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function UserList() {

    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Match backend limit
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch paginated user data from backend
        const fetchUsers = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/users?page=${currentPage}&limit=${itemsPerPage}`
                );
                setUsers(response.data.users);
                setTotalPages(Math.ceil(response.data.total / itemsPerPage));
            } catch (err) {
                console.error("Error fetching users:", err);
                setError("Failed to load user data.");
            }
        };

        fetchUsers();
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

    return (
        <div className='admin-part'>
            <Sidebar />
            <div id="main-content">
                <div className="dashboard-header">
                    <h1>List of Users</h1>
                </div>

                <div className="dash-content">
                    {error && <p className="error-message">{error}</p>}
                    <div className="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>FullName</th>
                                    <th>Email</th>
                                    <th>Password</th>
                                    <th>Image</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>

                                        <td>{user.id}</td>
                                        <td>{user.fullname}</td>
                                        <td>{user.email}</td>
                                        <td>{user.password}</td>
                                        <td>{user.image}</td>
                                        <td>
                                            <Link to={`/admin-edit-user/${user.id}`} className="btn-edit">Edit</Link>
                                            <Link to='/' className="btn-delete">Delete</Link>
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
    );
}
