const express = require('express');
const router = express.Router();
const cloudSaveController = require('../controllers/cloudSaveController');
const authMiddleware = require('../middleware/authMiddleware');

// Aplicar middleware de autenticación a todas las rutas
router.use(authMiddleware);

// Guardar datos del juego
router.post('/save', cloudSaveController.saveGameData);

// Cargar datos del juego
router.get('/load/:userId', cloudSaveController.loadGameData);

// Sincronizar datos del juego
router.post('/sync', cloudSaveController.syncGameData);

module.exports = router; 