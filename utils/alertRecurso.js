const cron = require('node-cron');
const sendEmail = require('../services/emailService'); // Servicio para enviar correos
const Recurso = require('../models/Recurso'); // Modelo de la base de datos para recursos
const { Op } = require('sequelize');

// Función para obtener los recursos con cantidad <= 2
const getRecursosCriticos = async () => {
    try {
        // Consulta a la base de datos para obtener recursos críticos
        const recursosCriticos = await Recurso.findAll({
            where: {
                cantidad: {
                    [Op.lte]: 2 // Menor o igual a 2
                }
            }
        });

        return recursosCriticos; // Devuelve los recursos críticos
    } catch (error) {
        console.error('Error obteniendo recursos críticos:', error);
        return null; // Devuelve null en caso de error
    }
};

// Tarea programada: se ejecuta una vez al día a las 9:24 AM
cron.schedule('19 11 * * *', async () => {
    console.log('Iniciando tarea diaria para verificar recursos críticos.');

    // Obtener recursos críticos
    const recursosCriticos = await getRecursosCriticos();

    if (recursosCriticos && recursosCriticos.length > 0) {
        console.log(`Se encontraron ${recursosCriticos.length} recursos críticos.`);
        
        try {
            const to = 'nolberto.en@gmail.com'; // Dirección de correo
            const subject = '⚠️ Alerta: Recursos críticos en el inventario'; // Asunto del correo
            const tableRows = recursosCriticos.map(recurso => `
                <tr>
                    <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${recurso.nombre}</td>
                    <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${recurso.cantidad}</td>
                </tr>
            `).join('');

            const html = `
                <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                    <h2 style="color: #d9534f;">⚠️ Alerta: Recursos críticos en el inventario</h2>
                    <p>Estimado usuario,</p>
                    <p>Se encontraron los siguientes recursos con una cantidad crítica (2 o menos):</p>
                    <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                        <thead>
                            <tr style="background-color: #f2f2f2;">
                                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Recurso</th>
                                <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tableRows}
                        </tbody>
                    </table>
                    <p style="margin-top: 20px;">Por favor, tome las medidas necesarias para reabastecer estos recursos.</p>
                    <p style="margin-top: 20px; font-size: 12px; color: #999;">
                        Este mensaje es generado automáticamente. Por favor, no responda a este correo.
                    </p>
                </div>
            `;

            // Enviar correo
            await sendEmail(to, subject, '', html);
            console.log('Correo de alerta enviado correctamente.');
        } catch (error) {
            console.error('Error enviando correo de alerta de recursos críticos:', error);
        }
    } else {
        console.log('No se encontraron recursos críticos.');
    }
});
