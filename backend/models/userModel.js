const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxLength: [30, 'Name cannot exceed 30 character'],
        minLength: [4, 'Name should have 5 character']
    },
    email: {
        type: String,
        required: [true, 'Please enter your name'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minLength: [6, 'Password should be greater then 6 character'],
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
    },
    role: {
        type: String,
        default: 'user'
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
})

// Encrypting password

userSchema.pre('save',async function(next){

    if(!this.isModified('password')){
        next()
    }

    this.password = await bcrypt.hash(this.password,10)
})

// JWT TOKEN
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    });
}

// Compare password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

// Generation password reset token
userSchema.methods.getResetPasswordToken = function (){
    // Generating token
    const resetToken = crypto.randomBytes(20).toString('hex')

    // Hashing and adding to user schema
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
}



module.exports = mongoose.model('User',userSchema);