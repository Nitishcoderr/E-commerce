const app = require("./app");

const dotenv = require('dotenv')
const connectDatabase = require('./config/database.js')

// Handling uncaught Exception ------------------------------------------------------
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to uncaught Exception');
    process.exit(1)
})

// Config -------------------------------------------------------
dotenv.config({path:'backend/config/config.env'});

// connecting to database -------------------------------------------------------

connectDatabase()

const server =  app.listen(process.env.PORT,()=>{
    console.log(`Server running on http://localhost:${process.env.PORT}`);
})

// ---------------------------------------------------------------------------------------
// Unhandled promise rejection ---> When mongoDb url error occured
process.on("unhandledRejection",(err)=>{
    console.log(`Error : ${err.message}`);
    console.log('Shutting down the server due to unhandled Promise Rejection');

    server.close(()=>{
        process.exit(1)
    })
})