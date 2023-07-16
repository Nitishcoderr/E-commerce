const express = require('express')
const { getAllProduct, createProduct, updateProduct, deleteProduct, getProductDetails, CreateProductReview, getProductReview } = require('../controllers/productController.js')
const {isAuthenticateUser, authorizeRole} = require('../middlewares/auth.js')

const router = express.Router()

// route to get all product
router.get('/products',getAllProduct)

// Route to create product
router.post('/admin/product/new',isAuthenticateUser,authorizeRole('admin'),createProduct)

// Route to update product
router.put('/admin/product/:id',isAuthenticateUser,authorizeRole('admin'),updateProduct)

// Route to delete product
router.delete('/admin/product/:id',isAuthenticateUser,authorizeRole('admin'),deleteProduct)

// Route to get one product
router.get('/product/:id',getProductDetails)


router.put('/review',isAuthenticateUser,CreateProductReview)


router.get('/review',getProductReview)
router.delete('/review',isAuthenticateUser,deleteProduct)

module.exports = router