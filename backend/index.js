import express from 'express';
import servicesRoutes from './routes/servicesRoutes.js';

//Set up the app
const app = express();


//define route
app.use('/api/services', servicesRoutes)


//define port
const PORT = process.env.PORT || 4000;

//start app
app.listen(PORT, () => {
    console.log('Starting app in port ' + PORT);
})