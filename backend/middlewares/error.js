const ErrorHandler = require('../utils/ErrorHandler.js')


module.exports = (err,req,res,next)=>{
    err.statusCode =  err.statusCode || 500;
    err.message = err.message || "Internal Server Error"


    // wrong MongoDb id error
    if(err.name === 'CastError'){
        const message = `Resource not found Invalid :${err.path}`
        err = new ErrorHandler(message,400)
    }

    // mongoose duplicate key error
    if(err.code === 11000){
        const message =`Duplicate ${Object.keys(err.keyValue)} entered`
        err =new ErrorHandler(message,400)
    }

    // Wrong JSON error
    if(err.name === 'JsonWebTokenError'){
        const message = `JSON web Token is invalid,Try Again`
        err = new ErrorHandler(message,400)
    }

    // JWT Expire error
    if(err.name === 'TokenExpiredError'){
        const message = `JSON web Token is expired,Try Again`
        err = new ErrorHandler(message,400)
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message,
    })
}