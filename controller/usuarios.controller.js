const { request, response } = require('express');
const Usuario = require('../models/usuario.db');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const usuariosGET = (req = request, res = response) => {
    
    // se recomienda desectructurar queryparams
    const query = req.query;

    res.status(400).json({
        msg: 'GET API - Controlador',
        query
    })
}

const usuariosPOST = async(req, res) => {


    const { nombre, password, correo, rol} = req.body;
    const usuario = new Usuario( {
        nombre,
        password: bcrypt.hashSync(password,10),
        correo,
        rol
    } );


    // Verificar si el correo esta registrado
    const existeEmailDB = await Usuario.findOne({ correo });

    if(existeEmailDB){
        return res.status(400).json({
            message: 'Este correo ya se encuentra registrado'
        });
    } 


    await usuario.save();
    
    res.json({
        usuario
    })
}

const usuariosPUT = (req, res) => {

    const id = req.params.id;

    res.json({
        id
    })
}

const usuariosDELETE = (req, res) => {
    res.json({
        ok: true,
        msg: 'DELETE API - Controlador'
    })
}

const usuariosPATH = (req, res) => {
    res.json({
        ok: true,
        msg: 'PATH API - Controlador'
    })
}


module.exports = {
    usuariosGET,
    usuariosPOST,
    usuariosPUT,
    usuariosDELETE,
    usuariosPATH
}