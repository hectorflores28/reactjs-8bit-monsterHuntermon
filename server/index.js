const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const pool = require('./config/db');
const cloudSaveRoutes = require('./routes/cloudSaveRoutes');

// Cargar variables de entorno
dotenv.config();

// Crear aplicación Express
const app = express();

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Probar conexión a MySQL
pool.getConnection()
    .then(connection => {
        console.log('Conectado a MySQL');
        connection.release();
    })
    .catch(err => console.error('Error conectando a MySQL:', err));

// Rutas API
app.use('/api/jugadores', require('./routes/jugadores'));
app.use('/api/monstruos', require('./routes/monstruos'));
app.use('/api/armas', require('./routes/armas'));
app.use('/api/cloud-save', cloudSaveRoutes);

// Ruta de prueba
app.get('/api/test', (req, res) => {
    res.json({ message: 'API funcionando correctamente' });
});

// En desarrollo, redirigir todas las peticiones al cliente
if (process.env.NODE_ENV === 'development') {
    app.get('*', (req, res) => {
        res.redirect(process.env.CLIENT_URL || 'http://localhost:3000');
    });
} else {
    // En producción, servir archivos estáticos
    app.use(express.static(path.join(__dirname, '../client/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
    });
}

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: err.message
    });
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
    console.log(`Modo: ${process.env.NODE_ENV || 'development'}`);
}); 