import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export default function UserDetail() {
    return (
        <>
            <Navbar />
            <div>

                <div className="large_container">
                    <div className="user_profile">
                        <div className="avatar">

                        </div>
                        <div className="name">Kiswor Chhetri</div>
                        <div className="profession">Full Stack Developer</div>
                        <button className="buttonfollow">Follow</button>
                    </div>
                    <div className="user_details">
                        <div classNameName="user_heading">
                            <h3 style={{ marginLeft: "10px" }}>User Details</h3>
                        </div>
                        <p><strong>Name:</strong> Kiswor Chhetri</p>
                        <p><strong>Email:</strong> kisworchhetri.2001@example.com</p>
                        <p><strong>Phone:</strong> +1 234 567 890</p>
                        <p><strong>Mobile:</strong> +977 9741710841</p>
                        <p><strong>Address:</strong> Afaldol Dhobighat, Lalitpur, Bagmati, Nepal</p>
                        <button className="buttonedit">Edit</button>
                    </div>


                </div>
            </div>
            <Footer />
        </>
    )
}
