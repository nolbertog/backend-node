const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Recurso = sequelize.define('Recurso', {
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
cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
},
estado: {
    type: DataTypes.BOOLEAN,
    allowNull: false
},
idUnidadMedida: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
    model: 'UnidadMedidas',
    key: 'id'
    }
},
precioPeso: {
    type: DataTypes.INTEGER,
    allowNull: false
},
fechaPrecio: {
    type: DataTypes.DATE,
    allowNull: false
},
idTipoRecurso: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
    model: 'TipoRecursos',
    key: 'id'
    }
},
urlImagen: {
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

module.exports = Recurso;