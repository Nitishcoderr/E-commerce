const express = require('express')
const app = express()

const errorMiddleware = require('./middlewares/error.js')

app.use(express.json())

// Route import
const product = require('./routes/productRoute.js')

app.use('/api/v1',product)

// Middleware for error
app.use(errorMiddleware)

module.exports = app