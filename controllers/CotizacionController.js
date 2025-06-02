const Cotizacion = require('../models/Cotizacion');

// Crear una nueva Cotizacion
exports.createCotizacion = async (req, res) => {
    try {
        const cotizacion = await Cotizacion.create(req.body);
        res.status(201).json(cotizacion);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todas las Cotizacions
exports.getAllCotizacions = async (req, res) => {
    try {
        const cotizacions = await Cotizacion.findAll();
        res.status(200).json(cotizacions);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener una Cotizacion por ID
exports.getCotizacionById = async (req, res) => {
    try {
        const cotizacion = await Cotizacion.findByPk(req.params.id);
        if (cotizacion) {
            res.status(200).json(cotizacion);
        } else {
            res.status(404).json({ error: 'Cotizacion no encontrada' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Actualizar una Cotizacion por ID
exports.updateCotizacion = async (req, res) => {
    try {
        const [updated] = await Cotizacion.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedCotizacion = await Cotizacion.findByPk(req.params.id);
            res.status(200).json(updatedCotizacion);
        } else {
            res.status(404).json({ error: 'Cotizacion no encontrada' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar una Cotizacion por ID
exports.deleteCotizacion = async (req, res) => {
    try {
        const deleted = await Cotizacion.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Cotizacion no encontrada' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};