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

    await usuario.save();
    
    res.json({
        usuario
    })
}

const usuariosPUT = async(req, res) => {

    const id = req.params.id;
    const { password, google, ...resto } = req.body;

    // TODO validar contra base de datos

    if(password){
        resto.password = bcrypt.hashSync(password, 10);
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto);

    res.json({
        usuario
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