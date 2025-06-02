const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const RecursoApuCotizacion = sequelize.define('RecursoApuCotizacion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_cotizacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Cotizacions',
            key: 'id'
        }
    },
    id_apu: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Apus',
            key: 'id'
        }
    },
    id_recurso: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Recursos',
            key: 'id'
        }
    },
    cantidad: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        defaultValue: 0
    },
    precio_unitario: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        defaultValue: 0
    },
    subtotal: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        defaultValue: 0
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
});

module.exports = RecursoApuCotizacion;
