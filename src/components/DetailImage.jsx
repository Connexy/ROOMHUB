import React from 'react';

export const DetailImage = ({ frontImage, galleryImages, price, location, nearBy }) => {
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

    return (
        <>
            <div className="detail-image">
                <img src={`http://localhost:5000${frontImage}`} style={{ height: "400px", width: "600px", objectFit: "cover" }} alt="Room front view" />

                {/* <img style={{ height: "400px", width: "600px", objectFit: "cover" }} src={frontImage} alt="Room front view" /> */}
            </div>

            <div className="detail-content">
                <div className="sub-image">
                    {galleryImages.map((image, index) => (
                        <div key={index} className="sub-image-box">
                            <img
                                src={`http://localhost:5000${image}`}
                                style={{ height: "150px", width: "200px", objectFit: "cover" }}
                                alt={`view image ${index + 1}`}
                            />
                        </div>
                    ))}

                </div>
                <div className="sub-box">
                    <div><i className="fas fa-money-bill-wave fa-fw"></i> Rs {price} per month</div>
                    <div><i className="fas fa-map-marker-alt fa-fw"></i>{location}</div>
                    <div><i className="fas fa-road fa-fw"></i> Nearby {nearBy}</div>
                    <button onClick={handleShare} className="room-detail-btn">Share to Friend</button>
                </div>
            </div>
        </>
    );
};
