import express from 'express';

//Set up the app
const app = express();


//define route
app.get('/', (req, res) => {
    const products = [
        {
            id: 1,
            name: 'Producto 1',
            price: 1212 
        },
        {
            id: 2,
            name: 'Producto 2',
            price: 1212323 
        }
    ]

    res.send(products)
})


//define port
const PORT = process.env.PORT || 4000;

//start app
app.listen(PORT, () => {
    console.log('Starting app in port ' + PORT);
})