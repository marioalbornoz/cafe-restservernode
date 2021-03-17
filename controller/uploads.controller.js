const { response } = require("express");
const { subirArchivo } = require("../helpers");



const subirArchivos = async(req, res = response) => {
  
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
      res.status(400).send('No files were uploaded.');
      return;
    }
    
    // Imagenes
    const nombre = await subirArchivo(req.files);

    res.json({
        nombre
    })
} 


module.exports = {
    subirArchivos
}