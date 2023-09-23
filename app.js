const dotenv = require( 'dotenv')
const express = require( 'express')
const routesProvider = require( './providers/routesProvider.js')
const fs = require('fs')

global.__basedir = __dirname;
dotenv.config()
const app = express();
const appPort = process.env.APP_PORT || 3000;
// Set View Engin
app.set('view engine', 'ejs');
app.set('views', './views');

// Set Static Folder in Public
app.use('/public',express.static('public'));
app.use('/flowbite', express.static('node_modules/flowbite/dist'))

// Body Parser
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(routesProvider)

app.listen(appPort, ()=>{
    console.log(`Listening To http://localhost:${appPort}`)
})