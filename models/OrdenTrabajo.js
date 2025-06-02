const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OrdenTrabajo = sequelize.define('OrdenTrabajo', {
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
idUsuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
    model: 'Users',
    key: 'id'
    }
},
idCliente: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
    model: 'Clientes',
    key: 'id'
    }
},
idEstado: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
    model: 'Estados',
    key: 'id'
    }
},
fechaInicio: {
    type: DataTypes.DATE,
    allowNull: false
},
fechaTermino: {
    type: DataTypes.DATE,
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

module.exports = OrdenTrabajo;