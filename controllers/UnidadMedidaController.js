const UnidadMedida = require('../models/UnidadMedida');

// Crear una nueva UnidadMedida
exports.createUnidadMedida = async (req, res) => {
    try {
        const unidadMedida = await UnidadMedida.create(req.body);
        res.status(201).json(unidadMedida);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todas las UnidadMedidas
exports.getAllUnidadMedidas = async (req, res) => {
    try {
        const unidadMedidas = await UnidadMedida.findAll();
        res.status(200).json(unidadMedidas);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener una UnidadMedida por ID
exports.getUnidadMedidaById = async (req, res) => {
    try {
        const unidadMedida = await UnidadMedida.findByPk(req.params.id);
        if (unidadMedida) {
            res.status(200).json(unidadMedida);
        } else {
            res.status(404).json({ error: 'UnidadMedida no encontrada' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Actualizar una UnidadMedida por ID
exports.updateUnidadMedida = async (req, res) => {
    try {
        const [updated] = await UnidadMedida.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedUnidadMedida = await UnidadMedida.findByPk(req.params.id);
            res.status(200).json(updatedUnidadMedida);
        } else {
            res.status(404).json({ error: 'UnidadMedida no encontrada' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar una UnidadMedida por ID
exports.deleteUnidadMedida = async (req, res) => {
    try {
        const deleted = await UnidadMedida.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'UnidadMedida no encontrada' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};