import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import RoomCard from "../../components/RoomCard";
import Filter from "../../components/Filter";

const RentalListing = () => {
    const [rooms, setRooms] = useState([]);
    const [reset, setReset] = useState(false);
    const [filters, setFilters] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState(null); // Handle errors from backend
    const limit = 10;

    const resetFilters = () => {
        setFilters({});
        setCurrentPage(1);
        setReset(true); // Trigger reset in Filter component
        fetchData({});
        setTimeout(() => setReset(false), 100); // Reset the `reset` state
    };


    const fetchData = async (filters = {}) => {
        try {
            const queryParams = new URLSearchParams({
                page: currentPage,
                limit,
                ...filters,
            });
            const response = await fetch(`http://localhost:5000/api/room?${queryParams.toString()}`);
            const data = await response.json();

            if (response.ok) {
                if (data.rooms.length === 0) {
                    // Show alert if no data is returned for the filter
                    alert("No rooms available for the selected filters. Please try different options.");
                    setError("No rooms available."); // Optional: set error message
                    resetFilters();
                } else {
                    setRooms(data.rooms);
                    setTotalPages(Math.ceil(data.total / limit));
                    setError(null); // Clear any previous errors
                }
            } else {
                console.error("Fetch error:", data);
                setError(data.error || "Failed to fetch data");
            }
        } catch (err) {
            setError("An error occurred while fetching data");
            console.error(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    const handleApplyFilters = async (newFilters) => {
        setFilters(newFilters);
        setCurrentPage(1); // Reset to the first page on new filters
        await fetchData(newFilters);
    };

    const handlePageClick = (pageNumber) => setCurrentPage(pageNumber);
    const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
    const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

    return (
        <>
            <Navbar />
            <div className="big-container">
                <div className="heading-text">
                    <h1>Are you looking for rooms?</h1>
                </div>

                <div className="filter-thau">
                    <Filter onApplyFilters={handleApplyFilters} reset={reset} />
                </div>

                {error && <div className="error-message">{error}</div>}

                <div className="containers">
                    {rooms.map((room) => (
                        <RoomCard
                            key={room.id}
                            index={room.id}
                            frontImage={`http://localhost:5000/uploads/${room.front_image}`}
                            status={room.status}
                            type={room.room_type}
                            city={room.city}
                            location={room.room_address}
                            price={room.room_price}
                            description={room.room_description}
                            availabilityDate={room.availability}
                        />
                    ))}
                </div>

                <nav className="pagination-container">
                    <button
                        className="pagination-button"
                        onClick={handlePrev}
                        disabled={currentPage === 1}
                    >
                        &lt;
                    </button>

                    <div id="pagination-numbers">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                            <button
                                key={number}
                                className={`pagination-number ${currentPage === number ? "active" : ""}`}
                                onClick={() => handlePageClick(number)}
                            >
                                {number}
                            </button>
                        ))}
                    </div>

                    <button
                        className="pagination-button"
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                    >
                        &gt;
                    </button>
                </nav>
            </div>
            <Footer />
        </>
    );
};

export default RentalListing;
