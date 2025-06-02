const Estado = require('../models/Estado');

// Crear un nuevo Estado
exports.createEstado = async (req, res) => {
    try {
        const estado = await Estado.create(req.body);
        res.status(201).json(estado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todos los Estados
exports.getAllEstados = async (req, res) => {
    try {
        const estados = await Estado.findAll();
        res.status(200).json(estados);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener un Estado por ID
exports.getEstadoById = async (req, res) => {
    try {
        const estado = await Estado.findByPk(req.params.id);
        if (estado) {
            res.status(200).json(estado);
        } else {
            res.status(404).json({ error: 'Estado no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Actualizar un Estado por ID
exports.updateEstado = async (req, res) => {
    try {
        const [updated] = await Estado.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedEstado = await Estado.findByPk(req.params.id);
            res.status(200).json(updatedEstado);
        } else {
            res.status(404).json({ error: 'Estado no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar un Estado por ID
exports.deleteEstado = async (req, res) => {
    try {
        const deleted = await Estado.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Estado no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};