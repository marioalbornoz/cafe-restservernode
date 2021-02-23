const { request, response } = require('express');


const login = (req = request, res = response) => {

    const { correo, password } = req.body;
    res.json({
        msg:'Login ok',
        correo,
        password
    })
}

module.exports = {
    login
}