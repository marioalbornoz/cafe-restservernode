

const dbValidators = require('./db-validators');
const generarJWT = require('./jwt-generator');
const subirArchivos = require('./subir-archivo');
const validarTokenGoogle = require('./verifyIdtoken-google');


module.exports = {
    ...dbValidators,
    ...generarJWT,
    ...subirArchivos,
    ...validarTokenGoogle
}