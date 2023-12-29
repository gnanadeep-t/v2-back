const User = require('./models/userModels')
const Papers = require('./models/papersModel')
const Test = require('./models/testModels')
const router = require('./authRoutes')
const express = require('express');
const passport = require('./passportConfig');
const session = require('express-session');

let getTests=async (req,res)=>{
    try{
        let data=await Test.find({})
        res.json(data)
    }
    catch(err){
        console.log(err)
    }
}

let getPapers=async (req,res)=>{
    try{
        let data=await Papers.find({})
        res.json(data)
    }
    catch(err){
        console.log(err)
    }
}



let checkAuthenticated = (req, res, next) => {
    console.log("checking login status")
    try{
        if (req.passport.isAuthenticated()) {
            console.log("logged in")
            next() 
            }
        else{
            console.log("not logged in")
            res.redirect("/")
        }
    }
    catch(err){
        console.log(err)
    }
}

module.exports={getTests,getPapers,checkAuthenticated}