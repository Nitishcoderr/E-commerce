const express = require('express')
const { getAllProduct } = require('../controllers/productController.js')

const router = express.Router()

router.get('/products',getAllProduct)

module.exports = router