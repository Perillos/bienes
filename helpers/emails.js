import nodemailer from "nodemailer";


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

        <p> Tu cuenta ya está lista, sólo debes activarla en el siguiente enlace: <a href="${process.env.URL}:${process.env.PORT}/auth/confirm/${token}">ACTIVAR CUENTA</a>.</p>
        <p>Si no te registraste en Bienes Raices, puedes ignorar este mensaje.</p>
    `
  })
};

const emailForgotPass = async (data) => {
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
    subject: 'Recupera tu contraseña en Bienes Raices', // Asunto
    text: 'Recupera tu contraseña en Bienes Raices', // Resumen
    html: `
        <p>Hola ${nombre}, has solicitado recuperar tu cuenta en Bienes Raices. Desde este correo podras cambiar la contraseña para poder entrar en tu cuenta.</p>

        <p> Para reestablecer la cuenta sólo debes entrar al siguiente enlace y generar una nueva contraseña: <a href="${process.env.URL}:${process.env.PORT}/auth/forgotPass/${token}">RECUPERAR CONTRASEÑA</a>.</p>
        <p>Si no has solicitado recuperar tu contraseña en Bienes Raices, puedeque alguien esté intentando robarte la cuenta. ¡¡ALERTA, NO REENVIES ESTE CORREO A NADIE!!, si fuera necesario ponte en contacto con nosotros.</p>
    `
  })
};

export { 
  emailRegister,
  emailForgotPass
};
