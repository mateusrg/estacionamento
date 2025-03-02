const express = require('express');
const router = express.Router();
const vagaController = require('../controllers/vagaController');

router.post('/vaga', vagaController.createVaga);
router.get('/vaga', vagaController.getVagas);
router.put('/vaga', vagaController.updateVaga);
router.delete('/vaga/:id', vagaController.deleteVaga);

module.exports = router;