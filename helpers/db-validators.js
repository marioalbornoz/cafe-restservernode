const { response } = require('express');
const { Categoria, Producto } = require('../models');
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

const existeUsuarioPorId = async( id ) => {
    // Verificar si el correo esta registrado
    const existeId = await Usuario.findById(id);

    if(!existeId){
        throw new Error(`El id ${ id } no existe`)
    } 
}

// valida que existe categoria por id
const existeCategoriaPorId = async(id) => {

    const existeCategoria = await Categoria.findById(id);
    if(!existeCategoria){
        throw new Error(`Categoria de id ${id} no existe`);
    }
}

// valida que existe producto por id
const existeProductoPorId = async(id) => {

    const existeProducto = await Producto.findById(id);
    if(!existeProducto){
        throw new Error(`Producto de id ${id} no existe`);
    }
}

// valida colecciones permitidas
const coleccionesPermitidas = (coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes(coleccion);
    if(!incluida){
        throw new Error(
          `La coleccion ${coleccion} no es permitida entre ${colecciones}`
        );
    }
    return true;
}


module.exports = {
    esRoleValido,
    esEmailValido,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas
}