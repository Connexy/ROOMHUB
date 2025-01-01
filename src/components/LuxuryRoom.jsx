import React from "react";

const LuxuryRoom = ({ image, title, description }) => {
    return (
        <div className="category">
            <div className="image">
                <img style={{ borderRadius: "5px", height: "200px" }} src={image} alt="network error"></img>
            </div>
            <div className="category-txt">
                <h3>{title}</h3>
                <p style={{ color: "#7a7a7a" }}>{description}</p>
            </div>
        </div>
    );
}
export default LuxuryRoom;