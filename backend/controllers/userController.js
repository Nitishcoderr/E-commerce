const ErrorHandler = require('../utils/ErrorHandler.js')
const catchAsyncError = require('../middlewares/catchAsyncError.js')
const User = require('../models/userModel.js')
const sendToken = require('../utils/jwtToken.js')

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
    sendToken(user,201,res)
})



exports.loginUser = catchAsyncError(async(req,res,next)=>{
    const {email,password} = req.body;
    // checking if user have email or password
    if(!email || !password){
        return next(new ErrorHandler("Please enter email and password",400))
    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler('Invalid email or password',401))
    }
    const isPasswordMatched = user.comparePassword(password)

    if(!isPasswordMatched){
        return next(new ErrorHandler('Invalid email or password',401))
    }

    sendToken(user,200,res)

    
})


// exports.registerUser = catchAsyncError(async(req,res,next)=>{

// })


// exports.registerUser = catchAsyncError(async(req,res,next)=>{

// })
