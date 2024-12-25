import { useState } from "react";

const Filter = ({ onApplyFilters }) => {
    const [city, setCity] = useState("");
    const [roomType, setRoomType] = useState("");
    const [priceRange, setPriceRange] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Pass the selected filters to the parent component
        onApplyFilters({ city, roomType, priceRange });
    };

    return (
        <div className="filter-container">
            <form id="filter-form" onSubmit={handleSubmit}>
                <div className="filter-group">
                    <label htmlFor="city">City:</label>
                    <select id="city" name="city" value={city} onChange={(e) => setCity(e.target.value)}>
                        <option value="">Select a City</option>
                        <option value="Kathmandu">Kathmandu</option>
                        <option value="Pokhara">Pokhara</option>
                        <option value="Beni">Beni</option>
                        <option value="Butwal">Butuwal</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label htmlFor="room-type">Room Type:</label>
                    <select
                        id="room-type"
                        name="roomType"
                        value={roomType}
                        onChange={(e) => setRoomType(e.target.value)}
                    >
                        <option value="">Select a Type</option>
                        <option value="single">Single Room</option>
                        <option value="double">Double Room</option>
                        <option value="shared">Shared</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label htmlFor="price-range">Price:</label>
                    <select
                        id="price-range"
                        name="priceRange"
                        value={priceRange}
                        onChange={(e) => setPriceRange(e.target.value)}
                    >
                        <option value="">Select Price Range</option>
                        <option value="1000-2000">₹1000 - ₹2000</option>
                        <option value="2001-3000">₹2000 - ₹3000</option>
                        <option value="3001-4000">₹3000 - ₹4000</option>
                        <option value="4001-5000">₹4000 - ₹5000</option>
                        <option value="4001-5000">₹5000 - ₹6000</option>
                        <option value="4001-5000">₹6000 - ₹7000</option>
                        <option value="4001-5000">₹7000 - ₹8000</option>
                        <option value="4001-5000">₹8000 - ₹9000</option>
                        <option value="4001-5000">₹9000 - ₹10000</option>

                    </select>
                </div>

                <button type="submit" className="filter-button">Apply Filters</button>
            </form>
        </div>
    );
};

export default Filter;
