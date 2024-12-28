import React from 'react'
import Navbar from '../../components/Navbar'
import { Link } from 'react-router-dom'
import Footer from '../../components/Footer'

export default function HowitWorks() {

    return (
        <>
            <Navbar />
            <div class="hiw-container">
                <div class="ci-container">
                    <div class="hiw-heading">
                        <h1>How it works</h1>
                        <p><i class="fa-solid fa-user"></i> Do you need Help</p>
                    </div>
                    <div class="btn-wrapper">
                        <button style={{ border: "none", backgroundColor: "#2A9D8F", color: "white" }} class="tenant">Tenant</button>
                        <Link to='/how-it-works-page-landlord'> <button style={{ border: "none", background: "none", color: "black" }} class="landlord">Landlord</button></Link>
                    </div>
                    <div class="text-wrapper">

                        <div class="text-part">
                            <h3>1. Warranty</h3>
                            <p>
                                The properties on the room less platform are all verified by our
                                team
                            </p>
                            <br />
                            <p>
                                This means that we guarantee the reality, the authencity of the
                                photos and the accuracy of the information in the listing so htath
                                you can book online in complete safety
                            </p>

                            <h3>2. search</h3>
                            <p>
                                The properties on the room less platform are all verified by our
                                team
                            </p>
                            <br />
                            <p>
                                This means that we guarantee the reality, the authencity of the
                                photos and the accuracy of the information in the listing so htath
                                you can book online in complete safety
                            </p>

                            <h3>3. Book</h3>
                            <p>
                                The properties on the room less platform are all verified by our
                                team
                            </p>
                            <br />
                            <p>
                                This means that we guarantee the reality, the authencity of the
                                photos and the accuracy of the information in the listing so htath
                                you can book online in complete safety
                            </p>

                            <h3>4. Confirm</h3>
                            <p>
                                The properties on the room less platform are all verified by our
                                team
                            </p>
                            <br />
                            <p>
                                This means that we guarantee the reality, the authencity of the
                                photos and the accuracy of the information in the listing so htath
                                you can book online in complete safety
                            </p>

                            <h3>5. Post Confirmation</h3>
                            <p>
                                The properties on the room less platform are all verified by our
                                team
                            </p>
                            <br />
                            <p style={{ marginBottom: "50px" }}>
                                This means that we guarantee the reality, the authencity of the
                                photos and the accuracy of the information in the listing so htath
                                you can book online in complete safety
                            </p >
                        </div>
                    </div>

                </div>
            </div >
            <Footer />
        </>
    )
}

