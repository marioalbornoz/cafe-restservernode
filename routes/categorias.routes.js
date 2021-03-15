const {Router} = require('express');
const { check } = require('express-validator');

// middlewares
const {
    validarCampos,
    validarJWT,
    tieneRole,
  } = require('../middlewares');
  
  const router = Router();

// {{url}}/api/categoria
router.get('/', (req, res) => {
    res.json({msg: 'GET'});
})

router.get('/:id', (req, res) => {
  res.json({
    msg: 'GET - ID'
  })
})

router.post('/', (req, res) => {
  res.json({
    msg: 'POST'
  })
})

router.put('/:id', (req, res) => {
  res.json({
    msg: 'PUT'
  })
})
router.delete('/:id', (req, res) => {
  res.json({
    msg: 'Delete - ID'
  })
})

module.exports = router;