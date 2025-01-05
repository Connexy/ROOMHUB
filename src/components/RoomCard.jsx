import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { showInformationMessage } from '../utils/Notification';

const RoomCard = ({ index, city, frontImage, status, type, location, description, price, onToggleFavorite }) => {
    const navigate = useNavigate();
    const getRoomStatus = () => {
        if (status === 'Booked') {
            return 'Booked';
        } else if (status === 'Rejected' || 'Pending') {
            return 'Available';
        }
    };

    const goDetailPage = () => {
        navigate(`/room-detail-page/${index}`);
    };


    const [favorite, setFavorite] = useState(false);

    const toggleFavorite = () => {
        const newFavoriteState = !favorite; // Calculate the new state
        setFavorite(newFavoriteState); // Update the state
        onToggleFavorite(newFavoriteState); // Notify parent about the change

        // Show the appropriate message
        if (newFavoriteState) {
            showInformationMessage("Added to Favorites");
        } else {
            showInformationMessage("Removed from Favorites");
        }
    };





    return (
        <div className="card">
            <div className="image-container">
                <img src={frontImage} style={{ borderRadius: " 5px", width: "300px", height: "200px", objectFit: "cover" }} alt="path error" />



                <div className={`availability ${status === 'Booked' ? 'booked' : 'available'}`}>
                    {getRoomStatus()}
                </div>
                <button className="favorite-icon" onClick={toggleFavorite} title={favorite ? "Remove from Favorites" : "Add to Favorites"}>
                    <i className={`fa-solid fa-heart ${favorite ? "filled" : "empty"}`}></i>
                </button>
            </div>
            <div className='card-text'>
                <div className='room-card-type'>
                    <p >{type} room</p>
                </div>
                <h3>{city},{location}</h3>
                <p style={{ color: "gray", fontSize: "16px" }}>{description}</p>
                <p style={{ color: "green", fontSize: "18px" }}><b>{price}/Month</b></p>
                <div className="card-button">
                    <button onClick={goDetailPage} className="card-btn">View Details</button>
                </div>
            </div>
        </div>
    );
};

export default RoomCard;
