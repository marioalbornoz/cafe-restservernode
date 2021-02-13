const Role = require('../models/rol.db');
const Usuario = require('../models/usuario.db');

const esRoleValido =  async(rol = '') => {
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
    }
}

const esEmailValido = async( correo = '') => {
    // Verificar si el correo esta registrado
    const existeEmail = await Usuario.findOne({ correo });

    if(existeEmail){
        throw new Error(`El correo ${ correo } ya esta registrado en la base de datos`)
    } 
}


module.exports = {
    esRoleValido,
    esEmailValido
}