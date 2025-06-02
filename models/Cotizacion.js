const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cotizacion = sequelize.define('Cotizacion', {
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
idCliente: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
    model: 'Clientes',
    key: 'id'
    }
},
idUsuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
    model: 'Users',
    key: 'id'
    }
},
fechaActual: {
    type: DataTypes.DATE,
    allowNull: false
},
FechaVencimiento: {
    type: DataTypes.DATE,
    allowNull: false
},
idEstado: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
    model: 'Estados',
    key: 'id'
    }
},
valorSinIva: {
    type: DataTypes.INTEGER,
    allowNull: false
},
valorConIva: {
    type: DataTypes.INTEGER,
    allowNull: false
},
diasCotizacion: {
    type: DataTypes.INTEGER,
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

module.exports = Cotizacion;