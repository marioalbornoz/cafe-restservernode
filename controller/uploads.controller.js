const { response } = require("express");
const { subirArchivo } = require("../helpers");



const subirArchivos = async(req, res = response) => {
  
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
      res.status(400).send('No files were uploaded.');
      return;
    }
    
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
const actualizarArchivos = (req, res = response) => {
    const {coleccion, id} = req.params;

    res.json({
        id: id,
        coleccion: coleccion,
    })
}

module.exports = {
    subirArchivos,
    actualizarArchivos
}