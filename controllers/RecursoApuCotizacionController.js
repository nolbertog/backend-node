const RecursoApuCotizacion = require('../models/RecursoApuCotizacion');

// Crear un nuevo recurso APU cotización
exports.createRecursoApuCotizacion = async (req, res) => {
    try {
        const { id_cotizacion, id_apu, id_recurso, cantidad, precio_unitario } = req.body;
        
        // Calcular el subtotal
        const subtotal = cantidad * precio_unitario;
        
        const recursoApuCotizacion = await RecursoApuCotizacion.create({
            id_cotizacion,
            id_apu,
            id_recurso,
            cantidad,
            precio_unitario,
            subtotal
        });

        res.status(201).json(recursoApuCotizacion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener todos los recursos APU cotización
exports.getAllRecursoApuCotizacion = async (req, res) => {
    try {
        const recursos = await RecursoApuCotizacion.findAll();
        res.status(200).json(recursos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un recurso APU cotización por ID
exports.getRecursoApuCotizacionById = async (req, res) => {
    try {
        const recurso = await RecursoApuCotizacion.findByPk(req.params.id);
        if (recurso) {
            res.status(200).json(recurso);
        } else {
            res.status(404).json({ message: 'Recurso APU Cotización no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un recurso APU cotización
exports.updateRecursoApuCotizacion = async (req, res) => {
    try {
        const { cantidad, precio_unitario } = req.body;
        const subtotal = cantidad * precio_unitario;
        
        const recurso = await RecursoApuCotizacion.findByPk(req.params.id);
        if (recurso) {
            await recurso.update({
                ...req.body,
                subtotal
            });
            res.status(200).json(recurso);
        } else {
            res.status(404).json({ message: 'Recurso APU Cotización no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un recurso APU cotización
exports.deleteRecursoApuCotizacion = async (req, res) => {
    try {
        const recurso = await RecursoApuCotizacion.findByPk(req.params.id);
        if (recurso) {
            await recurso.destroy();
            res.status(200).json({ message: 'Recurso APU Cotización eliminado exitosamente' });
        } else {
            res.status(404).json({ message: 'Recurso APU Cotización no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar recursos por cotización
exports.deleteRecursosByCotizacion = async (req, res) => {
    try {
        await RecursoApuCotizacion.destroy({
            where: {
                id_cotizacion: req.params.id_cotizacion
            }
        });
        res.status(200).json({ message: 'Recursos eliminados exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
