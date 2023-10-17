import {createTransport} from '../config/nodemailer.js'

export async function sendVerificationEmail({name, email, token}){
    //Create transporter
    const transporter = createTransport(process.env.MAILTRAP_HOST, process.env.MAILTRAP_PORT, process.env.MAILTRAP_USER, process.env.MAILTRAP_PASS);

    //Send email
    await transporter.sendMail({
        from: "infinity@gmail.com",
        to: email,
        subject: "Autenticacion",
        text: "App infinity, confirmá tu cuenta",
        html: `<p>Tu cuenta está casi lista ${name}.</p>
            <p>Por favor confirmá tu cuenta para validar que sos vos</p>
            <p>Si no creaste esta cuenta, ignora este e-mail</p>
            <a href="${process.env.FRONTEND_URL}/auth/verificacion/${token}">Confirmar cuenta</a>
        `
    });
}