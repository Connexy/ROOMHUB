const Filter = () => {
    return (
        <>
            <div class="filter-container">
                <form id="filter-form">


                    <div class="filter-group">
                        <label for="city">City:</label>
                        <select id="city" name="city">
                            <option value="">Select a City</option>
                            <option value="new-york">New York</option>
                            <option value="los-angeles">Los Angeles</option>
                            <option value="chicago">Chicago</option>
                            <option value="san-francisco">San Francisco</option>
                        </select>
                    </div>


                    <div class="filter-group">
                        <label for="room-type">Room Type:</label>
                        <select id="room-type" name="roomType">
                            <option value="">Select a Type</option>
                            <option value="single">Single Room</option>
                            <option value="double">Double Room</option>
                            <option value="suite">Suite</option>
                        </select>
                    </div>


                    <div class="filter-group">
                        <label for="price-range">Price:</label>
                        <select id="price-range" name="priceRange">
                            <option value="">Select Price Range</option>
                            <option value="1000-2000">₹1000 - ₹2000</option>
                            <option value="2001-3000">₹2001 - ₹3000</option>
                            <option value="3001-4000">₹3001 - ₹4000</option>
                            <option value="4001-5000">₹4001 - ₹5000</option>
                        </select>
                    </div>


                    <button type="submit" class="filter-button">Apply Filters</button>
                </form>
            </div>
        </>
    );
}
export default Filter;