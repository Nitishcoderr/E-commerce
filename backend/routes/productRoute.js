const express = require('express')
const { getAllProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/productController.js')

const router = express.Router()

router.get('/products',getAllProduct)

router.post('/product/new',createProduct)

router.put('/product/:id',updateProduct)

router.delete('/product/:id',deleteProduct)

module.exports = router