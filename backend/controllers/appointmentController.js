import Appointment from '../models/Appointment.model.js'

const createAppointment = async (req, res) => {
    const appointment = req.body;
    appointment.user = req.user._id.toString();   //user is returned from middleware in the req, so you can get it by there
    console.log(appointment);

    try {
        const newAppointment = new Appointment(appointment);
        newAppointment.save();

        res.json({
            msg: 'Tu turno fué guardado'
        })

    } catch (error) {
        console.log(error);
    }
}

export{
    createAppointment
}