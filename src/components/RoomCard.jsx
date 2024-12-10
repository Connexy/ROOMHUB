
import { useNavigate } from 'react-router-dom';
const RoomCard = ({ index, roomImage, avaliabilityDate, location, description, price }) => {
    const navigate = useNavigate();
    const goDetailPage = () => {
        navigate(`/room-detail-page/${index}`);
    }
    // const handleShare = () => {
    //     const shareData = {
    //         title: `Room in ${location}`,
    //         text: `Check out this room in ${location}. Available from ${avaliabilityDate}.`,
    //         url: `${window.location.origin}/room-detail-page/${index}`, // Generates the URL dynamically
    //     };
    //     if (navigator.share) {
    //         navigator
    //             .share(shareData)
    //             .then(() => console.log('shared successfully'))
    //             .catch((error) => console.error('error sharing: ', error));
    //     } else {
    //         alert('Sharing not supported on this browser. copy the url: ' + shareData.url);
    //     }
    // };
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

            </div>
        </div>

    );
}
export default RoomCard;