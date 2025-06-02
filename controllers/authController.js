const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

// Generar token
const generateToken = (user) => {
    return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '60m', // El token expira en 60 minutos
    });
};

// Login de usuario
const login = async (req, res) => {
    const { nombre, password } = req.body;

    try {
        // Validar campos
        if (!nombre || !password) {
            return res.status(400).json({ success: false, error: 'Nombre y contraseña son requeridos' });
        }

        // Buscar usuario
        const user = await User.findOne({ where: { nombre } });
        if (!user) {
            return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
        }

        // Verificar estado
        if (user.estado === 0) {
            return res.status(403).json({ success: false, error: 'Usuario deshabilitado' });
        }

        // Verificar contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, error: 'Credenciales inválidas' });
        }

        // Generar token
        const token = generateToken(user);

        res.json({
            success: true,
            token,
            id: user.id,
            role: user.role,
            nombre: user.nombre,
        });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ success: false, error: 'Error interno del servidor' });
    }
};

// Registro de usuario
const register = async (req, res) => {
    const { nombre, apellido, descripcion, rut, email, fechaNacimiento, role, password } = req.body;

    try {
        // Validar campos
        if (!nombre || !password || !email) {
            return res.status(400).json({ success: false, error: 'Nombre, email y contraseña son requeridos' });
        }

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ where: { nombre } });
        if (existingUser) {
            return res.status(400).json({ success: false, error: 'El nombre de usuario ya está en uso' });
        }

        // Hashear contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            nombre,
            apellido,
            descripcion,
            rut,
            email,
            estado: 1, // Habilitado por defecto
            fechaNacimiento,
            role,
            password: hashedPassword,
        });

        res.status(201).json({
            success: true,
            user: { id: newUser.id, nombre: newUser.nombre, email: newUser.email, role: newUser.role },
        });
    } catch (error) {
        console.error('Error en register:', error);
        res.status(500).json({ success: false, error: 'Error al registrar el usuario' });
    }
};

// Actualización de contraseña
const updatePassword = async (req, res) => {
    const { nombre, password } = req.body;

    try {
        // Validar campos
        if (!nombre || !password) {
            return res.status(400).json({ success: false, error: 'Nombre y nueva contraseña son requeridos' });
        }

        // Hashear la nueva contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Actualizar la contraseña en la base de datos
        const [updated] = await User.update(
            { password: hashedPassword },
            { where: { nombre } }
        );

        if (!updated) {
            return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
        }

        res.json({ success: true, message: 'Contraseña actualizada correctamente' });
    } catch (error) {
        console.error('Error en updatePassword:', error);
        res.status(500).json({ success: false, error: 'Error al actualizar la contraseña' });
    }
};

module.exports = { login, register, updatePassword };
