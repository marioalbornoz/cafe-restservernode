const { response } = require("express");
const  fs  = require("fs");
const path = require('path');
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


    // Limpiar imagenes existentes
    if(modelo.img){
        // hay que borrar la imegen del servidor
        const pathImagen = path.join(__dirname, '../uploads',coleccion, modelo.img); /* Ruta de la imagen */
        if(fs.existsSync(pathImagen)){  /* Exixste una imagen en esa ruta - true or false */
            //borra el archivo
            fs.unlinkSync(pathImagen);
        }
    }

    const nombre = await subirArchivo(req.files, undefined, coleccion);

    modelo.img = nombre;
    await modelo.save();

    res.json(modelo);
}



// mostrar imagen

const mostrarImagen = async(req, res = response) => {
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


    // imagen existente
    if(modelo.img){
        // hay que borrar la imegen del servidor
        const pathImagen = path.join(__dirname, '../uploads',coleccion, modelo.img); /* Ruta de la imagen */
        if(fs.existsSync(pathImagen)){  /* Exixste una imagen en esa ruta - true or false */
            //enviar el archivo
            return res.sendFile(pathImagen);
        }
    }
    res.json({
        msg: 'falta placeholder'
    })
};


module.exports = {
    subirArchivos,
    actualizarArchivos,
    mostrarImagen
}