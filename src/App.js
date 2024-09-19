import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login-page' element={<Login />} />
          <Route path='/register-page' element={<Register />} />
          <Route path='/landing-page' element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;