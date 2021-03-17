const path = require('path');
const { response } = require("express");
const { v4: uuidv4} = require('uuid')


const subirArchivos = (req, res = response) => {
  
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
      res.status(400).send('No files were uploaded.');
      return;
    }
  
    const { archivo } = req.files;
    // valdiar la extension del archivo
    const nombreCortado = archivo.name.split(".");
    const extension = nombreCortado[nombreCortado.length -1 ];

    // extensiones validadas
    const extensionesvalidas = ['png','jpeg', 'jpg', 'gif'];
    if(!extensionesvalidas.includes(extension)){
        return res.status(400).json({
            msg: `La ${extension} no es permitida, debe ser ${extensionesvalidas}`
        })
    }

    // nombre del archivo al subirse
    const nombreTemp = `${uuidv4()}.${extension}`;

    const uploadPath = path.join(__dirname, "../uploads/", nombreTemp);
  
     archivo.mv(uploadPath, (err) => {
      if (err) {
         return res.status(500).send(err);
       }
  
      res.send("File uploaded to " + uploadPath);
     });
} 


module.exports = {
    subirArchivos
}