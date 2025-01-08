import React from 'react'
import { Link } from 'react-router-dom'
import { showInformationMessage } from "../utils/Notification";

export default function Sidebar() {
    const doLogout = () => {
        if (localStorage.getItem('isLogin')) {
            localStorage.removeItem('isLogin');
            showInformationMessage("Logout successfully");

        }

    }
    return (
        <>
            <div id="mySidebar" className="sidebar">
                <div id="mySidebar" className="sidebar">
                    <div>
                        <Link to='/admin-dashboard-page/:userId'><i className="fa fa-tachometer"></i> Dashboard</Link>
                        {/* <Link to='/admin-user-list'> <i className="fa fa-users"></i> User List</Link> */}
                        <Link to="/admin-post-room"><i className="fa fa-plus"></i> Post Room</Link>
                        <Link to="/admin-room-list"><i className="fa fa-home"></i> Room List</Link>
                        <Link to="/admin-booking-list"><i className="fa fa-calendar"></i> Bookings</Link>
                    </div>
                    <div className="logout">
                        <Link onClick={doLogout} to="/login-page"><i className="fa fa-sign-out"></i> Logout</Link>
                    </div>
                </div>

            </div>
        </>
    )
}
