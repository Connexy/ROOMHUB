import room1 from "../assets/images/image1.jpg"
import room2 from "../assets/images/image2.jpg"
import room3 from "../assets/images/image3.jpg"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RoomCard from "../components/RoomCard";
import { Link } from "react-router-dom";
import roomsData from "../room.json";


const RentalListing = () => {
    const images = {
        RI1: room1,
        RI2: room2,
        RI3: room3,
    };

    return (
        <>
            <Navbar />
            <div className="big-container">
                <div classNameName="heading-text">
                    <h1>Are you looking for rooms ?</h1>
                </div>

                <div className="containers">
                    {roomsData.map((room, index) => (
                        <RoomCard
                            {...room}
                            index={index}
                            roomImage={images[room.roomImage]}
                        />
                    ))}
                </div>
                <div className="doubt">
                    <h2>Have any doubts or looking for something specific?</h2>
                    <p style={{ fontSize: "16px" }}>Our agents are here to help you.</p>
                    <button className="button" id="cont-btn">
                        <Link to="/contact-page">Contact Us</Link>
                    </button>
                </div>
            </div>

            <Footer />
        </>
    );
};
export default RentalListing;