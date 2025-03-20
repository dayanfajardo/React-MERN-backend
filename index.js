const path = require('path');

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

const app = express();

// Base de datos
dbConnection();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas API
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

app.use('*', (req, res) => {
    res.sendFile( path.join( __dirname, 'public/index.html' ) );
})

// Middleware rutas no encontradas (opcional)
app.use((req, res, next) => {
    res.status(404).json({
        ok: false,
        msg: 'Ruta no encontrada'
    });
});

// Puerto y servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en puerto ${PORT}`);
});
