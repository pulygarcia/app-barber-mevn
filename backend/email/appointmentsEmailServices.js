import {createTransport} from '../config/nodemailer.js'

export async function sendNewAppointmentEmail({date, selectedHour}){
    //Create transporter
    const transporter = createTransport(process.env.MAILTRAP_HOST, process.env.MAILTRAP_PORT, process.env.MAILTRAP_USER, process.env.MAILTRAP_PASS);

    //Send email
    await transporter.sendMail({
        from: "infinity@gmail.com",
        to: 'admin@appsalon.com',
        subject: "APP INFINITY",
        text: "Nuevo turno",
        html: `<p>Han reservado un turno</p>
            <p>Día del turno : ${date}</p>
            <p>Horario reservado : ${selectedHour}</p>
        `
    });
}