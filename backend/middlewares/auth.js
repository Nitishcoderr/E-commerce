const User = require("../models/userModel");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require('jsonwebtoken')


exports.isAuthenticateUser = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler("Please login to access this resource", 401))
    }

    const decodeData = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(decodeData.id)
    next()

})

exports.authorizeRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role: ${req.user.role} is not alllowed to access to this resource`, 403)
            );
        }
        next()
    }
}

