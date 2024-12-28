import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
    return (
        <>
            <div id="mySidebar" className="sidebar">
                <div id="mySidebar" className="sidebar">
                    <div>
                        <Link to='/admin-dashboard-page'><i className="fa fa-tachometer"></i> Dashboard</Link>
                        <Link to='/user-list'> <i className="fa fa-users"></i> User List</Link>
                        <Link to="/post-room"><i className="fa fa-plus"></i> Post Room</Link>
                        <a href="/admin-room-list"><i className="fa fa-home"></i> Room List</a>
                        <a href="/admin-booking-list"><i className="fa fa-calendar"></i> Bookings</a>
                    </div>
                    <div className="logout">
                        <a href="/"><i className="fa fa-sign-out"></i> Logout</a>
                    </div>
                </div>
                <div className="logout">
                    <a href="/"><i className="fa fa-sign-out"></i> Logout</a>
                </div>
            </div>
        </>
    )
}
