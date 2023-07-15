const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

const errorMiddleware = require('./middlewares/error.js')

app.use(express.json())
app.use(cookieParser())

// Route import
const product = require('./routes/productRoute.js')
const user = require('./routes/userRoutes.js')

// Route
app.use('/api/v1',product)
app.use('/api/v1',user)

// Middleware for error
app.use(errorMiddleware)

module.exports = app