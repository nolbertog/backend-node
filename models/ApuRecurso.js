const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ApuRecurso = sequelize.define('ApuRecurso', {
id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
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
precio: {
    type: DataTypes.INTEGER,
    allowNull: false
},
idUnidadMedida: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
    model: 'UnidadMedida',
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

module.exports = ApuRecurso;