const Recurso = require('../models/Recurso');

// Crear un nuevo Recurso
exports.createRecurso = async (req, res) => {
    try {
        const recurso = await Recurso.create(req.body);
        res.status(201).json(recurso);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todos los Recursos
exports.getAllRecursos = async (req, res) => {
    try {
        const recursos = await Recurso.findAll();
        res.status(200).json(recursos);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener un Recurso por ID
exports.getRecursoById = async (req, res) => {
    try {
        const recurso = await Recurso.findByPk(req.params.id);
        if (recurso) {
            res.status(200).json(recurso);
        } else {
            res.status(404).json({ error: 'Recurso no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Actualizar un Recurso por ID
exports.updateRecurso = async (req, res) => {
    try {
        const [updated] = await Recurso.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedRecurso = await Recurso.findByPk(req.params.id);
            res.status(200).json(updatedRecurso);
        } else {
            res.status(404).json({ error: 'Recurso no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar un Recurso por ID
exports.deleteRecurso = async (req, res) => {
    try {
        const deleted = await Recurso.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Recurso no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};