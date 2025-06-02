const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cliente = sequelize.define('Cliente', {
id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
},
nombre: {
    type: DataTypes.STRING,
    allowNull: false
},
apellido: {
    type: DataTypes.STRING,
    allowNull: false
},
rut: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
},
descripcion: {
    type: DataTypes.STRING,
    allowNull: true
},
telefono: {
    type: DataTypes.STRING,
    allowNull: false
},
correo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        isEmail: true
    }
},
estado: {
    type: DataTypes.BOOLEAN,
    allowNull: false
},
direccion: {
    type: DataTypes.STRING,
    allowNull: false
},
nombreEmpresa: {
    type: DataTypes.STRING,
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
Cliente.associate = (models) => {
    Cliente.hasMany(models.Cotizacion, {
        foreignKey: 'idCliente',
        as: 'Cotizaciones' // Alias para usar en las consultas
    });
};


module.exports = Cliente;