const { response } = require("express");
const { Categoria } = require("../models");



// ObtenerCategorias - paginado - total - populate

const ObtenerCategorias = async(req, res = response) => {
     // se recomienda desectructurar queryparams
     const {
        limite = 5, desde = 0
    } = req.query;

    const query = { estado: true}

    // Promesa que se ejecuta en un tiempo t, tener mas de una promesa provoca que t aumente
    /*const categorias = await Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite));
    
    const total = await Categorias.countDocuments(query); */

    // usar una coleccion de promesas permite que se ejecuten en simultaneo, si una arroja error, todas lo haran
    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('usuario', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ])
    res.json({
        total,
        categorias
    });
}


// obtenerCategoria 

// CrearCategoria 

const CrearCategoria = async(req, res = response) => {
    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre});

    if( categoriaDB ){
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre} ya existe.`
        })
    }

    // Geenrar la data a guardar

    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data)

    await categoria.save();

    res.status(201).json(categoria);

}


module.exports = {
    CrearCategoria,
    ObtenerCategorias
}


