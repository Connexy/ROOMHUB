import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Auth/Login';
import Register from './Auth/Register';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login-page' element={<Login />} />
          <Route path='/register-page' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;