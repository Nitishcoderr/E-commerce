const express = require('express')
const { getAllProduct, createProduct, updateProduct, deleteProduct, getProductDetails } = require('../controllers/productController.js')
const {isAuthenticateUser, authorizeRole} = require('../middlewares/auth.js')

const router = express.Router()

// route to get all product
router.get('/products',getAllProduct)

// Route to create product
router.post('/product/new',isAuthenticateUser,authorizeRole('admin'),createProduct)

// Route to update product
router.put('/product/:id',isAuthenticateUser,authorizeRole('admin'),updateProduct)

// Route to delete product
router.delete('/product/:id',isAuthenticateUser,authorizeRole('admin'),deleteProduct)

// Route to get one product
router.get('/product/:id',getProductDetails)

module.exports = router