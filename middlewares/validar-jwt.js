const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const usuarioDb = require("../models/usuario.db");

const validarJWT = async(req = request, res = response, next) => {
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }
    try {
         const {uid} = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        // Leer el usuario que corresponde al uid

        const usuario = await usuarioDb.findById(uid);

        // validar que existe usuario
        if(!usuario){
            return res.status(401).json({
                msg: 'Token no valido -usuario no existe en db'
            })
        }

        // Validar si el uid del usuario tiene estado true
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Token no valido - estado usuario:false'
            })
        }

         req.usuario = usuario;
        next()
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }


}
module.exports = {
    validarJWT
}