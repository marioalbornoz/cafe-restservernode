const { response } = require("express");
const { isValidObjectId } = require("mongoose");
const { Usuario } = require("../models");


const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
]
const buscarUsuario = async( termino = '', res = response) =>{

    const esMongoid = isValidObjectId(termino) // true or false
    if(esMongoid){
        const usuario = await Usuario.findById(termino)
        return res.json({
            results: (usuario) ? [usuario] : []
        })
    }

    const regex = new RegExp(termino, "i");

    const usuario = await Usuario.find({
        $or:[{nombre: regex}, {correo:regex}],
        $and: [{estado:true}]
    });
    return res.json({
        results: usuario
    })
}
const buscar = (req, res = response) => {
    const { coleccion, termino } = req.params;

    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg: `Las colecciones permitidas son ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuario(termino, res)
            break;
        case 'categorias':
            break;
        
        case 'productos':
            break;
    
        default:
            res.status(500).json({
                msg: 'Se le olvido hacer esta busqueda'
            })
    }
}

module.exports = {
    buscar
}