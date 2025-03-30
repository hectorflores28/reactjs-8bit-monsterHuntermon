const pool = require('../config/db');

class Jugador {
    static async crear(nombre) {
        const [result] = await pool.execute('CALL crear_jugador(?)', [nombre]);
        return result.insertId;
    }

    static async obtenerPorId(id) {
        const [rows] = await pool.execute('SELECT * FROM jugadores WHERE id = ?', [id]);
        return rows[0];
    }

    static async obtenerEstadisticas(id) {
        const [rows] = await pool.execute('CALL obtener_estadisticas_jugador(?)', [id]);
        return rows[0];
    }

    static async obtenerInventario(id) {
        const [rows] = await pool.execute('CALL obtener_inventario_jugador(?)', [id]);
        return rows;
    }

    static async registrarCaza(jugadorId, monstruoId, duracion, resultado, recompensa) {
        await pool.execute(
            'CALL registrar_caza(?, ?, ?, ?, ?)',
            [jugadorId, monstruoId, duracion, resultado, recompensa]
        );
    }
}

module.exports = Jugador; 