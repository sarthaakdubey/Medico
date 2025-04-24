import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import DoctorProfile from './pages/DoctorProfile';
import BookAppointment from './pages/BookAppointment';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/doctor/:id" element={<DoctorProfile />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 