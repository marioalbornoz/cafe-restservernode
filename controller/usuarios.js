const { request, response } = require('express');


const usuariosGET = (req = request, res = response) => {
    
    // se recomienda desectructurar queryparams
    const query = req.query;

    res.status(400).json({
        msg: 'GET API - Controlador',
        query
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

    const id = req.params.id;

    res.json({
        msg: 'PUT API- Controlador',
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