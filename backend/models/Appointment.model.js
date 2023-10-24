import mongoose from "mongoose";

const appointmentSchema = mongoose.Schema({
    services: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Services'
        }
    ],
    date: {
        type: Date
    },
    time: {
        type: String
    },
    total: {
        type: Number
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
})


const Appointment = mongoose.Model('Appointment', appointmentSchema);

export default Appointment
