
import { useNavigate } from 'react-router-dom';
const RoomCard = ({ index, roomImage, avaliabilityDate, location, description, price }) => {
    const navigate = useNavigate();
    const goDetailPage = () => {
        navigate(`/room-detail-page/${index}`);
    }
    return (
        <div className="card">
            <div className="image-container">
                <img src={roomImage} alt="check internet connection" />
                <div className="availability">Available from {avaliabilityDate}</div>
            </div>
            <p style={{ color: "gray", fontSize: "14px" }}>private room</p>
            <h3>{location}</h3>
            <p style={{ fontSize: "16px" }}>{description}</p>
            <p style={{ color: "green", fontSize: "18px" }}><b>{price}/Month</b></p>
            <div className="card-button">
                <button onClick={goDetailPage} className="card-btn">View Details</button>
                <button className="card-btn">Share Now</button>
            </div>
        </div>

    );
}
export default RoomCard;