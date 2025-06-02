const sendEmail = require('../services/emailService');

const sendAlertEmail = async (req, res) => {
  const { to, subject, message, attachment } = req.body;

  try {
    await sendEmail(to, subject, message, attachment);
    res.status(200).json({ message: 'Correo enviado exitosamente.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al enviar el correo.', error });
  }
};

module.exports = { sendAlertEmail };