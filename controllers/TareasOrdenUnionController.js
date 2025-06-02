const TareasOrdenUnion = require('../models/TareasOrdenUnion');

// Crear una nueva TareasOrdenUnion
exports.createTareasOrdenUnion = async (req, res) => {
    try {
        const tareasOrdenUnion = await TareasOrdenUnion.create(req.body);
        res.status(201).json(tareasOrdenUnion);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todas las TareasOrdenUnions
exports.getAllTareasOrdenUnions = async (req, res) => {
    try {
        const tareasOrdenUnions = await TareasOrdenUnion.findAll();
        res.status(200).json(tareasOrdenUnions);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener una TareasOrdenUnion por ID
exports.getTareasOrdenUnionById = async (req, res) => {
    try {
        const tareasOrdenUnion = await TareasOrdenUnion.findByPk(req.params.id);
        if (tareasOrdenUnion) {
            res.status(200).json(tareasOrdenUnion);
        } else {
            res.status(404).json({ error: 'TareasOrdenUnion no encontrada' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Actualizar una TareasOrdenUnion por ID
exports.updateTareasOrdenUnion = async (req, res) => {
    try {
        const [updated] = await TareasOrdenUnion.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedTareasOrdenUnion = await TareasOrdenUnion.findByPk(req.params.id);
            res.status(200).json(updatedTareasOrdenUnion);
        } else {
            res.status(404).json({ error: 'TareasOrdenUnion no encontrada' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar una TareasOrdenUnion por ID
exports.deleteTareasOrdenUnion = async (req, res) => {
    try {
        const deleted = await TareasOrdenUnion.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'TareasOrdenUnion no encontrada' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};