const express = require('express')
const {isAuthenticateUser, authorizeRole} = require('../middlewares/auth.js')
const { newOrder, myOrder, getSingleOrder, getAllOrder, updateOrder, deleteOrder } = require('../controllers/orderController.js')
const router = express.Router()


router.post('/order/new',isAuthenticateUser,newOrder)

router.get('/order/:id',isAuthenticateUser,getSingleOrder)


router.get('/orders/me',isAuthenticateUser,myOrder)

router.get('/admin/orders',isAuthenticateUser,authorizeRole("admin"),getAllOrder)


router.put('/admin/order/:id',isAuthenticateUser,authorizeRole("admin"),updateOrder)

router.delete('/admin/order/:id',isAuthenticateUser,authorizeRole("admin"),deleteOrder)



module.exports = router