import User from '../models/User.model.js'

const register = async (req, res) => {
    if(Object.values(req.body).includes('')){
        const error = new Error('No se permiten campos vacíos');

        return res.status(400).json({
            msg : error.message
        })
    }

    try {
        const user = new User(req.body);

        await user.save() //save in DB

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