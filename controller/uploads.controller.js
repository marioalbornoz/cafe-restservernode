const { response } = require("express");



const subirArchivos = (req, res = response) => {
    console.log(req.files);
    res.json({
        msg: "Subiendo archivo"
    })
}


module.exports = {
    subirArchivos
}