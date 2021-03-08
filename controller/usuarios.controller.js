const { request, response } = require('express');
const Usuario = require('../models/usuario.db');
const bcrypt = require('bcrypt');



const usuarioGET = async(req = request, res = response) => {

    const id = req.params.id;
    const usuario = await Usuario.findById(id)
    res.json({
        usuario
    })
}

const usuariosGET = async(req = request, res = response) => {
    
    // se recomienda desectructurar queryparams
    const {
        limite = 5, desde = 0
    } = req.query;

    const usuariosActivos = { estado: true}

    // Promesa que se ejecuta en un tiempo t, tener mas de una promesa provoca que t aumente
    /*const usuarios = await Usuario.find(usuariosActivos)
        .skip(Number(desde))
        .limit(Number(limite));
    
    const total = await Usuario.countDocuments(usuariosActivos); */

    // usar una coleccion de promesas permite que se ejecuten en simultaneo, si una arroja error, todas lo haran
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(usuariosActivos),
        Usuario.find(usuariosActivos)
            .skip(Number(desde))
            .limit(Number(limite))
    ])
    res.json({
        total,
        usuarios
    });
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

const usuariosDELETE = async(req, res) => {

    const { id } = req.params;
   
    const usuarioAuth = req.usuario.nombre;
    const query = { estado: false}
    const usuario = await Usuario.findByIdAndUpdate(id, query, { new: true})
    
    res.json({usuario, usuarioAuth})
}

const usuariosPATH = (req, res) => {
    res.json({
        ok: true,
        msg: 'PATH API - Controlador'
    })
}


module.exports = {
    usuarioGET,
    usuariosGET,
    usuariosPOST,
    usuariosPUT,
    usuariosDELETE,
    usuariosPATH
}