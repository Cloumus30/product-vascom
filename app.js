import express from 'express'
import routesProvider from './providers/routesProvider.js'

const app = express();
// Set View Engin
app.set('view engine', 'ejs');
app.set('views', './views');

// Set Static Folder in Public
app.use('/public',express.static('public'));
app.use('/flowbite', express.static('node_modules/flowbite/dist'))

app.use(routesProvider)

app.listen(3000, ()=>{
    console.log('Listening To Port 3000')
})