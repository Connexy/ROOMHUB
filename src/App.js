import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import LandingPage from './pages/LandingPage';
import RentalListing from './pages/RentalListing';
import HowitWorks from './pages/HowitWorks';
import Contact from './pages/Contact';
import UserDetail from './pages/UserDetail';
import RoomDetails from './pages/RoomDetails';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login-page' element={<Login />} />
          <Route path='/register-page' element={<Register />} />
          <Route path='/landing-page' element={<LandingPage />} />
          <Route path='/rental-listing-page' element={<RentalListing />} />
          <Route path='/how-it-works-page' element={<HowitWorks />} />
          <Route path='/contact-page' element={<Contact />} />
          <Route path='/user-detail-page' element={<UserDetail />} />
          <Route path='/room-detail-page/:index' element={<RoomDetails />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>

  );
}

export default App;