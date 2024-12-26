import React from 'react';
import { useNavigate } from 'react-router-dom';

export const DetailImage = ({ frontImage, galleryImages, price, location, nearBy }) => {
    const navigate = useNavigate();
    const handleShare = () => {
        const shareableLink = `${window.location.origin}/room-details?price=${price}&location=${encodeURIComponent(location)}&nearBy=${encodeURIComponent(nearBy)}`;

        if (navigator.share) {
            navigator
                .share({
                    title: "Room Details",
                    text: `Check out this room: /nPrice: Rs ${price}/month/nLocation: ${location}/nNearby: ${nearBy}`,
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
        navigate(`/book-room`);
    }

    return (
        <>
            <div className="detail-image">
                <img src={`http://localhost:5000${frontImage}`} style={{ height: "400px", width: "750px", objectFit: "cover" }} alt="Room front view" />
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
                <div className="owner-features">
                    <h2> Meet Your Owner</h2>
                    <p>Feel free to contact house owner for booking.</p>
                    <div className="owner-box">
                        <div className="owner">
                            <div className="owner-image">

                            </div>
                            <div className="owner-text">
                                <h4><i class="fas fa-user"></i> Kiswor Chhetri</h4>
                                <h4><i class="fas fa-phone-alt"></i> 9805153434</h4>
                                <h4><i class="fas fa-envelope"></i> ckiswor@gmail.com </h4>

                            </div>
                        </div>
                        <div className="owner-book">

                            <button onClick={handleBook} className="owner-book-btn">Contact</button>

                        </div>
                    </div>
                </div>
                <div className="sub-box">
                    <h2>About Room</h2>
                    <div className='sub-box-detail'>
                        <div><i class="fas fa-money-bill-wave fa-fw"></i> Rs {price} per month</div>
                        <div><i class="fas fa-map-marker-alt fa-fw"></i> {location}</div>
                        <div><i class="fas fa-road fa-fw"></i> Nearby {nearBy}</div>
                        <button style={{ marginLeft: "10px" }} onClick={handleShare} className="room-detail-btn">Share to Friend</button>
                    </div>
                </div>
            </div>
        </>
    );
};
