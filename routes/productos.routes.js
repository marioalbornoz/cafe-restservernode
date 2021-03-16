const {Router} = require('express');
const { check } = require('express-validator');
const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators')
const {
    crearProducto,
    obtenerProducto,
    obtenerProductos,
    actualizarProducto,
    borrarProducto
} = require("../controller/productos.controller");

// middlewares
const {
    validarCampos,
    validarJWT,
    tieneRole,
    esAdminRole,
  } = require('../middlewares');
const { validate, exists } = require('../models/categoria.db');
  
const router = Router();

router.get('/', obtenerProductos)

// Obtener una categoria por id - publico
router.get(
  "/:id",[
    check("id", "No es un id de Mongo valido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  obtenerProducto
);
  
// Crear categoria - privado - cualquier usuario con un token valido
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de Mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
  ], crearProducto)

// actualizar - privado- usuarios con token valido
router.put('/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
  ], actualizarProducto)
  
  // borra una categoria - admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], borrarProducto)


module.exports = router;