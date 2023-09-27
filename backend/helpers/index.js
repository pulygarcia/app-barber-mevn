import mongoose from "mongoose";

function validateId(id, res){
    if(!mongoose.Types.ObjectId.isValid(id)){
        const error = new Error('ID no válido');

        return res.status(400).json({
            msg : error.message
        })
    }
}

function serviceNotFound(service, res){
    if(!service){
        const error = new Error('Servicio no encontrado');

        return res.status(404).json({
            msg : error.message
        })
    }
}

export{
    validateId,
    serviceNotFound
}