import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (!token || !storedUser) {
      navigate('/login');
      return;
    }

    setUser(storedUser);
    fetchAppointments(storedUser);
  }, [navigate]);

  const fetchAppointments = async (userData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/appointments', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome, {user.name}</h1>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </header>

      <main className="dashboard-main">
        <section className="user-info">
          <h2>Your Profile</h2>
          <div className="info-card">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
            {user.role === 'doctor' && (
              <>
                <p><strong>Specialization:</strong> {user.specialization}</p>
                <p><strong>Experience:</strong> {user.experience} years</p>
              </>
            )}
            {user.role === 'patient' && (
              <>
                <p><strong>Age:</strong> {user.age}</p>
                <p><strong>Gender:</strong> {user.gender}</p>
              </>
            )}
          </div>
        </section>

        <section className="appointments">
          <h2>Your Appointments</h2>
          {appointments.length === 0 ? (
            <p>No appointments scheduled</p>
          ) : (
            <div className="appointments-list">
              {appointments.map(appointment => (
                <div key={appointment._id} className="appointment-card">
                  <h3>Appointment with {appointment.doctor.name}</h3>
                  <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
                  <p><strong>Time:</strong> {appointment.time}</p>
                  <p><strong>Status:</strong> {appointment.status}</p>
                </div>
              ))}
            </div>
          )}
          {user.role === 'patient' && (
            <button 
              onClick={() => navigate('/book-appointment')}
              className="book-appointment-button"
            >
              Book New Appointment
            </button>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard; 