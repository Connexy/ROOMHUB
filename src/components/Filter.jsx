import { useState, useEffect } from "react";

const Filter = ({ onApplyFilters, reset }) => {
    const [city, setCity] = useState("");
    const [roomType, setRoomType] = useState("");
    const [priceRange, setPriceRange] = useState("");

    useEffect(() => {
        if (reset) {
            setCity("");
            setRoomType("");
            setPriceRange("");
        }
    }, [reset]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onApplyFilters({ city, roomType, priceRange });
    };

    return (
        <div className="filter-container">
            <form id="filter-form" onSubmit={handleSubmit}>
                {/* City Filter */}
                <div className="filter-group">
                    <label htmlFor="city">City:</label>
                    <select id="city" value={city} onChange={(e) => setCity(e.target.value)}>
                        <option value="">Select a City</option>
                        <option value="Kathmandu">Kathmandu</option>
                        <option value="Lalitpur">Lalitpur</option>
                        <option value="Bhaktapur">Bhaktapur</option>
                        <option value="Pokhara">Pokhara</option>
                        <option value="Beni">Beni</option>
                    </select>

                </div>

                {/* Room Type Filter */}
                <div className="filter-group">
                    <label htmlFor="room-type">Room Type:</label>
                    <select id="room-type" value={roomType} onChange={(e) => setRoomType(e.target.value)}>
                        <option value="">Select a Type</option>
                        <option value="single">Single Room</option>
                        <option value="double">Double Room</option>
                    </select>
                </div>

                {/* Price Range Filter */}
                <div className="filter-group">
                    <label htmlFor="price-range">Price:</label>
                    <select id="price-range" value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
                        <option value="">Select Price Range</option>
                        <option value="1000-2000">Rs1000 - Rs2000</option>
                        <option value="2000-3000">Rs2000 - Rs3000</option>
                        <option value="3000-4000">Rs3000 - Rs4000</option>
                        <option value="4000-5000">Rs4000 - Rs5000</option>
                        <option value="5000-6000">Rs5000 - Rs6000</option>
                        <option value="6000-7000">Rs6000 - Rs7000</option>
                        <option value="7000-8000">Rs7000 - Rs8000</option>
                        <option value="8000-9000">Rs8000 - Rs9000</option>
                        <option value="9000-10000">Rs9000 - Rs10000</option>
                    </select>
                </div>

                <button className="filter-button" type="submit">Apply Filters</button>
            </form>
        </div>
    );
};
export default Filter;
