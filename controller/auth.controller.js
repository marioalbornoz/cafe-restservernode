const { request, response } = require('express');
const Usuario = require('../models/usuario.db');
const bcrypt = require('bcrypt');
const { generarJWT } = require('../helpers/jwt-generator');
const { verifyTokenGoogle } = require('../helpers/verifyIdtoken-google');

const login = async(req = request, res = response) => {

    const { correo, password } = req.body;

    try {
      // verificar si email existe
      const usuario = await Usuario.findOne({ correo });
      if (!usuario && !usuario.estado) {
        return res.status(400).json({
          msg: "Usuario o password incorrectos - correo",
        });
      }

      // Verificar si el usuario esta activo
      if (!usuario.estado) {
        return res.status(400).json({
          msg: "Usuario o password incorrectos - estado:false",
        });
      }

      // Verificar la contrasena

      const validPassword = bcrypt.compareSync(password, usuario.password);
      if (!validPassword) {
        return res.status(400).json({
          msg: "Password incorrectos - Password incorrecta",
        });
      }

      // Generar el JWT
      const token = await generarJWT(usuario.id)

      res.json({
        usuario,
        token
      });

    } catch (error) {
    console.log(error);
    return res.status(500).json({
        msg: 'Algo salio mal! Hable con el admin'
    })
    
  }

}

const googleSignin = async(req, res = response) => {

  // token enviado al req desde el index en un fetch:post
  const {id_token} = req.body;

  try {
    const { nombre, img, correo } = await verifyTokenGoogle(id_token);
    
    // Verificar si el correo existe en la base de datos
    let usuario = await Usuario.findOne({ correo});

    if(!usuario){
      // tengho que crearlo

      const data = {
        nombre,
        correo,
        password: ':p',
        img,
        google: true
      }

      usuario = new Usuario( data );
      await usuario.save();
    }
    // si el usuario en DB
    if(!usuario.estado){
      return res.status(401).json({
        msg: 'Hable con el administrador - usuario desactivado'
      })
    }

    // Generar el JWT
    const token = await generarJWT(usuario.id)

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Token de google no valido",
    });
  }

}

module.exports = {
    login,
    googleSignin
}