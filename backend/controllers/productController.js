const Product = require('../models/productModel.js')
const ErrorHandler = require('../utils/ErrorHandler.js')
const catchAsyncError = require('../middlewares/catchAsyncError.js')
const ApiFeatures = require('../utils/apiFeatures.js')


// ctrl to create product -- ADMIN
exports.createProduct = catchAsyncError(async (req, res, next) => {

    req.body.user = req.user.id

    const product = await Product.create(req.body)

    res.status(201).json({
        success: true,
        product
    })
})


// ctrl to get all product

exports.getAllProduct = catchAsyncError(async (req, res) => {
    const resultPerPage = 5;
    const productCount = await Product.countDocuments()
    const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage)
    const products = await apiFeature.query;
    res.status(200).json({
        success: true,
        products
    })
})

// // ctrl to get one product -- id
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler('Product not found', 404))
    }
    res.status(200).json({
        success: true,
        product,
        productCount
    })
})

// Route to update product -- Admin

exports.updateProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id)
    if (!product) {
        return next(new ErrorHandler('Product not found', 404))
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        product
    })
})

// ctrl to delete product

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler('Product not found', 404))
    }
    await product.deleteOne();
    res.status(200).json({
        success: true,
        message: 'Product Deleted Successfully'
    })
})
