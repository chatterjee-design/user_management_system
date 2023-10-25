const express = require('express');
const mongoose = require('mongoose');
const db = process.env.MONGO_URI 

const connectToDB = async()=>{
    mongoose.connect(db).then(() =>{
        console.log(`Connected to db: `);
    }).catch((error)=>{
        console.log(error.message)
        process.exit(1);
    })
}

module.exports = {connectToDB}