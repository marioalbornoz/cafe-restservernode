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




module.exports = router;