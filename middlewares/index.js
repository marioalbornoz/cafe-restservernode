

const  validarCampos  = require('./validar-campos'); 
const  validarJWT  = require('./validar-jwt');
const   tieneRole  = require('./validar-roles');
const validarArchivoSubir = require('./validar-archivo');


module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...tieneRole,
    ...validarArchivoSubir
}