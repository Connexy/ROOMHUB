import Login from './Auth/Login';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './Auth/Register';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register-page' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;