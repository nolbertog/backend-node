const ApuRecurso = require('../models/ApuRecurso');

// Crear un nuevo ApuRecurso
exports.createApuRecurso = async (req, res) => {
    try {
        const apuRecurso = await ApuRecurso.create(req.body);
        res.status(201).json(apuRecurso);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todos los ApuRecursos
exports.getAllApuRecursos = async (req, res) => {
    try {
        const apuRecursos = await ApuRecurso.findAll();
        res.status(200).json(apuRecursos);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener un ApuRecurso por ID
exports.getApuRecursoById = async (req, res) => {
    try {
        const apuRecurso = await ApuRecurso.findByPk(req.params.id);
        if (apuRecurso) {
            res.status(200).json(apuRecurso);
        } else {
            res.status(404).json({ error: 'ApuRecurso no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Actualizar un ApuRecurso por ID
exports.updateApuRecurso = async (req, res) => {
    try {
        const [updated] = await ApuRecurso.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedApuRecurso = await ApuRecurso.findByPk(req.params.id);
            res.status(200).json(updatedApuRecurso);
        } else {
            res.status(404).json({ error: 'ApuRecurso no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar un ApuRecurso por ID
exports.deleteApuRecurso = async (req, res) => {
    try {
        const deleted = await ApuRecurso.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'ApuRecurso no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};