import mongoose from 'mongoose';
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


const getAllServices = (req, res) => {
    res.send(services)
}

const getServiceById = async (req, res) => {
    //Check type ObjectId
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        const error = new Error('ID no válido');

        return res.status(400).json({
            msg : error.message
        })
    }

    //Check if exist
    const service = await Services.findById(id);
    if(!service){
        const error = new Error('Servicio no encontrado');

        return res.status(404).json({
            msg : error.message
        })
    }

    //If exist, show it
    res.json(service);
}


export {
    createService,
    getAllServices,
    getServiceById
}