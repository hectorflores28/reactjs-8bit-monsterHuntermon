const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    level: {
        type: Number,
        default: 1
    },
    health: {
        type: Number,
        default: 100
    },
    attack: {
        type: Number,
        default: 10
    },
    defense: {
        type: Number,
        default: 5
    },
    experience: {
        type: Number,
        default: 0
    },
    inventory: [{
        item: String,
        quantity: Number
    }],
    equipment: {
        weapon: String,
        armor: String,
        accessory: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Character', characterSchema); 