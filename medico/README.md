# Medico - Medical Website

A comprehensive medical website for BTech major project that provides features for doctors and patients to manage appointments, medical records, and more.

## Features

- User Authentication (Doctors & Patients)
- Appointment Booking System
- Medical Records Management
- Doctor Profiles
- Patient Dashboard
- Responsive Design

## Tech Stack

- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/medico
   JWT_SECRET=your_jwt_secret_key_here
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
medico/
├── client/          # React frontend
├── server/          # Node.js backend
│   ├── models/      # MongoDB models
│   ├── routes/      # API routes
│   └── controllers/ # Route controllers
├── package.json
└── README.md
```

## Contributing

Feel free to contribute to this project by submitting issues or pull requests. 
