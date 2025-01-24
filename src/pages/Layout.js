import { Outlet, useLocation } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LandingPage from "./user/LandingPage";

const Layout = () => {
    const location = useLocation();

    // Check if the current route is the root ("/")
    const isRoot = location.pathname === "/";
    return (
        <div>
            <Navbar />

            <div className="main-body">
                {isRoot ? <LandingPage /> : <Outlet />}
            </div>

            <Footer />
        </div>
    );
}
export default Layout;