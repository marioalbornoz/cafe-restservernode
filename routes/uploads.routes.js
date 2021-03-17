const {Router} = require('express');
const { check } = require('express-validator');
const { subirArchivos , actualizarArchivos} = require('../controller/uploads.controller');
const { coleccionesPermitidas } = require('../helpers');
const { validarCampos } = require('../middlewares');



const router = Router();

router.post('/', subirArchivos);


router.put('/:coleccion/:id',[
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('coleccion').custom( c=> coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
] ,actualizarArchivos);

module.exports = router;