const mongoose = require('mongoose');

const userDataSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  character: {
    name: String,
    gender: String,
    class: String,
    hairColor: String,
    clothesColor: String,
    level: Number,
    experience: Number,
    stats: {
      health: Number,
      stamina: Number,
      attack: Number,
      defense: Number
    }
  },
  inventory: [{
    itemId: String,
    quantity: Number,
    type: String
  }],
  weapons: [{
    weaponId: String,
    level: Number,
    experience: Number
  }],
  achievements: [{
    achievementId: String,
    progress: Number,
    completed: Boolean,
    completedAt: Date
  }],
  missions: [{
    missionId: String,
    progress: Number,
    completed: Boolean,
    completedAt: Date
  }],
  lastSync: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('UserData', userDataSchema); 