const express = require('express')
const { getAllProduct, createProduct } = require('../controllers/productController.js')

const router = express.Router()

router.get('/products',getAllProduct)
router.post('/products/new',createProduct)

module.exports = router