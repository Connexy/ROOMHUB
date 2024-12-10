import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';

export default function UserList() {
    // Example data for users
    const userData = Array.from({ length: 30 }, (_, i) => ({
        id: i + 1,
        fullName: `User ${i + 1}`,
        userName: `username${i + 1}`,
        password: `password${i + 1}`,
    }));

    const itemsPerPage = 12; // Items to display per page
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate total pages
    const totalPages = Math.ceil(userData.length / itemsPerPage);

    // Get the current page data
    const currentData = userData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Handle page navigation
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
            <div className='admin-part'>
                <Sidebar />
                <div id="main-content">
                    <div className="dashboard-header">
                        <h1>List of Users</h1>
                    </div>

                    <div className="dash-content">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Fullname</th>
                                    <th>Email</th>
                                    <th>Password</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentData.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.fullName}</td>
                                        <td>{user.userName}</td>
                                        <td>{user.password}</td>
                                        <td>
                                            <a href="/" class="btn-edit">Edit</a>
                                            <a href="/" class="btn-delete">Delete</a>
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
                                    className={`pagination-number ${currentPage === number ? 'active' : ''
                                        }`}
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
        </>
    );
}
