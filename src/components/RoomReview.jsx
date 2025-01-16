import React from 'react'
import Avatar from '../assets/images/avatar.png';

export default function RoomReview({ reviewerName, Date, Review, Star }) {
    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <i
                    key={i}
                    className={`fas fa-star ${i <= Star ? 'golden-star' : 'gray-star'}`}
                ></i>
            );
        }
        return stars;
    };
    const formatDate = (dateString) => {
        const date = new window.Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' }); // e.g., "January"
        const year = date.getFullYear(); // e.g., "2025"

        // Add ordinal suffix to day
        const ordinalSuffix = (day) => {
            if (day > 3 && day < 21) return 'th'; // For 11th to 19th
            switch (day % 10) {
                case 1: return 'st';
                case 2: return 'nd';
                case 3: return 'rd';
                default: return 'th';
            }
        };

        return `${day}${ordinalSuffix(day)} ${month}, ${year}`;
    };
    return (
        <>
            <div className="room-review-card">
                <div className="room-reviewer-info">
                    <img src={Avatar}
                        alt="room-reviewer " class="room-reviewer-image" />
                    <div className="room-reviewer-details">
                        <h3 className="room-reviewer-name">{reviewerName}</h3>
                        <p className="room-review-date">{formatDate(Date)}</p>
                    </div>
                </div>
                <div className="room-review-content">
                    <p className="room-review-text">{Review}</p>
                </div>
                <div class="rating">{renderStars()} </div>
            </div>
        </>
    )
}
