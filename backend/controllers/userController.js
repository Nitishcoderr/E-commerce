const ErrorHandler = require('../utils/ErrorHandler.js')
const catchAsyncError = require('../middlewares/catchAsyncError.js')
const User = require('../models/userModel.js')
const sendToken = require('../utils/jwtToken.js')
const sendEmail = require('../utils/sendEmail.js')
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


exports.logoutUser = catchAsyncError(async(req,res,next)=>{

    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })

    res.status(200).json({
        success:true,
        message:"Logout Successfully"
    })
})

// Forget password

exports.forgetPassword = catchAsyncError(async(req,res,next)=>{
    const user = await User.findOne({email:req.body.email})
    if(!user){
        return next(new ErrorHandler("User not found",404))
    }
    // Get resetPassword Token
    const resetToken = user.getResetPasswordToken()
    await user.save({validateBeforeSave:false})

    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`

    const message = `Your password reset token id :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then, please ignore it`

    try {
        await sendEmail({
            email:user.email,
            subject:`TrendHub Password Recovery`,
            message,
        })
        res.status(200).json({
            success:true,
            message:`Email send to ${user.email} successfully`
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave:false})

        return next(new ErrorHandler(error.message,500))
    }
})

// Reset password --------todo
// exports.forgetPassword = catchAsyncError(async(req,res,next)=>{

// })

// TO get user details

exports.getUserDetails = catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.user.id)

    res.status(200).json({
        success:true,
        user,
    })
})

// TO update user profile

exports.updateProfile = catchAsyncError(async(req,res,next)=>{
    const newUserData = {
        name:req.body.name,
        email:req.body.email
    }
    // TODO AVATAR
    const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        userFindAndModify:false,
    })
    res.status(200).json({
        success:true
    })
})

// Get all user (admin)
exports.getAllUser = catchAsyncError(async(req,res,next)=>{
    const users = await User.find()

    res.status(200).json({
        success:true,
        users,
    });
});

// Get single user (admin)
exports.getSingleUser = catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.params.id)

    if(!user){
        return next(new ErrorHandler(`User does not exists with id: ${req.params.id}`))
    }

    res.status(200).json({
        success:true,
        user
    })
})


// TO update user role --(Admin)

exports.updateUserRole = catchAsyncError(async(req,res,next)=>{
    const newUserData = {
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }
    // TODO AVATAR
    const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,
        userFindAndModify:false,
    })

    
    if(!user){
        return next(new ErrorHandler(`User does not exists with id: ${req.params.id}`,400))
    }

    res.status(200).json({
        success:true
    })
})

// TO delete user --(Admin)
exports.deleteUser = catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.params.id);

        // WE will remove clodinary later
    
        if(!user){
            return next(new ErrorHandler(`User does not exists with id: ${req.params.id}`,400))
        }

        await user.deleteOne()


    res.status(200).json({
        success:true,
        message:"User deleted Successfully"
    })
})
