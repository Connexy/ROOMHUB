import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFavorite } from "../components/FavoriteContext";

const RoomCard = ({
    index, city, frontImage, status, type, location, description, price
}) => {
    const navigate = useNavigate();
    const [favorite, setFavorite] = useState(false);
    const { incrementFavorite, decrementFavorite } = useFavorite();

    useEffect(() => {
        const fetchFavoriteStatus = async () => {
            const userId = localStorage.getItem("userId");
            try {
                const response = await axios.get(`http://localhost:5000/api/favorites/status/${userId}/${index}`);
                setFavorite(response.data.isFavorited);
            } catch (error) {
                console.error("Failed to fetch favorite status:", error);
            }
        };
        fetchFavoriteStatus();
    }, [index]);

    const toggleFavorite = async () => {
        const newFavoriteState = !favorite;
        setFavorite(newFavoriteState);

        try {
            const userId = localStorage.getItem("userId");
            if (newFavoriteState) {
                await axios.post("http://localhost:5000/api/favorites", { userId, roomId: index });
                incrementFavorite();
            } else {
                await axios.delete(`http://localhost:5000/api/favorites/${userId}/${index}`);
                decrementFavorite();
            }
        } catch (error) {
            console.error("Failed to toggle favorite:", error);
            setFavorite(!newFavoriteState);
        }
    };

    const goDetailPage = () => navigate(`/room-detail-page/${index}`);
    const displayStatus = status === "Booked" ? "Booked" : "Available";
    const capitalizeWords = (str) => {
        return str
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");
    };
    return (
        <div className="card">
            <div className="image-container">
                <img src={frontImage} alt="Room" style={{ borderRadius: "5px", width: "300px", height: "200px", objectFit: "cover" }} />
                <div className={`availability ${status === "Booked" ? "booked" : "available"}`}>{displayStatus}</div>
                <button className="favorite-icon" onClick={toggleFavorite} title={favorite ? "Remove from Favorites" : "Add to Favorites"}>
                    <i className={`fa-solid fa-heart ${favorite ? "filled" : "empty"}`}></i>
                </button>
            </div>
            <div className="card-text">
                <div className="room-card-type">
                    <p>{type.charAt(0).toUpperCase() + type.slice(1)} Room</p>
                </div>
                <h3>
                    {capitalizeWords(location)}, {capitalizeWords(city)}
                </h3>
                <p style={{ color: "gray", fontSize: "16px" }}>
                    {capitalizeWords(description)}
                </p>
                <p style={{ color: "green", fontSize: "18px" }}><b>{price}/Month</b></p>
                <div className="card-button">
                    <button onClick={goDetailPage} className="card-btn">View Details &gt;</button>
                </div>
            </div>
        </div>
    );
};

export default RoomCard;
