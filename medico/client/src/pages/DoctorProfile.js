import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/DoctorProfile.css';

const DoctorProfile = () => {
  const [doctor, setDoctor] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctorDetails();
    fetchAvailableSlots();
  }, [id]);

  const fetchDoctorDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/doctors/${id}`);
      setDoctor(response.data);
    } catch (error) {
      console.error('Error fetching doctor details:', error);
    }
  };

  const fetchAvailableSlots = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/appointments/slots/${id}`);
      setAvailableSlots(response.data);
    } catch (error) {
      console.error('Error fetching available slots:', error);
    }
  };

  const handleBookAppointment = (slot) => {
    navigate('/book-appointment', { state: { doctor, slot } });
  };

  if (!doctor) return <div>Loading...</div>;

  return (
    <div className="doctor-profile-container">
      <div className="doctor-info">
        <h1>Dr. {doctor.name}</h1>
        <div className="info-section">
          <h2>Specialization</h2>
          <p>{doctor.specialization}</p>
        </div>
        <div className="info-section">
          <h2>Experience</h2>
          <p>{doctor.experience} years</p>
        </div>
        <div className="info-section">
          <h2>Contact</h2>
          <p>Email: {doctor.email}</p>
        </div>
      </div>

      <div className="available-slots">
        <h2>Available Appointment Slots</h2>
        {availableSlots.length === 0 ? (
          <p>No available slots at the moment</p>
        ) : (
          <div className="slots-grid">
            {availableSlots.map((slot) => (
              <div key={slot._id} className="slot-card">
                <p><strong>Date:</strong> {new Date(slot.date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {slot.time}</p>
                <button
                  onClick={() => handleBookAppointment(slot)}
                  className="book-slot-button"
                >
                  Book Appointment
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorProfile; 