const {Router} = require('express');
const { check } = require('express-validator');
const { existeCategoriaPorId } = require('../helpers/db-validators')
const {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
} = require("../controller/categorias.controller");

// middlewares
const {
    validarCampos,
    validarJWT,
    tieneRole,
  } = require('../middlewares');
  
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
router.put('/:id', (req, res) => {
  res.json({
    msg: 'PUT'
  })
})

// borra una categoria - admin
router.delete('/:id', (req, res) => {
  res.json({
    msg: 'Delete - ID'
  })
})

module.exports = router;