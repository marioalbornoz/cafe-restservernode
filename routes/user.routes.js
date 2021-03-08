const { Router } = require('express');
const { check } = require('express-validator');
const { usuarioGET,
        usuariosGET,
        usuariosPOST,
        usuariosPUT,
        usuariosDELETE,
        usuariosPATH } = require('../controller/usuarios.controller');
const {
  esRoleValido,
  esEmailValido,
  existeUsuarioPorId,
} = require("../helpers/db-validators");
// middlewares
const {
  validarCampos,
  validarJWT,
  tieneRole,
} = require('../middlewares');

const router = Router();

router.get('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    validarCampos
] ,usuarioGET)

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

router.delete('/:id',[
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
] ,usuariosDELETE)

router.patch('/', usuariosPATH)


module.exports = router;