const { request, response } = require('express');
const Usuario = require('../models/usuario.db');
const bcrypt = require('bcrypt');

const login = async(req = request, res = response) => {

    const { correo, password } = req.body;

    try {

        // verificar si email existe
        const usuario = await Usuario.findOne({ correo });
        if( !usuario && !usuario.estado){
            return res.status(400).json({
                msg: 'Usuario o password incorrectos - correo'
            })
        }

        // Verificar si el usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario o password incorrectos - estado:false'
            })
        }



        // Verificar la contrasena

        const validPassword = bcrypt.compareSync( password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'Password incorrectos - Password incorrecta'
            })
        }


        // Generar el JWT

    res.json({
        msg:'Login ok',
        correo,
        password
    })
    
} catch (error) {
    console.log(error);
    return res.status(500).json({
        msg: 'Algo salio mal! Hable con el admin'
    })
    
}

}

module.exports = {
    login
}