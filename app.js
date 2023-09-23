const dotenv = require( 'dotenv')
const express = require( 'express')
const routesProvider = require( './providers/routesProvider.js')
const fs = require('fs');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash')

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

// Flash, Session, Cookie
// setup express-session
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 week
        // secure: true, // becareful set this option, check here: https://www.npmjs.com/package/express-session#cookiesecure. In local, if you set this to true, you won't receive flash as you are using `http` in local, but http is not secure
      },
    })
  );
// setup flash
app.use(flash());
app.use(cookieParser(process.env.SESSION_SECRET))

app.use(routesProvider)

app.listen(appPort, ()=>{
    console.log(`Listening To http://localhost:${appPort}`)
})