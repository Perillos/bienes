import nodemailer from "nodemailer";

// Conecxión a Mailtrap
const emailRegister = async (data) => {
    // Conecxión a Mailtrap
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  // Para no escribir datos.email
  const { email, nombre, token } = data

  // Enviar email
  await transport.sendMail({
    from: 'Bienes Raices', // Quien lo manda
    to: email,// A quien lo manda
    subject: 'Confirma tu Cuenta en Bienes Raices', // Asunto
    text: 'Confirma tu Cuenta en Bienes Raices', // Resumen
    html: `
        <p>Hola ${nombre}, agredecemos tu registro en Bienes Raices. Este correo es de confirmación.</p>

        <p> Tu cuenta ya está lista, sólo debes activarla en el siguiente enlace: <a href="${process.env.URL}:${process.env.PORT}/auth/confirm/${token}"> ACTIVAR CUENTA</a>.</p>
        <p>Si no te registraste en Bienes Raices, puedes ignorar este mensaje.</p>
    `
  })


};

export { emailRegister };
