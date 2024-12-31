import { useNavigate } from 'react-router-dom';

const RoomCard = ({ index, city, frontImage, availabilityDate, status, type, location, description, price }) => {
    const navigate = useNavigate();
    const getRoomStatus = () => {
        if (status === 'Booked') {
            return 'Booked';
        } else if (status === 'Rejected') {
            return 'Available';
        }
    };

    const goDetailPage = () => {
        navigate(`/room-detail-page/${index}`);
    };

    // Format the availability date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });

        // Add suffix for day (1st, 2nd, 3rd, etc.)
        const daySuffix =
            day % 10 === 1 && day !== 11
                ? 'st'
                : day % 10 === 2 && day !== 12
                    ? 'nd'
                    : day % 10 === 3 && day !== 13
                        ? 'rd'
                        : 'th';

        return `${day}${daySuffix} ${month}`;
    };

    return (
        <div className="card">
            <div className="image-container">
                <img src={frontImage} style={{ borderRadius: " 5px", width: "300px", height: "200px", objectFit: "cover" }} alt="path error" />
                <div className="availability">{getRoomStatus()} from {formatDate(availabilityDate)}</div>
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
