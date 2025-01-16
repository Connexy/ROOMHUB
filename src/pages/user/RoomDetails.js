import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { DetailImage } from "../../components/DetailImage";
import { showInformationMessage, showSuccessMessage } from '../../utils/Notification';
import RoomReview from '../../components/RoomReview';



const RoomDetails = () => {
    const { roomId } = useParams();
    const [roomData, setRoomData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [reviews, setReviews] = useState([]);
    const [reviewData, setReviewData] = useState({
        name: '',
        review_date: '',
        review_text: '',
        rating: ''
    });


    // useEffect(() => {
    //     axios.get(`http://localhost:5000/api/roomdetails/${roomId}`)
    //         .then(response => {
    //             console.log("Room data:", response.data);
    //             setRoomData(response.data);
    //             setLoading(false);
    //         })
    //         .catch(error => {
    //             console.error("Error fetching room data:", error);
    //             setError(error.response ? error.response.data : error.message);
    //             setLoading(false);
    //         });
    //     axios.get(`http://localhost:5000/reviews/${roomId}`)
    //         .then(response => setReviews(response.data))
    //         .catch(error => {
    //             console.error("Error fetching reviews:", error.response || error.message);
    //         });

    // }, [roomId]);
    useEffect(() => {
        console.log("Fetching data for roomId:", roomId); // Debug log

        axios.get(`http://localhost:5000/api/roomdetails/${roomId}`)
            .then(response => {
                console.log("Room data fetched:", response.data);
                setRoomData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching room data:", error.response || error.message);
                setError(error.response ? error.response.data : error.message);
                setLoading(false);
            });

        axios.get(`http://localhost:5000/reviews/${roomId}`)
            .then(response => {
                console.log("Fetched reviews:", response.data); // Debug log
                setReviews(response.data);
            })
            .catch(error => console.error("Error fetching reviews:", error.response || error.message));
    }, [roomId]);


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading room data: {error}</div>;
    }

    // State for review form



    const handleReviewChange = (e) => {
        const { name, value } = e.target;
        setReviewData({
            ...reviewData,
            [name]: value
        });
    };
    const handleReviewSubmit = (e) => {
        e.preventDefault();

        // Include the room ID in the review data
        const dataToSubmit = { ...reviewData, room_id: roomId };

        axios.post('http://localhost:5000/api/reviews', dataToSubmit)
            .then(response => {
                console.log("Review submitted:", response.data);
                showSuccessMessage("Review Submitted");

                // Clear the form fields
                setReviewData({
                    name: '',
                    review_date: '',
                    review_text: '',
                    rating: ''
                });


            })
            .catch(error => {
                console.error("Error submitting review:", error);
                showInformationMessage('Failed to submit review. Please try again.');
            });
    };



    return (
        <div>
            <Navbar />
            <div className="room-detail-headings">
                <h1>Room Details</h1>
            </div>

            <div className="detail-container">
                <DetailImage
                    frontImage={roomData.front_image}
                    galleryImages={roomData.gallery_images}
                    price={roomData.room_price}
                    locations={roomData.room_address}
                    roomType={roomData.room_type}
                    roomId={roomId}
                    status={roomData.status}
                />
            </div>

            {/*         
                // <div className="room-checkout">
                //     <div className="checkout-box">
                //         <div className="checkout-header"><h2>Contact Owner (Book Room)</h2></div>
                //         <div className="contact-form">
                //             <h3>Contact Form</h3>
                //             <div className="form-group">
                //                 <label htmlFor="name">Name *</label>
                //                 <input type="text" id="name" />
                //             </div>
                //             <div className="form-group">
                //                 <label htmlFor="contact-number">Contact number *</label>
                //                 <input type="number" id="contact-number" />
                //             </div>
                //             <div className="form-group">
                //                 <label htmlFor="email">Email *</label>
                //                 <input type="email" id="email" />
                //             </div>
                //             <div className="form-group">
                //                 <label htmlFor="message">Message</label>
                //                 <textarea id="message"></textarea>
                //             </div>
                //             <button className="contact-form-button">Submit</button>
                //         </div>
                //     </div>
                // </div>
                 */}

            <div className="room-detail-contents">
                <div className="room-features-content">

                    <div className="room-features">
                        <h2> Room Features</h2>
                        <div className="features-grid">
                            <div><i class="fas fa-bed fa-fw"></i> {roomData.bedroom} Bedroom</div>
                            <div><i class="fas fa-bath fa-fw"></i> {roomData.bathroom}  Bathroom</div>
                            <div><i class="fas fa-wifi fa-fw"></i> Free Wi-Fi</div>
                            <div><i class="fas fa-utensils fa-fw"></i> {roomData.kitchenroom} Kitchen room</div>
                            <div><i class="fas fa-parking fa-fw"></i> {roomData.parking}</div>
                            <div><i class="fas fa-concierge-bell fa-fw"></i>{roomData.amenities}</div>
                            <div><i class="fas fa-building fa-fw"></i> {roomData.floor} Floor</div>

                        </div>
                    </div>
                    <div className="room-features-review">
                        <h2 style={{ marginBottom: '10px' }}>Add Your Review</h2>
                        <form class="rev-frm" onSubmit={handleReviewSubmit}>
                            <div class="rev-frm-field">
                                <label for="name">Name:</label>
                                <input type="text" id="name" name="name" placeholder="Enter your name" required
                                    value={reviewData.name}
                                    onChange={handleReviewChange}
                                />
                            </div>

                            <div class="rev-frm-field">
                                <label for="date">Date:</label>
                                <input type="date" id="date" name="review_date" required
                                    value={reviewData.review_date}
                                    onChange={handleReviewChange}
                                />
                            </div>

                            <div class="rev-frm-field">
                                <label for="review">Review:</label>
                                <textarea id="review" name="review_text" placeholder="Write your review..." rows="3" required
                                    value={reviewData.review_text}
                                    onChange={handleReviewChange}
                                ></textarea>
                            </div>

                            <div class="rev-frm-field">
                                <label for="stars">Rating:</label>
                                <select id="stars" name="rating" required
                                    value={reviewData.rating}
                                    onChange={handleReviewChange}
                                >
                                    <option value="">Select Rating</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>

                            <button type="submit" class="rev-frm-submit" >Submit</button>
                        </form>

                    </div>

                </div>

                <div className="room-location">
                    <div className="location-header"><p>Map</p></div>
                    <div id="map">
                        <iframe
                            className="map-frame"
                            title="Google Maps Location - Dhobighat, Lalitpur"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.645074638183!2d85.32024431453747!3d27.68230098279939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19a1c8b22d4d%3A0x228b22a745a72a9f!2sDhobighat%2C%20Lalitpur%2044600!5e0!3m2!1sen!2snp!4v1641253411111!5m2!1sen!2snp"
                            width="650"
                            height="475"
                            style={{ border: "0" }}
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>

                    </div>
                </div>


            </div>
            <div className="room-review">
                <h2>Reviews</h2>
                <div className="room-reviews-box">
                    {/* <div className="room-review-card">
                        <div className="room-reviewer-info">
                            <img src="/" alt="room-reviewer " class="room-reviewer-image" />
                            <div className="room-reviewer-details">
                                <h3 className="room-reviewer-name">Chunhua</h3>
                                <p className="room-review-date">March 2024</p>
                            </div>
                        </div>
                        <div className="room-review-content">
                            <p className="room-review-text">The landlord Santa is very friendly and kind, with an angelic smile. She
                                provided
                                a lot of local travel tips and took me to many local activities. She can provide meals at any
                                time,
                                which...</p>
                        </div>
                        <div class="rating">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                    </div> */}
                    {reviews.map((review, index) => (
                        <RoomReview
                            reviewerName={review.name}
                            Date={review.review_date}
                            Review={review.review_text}
                            Star={review.rating}
                        />

                    ))}

                </div>

            </div>

            <Footer />
        </div>
    );
};

export default RoomDetails;
