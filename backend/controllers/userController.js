import Appointment from "../models/Appointment.model.js"

const getUserAppointments = async (req, res) => {
    //console.log(req.params.user); //url user
    //console.log(req.user._id) //auth user using app

    if(req.params.user !== req.user._id.toString()){ //if you're asking for user that you aren't...
        const error = new Error('Acceso denegado');
        res.status(400).json({
            msg: error.message
        })
    }

    try {
        //Get all the appointments depending if is admin or no
        const query = req.user.admin ?  {date:{$gte: new Date()}} :  {user:req.params.user, date:{$gte: new Date()}}  // only give me appointments that are >= than today          

        const appointments = await Appointment.find(query).populate('services').sort({date: 'asc'}) //we are getting only the ID from services, .populate, give us all the info of the services

        res.json(appointments)
    } catch (error) {
        console.log(error);
    }
}

export{
    getUserAppointments
}