//Punto inicial de mi aplicacion en Node

// Configuracion básica de express
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');


//Crear el servidor de express
const app = express();

//Bases de datos
dbConnection();


//CORS
app.use(cors())


// Directorio publico
//Use: es una simple funcion que se ejecuta cuando alguien hace una peticion, lo hacemos con un middleware
app.use( express.static('public') );

//Lectura y parseo del body, para peticiones en formato JSON y extraer su contenido
app.use( express.json() );


// Rutas
//Lo que vaya a exportar './routes/auth' lo va a habilitar en esta ruta '/api/auth' 
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));


// Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
})

