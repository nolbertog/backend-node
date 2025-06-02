const express = require('express');
const cors = require('cors');
const masterRoutes = require('./routes/master');
const authMiddleware = require('./middleware/authMiddleware');
const publicRoutes = require('./routes/publicRoutes');

const app = express();
const HTTP_PORT = process.env.PORT || 3001;

// Cargar variables de entorno
require('dotenv').config();

// Utilidades adicionales
require('./utils/alertRecurso');
require('./utils/alertCotizacion');
require('./utils/CotizacionEstado');
require('./utils/alertaCotizacion2Dias');

// Configuración de CORS
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Authorization', 'Content-Type'],
    credentials: true,
}));

app.use(express.json());

// Middleware para registrar solicitudes
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
});

// Rutas públicas (no requieren autenticación)
app.use('/login', publicRoutes);

// Rutas protegidas (requieren autenticación)
app.use('/', authMiddleware, masterRoutes);

// Manejo global de errores
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        error: 'Algo salió mal!',
        message: err.message || 'Error interno del servidor',
    });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
    console.warn('Ruta no encontrada:', req.originalUrl);
    res.status(404).json({ error: 'Ruta no encontrada' });
});

app.listen(3001, '0.0.0.0', () => {
    console.log('Servidor HTTPS ejecutándose en http://localhost:3001');
}); // Asegúrate de que esta línea esté cerrada correctamente
