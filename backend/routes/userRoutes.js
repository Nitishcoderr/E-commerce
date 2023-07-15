const express = require('express')
const { registerUser, loginUser, logoutUser, forgetPassword } = require('../controllers/userController')
const router = express.Router()

router.post('/register',registerUser)
router.post('/login',loginUser)
router.post('/password/forget',forgetPassword)
router.get('/logout',logoutUser)

module.exports = router