const express = require('express');
const router = express.Router();
const Character = require('../models/Character');

// Obtener todos los personajes
router.get('/', async (req, res) => {
    try {
        const characters = await Character.find();
        res.json(characters);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener un personaje específico
router.get('/:id', async (req, res) => {
    try {
        const character = await Character.findById(req.params.id);
        if (!character) {
            return res.status(404).json({ message: 'Personaje no encontrado' });
        }
        res.json(character);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Crear un nuevo personaje
router.post('/', async (req, res) => {
    const character = new Character(req.body);
    try {
        const newCharacter = await character.save();
        res.status(201).json(newCharacter);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Actualizar un personaje
router.put('/:id', async (req, res) => {
    try {
        const character = await Character.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!character) {
            return res.status(404).json({ message: 'Personaje no encontrado' });
        }
        res.json(character);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Eliminar un personaje
router.delete('/:id', async (req, res) => {
    try {
        const character = await Character.findByIdAndDelete(req.params.id);
        if (!character) {
            return res.status(404).json({ message: 'Personaje no encontrado' });
        }
        res.json({ message: 'Personaje eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 