const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const TareasOrdenUnion = sequelize.define('TareaOT', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    idTareaOT: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'TareasOT',
            key: 'id'
        }
    },
    idOrdenTrabajo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'OrdenTrabajo',
            key: 'id'
        }
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

module.exports = TareasOrdenUnion;