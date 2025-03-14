//CRUD: Create, delete, update
/*
    Event Routes
    /api/events
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { getEvento, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');

const router = Router(); 

//Todas estos endpoints deben pasar por el middleware
router.use( validarJWT );


//Peticion de obtener eventos, todas deben de pasar por el JWT
router.get('/', getEvento);

//Crear un nuevo evento
router.post(
    '/', 
    [
        //Validar campos detiene el codigo en es parte por si tenemos un error
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),
        check('end','Fecha de finalizacion es obligatoria').custom( isDate ),
        validarCampos

    ],
    crearEvento
);

//Actualizar evento, cualquier id   
router.put('/:id', actualizarEvento)

//Borrar evento 
router.delete('/:id', eliminarEvento)

module.exports = router;