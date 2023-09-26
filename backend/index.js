import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import { db } from './config/db.js';
import servicesRoutes from './routes/servicesRoutes.js';

//Habilitar variables de entorno
dotenv.config();

//Set up the app
const app = express();

//Read data via body
app.use(express.json());

//connect DB
db();

//define route
app.use('/api/services', servicesRoutes)


//define port
const PORT = process.env.PORT || 4000;

//start app
app.listen(PORT, () => {
    console.log(colors.blue('Starting app in port ' + PORT));
})