const Apu = require('../models/Apu');

// Crear un nuevo Apu
exports.createApu = async (req, res) => {
    try {
        const apu = await Apu.create(req.body);
        res.status(201).json(apu);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todos los Apus
exports.getAllApus = async (req, res) => {
    try {
        const apus = await Apu.findAll();
        res.status(200).json(apus);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener un Apu por ID
exports.getApuById = async (req, res) => {
    try {
        const apu = await Apu.findByPk(req.params.id);
        if (apu) {
            res.status(200).json(apu);
        } else {
            res.status(404).json({ error: 'Apu no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Actualizar un Apu por ID
exports.updateApu = async (req, res) => {
    try {
        const [updated] = await Apu.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedApu = await Apu.findByPk(req.params.id);
            res.status(200).json(updatedApu);
        } else {
            res.status(404).json({ error: 'Apu no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar un Apu por ID
exports.deleteApu = async (req, res) => {
    try {
        const deleted = await Apu.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Apu no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};