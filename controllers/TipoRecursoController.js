const TipoRecurso = require('../models/TipoRecurso');

// Crear un nuevo TipoRecurso
exports.createTipoRecurso = async (req, res) => {
    try {
        const tipoRecurso = await TipoRecurso.create(req.body);
        res.status(201).json(tipoRecurso);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todos los TipoRecursos
exports.getAllTipoRecurso = async (req, res) => {
    try {
        const tipoRecursos = await TipoRecurso.findAll();
        res.status(200).json(tipoRecursos);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener un TipoRecurso por ID
exports.getTipoRecursoById = async (req, res) => {
    try {
        const tipoRecurso = await TipoRecurso.findByPk(req.params.id);
        if (tipoRecurso) {
            res.status(200).json(tipoRecurso);
        } else {
            res.status(404).json({ error: 'TipoRecurso no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Actualizar un TipoRecurso por ID
exports.updateTipoRecurso = async (req, res) => {
    try {
        const [updated] = await TipoRecurso.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedTipoRecurso = await TipoRecurso.findByPk(req.params.id);
            res.status(200).json(updatedTipoRecurso);
        } else {
            res.status(404).json({ error: 'TipoRecurso no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar un TipoRecurso por ID
exports.deleteTipoRecurso = async (req, res) => {
    try {
        const deleted = await TipoRecurso.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'TipoRecurso no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};