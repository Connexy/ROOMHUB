import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import RoomCard from "../../components/RoomCard";
import Filter from "../../components/Filter";

const SearchResultPage = () => {
    const [rooms, setRooms] = useState([]);
    const [reset, setReset] = useState(false);
    const [filters, setFilters] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState(null);
    const [favoriteCount, setFavoriteCount] = useState(0);
    const limit = 10;

    const location = useLocation();
    const alertShown = useRef(false); // useRef to track if alert has been shown

    const getQueryParams = () => {
        const params = new URLSearchParams(location.search);
        return {
            city: params.get("city") || "",
        };
    };

    useEffect(() => {
        const queryParams = getQueryParams();
        if (queryParams.city) {
            handleApplyFilters({ city: queryParams.city });
        } else {
            fetchData();
        }
    }, [location.search, currentPage]);

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
                if (data.rooms.length === 0 && !alertShown.current) {
                    alert("No rooms available for the searched city");
                    alertShown.current = true; // Mark alert as shown
                } else {
                    setRooms(data.rooms);
                    setTotalPages(Math.ceil(data.total / limit));
                    setError(null);
                    alertShown.current = false; // Reset flag after successful data fetch
                }
            } else {
                console.error("Fetch error:", data);
                setError(data.error || "Failed to fetch data");
                alertShown.current = false; // Reset flag on error
            }
        } catch (err) {
            setError("An error occurred while fetching data");
            console.error(err);
            alertShown.current = false; // Reset flag on error
        }
    };

    const handleApplyFilters = async (newFilters) => {
        setFilters(newFilters);
        setCurrentPage(1);
        await fetchData(newFilters);
    };

    const resetFilters = () => {
        setFilters({});
        setCurrentPage(1);
        setReset(true);
        fetchData({});
        setTimeout(() => setReset(false), 100);
    };

    const handlePageClick = (pageNumber) => setCurrentPage(pageNumber);
    const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
    const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

    const handleToggleFavorite = (isFavorite) => {
        setFavoriteCount((prevCount) => (isFavorite ? prevCount + 1 : prevCount - 1));
    };

    return (
        <>
            <Navbar favouriteCount={favoriteCount} />
            <div className="big-container">
                <div className="heading-text">
                    <h1>Rooms in {getQueryParams().city}</h1>

                </div>

                <div className="filter-thau">
                    <Filter onApplyFilters={handleApplyFilters} reset={reset} />
                </div>

                <div className="containers">


                    {rooms.map((room) => (
                        <RoomCard
                            key={room.id}
                            index={room.id}
                            frontImage={`http://localhost:5000/uploads/${room.front_image}`}
                            status={room.booking_status}
                            type={room.room_type}
                            city={room.city}
                            location={room.room_address}
                            price={room.room_price}
                            description={room.room_description}
                            availabilityDate={room.availability}
                            onToggleFavorite={handleToggleFavorite} // Pass the parent callback
                        />
                    ))}
                </div>

                <nav className="paging-container">
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

export default SearchResultPage;
