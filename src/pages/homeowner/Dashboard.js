import React from 'react'
import Sidebar from '../../components/Sidebar';

export default function Dashboard() {
    return (
        <div>
            <div className='admin-part'>
                <Sidebar />

                {/* Main Content */}
                <div id="main-content">
                    <div className="dashboard-header">
                        <h1>Admin Dashboard</h1>
                    </div>

                    {/* Overview Cards */}
                    <div className="overview">
                        <div className="admin-card">
                            <h3>Total Rooms</h3>
                            <p>120</p> {/* Replace with dynamic data */}
                        </div>
                        <div className="admin-card">
                            <h3>Total Users</h3>
                            <p>340</p> {/* Replace with dynamic data */}
                        </div>
                        <div className="admin-card">
                            <h3>Booked Rooms</h3>
                            <p>45</p> {/* Replace with dynamic data */}
                        </div>
                        <div className="admin-card">
                            <h3>Pending Bookings</h3>
                            <p>8</p> {/* Replace with dynamic data */}
                        </div>
                    </div>

                    {/* Recent Activities */}
                    <div className="recent-activities">
                        <h2>Recent Activities</h2>
                        <ul>
                            <li>New room posted: Room ID #1234</li>
                            <li>User registered: User ID #5678</li>
                            <li>Pending booking: Booking ID #9012</li>
                        </ul>
                    </div>

                    {/* Notifications */}
                    <div className="notifications">
                        <h2>Notifications</h2>
                        <p>You have <b>5</b> new pending booking requests.</p>
                    </div>


                </div>
            </div>
        </div>
    );
}
