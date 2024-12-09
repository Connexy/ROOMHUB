import React from 'react'
import Navbar from '../components/Navbar'

export default function HowitWorks() {
    return (
        <>
            <Navbar />
            <div class="hiw-container">
                <div class="ci-container">
                    <div class="hiw-heading">
                        <h1>How it works</h1>
                        {/* <p><i class="fa-solid fa-user"></i> Do you need Help</p> */}
                    </div>
                    <div class="btn-wrapper">
                        <button class="tenant">tenant</button>
                        <button class="landlord">Landlord</button>
                    </div>
                    <div class="text-wrapper">

                        <div class="text-part">
                            <h1>1. Warranty</h1>
                            <p>
                                The properties on the room less platform are all varified by our
                                team
                            </p>
                            <br />
                            <p>
                                This means that we guarantee the reality, the authencity of the
                                photos and the accuracy of the information in the listing so htath
                                you can book online in complete safety
                            </p>
                        </div>
                    </div>

                </div>
            </div >
        </>
    )
}

