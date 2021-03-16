const { response } = require("express");
const { Producto } = require("../models");



// ObtenerCategorias - paginado - total - populate

const obtenerProductos = async(req, res = response) => {
     // se recomienda desectructurar queryparams
     const {
        limite = 5, desde = 0
    } = req.query;

    const query = { estado: true}

    // usar una coleccion de promesas permite que se ejecuten en simultaneo, si una arroja error, todas lo haran
    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ])
    res.json({
        total,
        productos
    });
}


// obtener producto
const obtenerProducto = async(req, res = response) => {
    const {id} = req.params;
    const producto = await Producto.findById(id)
      .populate("usuario", "nombre")
      .populate("categoria", "nombre");

    res.json(producto)
}


// Crear productos 

const crearProducto = async(req, res = response) => {
    const { estado, usuario, ...body} = req.body;
    const nombre = req.body.nombre.toUpperCase();
    const productoDB = await Producto.findOne({nombre});

    if( productoDB ){
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre} ya existe.`
        })
    }

    // Geenrar la data a guardar

    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const producto = new Producto(data)

    await producto.save();

    res.status(201).json(producto);

}

// actualizar producto
const actualizarProducto = async(req, res = response) => {
    const {id} = req.params;

    // no se puede actualziar usuario y estado desde el cliente
    const {estado, usuario, ...data} = req.body;

    if(data.nombre){
      data.nombre = data.nombre.toUpperCase();
    }
    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, {
      new: true,
    });

    res.json(producto)
}

// Delete producto
const borrarProducto = async(req, res = response) => {
    const { id } = req.params;
    const productoEliminada = await Producto.findByIdAndUpdate(
      id,
      { estado: false },
      { new: true }
    );
    res.json(productoEliminada)
}

module.exports = {
    crearProducto,
    obtenerProducto,
    obtenerProductos,
    actualizarProducto,
    borrarProducto
}


