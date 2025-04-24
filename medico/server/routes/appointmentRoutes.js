const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Create a new appointment
router.post('/', async (req, res) => {
    try {
        const appointment = new Appointment(req.body);
        await appointment.save();
        res.status(201).json(appointment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all appointments
router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate('doctor', 'name email')
            .populate('patient', 'name email');
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get appointments by doctor ID
router.get('/doctor/:doctorId', async (req, res) => {
    try {
        const appointments = await Appointment.find({ doctor: req.params.doctorId })
            .populate('patient', 'name email');
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get appointments by patient ID
router.get('/patient/:patientId', async (req, res) => {
    try {
        const appointments = await Appointment.find({ patient: req.params.patientId })
            .populate('doctor', 'name email');
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update appointment status
router.patch('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        res.json(appointment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router; 