const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGET,
        usuariosPOST,
        usuariosPUT,
        usuariosDELETE,
        usuariosPATH } = require('../controller/usuarios.controller');
const { esRoleValido, esEmailValido, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos'); 

const router = Router();

router.get('/', usuariosGET)

router.put('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRoleValido ),
    validarCampos
] ,usuariosPUT);

router.post('/', [
    /** Middlewares de express-validator */
    check('nombre', 'El nombre no es valido').notEmpty(),
    check('password', ' El password debe ser mayor a 6 letras').isLength({ min: 6}),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( esEmailValido ),
    // check('rol', 'El rol no es valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( esRoleValido ),
    validarCampos

] ,usuariosPOST)

router.delete('/', usuariosDELETE)

router.patch('/', usuariosPATH)


module.exports = router;