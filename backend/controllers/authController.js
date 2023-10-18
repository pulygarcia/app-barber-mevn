import { sendVerificationEmail } from '../email/authEmailService.js';
import User from '../models/User.model.js'
import { generateJWT } from '../helpers/index.js';

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

        const {name, email, token} = result;
        sendVerificationEmail({
            name: name,
            email: email,
            token: token
        });

        //feedback
        res.json({
            msg: "El usuario fue creado correctamente"
        })

    } catch (error) {
        console.log(error);
    }
}

const verifyUser = async (req, res) => {
    console.log(req.params.token); //get token from url

    const user = await User.findOne({token: req.params.token});

    //If NO valid token
    if(!user){
        const error = new Error('Usuario no válido');

        return res.status(401).json({
            msg : error.message
        })
    }

    //valid token, confirm account
    try {
        user.verified = true;
        user.token = ''; //the unique token won't be available again. The token only has one use.
        await user.save();

        return res.json({
            msg : "Cuenta verificada correctamente"
        });

    } catch (error) {
        console.log(error);
    }
}

const login = async (req, res) => {
    //console.log(req.body);

    //Check if email exists in DB
    const user = await User.findOne({email: req.body.email});
    if(!user){
        const error = new Error('Email incorrecto');

        return res.status(401).json({
            msg : error.message
        })
    }

    //Check if is verified
    if(!user.verified){
        const error = new Error('Cuenta no verificada');

        return res.status(401).json({
            msg : error.message
        })
    }
    
    //Compare the password with the hashed one
    if(await user.checkPassword(req.body.password)){
        //Give JWT
        const jsonWebToken = generateJWT(user._id);

        //return JWT for save in LocalStorage
        res.json({
            jsonWebToken
        })
    }else{
        const error = new Error('Contraseña incorrecta');

        return res.status(401).json({
            msg : error.message
        })
    }
}

export{
    register,
    verifyUser,
    login
}