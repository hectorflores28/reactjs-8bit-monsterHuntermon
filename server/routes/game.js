const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
    getMonsters,
    startHunt,
    performAttack,
    getHuntRewards,
    levelUp
} = require('../controllers/gameController');

// Todas las rutas requieren autenticación
router.use(protect);

// Rutas de monstruos
router.get('/monsters', getMonsters);

// Rutas de cacería
router.post('/hunt/start', startHunt);
router.post('/hunt/attack', performAttack);
router.get('/hunt/rewards/:monsterId', getHuntRewards);

// Rutas de progreso
router.post('/level-up', levelUp);

module.exports = router; 