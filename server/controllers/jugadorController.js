const Jugador = require('../models/jugador');

const jugadorController = {
    // Crear nuevo jugador
    async crearJugador(req, res) {
        try {
            const { nombre } = req.body;
            if (!nombre) {
                return res.status(400).json({ message: 'El nombre es requerido' });
            }
            const jugadorId = await Jugador.crear(nombre);
            res.status(201).json({ 
                message: 'Jugador creado exitosamente',
                id: jugadorId 
            });
        } catch (error) {
            console.error('Error al crear jugador:', error);
            res.status(500).json({ message: 'Error al crear jugador' });
        }
    },

    // Obtener jugador por ID
    async obtenerJugador(req, res) {
        try {
            const { id } = req.params;
            const jugador = await Jugador.obtenerPorId(id);
            if (!jugador) {
                return res.status(404).json({ message: 'Jugador no encontrado' });
            }
            res.json(jugador);
        } catch (error) {
            console.error('Error al obtener jugador:', error);
            res.status(500).json({ message: 'Error al obtener jugador' });
        }
    },

    // Obtener estadísticas del jugador
    async obtenerEstadisticas(req, res) {
        try {
            const { id } = req.params;
            const estadisticas = await Jugador.obtenerEstadisticas(id);
            if (!estadisticas) {
                return res.status(404).json({ message: 'Jugador no encontrado' });
            }
            res.json(estadisticas);
        } catch (error) {
            console.error('Error al obtener estadísticas:', error);
            res.status(500).json({ message: 'Error al obtener estadísticas' });
        }
    },

    // Obtener inventario del jugador
    async obtenerInventario(req, res) {
        try {
            const { id } = req.params;
            const inventario = await Jugador.obtenerInventario(id);
            res.json(inventario);
        } catch (error) {
            console.error('Error al obtener inventario:', error);
            res.status(500).json({ message: 'Error al obtener inventario' });
        }
    },

    // Registrar una caza
    async registrarCaza(req, res) {
        try {
            const { jugadorId, monstruoId, duracion, resultado, recompensa } = req.body;
            
            if (!jugadorId || !monstruoId || !duracion || !resultado || !recompensa) {
                return res.status(400).json({ message: 'Todos los campos son requeridos' });
            }

            await Jugador.registrarCaza(jugadorId, monstruoId, duracion, resultado, recompensa);
            res.status(201).json({ message: 'Caza registrada exitosamente' });
        } catch (error) {
            console.error('Error al registrar caza:', error);
            res.status(500).json({ message: 'Error al registrar caza' });
        }
    }
};

module.exports = jugadorController; 