const OrdenTrabajo = require('../models/OrdenTrabajo');

// Crear una nueva OrdenTrabajo
exports.createOrdenTrabajo = async (req, res) => {
    try {
        const ordenTrabajo = await OrdenTrabajo.create(req.body);
        res.status(201).json(ordenTrabajo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todas las OrdenTrabajos
exports.getAllOrdenTrabajos = async (req, res) => {
    try {
        const ordenTrabajos = await OrdenTrabajo.findAll();
        res.status(200).json(ordenTrabajos);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener una OrdenTrabajo por ID
exports.getOrdenTrabajoById = async (req, res) => {
    try {
        const ordenTrabajo = await OrdenTrabajo.findByPk(req.params.id);
        if (ordenTrabajo) {
            res.status(200).json(ordenTrabajo);
        } else {
            res.status(404).json({ error: 'OrdenTrabajo no encontrada' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Actualizar una OrdenTrabajo por ID
exports.updateOrdenTrabajo = async (req, res) => {
    try {
        const [updated] = await OrdenTrabajo.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedOrdenTrabajo = await OrdenTrabajo.findByPk(req.params.id);
            res.status(200).json(updatedOrdenTrabajo);
        } else {
            res.status(404).json({ error: 'OrdenTrabajo no encontrada' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar una OrdenTrabajo por ID
exports.deleteOrdenTrabajo = async (req, res) => {
    try {
        const deleted = await OrdenTrabajo.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'OrdenTrabajo no encontrada' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};