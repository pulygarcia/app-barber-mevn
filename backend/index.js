import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import { db } from './config/db.js';
import cors from 'cors';
import servicesRoutes from './routes/servicesRoutes.js';

//Habilitar variables de entorno
dotenv.config();

//Set up the app
const app = express();

//Read data via body
app.use(express.json());

//connect DB
db();

//Config cors
const whiteList = ['http://localhost:5173'];

const corsOptions = {
    origin : function(origin, callback){
        if(whiteList.includes(origin)){
            //allow the connection
            callback(null, true);
        }else{
            //dont allow
        }
    }
}

app.use(cors(corsOptions))

//define route
app.use('/api/services', servicesRoutes)


//define port
const PORT = process.env.PORT || 4000;

//start app
app.listen(PORT, () => {
    console.log(colors.blue('Starting app in port ' + PORT));
})