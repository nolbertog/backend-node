const cron = require('node-cron');
const sendEmail = require('../services/emailService');
const Cotizacion = require('../models/Cotizacion');
const  Cliente  = require('../models/Cliente');
const { Op } = require('sequelize');

// Función para obtener cotizaciones con fechas específicas próximas a vencer
const getCotizacionesPorVencer = async (dias) => {
    try {
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0); // Establecer hora a 00:00:00 para comparar solo la fecha

        const fechaInicio = new Date(hoy);
        fechaInicio.setDate(hoy.getDate() + dias); // Fecha de inicio del rango
        fechaInicio.setHours(0, 0, 0, 0); // Asegurar comparación de solo la fecha

        const fechaFin = new Date(hoy);
        fechaFin.setDate(hoy.getDate() + dias); // Fecha final del rango
        fechaFin.setHours(23, 59, 59, 999); // Incluir todo el día

        // Buscar cotizaciones donde FechaVencimiento esté dentro del rango del día objetivo
        const cotizacionesPorVencer = await Cotizacion.findAll({
            where: {
                FechaVencimiento: {
                    [Op.between]: [fechaInicio, fechaFin], // Rango de fecha
                }
            },

        });

        return cotizacionesPorVencer; // Devolver todas las cotizaciones que cumplen la condición
    } catch (error) {
        console.error(`Error obteniendo las cotizaciones por vencer en ${dias} días:`, error);
        return null; // Si ocurre un error, devolver null
    }
};

// Tarea programada para enviar alertas todos los días a las 8:30 AM
cron.schedule('53 14 * * *', async () => {
    console.log('Iniciando tarea automática de alertas de cotizaciones próximas a vencer.');

    // Alertas para 3 días, 2 días y 1 día antes del vencimiento
    const diasAviso = [3, 2, 1];
    for (const dias of diasAviso) {
        const cotizacionesPorVencer = await getCotizacionesPorVencer(dias);

        if (cotizacionesPorVencer && cotizacionesPorVencer.length > 0) {
            console.log(`Se encontraron ${cotizacionesPorVencer.length} cotizaciones próximas a vencer en ${dias} día(s).`);
            
            try {
                const to = 'nolberto.en@gmail.com'; // Dirección de correo del destinatario
                const subject = `⚠️ Alerta: Cotizaciones próximas a vencer en ${dias} día(s)`;
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
                        <p>Se encontraron las siguientes cotizaciones que están próximas a vencer en ${dias} día(s):</p>
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
                console.log(`Correo de alerta de cotizaciones próximas a vencer en ${dias} día(s) enviado correctamente.`);
            } catch (error) {
                console.error(`Error enviando correo de alerta de cotizaciones por vencer en ${dias} días:`, error);
            }
        } else {
            console.log(`No se encontraron cotizaciones próximas a vencer en ${dias} día(s).`);
        }
    }
});
