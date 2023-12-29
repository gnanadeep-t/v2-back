const express = require("express");
const mongoose = require("mongoose");
const User = require('./models/userModels');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const dotenv=require("dotenv")
const authRoute=require("./authRoutes")
const routes=require('./Routes')



dotenv.config();
const app = express();
app.use(cors({
  origin:"http://localhost:3000",
  methods:"GET,POST,PUT,DELETE",
  credentials:true,
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}))


mongoose.connect("mongodb://127.0.0.1:27017/prelims",{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

app.use(
    session({
      secret: 'VHGdsg&jjg$cfgfDio#@zax10/khV-0JJjNsa*0M', 
      resave: false,
      saveUninitialized: true,
    })
);
  
app.use(passport.initialize()) // init passport on every route call
app.use(passport.session())    //allow passport to use "express-session" 
app.use('/', authRoute);
app.use('/',routes)


checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) { return next() }
        res.redirect("/login")
}

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});  