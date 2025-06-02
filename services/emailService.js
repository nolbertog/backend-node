require('dotenv').config();
const nodemailer = require('nodemailer');

// Crea el transporte SMTP con la configuración de tu hosting
const transporter = nodemailer.createTransport({
  host: 'mail.technical.cl',
  port: 465,
  secure: true, // true para puerto 465, false para otros puertos
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendEmail = async (to, subject, text, html) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER, // Dirección del remitente
      to, // Dirección del destinatario
      subject, // Asunto del correo
      text, // Texto plano opcional
      html, // Contenido HTML del correo
    };

    await transporter.sendMail(mailOptions);
    console.log(`Correo enviado a ${to}`);
  } catch (error) {
    console.error('Error enviando el correo:', error);
  }
};

module.exports = sendEmail;
