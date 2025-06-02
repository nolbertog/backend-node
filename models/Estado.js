const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Estado = sequelize.define('Estado', {
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

module.exports = Estado;