const path = require('path');
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

const app = express();

// 🔷 Base de datos
dbConnection();

// 🔷 Middlewares
app.use(cors());
app.use(express.json());

// 🔷 Rutas API
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// ✅ SERVIR el Frontend (archivos estáticos del React en producción)
app.use( express.static( path.join(__dirname, 'public') ) );

// ✅ Para cualquier otra ruta que no sea API, devuelve el index.html del frontend
app.get('*', (req, res) => {
    res.sendFile( path.join( __dirname, 'public/index.html' ) );
});

// 🔷 Puerto y servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en puerto ${PORT}`);
});
