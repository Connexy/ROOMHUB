import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import LandingPage from './pages/user/LandingPage';
import RentalListing from './pages/user/RentalListing';
import HowitWorks from './pages/user/HowitWorks';
import UserDetail from './pages/user/UserDetail';
import RoomDetails from './pages/user/RoomDetails';
import Dashboard from './pages/homeowner/Dashboard';
import UserList from './pages/admin/UserList';
import PostRoom from './pages/homeowner/PostRoom';
import HowitWorks2 from './pages/user/HowitWorks2';
import PrivateRoute from './routes/PrivateRoute';
import BookingForm from './pages/user/BookingForm';
import BookingStatus from './pages/user/BookingStatus';
import EditUser from './pages/admin/EditUser';
import RoomList from './pages/homeowner/RoomList';
import EditRoom from './pages/homeowner/EditRoom';
import BookingList from './pages/homeowner/BookingList';
import FavoriteRoom from './pages/user/FavoritePage';
import { FavoriteProvider } from './components/FavoriteContext'; // Import the FavoriteProvider
import SearchResultPage from './pages/user/SearchResultPage';
import AboutUs from './pages/user/AboutUs';
import AdminDashboard from './pages/admin/AdminDashboard';
import ChatOwner from './pages/homeowner/ChatOwner';
import Chat from './pages/user/Chat';


function App() {
  return (
    <FavoriteProvider> {/* Wrap the app with FavoriteProvider */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login-page' element={<Login />} />
          <Route path='/register-page' element={<Register />} />

          <Route path='/landing-page' element={<LandingPage />} />
          <Route path='/book-room/:roomId' element={<BookingForm />} />
          {/* <Route path='/rental-listing-page' element={<PrivateRoute component={RentalListing} />} /> */}
          <Route path='rental-listing-page' element={<RentalListing />} />


          <Route path='/how-it-works-page-tenant' element={<HowitWorks />} />
          <Route path='/how-it-works-page-landlord' element={<HowitWorks2 />} />
          <Route path='/about-us-page' element={<AboutUs />} />
          <Route path='/user-detail-page' element={<UserDetail />} />
          <Route path='/room-detail-page/:roomId' element={<RoomDetails />} />
          <Route path='/user-booking-status-page' element={<BookingStatus />} />
          <Route path='/favorite-page/:userId' element={<FavoriteRoom />} />
          <Route path='/search-result-page' element={<SearchResultPage />} />
          <Route path='user-chat-page/:BookingId' element={<Chat />} />

          <Route path='/homeowner-dashboard-page/:userId' element={<PrivateRoute component={Dashboard} />} />
          <Route path='/homeowner-post-room' element={<PostRoom />} />
          <Route path='/homeowner-booking-list' element={<BookingList />} />
          <Route path='/homeowner-room-list' element={<RoomList />} />
          <Route path='/homeowner-edit-room/:roomId' element={<EditRoom />} />
          <Route path='/homeowner-chat-page/:userId' element={<ChatOwner />} />



          <Route path='/super-admin-dashboard' element={<AdminDashboard />} />
          <Route path='/admin-user-list' element={<UserList />} />
          <Route path='/admin-edit-user/:userId' element={<EditUser />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </FavoriteProvider>
  );
}

export default App;
