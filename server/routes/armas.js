const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Obtener todas las armas
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM armas ORDER BY nivel ASC');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener armas:', error);
        res.status(500).json({ message: 'Error al obtener armas' });
    }
});

// Obtener arma por ID
router.get('/:id', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM armas WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Arma no encontrada' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener arma:', error);
        res.status(500).json({ message: 'Error al obtener arma' });
    }
});

// Obtener armas por tipo
router.get('/tipo/:tipo', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM armas WHERE tipo = ? ORDER BY nivel ASC', [req.params.tipo]);
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener armas por tipo:', error);
        res.status(500).json({ message: 'Error al obtener armas por tipo' });
    }
});

module.exports = router; 