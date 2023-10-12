import { sendVerificationEmail } from '../email/authEmailService.js';
import User from '../models/User.model.js'

const register = async (req, res) => {
    //Valid the fields
    if(Object.values(req.body).includes('')){
        const error = new Error('No se permiten campos vacíos');

        return res.status(400).json({
            msg : error.message
        })
    }

    //Avoid duplicates
    const {email, password, name} = req.body;
    const userExists = await User.findOne({email: email}) //check in db
    if(userExists){
        const error = new Error('Usuario ya registrado');

        return res.status(400).json({
            msg : error.message
        })
    }

    //Validate password extention
    const MIN_PASSWORD_LENGTH = 8;
    if(password.trim().length < MIN_PASSWORD_LENGTH){
        const error = new Error('La contraseña debe tener 8 o más caractéres');

        return res.status(400).json({
            msg : error.message
        })
    }

    try {
        const user = new User(req.body);

        const result = await user.save() //save in DB

        sendVerificationEmail();

        //feedback
        res.json({
            msg: "El usuario fue creado correctamente"
        })

    } catch (error) {
        console.log(error);
    }
}

export{
    register
}