const cron = require('node-cron');
const sendEmail = require('../services/emailService');
const Cotizacion = require('../models/Cotizacion');
const { Op } = require('sequelize');

// Función para obtener las cotizaciones que están a 2 días de vencer
const getCotizacionesPorVencer = async () => {
    try {
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0); // Establecer hora a 00:00:00 para comparar solo la fecha

        const dosDiasDespues = new Date(hoy);
        dosDiasDespues.setDate(hoy.getDate() + 2);
        dosDiasDespues.setHours(23, 59, 59, 999); // Establecer hora al final del día

        // Buscar cotizaciones en el rango de hoy a dos días después
        const cotizacionesPorVencer = await Cotizacion.findAll({
            where: {
                FechaVencimiento: {
                    [Op.gte]: hoy, // Desde hoy a las 00:00:00
                    [Op.lte]: dosDiasDespues // Hasta dos días después a las 23:59:59
                }
            }
        });

        return cotizacionesPorVencer; // Devolver todas las cotizaciones que cumplen la condición
    } catch (error) {
        console.error('Error obteniendo las cotizaciones por vencer:', error);
        return null; // Si ocurre un error, devolver null
    }
};

// Tarea programada para ejecutar el cron job
cron.schedule('35 9 * * *', async () => {
    console.log('Iniciando tarea automática de comprobación de cotizaciones por vencer.');

    const cotizacionesPorVencer = await getCotizacionesPorVencer();

    if (cotizacionesPorVencer && cotizacionesPorVencer.length > 0) {
        console.log(`Se encontraron ${cotizacionesPorVencer.length} cotizaciones por vencer.`);
        
        try {
            const to = 'nolberto.en@gmail.com'; // Dirección de correo del destinatario
            const subject = '⚠️ Alerta: Cotizaciones próximas a vencer';
            const tableRows = cotizacionesPorVencer.map(cotizacion => `
                <tr>
                    <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${cotizacion.nombre}</td>
                    <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${new Date(cotizacion.FechaVencimiento).toLocaleDateString()}</td>
                    <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">$${cotizacion.valorConIva.toLocaleString('es-CL')}</td>
                </tr>
            `).join('');

            const html = `
                <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                    <h2 style="color: #d9534f;">⚠️ Alerta: Cotizaciones próximas a vencer</h2>
                    <p>Estimado usuario,</p>
                    <p>Se encontraron las siguientes cotizaciones que están próximas a vencer (en 2 días o menos):</p>
                    <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                        <thead>
                            <tr style="background-color: #f2f2f2;">
                                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Nombre</th>
                                <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Fecha de Vencimiento</th>
                                <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">Valor con IVA</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tableRows}
                        </tbody>
                    </table>
                    <p style="margin-top: 20px;">Por favor, tome las medidas necesarias para gestionar estas cotizaciones.</p>
                    <p style="margin-top: 20px; font-size: 12px; color: #999;">
                        Este mensaje es generado automáticamente. Por favor, no responda a este correo.
                    </p>
                </div>
            `;

            // Enviar correo al destinatario
            await sendEmail(to, subject, '', html);
            console.log('Correo de alerta de cotizaciones enviado correctamente.');
        } catch (error) {
            console.error('Error enviando correo de alerta de cotizaciones por vencer:', error);
        }
    } else {
        console.log('No se encontraron cotizaciones próximas a vencer.');

        // Enviar correo informando que no hay cotizaciones por vencer
        try {
            const to = 'nolberto.en@gmail.com'; // Dirección de correo del destinatario
            const subject = '✔️ Sin cotizaciones próximas a vencer';
            const html = `
                <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                    <h2 style="color: #5cb85c;">✔️ Sin cotizaciones próximas a vencer</h2>
                    <p>Estimado usuario,</p>
                    <p>No se encontraron cotizaciones próximas a vencer en este momento.</p>
                    <p style="margin-top: 20px; font-size: 12px; color: #999;">
                        Este mensaje es generado automáticamente. Por favor, no responda a este correo.
                    </p>
                </div>
            `;

            // Enviar correo al destinatario
            await sendEmail(to, subject, '', html);
            console.log('Correo de confirmación de no cotizaciones enviado correctamente.');
        } catch (error) {
            console.error('Error enviando correo de confirmación de no cotizaciones:', error);
        }
    }
});
