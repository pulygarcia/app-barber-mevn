import Appointment from '../models/Appointment.model.js'
import {parse, formatISO, startOfDay, endOfDay, isValid} from 'date-fns';

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


const getAppointmentByDate = async (req, res) => {
    //console.log(req.query); => Getting string date, mongo needs ISO type, no string
    const { date } = req.query;

    const newDate = parse(date, 'dd/MM/yyyy', new Date());

    //Validate if the date was send in req is valid
    if(!isValid(newDate)){
        const error = new Error('La fecha que ingresaste no es válida');
        res.status(400).json({
            msg: error.message
        })
    }

    const isoDate = formatISO(newDate);

    //console.log(date);
    //console.log(isoDate);

    try {
        const data = await Appointment.find({date: {
            $gte: startOfDay(new Date(isoDate)), // => $gte is a query operator in noSQL databases that gets values that are >= than the parameter
            $lte: endOfDay(new Date(isoDate)) // => $lte its the same but it means <= parameter
        }}).select('selectedHour')

        res.json(
            data
        );

    } catch (error) {
        console.log(error);
    }
}

export{
    createAppointment,
    getAppointmentByDate
}