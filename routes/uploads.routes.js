const {Router} = require('express');
const { check } = require('express-validator');
const { subirArchivos , actualizarArchivos} = require('../controller/uploads.controller');
const { coleccionesPermitidas } = require('../helpers');
const { validarCampos, validarArchivoSubir } = require('../middlewares');



const router = Router();

router.post('/',validarArchivoSubir, subirArchivos);


router.put('/:coleccion/:id',[
    validarArchivoSubir,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('coleccion').custom( c=> coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
] ,actualizarArchivos);

module.exports = router;