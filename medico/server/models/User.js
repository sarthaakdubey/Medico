const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['doctor', 'patient'],
        required: true
    },
    // Additional fields for doctors
    specialization: {
        type: String,
        required: function() {
            return this.role === 'doctor';
        }
    },
    experience: {
        type: Number,
        required: function() {
            return this.role === 'doctor';
        }
    },
    // Additional fields for patients
    age: {
        type: Number,
        required: function() {
            return this.role === 'patient';
        }
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: function() {
            return this.role === 'patient';
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema); 