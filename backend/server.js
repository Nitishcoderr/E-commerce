const app = require("./app");

const dotenv = require('dotenv')

const connectDatabase = require('./config/database.js')

// Config
dotenv.config({path:'backend/config/config.env'});

// connecting to database

connectDatabase()

app.listen(process.env.PORT,()=>{
    console.log(`Server running on http://localhost:${process.env.PORT}`);
})