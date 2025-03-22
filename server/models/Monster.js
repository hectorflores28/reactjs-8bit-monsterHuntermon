const mongoose = require('mongoose');

const monsterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true,
        enum: ['dragon', 'wyvern', 'beast', 'bird', 'insect', 'amphibian', 'elder']
    },
    level: {
        type: Number,
        required: true,
        default: 1
    },
    health: {
        base: { type: Number, required: true },
        current: { type: Number, required: true }
    },
    stats: {
        attack: { type: Number, required: true },
        defense: { type: Number, required: true },
        speed: { type: Number, required: true },
        element: { type: String, enum: ['fire', 'water', 'thunder', 'ice', 'dragon', null], default: null }
    },
    weaknesses: [{
        element: { type: String, enum: ['fire', 'water', 'thunder', 'ice', 'dragon'] },
        multiplier: { type: Number, required: true }
    }],
    attacks: [{
        name: String,
        damage: Number,
        range: Number,
        cooldown: Number,
        description: String,
        pattern: [String], // Secuencia de movimientos
        element: { type: String, enum: ['fire', 'water', 'thunder', 'ice', 'dragon', null], default: null }
    }],
    drops: [{
        item: String,
        chance: Number,
        quantity: {
            min: Number,
            max: Number
        }
    }],
    sprite: {
        idle: String,
        attack: String,
        hurt: String,
        death: String
    },
    soundEffects: {
        roar: String,
        attack: String,
        hurt: String,
        death: String
    },
    behavior: {
        aggressive: { type: Boolean, default: true },
        territorial: { type: Boolean, default: true },
        patterns: [{
            condition: String,
            action: String,
            priority: Number
        }]
    },
    habitat: [{
        type: String,
        description: String
    }]
});

module.exports = mongoose.model('Monster', monsterSchema); 