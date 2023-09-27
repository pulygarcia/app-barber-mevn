import {services} from '../data/beautyServices.js'
import Services from '../models/Services.model.js'

const createService = async (req, res) => {
    if(Object.values(req.body).includes('')){
        const error = new Error('No se permiten campos vacíos');

        return res.status(400).json({
            msg : error.message
        })
    }

    try {
        const service = new Services(req.body);
        await service.save(); //Save service in the DB with ( .save() )
        
        res.json({
            msg: 'El servicio fué agregado'
        });

    } catch (error) {
        console.log(error);
    }
}


const getServices = (req, res) => {
    res.send(services)
}

export {
    createService,
    getServices
}