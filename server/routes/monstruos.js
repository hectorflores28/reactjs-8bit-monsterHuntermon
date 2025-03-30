const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Obtener todos los monstruos
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM monstruos ORDER BY nivel ASC');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener monstruos:', error);
        res.status(500).json({ message: 'Error al obtener monstruos' });
    }
});

// Obtener monstruo por ID
router.get('/:id', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM monstruos WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Monstruo no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener monstruo:', error);
        res.status(500).json({ message: 'Error al obtener monstruo' });
    }
});

module.exports = router; 