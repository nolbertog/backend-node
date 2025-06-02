const express = require('express');
const apu = express.Router();
const apuController = require('../controllers/ApuController');

apu.post('/apu', apuController.createApu);
apu.get('/apu', apuController.getAllApus);
apu.get('/apu/:id', apuController.getApuById);
apu.put('/apu/:id', apuController.updateApu);
apu.delete('/apu/:id', apuController.deleteApu);

module.exports = apu;