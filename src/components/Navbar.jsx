import { Link } from "react-router-dom";
import { useFavorite } from "../components/FavoriteContext";
import { showInformationMessage } from "../utils/Notification";

const Navbar = () => {
    const userId = localStorage.getItem("userId");
    const { favoriteCount } = useFavorite();

    const doLogout = () => {
        if (localStorage.getItem('isLogin')) {
            localStorage.removeItem('isLogin');
            localStorage.removeItem('userType');
            localStorage.removeItem('userId');
            showInformationMessage("Logout successfully");
        }
    };

    return (
        <div>
            <div className="navbar">
                <div className="logo">
                    <Link to='/landing-page'><h1 style={{ color: "white" }}>RoomHub</h1></Link>
                </div>
                <div className="home-content">
                    <ul>
                        <li><Link to='/landing-page'>Home</Link></li>
                        <li><Link to='/rental-listing-page'>Available Rooms</Link></li>
                        <li><Link to='/how-it-works-page-tenant'>How it Works</Link></li>
                        <li><Link to='/about-us-page'>About Us</Link></li>
                    </ul>
                </div>
                <div className="auth">
                    <Link to={`/favorite-page/${userId}`}>
                        <i className="fa-solid fa-heart">
                            {favoriteCount > 0 && (
                                <span className="badge" style={{ color: 'red', fontSize: '12px', marginLeft: '5px' }}>
                                    {favoriteCount}
                                </span>
                            )}
                        </i>
                    </Link>
                    <Link to='/user-booking-status-page'><i className="fa-solid fa-calendar"></i></Link>
                    <div className="dropdown">
                        <i className="fa-solid fa-user"></i>
                        <div className="dropdown-content">
                            <Link to='/user-detail-page'>User Detail</Link>
                            <Link to='/login-page' onClick={doLogout}>Log Out</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
