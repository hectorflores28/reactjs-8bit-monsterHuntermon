const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    character: {
        name: String,
        level: { type: Number, default: 1 },
        experience: { type: Number, default: 0 },
        weapon: { type: String, default: 'sword' },
        armor: { type: String, default: 'basic' },
        inventory: [{
            item: String,
            quantity: Number
        }],
        stats: {
            health: { type: Number, default: 100 },
            attack: { type: Number, default: 10 },
            defense: { type: Number, default: 5 },
            speed: { type: Number, default: 5 }
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Hash password antes de guardar
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

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema); 