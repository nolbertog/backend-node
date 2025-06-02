const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TareaOT = sequelize.define('TareaOT', {
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
fechaInicio: {
    type: DataTypes.DATE,
    allowNull: false
},
fechaFin: {
    type: DataTypes.DATE,
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

module.exports = TareaOT;