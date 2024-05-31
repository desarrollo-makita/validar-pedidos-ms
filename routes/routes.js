const express = require('express');
const router = express.Router();
const { validarPedidos } = require('../controllers/validarPedidosControllers');

router.post('/validar-pedidos', validarPedidos);

module.exports = router;
