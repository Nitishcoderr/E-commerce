const express = require('express')
const { registerUser, loginUser, logoutUser, forgetPassword, getUserDetails, updateProfile, getAllUser, getSingleUser, updateUserRole, deleteUser } = require('../controllers/userController')
const router = express.Router()
const {isAuthenticateUser, authorizeRole}=require('../middlewares/auth.js')

router.post('/register',registerUser)
router.post('/login',loginUser)
router.post('/password/forget',forgetPassword)
router.get('/logout',logoutUser)

router.get('/me',isAuthenticateUser,getUserDetails)

router.put('/me/update',isAuthenticateUser,updateProfile)

router.get('/admin/users',isAuthenticateUser,authorizeRole('admin'),getAllUser)

router.get('/admin/user/:id',isAuthenticateUser,authorizeRole('admin'),getSingleUser)

router.put('/admin/user/:id',isAuthenticateUser,authorizeRole('admin'),updateUserRole)

router.delete('/admin/user/:id',isAuthenticateUser,authorizeRole('admin'),deleteUser)

module.exports = router