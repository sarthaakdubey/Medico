const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./server/config/db');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
const authRoutes = require('./server/routes/authRoutes');
const appointmentRoutes = require('./server/routes/appointmentRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);

// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Medico API' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 