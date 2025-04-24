import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="header">
        <nav className="nav">
          <div className="logo">Medico</div>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        </nav>
      </header>

      <main className="main-content">
        <section className="hero">
          <h1>Welcome to Medico</h1>
          <p>Your trusted healthcare partner</p>
          <Link to="/register" className="cta-button">Get Started</Link>
        </section>

        <section className="features">
          <div className="feature-card">
            <h3>Book Appointments</h3>
            <p>Schedule appointments with top doctors in your area</p>
          </div>
          <div className="feature-card">
            <h3>Medical Records</h3>
            <p>Access and manage your medical history securely</p>
          </div>
          <div className="feature-card">
            <h3>Doctor Profiles</h3>
            <p>Find and connect with specialized doctors</p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2024 Medico. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home; 