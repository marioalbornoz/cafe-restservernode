const { response } = require("express");
const { subirArchivo } = require("../helpers");
const { Usuario, Producto } = require("../models");



const subirArchivos = async(req, res = response) => {
    
    try {
      // Imagenes
      const nombre = await subirArchivo(req.files, undefined, 'imgs');

      res.json({
        nombre,
      });
    } catch (error) {
      res.status(500).json({ error });
    }
}



// Actualizar archivos
const actualizarArchivos = async(req, res = response) => {
    const {coleccion, id} = req.params;

    let modelo; 

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }

            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                })
            }
            break;
        default:
            return res.status(500).json({
                msg: 'Se me olvido validar esto'
            });
    }

    const nombre = await subirArchivo(req.files, undefined, coleccion);

    modelo.img = nombre;
    await modelo.save();

    res.json(modelo);
}

module.exports = {
    subirArchivos,
    actualizarArchivos
}