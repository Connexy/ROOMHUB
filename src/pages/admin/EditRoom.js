import React from 'react';
import Sidebar from '../../components/Sidebar';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';


export default function EditRoom() {
    const navigate = useNavigate();
    const { roomId } = useParams();
    const [roomData, setRoomData] = useState(null);

    useEffect(() => {
        // Fetch the existing room data
        const fetchRoomData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/room/${roomId}`);
                if (!response.ok) throw new Error("Failed to fetch room data");
                const data = await response.json();
                setRoomData(data);
            } catch (error) {
                console.error("Error fetching room data:", error);
            }
        };

        fetchRoomData();
    }, [roomId]);

    if (!roomData) return <p>Loading...</p>;


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

        try {
            const response = await fetch(`http://localhost:5000/api/rooms/${roomId}`, {
                method: 'PUT',
                body: formData,
            });

            const result = await response.json();
            if (response.ok) {
                alert('Room updated successfully!');
                navigate(`/admin-room-list`);
            } else {
                alert(`Failed to update room: ${result.error}`);
            }
        } catch (error) {
            console.error('Error updating room:', error);
            alert('An error occurred while updating the room.');
        }
    };


    return (
        <>
            <div className="admin-part">
                <Sidebar />
                <div id="main-content">
                    <div className="dashboard-header">
                        <h1>Edit Your Room</h1>
                    </div>
                    <div className="dash-content">
                        <div className="box">
                            {roomData && (
                                <form className="dProdAddFormBody fg1 flex fdc bor" onSubmit={handleSubmit}>
                                    <label htmlFor="room-address">Enter Full Address</label>
                                    <input
                                        type="text"
                                        id="room-address"
                                        name="roomaddress"
                                        defaultValue={roomData.room_address}
                                        required
                                    />

                                    <label htmlFor="city">City</label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        defaultValue={roomData.city}
                                        required
                                    />

                                    <label htmlFor="room-type">Room Type</label>
                                    <select id="room-type" name="roomtype" defaultValue={roomData.room_type} required>
                                        <option value="">Select Room Type</option>
                                        <option value="single">Single</option>
                                        <option value="double">Double</option>
                                        <option value="shared">Shared</option>
                                    </select>

                                    <label htmlFor="bedroom">Total Number of Bedrooms</label>
                                    <select id="bedroom" name="bedroom" defaultValue={roomData.bedroom} required>
                                        <option value="">Select</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="3+">3+</option>
                                    </select>

                                    <label htmlFor="bathroom">Total Number of Bathrooms</label>
                                    <select id="bathroom" name="bathroom" defaultValue={roomData.bathroom} required>
                                        <option value="">Select</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="3+">3+</option>
                                    </select>

                                    <label htmlFor="kitchenroom">Kitchen Room</label>
                                    <select id="kitchenroom" name="kitchenroom" defaultValue={roomData.kitchenroom} required>
                                        <option value="">Select</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="N/A">N/A</option>
                                    </select>

                                    <label htmlFor="floor">Floor</label>
                                    <select id="floor" name="floor" defaultValue={roomData.floor} required>
                                        <option value="">Select</option>
                                        <option value="Ground">Ground</option>
                                        <option value="First">First</option>
                                        <option value="Second">Second</option>
                                        <option value="Third">Third</option>
                                        <option value="Fourth">Fourth</option>
                                    </select>

                                    <label htmlFor="room-rent">Rent per Month</label>
                                    <input
                                        type="number"
                                        id="room-rent"
                                        name="roomprice"
                                        defaultValue={roomData.room_price}
                                        required
                                    />

                                    <label>Property Amenities</label>
                                    <div>
                                        {['Wifi', 'Balcony', 'Garden', 'No amenities'].map((amenity) => (
                                            <div key={amenity}>
                                                <input
                                                    type="checkbox"
                                                    id={amenity.toLowerCase()}
                                                    name="amenities"
                                                    value={amenity}
                                                    defaultChecked={roomData.amenities?.includes(amenity)}
                                                />
                                                <label htmlFor={amenity.toLowerCase()}>{amenity}</label>
                                            </div>
                                        ))}
                                    </div>

                                    <label>Parking</label>
                                    <div>
                                        {['Bike', 'Car', 'Cycle', 'No Parking Space'].map((option) => (
                                            <div key={option}>
                                                <input
                                                    type="checkbox"
                                                    id={option.toLowerCase()}
                                                    name="parking"
                                                    value={option}
                                                    defaultChecked={roomData.parking?.includes(option)}
                                                />
                                                <label htmlFor={option.toLowerCase()}>{option}</label>
                                            </div>
                                        ))}
                                    </div>

                                    <label htmlFor="availability">Available From</label>
                                    <input
                                        type="date"
                                        id="availability"
                                        name="availability"
                                        defaultValue={roomData.availability}
                                        required
                                    />

                                    <label htmlFor="room-description">Description</label>
                                    <textarea
                                        id="room-description"
                                        name="roomdescription"
                                        rows="5"
                                        defaultValue={roomData.room_description}
                                        required
                                    ></textarea>

                                    <label htmlFor="frontImage">Front Image</label>
                                    <input
                                        type="file"
                                        id="frontImage"
                                        className="img"
                                        accept="image/jpeg, image/png, image/jpg"
                                        name="frontImage"
                                    />
                                    <p>Current Front Image: {roomData.front_image}</p>

                                    <label htmlFor="galleryImages">Gallery Image</label>
                                    <input
                                        type="file"
                                        id="galleryImages"
                                        className="img"
                                        accept="image/jpeg, image/png, image/jpg"
                                        name="galleryImages"
                                        multiple
                                    />
                                    <p>Current Gallery Images: {roomData.gallery_images?.join(', ')}</p>

                                    <button type="submit">Update Room</button>
                                </form>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
