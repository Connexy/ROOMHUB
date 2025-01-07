import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import RoomCard from '../../components/RoomCard';

export default function FavoritePage() {
    const [favoriteRooms, setFavoriteRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const userId = localStorage.getItem("userId");

    const fetchFavorites = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:5000/api/favorites/${userId}`);
            const data = await response.json();

            if (response.ok) {
                setFavoriteRooms(data);
                setError(null);
            } else {
                console.error("Failed to fetch favorites:", data);
                setError(data.error || "Failed to fetch favorite rooms.");
            }
        } catch (err) {
            console.error(err);
            setError("An error occurred while fetching favorite rooms.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    if (loading) {
        return (
            <>
                <Navbar />
                <h1 style={{ marginTop: "100px", textAlign: "center" }}>Loading favorite rooms...</h1>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Navbar />
                <h1 style={{ marginTop: "100px", textAlign: "center", color: "red" }}>
                    {error}
                </h1>
            </>
        );
    }
    return (
        <>
            <Navbar />
            <div className="favorite-container">
                {favoriteRooms.length === 0 ? (
                    <h1 style={{ paddingTop: "70px", textAlign: "center", color: "red", marginTop: "50px" }}>
                        You don't have any favorite rooms yet!
                    </h1>
                ) : (
                    <>
                        <h1 style={{ marginTop: "100px", marginBottom: "50px", textAlign: "center" }}>Your Favorite Rooms</h1>
                        <div className="containers">
                            {favoriteRooms.map((room) => (
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
                                    onToggleFavorite={() => { }} /* Favorites can't be toggled here */
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}