const mongoose = require('mongoose');

const weaponSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true,
        enum: ['sword', 'axe', 'hammer', 'lance', 'bow', 'gun', 'dual-blades', 
               'great-sword', 'long-sword', 'gunlance', 'hunting-horn', 
               'switch-axe', 'charge-blade', 'insect-glaive']
    },
    damage: {
        base: { type: Number, required: true },
        element: { type: String, enum: ['fire', 'water', 'thunder', 'ice', 'dragon', null], default: null },
        elementDamage: { type: Number, default: 0 }
    },
    attacks: {
        light: {
            name: String,
            damage: Number,
            stamina: Number,
            description: String
        },
        heavy: {
            name: String,
            damage: Number,
            stamina: Number,
            description: String
        }
    },
    combos: [{
        name: String,
        sequence: [String],
        damage: Number,
        stamina: Number,
        description: String
    }],
    defense: {
        block: { type: Number, default: 0 },
        dodge: { type: Number, default: 0 }
    },
    requirements: {
        level: { type: Number, default: 1 },
        strength: { type: Number, default: 0 },
        dexterity: { type: Number, default: 0 }
    },
    sprite: {
        idle: String,
        attack: String,
        block: String,
        dodge: String
    },
    soundEffects: {
        swing: String,
        hit: String,
        block: String
    }
});

module.exports = mongoose.model('Weapon', weaponSchema); 