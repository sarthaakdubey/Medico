import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../styles/BookAppointment.css';

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    reason: '',
    notes: ''
  });
  const [error, setError] = useState('');
  const [doctor, setDoctor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.doctor && location.state?.slot) {
      setDoctor(location.state.doctor);
      setSelectedSlot(location.state.slot);
    } else {
      navigate('/dashboard');
    }
  }, [location, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const appointmentData = {
        doctor: doctor._id,
        date: selectedSlot.date,
        time: selectedSlot.time,
        reason: formData.reason,
        notes: formData.notes
      };

      await axios.post('http://localhost:5000/api/appointments', appointmentData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  if (!doctor || !selectedSlot) return null;

  return (
    <div className="book-appointment-container">
      <div className="appointment-form">
        <h2>Book Appointment with Dr. {doctor.name}</h2>
        {error && <div className="error-message">{error}</div>}
        
        <div className="appointment-details">
          <p><strong>Date:</strong> {new Date(selectedSlot.date).toLocaleDateString()}</p>
          <p><strong>Time:</strong> {selectedSlot.time}</p>
          <p><strong>Specialization:</strong> {doctor.specialization}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="reason">Reason for Visit</label>
            <input
              type="text"
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="notes">Additional Notes</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="4"
            />
          </div>
          <button type="submit" className="submit-button">Confirm Appointment</button>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment; 