
import Sidebar from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { showInformationMessage } from '../../utils/Notification';

export default function PostRoom() {
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        // Convert checkbox fields to arrays
        const amenities = formData.getAll('amenities');
        const parking = formData.getAll('parking');

        formData.delete('amenities');
        amenities.forEach(item => formData.append('amenities', item));

        formData.delete('parking');
        parking.forEach(item => formData.append('parking', item));

        // Add homeowner_id to form data
        const userId = localStorage.getItem('userId');
        console.log('User ID retrieved from localStorage:', userId); // Add this line for debugging
        if (userId) {
            formData.append('homeowner_id', userId);
        } else {
            alert('User not logged in. Please log in again.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/rooms', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            if (response.ok) {
                showInformationMessage('Room posted Check your Approval Status!');
                navigate(`/homeowner-room-list`);
            } else {
                alert(`Failed to post room: ${result.message}`);
            }
        } catch (error) {
            console.error('Error posting room:', error);
            alert('An error occurred while posting the room.');
        }
    };





    return (
        <>
            <div className='admin-part'>
                <Sidebar />
                <div id="main-content">
                    <div className="dashboard-header">
                        <h1>Post Room</h1>
                    </div>

                    <div className="box">
                        <form className="dProdAddFormBody fg1 flex fdc bor" onSubmit={handleSubmit}>
                            <label htmlFor="room-address">Enter Full Address</label>
                            <input type="text" id="room-address" name="roomaddress" required />

                            <label htmlFor="city">City</label>
                            <input type="text" id="city" name="city" required />

                            <label htmlFor="room-type">Room Type</label>
                            <select id="room-type" name="roomtype" required>
                                <option value="">Select Room Type</option>
                                <option value="single">Single</option>
                                <option value="double">Double</option>
                                <option value="shared">Shared</option>
                            </select>

                            <label htmlFor="bedroom">Total Number of Bedrooms</label>
                            <select id="bedroom" name="bedroom" required>
                                <option value="">Select</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="3+">3+</option>
                            </select>

                            <label htmlFor="bathroom">Total Number of Bathrooms</label>
                            <select id="bathroom" name="bathroom" required>
                                <option value="">Select</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="3+">3+</option>
                            </select>

                            <label htmlFor="kitchenroom">Kitchen Room</label>
                            <select id="kitchenroom" name="kitchenroom" required>
                                <option value="">Select</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="N/A">N/A</option>
                            </select>

                            <label htmlFor="floor">Floor</label>
                            <select id="floor" name="floor" required>
                                <option value="">Select</option>
                                <option value="Ground">Ground</option>
                                <option value="First">First</option>
                                <option value="Second">Second</option>
                                <option value="Third">Third</option>
                                <option value="Fourth">Fourth</option>
                            </select>

                            <label htmlFor="room-rent">Rent per Month</label>
                            <input type="number" id="room-rent" name="roomprice" required />

                            <label>Property Amenities</label>
                            <div>
                                <input type="checkbox" id="wifi" name="amenities" value="Wifi" />
                                <label htmlFor="wifi">Wifi</label>

                                <input type="checkbox" id="balcony" name="amenities" value="Balcony" />
                                <label htmlFor="balcony">Balcony</label>

                                <input type="checkbox" id="garden" name="amenities" value="Garden" />
                                <label htmlFor="garden">Garden</label>

                                <input type="checkbox" id="no-amenities" name="amenities" value="No amenities" />
                                <label htmlFor="no-amenities">No amenities</label>
                            </div>

                            <label>Parking</label>
                            <div>
                                <input type="checkbox" id="bike" name="parking" value="Bike" />
                                <label htmlFor="bike">Bike</label>

                                <input type="checkbox" id="car" name="parking" value="Car" />
                                <label htmlFor="car">Car</label>

                                <input type="checkbox" id="cycle" name="parking" value="Cycle" />
                                <label htmlFor="cycle">Cycle</label>

                                <input type="checkbox" id="no-parking" name="parking" value="No Parking Space" />
                                <label htmlFor="no-parking">No Parking Space</label>
                            </div>

                            <label htmlFor="availability">Available From</label>
                            <input type="date" id="availability" name="availability" min={new Date().toISOString().split('T')[0]} required />

                            <label htmlFor="room-description">Description</label>
                            <textarea id="room-description" name="roomdescription" rows="5" required></textarea>

                            <label htmlFor="frontImage">Front Image</label>
                            <input type="file" id="frontImage" className="img" accept="image/jpeg, image/png, image/jpg" name="frontImage" required />

                            <label htmlFor="galleryImages">Gallery Image</label>
                            <input type="file" id="galleryImages" className="img" accept="image/jpeg, image/png, image/jpg" name="galleryImages" multiple />

                            <button type="submit">Post Room</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
