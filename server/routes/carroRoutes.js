const express = require('express');
const router = express.Router();
const carroController = require('../controllers/carroController');

router.post('/carro', carroController.createCarro);
router.get('/carro', carroController.getCarros);
router.get('/carro/:id', carroController.getCarroById);
router.get('/carro/vaga/:idVaga', carroController.getCarrosByVaga);
router.put('/carro', carroController.updateCarro);
router.put('/carro/retirar/:id', carroController.retirarCarro);
router.delete('/carro/:id', carroController.deleteCarro);

module.exports = router;