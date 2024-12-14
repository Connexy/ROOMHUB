import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { showSuccessMessage, showInformationMessage } from "../utils/Notification";


const Navbar = () => {

    const navigate = useNavigate();
    const doLogout = () => {
        if (!localStorage.getItem('isLogin')) {
            showInformationMessage("You have already logged out")
        } else {
            showSuccessMessage("Logout successfully");
            localStorage.removeItem('isLogin');
            navigate('/login-page');
        }
    }

    return (
        <div>
            <div className="navbar">
                <div className="logo">
                    <h1 style={{ color: "white" }}>RoomLess</h1>
                </div>
                <div className="home-content">
                    <ul>
                        <li><Link to='/landing-page'>Home</Link></li>
                        <li><Link to='/rental-listing-page'>Available Rooms</Link></li>
                        <li><Link to='/how-it-works-page-tenant'>How it Works</Link></li>
                        <li><Link to='/contact-page'>About Us</Link></li>
                        {/* <div className="dropdown">
                            <i style={{ fontSize: "20px", cursor: "pointer" }} className="fa-solid fa-bell"></i>
                            <div className="dropdown-content">
                                <a href="#">noti 1</a>
                                <a href="#">noti 2</a>
                            </div>
                        </div> */}
                    </ul>
                </div>
                <div className="auth">

                    <div className="dropdown">
                        <i className="fa-solid fa-user"></i>
                        <div className="dropdown-content">

                            <Link to='/user-detail-page' >UserDetail</Link>
                        </div>
                    </div>

                    {/* {isLoggedIn && ( */}
                    <i onClick={doLogout} className="fa-solid fa-right-from-bracket"></i>
                    {/* )} */}
                </div>
            </div>
        </div>

    );
}
export default Navbar;