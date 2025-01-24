
import { useNavigate, useLocation } from 'react-router-dom';
import { showInformationMessage } from '../utils/Notification';


export const DetailImage = ({ status, frontImage, galleryImages, price, locations, roomType, city, roomId, bedroom, bathroom, kitchenroom, parking, amenities, floor }) => {
    const navigate = useNavigate();
    const location = useLocation();
    // const [homeowner, setHomeowner] = useState(null);

    // useEffect(() => {
    //     const fetchHomeownerDetails = async () => {
    //         try {
    //             const response = await axios.get(`http://localhost:5000/api/homeowner/${roomId}`);
    //             setHomeowner(response.data);
    //         } catch (error) {
    //             console.error("Error fetching homeowner details:", error);
    //         }
    //     };


    //     fetchHomeownerDetails();
    // }, [roomId]);


    const handleShare = () => {
        const shareableLink = `${window.location.origin}${location.pathname}?roomId=${roomId}`;

        if (navigator.share) {
            navigator
                .share({
                    title: "Room Details",
                    text: `Check out this room:\nPrice: Rs ${price}/month\nLocation: ${locations}`,
                    url: shareableLink,
                })
                .then(() => console.log("Shared successfully"))
                .catch((error) => console.error("Error sharing:", error));
        } else {
            navigator.clipboard
                .writeText(shareableLink)
                .then(() => alert("Link copied to clipboard! Share it with your friends."))
                .catch((error) => console.error("Error copying link:", error));
        }
    };

    const handleBook = () => {
        const isLoggedIn = localStorage.getItem("isLogin");

        if (status === 'Booked') {
            alert('Room is booked already');
            return;
        }
        if (!isLoggedIn) {
            showInformationMessage("Please login first to book the room");
            return;
        }
        else {
            navigate(`/book-room/${roomId}`);
        }
    };

    const capitalizeWords = (str) => {
        return str
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");
    };
    return (
        <>
            <div className="detail-image">
                <img
                    src={`http://localhost:5000${frontImage}`}
                    style={{ borderRadius: "5px", height: "400px", width: "750px", objectFit: "cover" }}
                    alt="Room front view"
                />
                <div className="sub-image">
                    {galleryImages.map((image, index) => (
                        <div key={index} className="sub-image-box">
                            <img
                                src={`http://localhost:5000${image}`}
                                style={{ height: "150px", width: "240px", objectFit: "cover" }}
                                alt={"gallery img"}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="detail-content">
                <div className="room-features">
                    <h2> Room Features</h2>
                    <div className="features-grid">
                        <div><i class="fas fa-bed fa-fw"></i> {bedroom} Bedroom</div>
                        <div><i class="fas fa-bath fa-fw"></i> {bathroom}  Bathroom</div>
                        <div><i class="fas fa-utensils fa-fw"></i> {kitchenroom} Kitchen room</div>
                        <div><i class="fas fa-parking fa-fw"></i> {parking}</div>
                        <div><i class="fas fa-concierge-bell fa-fw"></i>{amenities}</div>
                        <div><i class="fas fa-building fa-fw"></i> {floor} Floor</div>

                    </div>
                </div>

                <div className="sub-box">
                    <h2>About Room</h2>
                    <div className="sub-box-detail">
                        <div><i className="fas fa-hotel fa-fw"></i>{roomType.charAt(0).toUpperCase() + roomType.slice(1)} Room</div>
                        <div><i className="fas fa-map-marker-alt fa-fw"></i> {capitalizeWords(locations)}, {capitalizeWords(city)}</div>
                        <div><i className="fas fa-money-bill-wave fa-fw"></i><span className="price-text">Rs {price} / per month</span></div>
                        <div className="sub-box-btn">
                            <button onClick={handleShare} className="room-detail-btn" >Share to Friend</button>
                            <button onClick={handleBook} className="room-detail-btn">Book Room &gt;</button>
                        </div>
                    </div>
                </div>
                {/* <div className="owner-features">
                    <h2>Meet Your Owner</h2>
                    <p>Feel free to contact the homeowner for booking.</p>
                     {homeowner && (
                        <div className="owner-box">
                            <div className="owner">
                                <div className="owner-image">
                                    <img
                                        src={`http://localhost:5000/uploads/${homeowner.image}`}
                                        alt="Owner"
                                        style={{ height: "80px", width: "80px", borderRadius: "50%" }}
                                    />
                                </div>
                                <div className="owner-text">
                                    <h4><i className="fas fa-user icon"></i> {capitalizeWords(homeowner.fullname)}</h4>
                                    <h4 className="hover-container">
                                        <a
                                            href={`mailto:${homeowner.email}`}
                                            style={{ textDecoration: "none", color: "inherit" }}
                                        >
                                            <i className="fas fa-envelope icon"></i> {homeowner.email}
                                        </a>
                                        <span className="hover-tooltip" style={{ fontSize: "12px", height: "15px" }}>
                                            Click to Send Email
                                        </span>
                                    </h4>
                                </div>
                            </div>
                        </div>
                    )}
                </div>  */}

            </div>
        </>
    );
};
