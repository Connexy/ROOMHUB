import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { DetailImage } from "../../components/DetailImage";
import { showInformationMessage, showSuccessMessage } from '../../utils/Notification';
import RoomReview from '../../components/RoomReview';



const RoomDetails = () => {
    const { roomId } = useParams();
    const [roomData, setRoomData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const [homeowner, setHomeowner] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [reviewData, setReviewData] = useState({
        name: '',
        review_date: '',
        review_text: '',
        rating: ''
    });
    const [validationErrors, setValidationErrors] = useState({
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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading room data: {error}</div>;
    }

    // State for review form



    const handleReviewChange = (e) => {
        const { name, value } = e.target;

        // Update review data
        setReviewData({
            ...reviewData,
            [name]: value,
        });

        // Clear validation error for the specific field
        if (value.trim()) {
            setValidationErrors((prevErrors) => ({
                ...prevErrors,
                [name]: '',
            }));
        }
    };

    // const handleReviewSubmit = (e) => {
    //     e.preventDefault();

    //     // Include the room ID in the review data
    //     const dataToSubmit = { ...reviewData, room_id: roomId };

    //     axios.post('http://localhost:5000/api/reviews', dataToSubmit)
    //         .then(response => {
    //             console.log("Review submitted:", response.data);
    //             showSuccessMessage("Review Submitted");

    //             // Clear the form fields
    //             setReviewData({
    //                 name: '',
    //                 review_date: '',
    //                 review_text: '',
    //                 rating: ''
    //             });


    //         })
    //         .catch(error => {
    //             console.error("Error submitting review:", error);
    //             showInformationMessage('Failed to submit review. Please try again.');
    //         });
    // };
    const handleReviewSubmit = (e) => {
        e.preventDefault();

        // Validation
        const errors = {};
        if (!reviewData.name.trim()) errors.name = "Name is required";
        if (!reviewData.review_date) errors.review_date = "Date is required";
        if (!reviewData.review_text.trim()) errors.review_text = "Review text is required";
        if (!reviewData.rating) errors.rating = "Rating is required";

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }
        const isLoggedIn = localStorage.getItem("isLogin");
        if (!isLoggedIn) {
            showInformationMessage("Please login first to submit the review");
            return; // Prevent submission if not logged in
        }
        // If no errors, clear validation messages and submit
        setValidationErrors({});
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
    // const capitalizeWords = (str) => {
    //     return str
    //         .split(" ")
    //         .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    //         .join(" ");
    // };




    return (
        <div>
            {/* <Navbar /> */}
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
                    city={roomData.city}
                    bedroom={roomData.bedroom}
                    bathroom={roomData.bathroom}
                    kitchenroom={roomData.kitchenroom}
                    parking={roomData.parking}
                    amenities={roomData.amenities}
                    floor={roomData.floor}
                />
            </div>

            <div className="room-detail-contents">
                <div className="room-features-content">

                    {/* <div className="room-features">
                        <h2> Room Features</h2>
                        <div className="features-grid">
                            <div><i class="fas fa-bed fa-fw"></i> {roomData.bedroom} Bedroom</div>
                            <div><i class="fas fa-bath fa-fw"></i> {roomData.bathroom}  Bathroom</div>
                            <div><i class="fas fa-utensils fa-fw"></i> {roomData.kitchenroom} Kitchen room</div>
                            <div><i class="fas fa-parking fa-fw"></i> {roomData.parking}</div>
                            <div><i class="fas fa-concierge-bell fa-fw"></i>{roomData.amenities}</div>
                            <div><i class="fas fa-building fa-fw"></i> {roomData.floor} Floor</div>

                        </div>
                    </div> 
                     <div className="owner-features">
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
                    </div> 
                    */}

                    <div className="room-features-review">
                        <h2 style={{ marginBottom: '10px' }}>Add Your Review</h2>
                        <form class="rev-frm" onSubmit={handleReviewSubmit}>
                            <div className="rev-frm-field">
                                <label htmlFor="name">Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder={validationErrors.name || "Enter your name"}
                                    value={reviewData.name}
                                    onChange={handleReviewChange}

                                    className={validationErrors.name ? "error-input" : ""}
                                />
                            </div>




                            <div className="rev-frm-field">
                                <label htmlFor="date">Date:</label>
                                <input
                                    type="date"
                                    id="date"
                                    name="review_date"
                                    placeholder={validationErrors.review_date || ""}
                                    style={{
                                        color: validationErrors.review_date ? 'red' : 'black'

                                    }}
                                    value={reviewData.review_date}
                                    onChange={handleReviewChange}
                                    min={new Date().toISOString().split('T')[0]}
                                />
                            </div>


                            <div className="rev-frm-field">
                                <label htmlFor="review">Review:</label>
                                <textarea
                                    id="review"
                                    name="review_text"
                                    placeholder={validationErrors.review_text || "Enter your comments"}
                                    rows="3"
                                    value={reviewData.review_text}
                                    onChange={handleReviewChange}
                                    className={validationErrors.review_text ? "error-input" : ""}
                                ></textarea>

                            </div>



                            <div className="rev-frm-field">
                                <label htmlFor="stars">Rating:</label>
                                <select
                                    id="stars"
                                    name="rating"
                                    placeholder={validationErrors.rating || ""}
                                    style={{
                                        color: validationErrors.rating ? 'red' : 'black'
                                    }}
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


                            <button type="submit" className="rev-frm-submit">Submit</button>

                            {/* <div class="rev-frm-field">
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
                                    min={new Date().toISOString().split('T')[0]}
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

                            <button type="submit" class="rev-frm-submit" >Submit</button> */}
                        </form>

                    </div>

                </div>

                {/* <div className="room-location">
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
                </div> */}
                <div className="room-location">
                    <div className="location-header"><p>Map</p></div>
                    <div id="map">
                        {roomData && roomData.room_address && roomData.city ? (
                            <button
                                className="map-button"
                                onClick={() =>
                                    window.open(
                                        `https://www.google.com/maps?q=${encodeURIComponent(
                                            `${roomData.room_address}, ${roomData.city}`
                                        )}`,
                                        "_blank"
                                    )
                                }
                            >
                                Open Location in Google Maps
                            </button>
                        ) : (
                            <p>Loading map location...</p>
                        )}
                    </div>
                </div>

            </div>

            {reviews && reviews.length > 0 && (
                <div className="room-review">
                    <h2>Reviews</h2>
                    <div className="room-reviews-box">

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
            )}


            {/* <Footer /> */}
        </div>
    );
};

export default RoomDetails;
