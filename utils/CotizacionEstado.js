const cron = require('node-cron');
const sendEmail = require('../services/emailService');
const Cotizacion = require('../models/Cotizacion');
const { Op } = require('sequelize');

// Función para actualizar las cotizaciones vencidas
const actualizarCotizacionesVencidas = async () => {
    try {
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0); // Setear la hora a 00:00:00 para comparar solo la fecha

        // Buscar cotizaciones que están en estado "En Espera" (idEstado 2) y cuya fecha de vencimiento es hoy o ya pasó
        const cotizacionesVencidas = await Cotizacion.findAll({
            where: {
                idEstado: 2, // Estado "En Espera"
                FechaVencimiento: {
                    [Op.lte]: hoy // Fecha de vencimiento menor o igual a hoy
                }
            }
        });

        // Si no hay cotizaciones vencidas, retornar vacío
        if (!cotizacionesVencidas || cotizacionesVencidas.length === 0) {
            return [];
        }

        // Actualizar el estado de las cotizaciones a "Vencida" (idEstado 3)
        await Promise.all(
            cotizacionesVencidas.map(cotizacion =>
                cotizacion.update({
                    idEstado: 3,
                    descripcion: 'Rechazada automáticamente por sistema, tras vencimiento de fecha'
                })
            )
        );

        return cotizacionesVencidas; // Devolver las cotizaciones que cambiaron de estado
    } catch (error) {
        console.error('Error actualizando cotizaciones vencidas:', error);
        return null;
    }
};

// Tarea programada para ejecutarse diariamente
cron.schedule('28 11 * * *', async () => {
    console.log('Iniciando tarea diaria para actualizar cotizaciones vencidas.');

    const cotizacionesActualizadas = await actualizarCotizacionesVencidas();

    if (cotizacionesActualizadas && cotizacionesActualizadas.length > 0) {
        console.log(`Se actualizaron ${cotizacionesActualizadas.length} cotizaciones a estado "Vencida".`);

        try {
            const to = 'nolberto.en@gmail.com';
            const subject = '⚠️ Notificación: Cotizaciones vencidas automáticamente';
            const tableRows = cotizacionesActualizadas.map(cotizacion => `
                <tr>
                    <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${cotizacion.nombre}</td>
                    <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${new Date(cotizacion.fechaActual).toLocaleDateString()}</td>
                    <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${new Date(cotizacion.FechaVencimiento).toLocaleDateString()}</td>
                    <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${cotizacion.descripcion}</td>
                </tr>
            `).join('');

            const html = `
                <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                    <h2 style="color: #d9534f;">⚠️ Notificación: Cotizaciones vencidas automáticamente</h2>
                    <p>Estimado administrador,</p>
                    <p>Se han actualizado automáticamente las siguientes cotizaciones a estado "Vencida" debido a que su fecha de vencimiento ha pasado sin ser aprobadas:</p>
                    <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                        <thead>
                            <tr style="background-color: #f2f2f2;">
                                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Nombre</th>
                                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Fecha de Creación</th>
                                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Fecha de Vencimiento</th>
                                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Motivo</th>
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

            // Enviar correo al administrador
            await sendEmail(to, subject, '', html);
            console.log('Correo de notificación de cotizaciones vencidas enviado correctamente.');
        } catch (error) {
            console.error('Error enviando correo de notificación de cotizaciones vencidas:', error);
        }
    } else {
        console.log('No se encontraron cotizaciones que deban cambiar de estado a "Vencida".');
    }
});
