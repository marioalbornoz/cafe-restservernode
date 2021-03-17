const path = require('path');
const { v4: uuidv4} = require('uuid');

const subirArchivo = ( files, extensionesvalidas = ["png", "jpeg", "jpg", "gif"], carpeta='' ) => {
  return new Promise((resolve, reject) => {

    const { archivo } = files;
    // valdiar la extension del archivo
    const nombreCortado = archivo.name.split(".");
    const extension = nombreCortado[nombreCortado.length - 1];

    // validar que extension de file este dentro de las enviadas
    if (!extensionesvalidas.includes(extension)) {
      return reject(
        `La ${extension} no es permitida, debe ser ${extensionesvalidas}`
      );
    }

    // nombre del archivo al subirse
    const nombreTemp = `${uuidv4()}.${extension}`;

    const uploadPath = path.join(
      __dirname,
      "../uploads/",
      carpeta,
      nombreTemp
    );

    archivo.mv(uploadPath, (err) => {
      if (err) {
        return reject(err);
      }

      resolve(nombreTemp);
    });
  });
};

module.exports = {
    subirArchivo
}