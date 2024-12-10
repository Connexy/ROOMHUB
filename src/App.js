import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import LandingPage from './pages/user/LandingPage';
import RentalListing from './pages/user/RentalListing';
import HowitWorks from './pages/user/HowitWorks';
import Contact from './pages/user/Contact';
import UserDetail from './pages/user/UserDetail';
import RoomDetails from './pages/user/RoomDetails';
import Dashboard from './pages/admin/Dashboard';
import UserList from './pages/admin/UserList';
import PostRoom from './pages/admin/PostRoom';

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
          <Route path='/admin-dashboard-page' element={<Dashboard />} />
          <Route path='/user-list' element={<UserList />} />
          <Route path='/post-room' element={<PostRoom />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>

  );
}

export default App;