const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Crear nuevo jugador
router.post('/', async (req, res) => {
    try {
        const { nombre } = req.body;
        const [result] = await pool.execute('CALL crear_jugador(?)', [nombre]);
        res.status(201).json({ id: result.insertId, nombre });
    } catch (error) {
        console.error('Error al crear jugador:', error);
        res.status(500).json({ message: 'Error al crear jugador' });
    }
});

// Obtener jugador por ID
router.get('/:id', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM jugadores WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Jugador no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener jugador:', error);
        res.status(500).json({ message: 'Error al obtener jugador' });
    }
});

// Obtener estadísticas del jugador
router.get('/:id/estadisticas', async (req, res) => {
    try {
        const [rows] = await pool.execute('CALL obtener_estadisticas_jugador(?)', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Jugador no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener estadísticas:', error);
        res.status(500).json({ message: 'Error al obtener estadísticas' });
    }
});

// Obtener inventario del jugador
router.get('/:id/inventario', async (req, res) => {
    try {
        const [rows] = await pool.execute('CALL obtener_inventario_jugador(?)', [req.params.id]);
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener inventario:', error);
        res.status(500).json({ message: 'Error al obtener inventario' });
    }
});

// Registrar una caza
router.post('/caza', async (req, res) => {
    try {
        const { jugadorId, monstruoId, duracion, resultado, recompensa } = req.body;
        await pool.execute(
            'CALL registrar_caza(?, ?, ?, ?, ?)',
            [jugadorId, monstruoId, duracion, resultado, recompensa]
        );
        res.status(201).json({ message: 'Caza registrada exitosamente' });
    } catch (error) {
        console.error('Error al registrar caza:', error);
        res.status(500).json({ message: 'Error al registrar caza' });
    }
});

module.exports = router; 