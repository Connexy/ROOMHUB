
export const DetailImage = ({ roomdetailimage, price, location, nearBy }) => {
    const handleShare = () => {
        // Construct the shareable link
        const shareableLink = `${window.location.origin}/room-details?price=${price}&location=${encodeURIComponent(location)}&nearBy=${encodeURIComponent(nearBy)}`;

        // Use the Web Share API if supported
        if (navigator.share) {
            navigator
                .share({
                    title: "Room Details",
                    text: `Check out this room: \nPrice: Rs ${price}/month\nLocation: ${location}\nNearby: ${nearBy}`,
                    url: shareableLink,
                })
                .then(() => console.log("Shared successfully"))
                .catch((error) => console.error("Error sharing:", error));
        } else {
            // Fallback: Copy the link to the clipboard
            navigator.clipboard
                .writeText(shareableLink)
                .then(() => alert("Link copied to clipboard! Share it with your friends."))
                .catch((error) => console.error("Error copying link:", error));
        }
    };

    return (

        <>
            <div className="detail-image">
                <img style={{ height: "400px", width: "600px" }} src={roomdetailimage} alt="network error" />
            </div>

            <div className="detail-content">
                <div className="sub-image">
                    <div className="sub-image-box">
                        <img src={roomdetailimage} style={{ height: "150px", width: "200px" }} alt=" url error" />
                    </div>
                    <div className="sub-image-box">
                        <img src={roomdetailimage} style={{ height: "150px", width: "200px" }} alt=" url error" />
                    </div>
                    <div className="sub-image-box">
                        <img src={roomdetailimage} style={{ height: "150px", width: "200px" }} alt=" url error" />
                    </div>
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
}
