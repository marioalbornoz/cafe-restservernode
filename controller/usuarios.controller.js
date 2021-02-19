const { request, response } = require('express');
const Usuario = require('../models/usuario.db');
const bcrypt = require('bcrypt');

const usuariosGET = async(req = request, res = response) => {
    
    // se recomienda desectructurar queryparams
    const {
        limite = 5, desde = 0
    } = req.query;
    const usuarios = await Usuario.find().skip(Number(desde)).limit(Number(limite));
    res.json(usuarios);
}

const usuariosPOST = async(req, res = response) => {

    const {
        nombre,
        password,
        correo,
        rol
    } = req.body;
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
    const {
        _id,
        password,
        google,
        ...resto
    } = req.body;

    // TODO validar contra base de datos

    if(password){
        resto.password = bcrypt.hashSync(password, 10);
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto);

    res.json(usuario)
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