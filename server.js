// server.js

// set up ======================================================================
// get all the tools we need
import express from 'express';
const app      = express();
const port     = process.env.PORT || 8080;
import mongoose from 'mongoose';
import passport from 'passport';
import flash from 'connect-flash';

import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import { setupRoutes } from './app/routes.js';
import { configPassport } from './config/passport.js';

let db

// configuration ===============================================================
if (!process.env.DATABASE_URL) {
  throw "Please set DATABASE_URL in the environment."
}
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err, database) => {
  if (err) return console.log(err)
  db = database
  setupRoutes(app, passport, db);
}); // connect to our database

configPassport(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console (middleware)
app.use(cookieParser()); // read cookies (needed for auth)
app.use(express.json({ extended: true })); //get information from fetches
app.use(express.urlencoded({ extended: true })); // get information from html forms
app.use(express.static('public'))

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
    secret: process.env.SESSION_SECRET || 'rcbootcamp2019a', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// launch ======================================================================
app.listen(port);
console.log('Listening on ' + port);
