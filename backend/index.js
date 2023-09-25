const express =  require('express');

//Set up the app
const app = express();


//define route
app.get('/', (req, res) => {
    res.send('Response')
})


//define port
const PORT = process.env.PORT || 4000;

//start app
app.listen(PORT, () => {
    console.log('Starting app in port ' + PORT);
})