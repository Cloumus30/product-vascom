import dotenv from 'dotenv'
import express from 'express'
import routesProvider from './providers/routesProvider.js'

dotenv.config()
const app = express();
const appPort = process.env.APP_PORT || 3000;
// Set View Engin
app.set('view engine', 'ejs');
app.set('views', './views');

// Set Static Folder in Public
app.use('/public',express.static('public'));
app.use('/flowbite', express.static('node_modules/flowbite/dist'))

app.use(routesProvider)

app.listen(appPort, ()=>{
    console.log(`Listening To http://localhost:${appPort}`)
})