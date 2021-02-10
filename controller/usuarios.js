const { response } = require('express');


const usuariosGET = (req, res = response) => {
    res.status(400).json({
        ok: true,
        msg: 'GET API - Controlador'
    })
}

const usuariosPOST = (req, res) => {

    const body = req.body;

    res.json({
        ok: true,
        msg: 'POST API - Controlador',
        datos: body
    })
}

const usuariosPUT = (req, res) => {
    res.json({
        ok: true,
        msg: 'PUT API- Controlador'
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