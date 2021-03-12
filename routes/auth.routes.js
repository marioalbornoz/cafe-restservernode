const {Router} = require('express');
const { check } = require('express-validator');
const { login, googleSignin } = require('../controller/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
],/*Funcion controladora*/ login)

router.post('/google', [
    check('id_token', 'El id_token es necesario').not().isEmpty(),
    validarCampos
],googleSignin)

module.exports = router;