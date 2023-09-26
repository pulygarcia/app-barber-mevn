import {services} from '../data/beautyServices.js'

const createService = async (req, res) => {
    if(Object.values(req.body).includes('')){
        const error = new Error('No se permiten campos vacíos');

        return res.status(400).json({
            msg : error.message
        })
    }

    console.log('After da if');
}

const getServices = (req, res) => {
    res.send(services)
}

export {
    createService,
    getServices
}