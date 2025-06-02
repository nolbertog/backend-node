const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Apu = sequelize.define('Apu', {
id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
},
nombre: {
    type: DataTypes.STRING,
    allowNull: false
},
descripcion: {
    type: DataTypes.STRING,
    allowNull: true
},

idUnidadMedida: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'UnidadMedida',
        key: 'id'
    }
},
precio: {
    type: DataTypes.INTEGER,
    allowNull: false
},
estado: {
    type: DataTypes.BOOLEAN,
    allowNull: false
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

module.exports = Apu;