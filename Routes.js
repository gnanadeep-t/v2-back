const express=require('express')
const { getTests, getPapers, checkAuthenticated } = require('./Controllers')



const route=express.Router()

route.get("/tests",getTests)

route.get("/papers",checkAuthenticated,getPapers)

module.exports=route

