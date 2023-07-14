const express = require('express')
const { getAllProduct, createProduct, updateProduct, deleteProduct, getProductDetails } = require('../controllers/productController.js')

const router = express.Router()

// route to get all product
router.get('/products',getAllProduct)

// Route to create product
router.post('/product/new',createProduct)

// Route to update product
router.put('/product/:id',updateProduct)

// Route to delete product
router.delete('/product/:id',deleteProduct)

// Route to get one product
router.get('/product/:id',getProductDetails)

module.exports = router