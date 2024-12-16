import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import RoomCard from "../../components/RoomCard";
import { Link } from "react-router-dom";
import Filter from "../../components/Filter";
import { useEffect, useState } from "react";

const RentalListing = () => {
    const [rooms, setRooms] = useState([]); // Store the room data
    const [currentPage, setCurrentPage] = useState(1); // Current page
    const [totalPages, setTotalPages] = useState(1); // Total number of pages
    const [error, setError] = useState(null); // Error handling
    const limit = 10; // Items per page

    useEffect(() => {
        // Fetch data from the backend
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/room?page=${currentPage}&limit=${limit}`);
                const data = await response.json();
                if (response.ok) {
                    setRooms(data.rooms);  // Assuming `users` contains the room data
                    setTotalPages(Math.ceil(data.total / limit)); // Calculate total pages
                } else {
                    console.error("Fetch error:", data);
                    setError(data.error || "Failed to fetch data");
                }
            } catch (err) {
                setError("An error occurred while fetching data");
                console.error(err);
            }
        };
        fetchData();
    }, [currentPage]); // Refetch when the current page changes

    // Handle pagination
    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);

        // Get day, add suffix (1st, 2nd, 3rd, etc.)
        const day = date.getDate();
        const daySuffix = (day) => {
            if (day > 3 && day < 21) return "th";
            switch (day % 10) {
                case 1: return "st";
                case 2: return "nd";
                case 3: return "rd";
                default: return "th";
            }
        };

        const formattedDay = `${day}${daySuffix(day)}`;

        // Get month name
        const month = date.toLocaleString("default", { month: "long" });

        return `${formattedDay} ${month}`;
    };


    return (
        <>
            <Navbar />
            <div className="big-container">
                <div className="heading-text">
                    <h1>Are you looking for rooms?</h1>
                </div>

                <div className="filter-thau">
                    <Filter />
                </div>

                {error && <div className="error-message">{error}</div>}

                <div className="containers">
                    {rooms.map((room) => (
                        <RoomCard
                            key={room.id}
                            frontImage={`http://localhost:5000/uploads/${room.front_image}`}
                            status={room.status}
                            type={room.room_type}
                            location={room.room_address}
                            price={room.room_price}
                            description={room.room_description}
                            availabilityDate={formatDate(room.availability)}
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

                <div className="doubt">
                    <h2>Have any doubts or looking for something specific?</h2>
                    <p>Our agents are here to help you.</p>
                    <button className="card-btn">
                        <Link to="/contact-page">Contact Us</Link>
                    </button>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default RentalListing;
