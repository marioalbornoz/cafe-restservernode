const { Router } = require('express');
const { usuariosGET,
        usuariosPOST,
        usuariosPUT,
        usuariosDELETE,
        usuariosPATH } = require('../controller/usuarios');

const router = Router();

router.get('/', usuariosGET)

router.put('/', usuariosPUT);

router.post('/', usuariosPOST)

router.delete('/', usuariosDELETE)

router.patch('/', usuariosPATH)


module.exports = router;