const ErrorHandler = require('../utils/ErrorHandler.js')
const catchAsyncError = require('../middlewares/catchAsyncError.js')
const User = require('../models/userModel.js')

// Registation - user
exports.registerUser = catchAsyncError(async(req,res,next)=>{
    const {name,email,password} = req.body
    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:"This is sample",
            url:'sampleURl'
        }
    })
    const token = user.getJWTToken();
    
    res.status(201).json({
        success:true,
        token,
    })
})



// exports.registerUser = catchAsyncError(async(req,res,next)=>{

// })


// exports.registerUser = catchAsyncError(async(req,res,next)=>{

// })


// exports.registerUser = catchAsyncError(async(req,res,next)=>{

// })
