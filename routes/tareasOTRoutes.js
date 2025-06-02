const express = require('express');
const router = express.Router();
const tareaOTController = require('../controllers/TareaOTController');

router.post('/tareaOT', tareaOTController.createTareaOT);
router.get('/tareaOT', tareaOTController.getAllTareaOTs);
router.get('/tareaOT/:id', tareaOTController.getTareaOTById);
router.put('/tareaOT/:id', tareaOTController.updateTareaOT);
router.delete('/tareaOT/:id', tareaOTController.deleteTareaOT);

module.exports = router;