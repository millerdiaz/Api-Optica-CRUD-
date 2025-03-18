const nodemailer = require('nodemailer');

// Configura el transporter (puedes usar Gmail, SendGrid, etc.)
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Puedes usar otro servicio como SendGrid
  auth: {
    user: 'millerpena11@gmail.com', // Tu correo electrónico
    pass: 'fant jyfj glji xkwm', // Tu contraseña (o una contraseña de aplicación si usas Gmail)
  },
});


// Función para enviar el correo de confirmación
const enviarCorreoConfirmacion = (destinatario, cita) => {
  const mailOptions = {
    from: 'millerpena11@gmail.com', // Correo del remitente
    to: destinatario, // Correo del destinatario
    subject: 'Confirmación de cita', // Asunto del correo
    html: `
      <h1>Confirmación de cita</h1>
      <p>Gracias por agendar tu cita. Aquí están los detalles:</p>
      <ul>
        <li><strong>Nombres:</strong> ${cita.nombres}</li>
        <li><strong>Contacto:</strong> ${cita.contacto}</li>
        <li><strong>Sede:</strong> ${cita.sede}</li>
        <li><strong>Fecha:</strong> ${cita.fecha}</li>
        <li><strong>Horario:</strong> ${cita.horario}</li>
        <li><strong>Motivo de consulta:</strong> ${cita.motivoConsulta}</li>
      </ul>
      <p>¡Esperamos verte pronto!</p>
    `, // Cuerpo del correo en HTML
  };

  // Enviar el correo
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error enviando el correo:', error);
    } else {
      console.log('Correo enviado:', info.response);
    }
  });
};

module.exports = enviarCorreoConfirmacion;