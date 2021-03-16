const {Router} = require('express');
const { check } = require('express-validator');
const { subirArchivos } = require('../controller/uploads.controller');
const { validarCampos } = require('../middlewares');



const router = Router();

router.post('/', subirArchivos)

module.exports = router;