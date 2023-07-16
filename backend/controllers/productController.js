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


// Create new Reviews or update reviews

exports.CreateProductReview = catchAsyncError(async (req, res, next) => {

    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    }
    const product = await Product.findById(productId);


    const isReviewed = product.reviews.find((rev) => rev.user.toString() === req.user._id.toString())

    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString())
                (rev.rating = rating), (rev.comment = comment)

        })
    } else {
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length
    }

    let avg = 0

    product.reviews.forEach(rev => {
        avg += rev.rating
    })

    product.ratings = avg / product.reviews.length

    await product.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true
    })
})


// to GET all Reviews

exports.getProductReview = catchAsyncError(async (req, res, next) => {

    const product = await Product.findById(req.query.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

// Delete product reviews
exports.deleteProductReview = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }

    const reviews = product.reviews.filter(rev => rev._id.toString() !== req.query.id.toString())

    let avg = 0

    reviews.forEach(rev => {
        avg += rev.rating
    })

    const ratings = product.ratings = avg / reviews.length

    const numOfReviews = reviews.length

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews, ratings, numOfReviews
    },{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})
