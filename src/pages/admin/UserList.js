import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function UserList() {

    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6); // Match backend limit
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState(null);

    const handleDelete = async (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                const response = await axios.delete(`http://localhost:5000/api/users/delete/${userId}`);
                alert(response.data.message);
                // Refresh the user list after deletion
                setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
            } catch (err) {
                console.error("Error deleting user:", err);
                alert("Failed to delete user.");
            }
        }
    };


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
            <div id="mySidebar" className="sidebar">
                <div id="mySidebar" className="sidebar">
                    <div>
                        <Link to='/super-admin-dashboard'><i className="fa fa-tachometer"></i> Dashboard</Link>
                        <Link to='/admin-user-list'> <i className="fa fa-users"></i> User List</Link>
                        <Link to='/admin-room-list'> <i className="fa fa-home"></i> Room List</Link>

                    </div>
                    <div className="logout">
                        <Link to="/login-page"><i className="fa fa-sign-out"></i> Logout</Link>
                    </div>
                </div>

            </div>
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
                                    <th>User Type</th>
                                    <th>FullName</th>
                                    <th>Email</th>

                                    <th>Document</th>
                                    {/* <th>Image</th> */}
                                    <th>Action</th>
                                </tr>
                            </thead>


                            <tbody>
                                {users.length === 0 ? (
                                    <tr>
                                        {/* This will span across all 6 columns */}
                                        <td colSpan="6" className="no-users-message">
                                            No users available
                                        </td>
                                    </tr>
                                ) : (
                                    users.map((user) => (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.UserType}</td>
                                            <td>{user.fullname}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                <img src={`http://localhost:5000/uploads/${user.image}`}
                                                    alt='net Err'
                                                    style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                                                />
                                            </td>
                                            {/* <td>{user.image}</td> */}
                                            <td>
                                                <Link to={`/admin-edit-user/${user.id}`} className="btn-edit">Edit</Link>
                                                <Link
                                                    className="btn-delete"
                                                    onClick={() => handleDelete(user.id)}
                                                >
                                                    Delete
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
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
