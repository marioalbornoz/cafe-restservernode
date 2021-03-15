const {Router} = require('express');
const { check } = require('express-validator');
const { existeCategoriaPorId } = require('../helpers/db-validators')
const {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria,
} = require("../controller/categorias.controller");

// middlewares
const {
    validarCampos,
    validarJWT,
    tieneRole,
    esAdminRole,
  } = require('../middlewares');
const { validate } = require('../models/categoria.db');
  
  const router = Router();

// {{url}}/api/categoria

// Obtener todas las categorias - publico
router.get('/', obtenerCategorias)

// Obtener una categoria por id - publico
router.get('/:id',[
  check('id', 'No es un id de Mongo valido').isMongoId(),
  check('id').custom(existeCategoriaPorId),
  validarCampos
], obtenerCategoria)

// Crear categoria - privado - cualquier usuario con un token valido
router.post('/',[
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  validarCampos
], crearCategoria)

// actualizar - privado- usuarios con token valido
router.put('/:id', [
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('id').custom(existeCategoriaPorId),
  check('id', 'No es un id de Mongo valido').isMongoId(),
  validarCampos
], actualizarCategoria)

// borra una categoria - admin
router.delete('/:id',[
  validarJWT,
  esAdminRole,
  check('id', 'No es un id de Mongo valido').isMongoId(),
  check('id').custom(existeCategoriaPorId),
  validarCampos
], borrarCategoria)

module.exports = router;