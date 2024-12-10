import React from 'react'
import Sidebar from '../../components/Sidebar'

export default function PostRoom() {
    return (
        <>
            <div className='admin-part'>
                <Sidebar />
                <div id="main-content">
                    <div className="dashboard-header">
                        <h1>Post Room</h1>
                    </div>

                    <div class="box">

                        <form action="../user?page=addroom" class="dProdAddFormBody fg1 flex fdc bor" enctype="multipart/form-data" method="post">

                            <label for="room-title">Enter Full Address</label>
                            <input type="text" id="room-address" name="roomaddress" value="Dhobighat, 04, Lalitpur" required />

                            <label for="room-location">City</label>
                            <input type="text" id="city" name="city" value="Ktm" required />

                            {/* <label for="room-size">Room Type</label>
                            <input type="text" id="room-type" name="roomsize" min="0" step="0.01" value="255" required /> */}
                            <label for="room-type">Room Type</label>
                            <select id="option" name="roomtype" required>
                                <option value="">Select Room Type</option>
                                <option value="single">Single</option>
                                <option value="double">Double</option>
                                <option value="double">Shared</option>
                            </select>

                            <label for="total-bedroom">Total number of Bedroom </label>
                            <select id="option" name="bedroom" required>
                                <option >1</option>
                                <option >2</option>
                                <option >3</option>
                                <option >3+</option>
                            </select>

                            <label for="total-bathroom">Total Number of Bathroom </label>
                            <select id="option" name="bathroom" required>
                                <option >1</option>
                                <option >2</option>
                                <option >3</option>
                                <option >3+</option>
                            </select>

                            <label for="kitchenroom">Kitchen Room </label>
                            <select id="option" name="kitchenroom" required>
                                <option >1</option>
                                <option >2</option>
                                <option >3</option>
                                <option >N/A</option>
                            </select>

                            <label for="property">Floor </label>
                            <select id="option" name="floor" required>
                                <option >First</option>
                                <option >Second</option>
                                <option >Third</option>
                                <option >Fourth</option>
                                <option >Fifth</option>
                            </select>

                            <label for="property-status">Property Status </label>
                            <select id="option" name="status" required>
                                <option >Available</option>
                                <option >Booked</option>
                            </select>

                            <label for="room-rent">Rent per month</label>
                            <input type="number" id="room-rent" name="roomprice" value="2500" required />


                            <label>Property amenities</label>
                            <div>
                                <input type="checkbox" id="wifi" name="amenities" value="wifi" />
                                <label for="wifi">Wifi</label>

                                <input type="checkbox" id="balcony" name="amenities" value="balcony" />
                                <label for="balcony">Balcony</label>

                                <input type="checkbox" id="garden" name="amenities" value="garden" />
                                <label for="garden">Garden</label>

                                <input type="checkbox" id="no-amenities" name="amenities" value="no-amenities" />
                                <label for="no-amenities">No amenities</label>
                            </div>

                            <label>Parking</label>
                            <div>
                                <input type="checkbox" id="bike" name="amenities" value="bike" />
                                <label for="bike">Bike</label>

                                <input type="checkbox" id="car" name="amenities" value="car" />
                                <label for="car">Car</label>

                                <input type="checkbox" id="cycle" name="amenities" value="cycle" />
                                <label for="cycle">Cycle</label>

                                <input type="checkbox" id="no-amenities" name="amenities" value="no-amenities" />
                                <label for="no-amenities">No Parking Space</label>
                            </div>

                            <label for="room-location">Available from</label>
                            <input type="date" id="availability" name="availability" required />

                            <label for="room-description">Description</label>
                            <textarea id="room-description" name="roomdescription" rows="5" value="aksdaksdkajsfdhjkas" required ></textarea>

                            <label for="room-image">Front Image</label>
                            <input type="file" class="dProdAddFromImageUploadBtn dProdAddInpImg" oninput="dProdAddFormOnchange(event)" accept="image/jpeg, image/png, image/jpg" name="file" />

                            <label for="room-image">Galary </label>
                            <input type="file" class="dProdAddFromImageUploadBtn dProdAddInpImg" oninput="dProdAddFormOnchange(event)" accept="image/jpeg, image/png, image/jpg" name="file" />


                            <button type="submit">Post Room</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
};
