/*
    Rutas de usuarios/ Auth
    host + api/auth
*/
const express = require('express');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = express.Router(); 
//Si quiero crear un nuevo usuario lo hago con una peticion post, para el posteo de informacion
// [] Es una coleccion de middlewares
router.post(
        '/new', 
        [// Middlewares: El nombre debe ser obligatorio y no debe estar vacio
            check('name', 'El nombre es obligatorio').not().isEmpty(),
            check('email', 'El email es obligatorio').isEmail(),
            check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
            validarCampos
        ], 
        crearUsuario
    );

// Posteo del auth
router.post(
        '/', 
        [
            check('email', 'El email es obligatorio').isEmail(),
            check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
            validarCampos
        ], 
        loginUsuario
    );

//Token
router.get('/renew', validarJWT, revalidarToken);

module.exports = router;