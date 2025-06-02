const TareaOT = require('../models/TareaOT');

// Crear una nueva TareaOT
exports.createTareaOT = async (req, res) => {
    try {
        const tareaOT = await TareaOT.create(req.body);
        res.status(201).json(tareaOT);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todas las TareaOTs
exports.getAllTareaOTs = async (req, res) => {
    try {
        const tareaOTs = await TareaOT.findAll();
        res.status(200).json(tareaOTs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener una TareaOT por ID
exports.getTareaOTById = async (req, res) => {
    try {
        const tareaOT = await TareaOT.findByPk(req.params.id);
        if (tareaOT) {
            res.status(200).json(tareaOT);
        } else {
            res.status(404).json({ error: 'TareaOT no encontrada' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Actualizar una TareaOT por ID
exports.updateTareaOT = async (req, res) => {
    try {
        const [updated] = await TareaOT.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedTareaOT = await TareaOT.findByPk(req.params.id);
            res.status(200).json(updatedTareaOT);
        } else {
            res.status(404).json({ error: 'TareaOT no encontrada' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar una TareaOT por ID
exports.deleteTareaOT = async (req, res) => {
    try {
        const deleted = await TareaOT.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'TareaOT no encontrada' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};