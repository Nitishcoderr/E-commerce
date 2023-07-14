const Product = require('../models/productModel.js')


// ctrl to create product -- ADMIN
exports.createProduct = async (req, res, next) => {
    const product = await Product.create(req.body)

    res.status(201).json({
        success: true,
        product
    })
}


// ctrl to get all product

exports.getAllProduct = async (req, res) => {
    const products = await Product.find();
    res.status(200).json({
        success: true,
        products
    })
}

// // ctrl to get one product -- id
exports.getProductDetails = async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }
    res.status(200).json({
        success:true,
        product
    })
}

// Route to update product -- Admin

exports.updateProduct = async (req, res, next) => {
    let product = await Product.findById(req.params.id)
    if (!product) {
        return res.status(500).json({
            success: false,
            message: 'Product not found'
        })
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
}

// ctrl to delete product

exports.deleteProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
        return res.status(500).json({
            success: false,
            message: 'Product not found'
        })
    }
    await product.deleteOne();
    res.status(200).json({
        success: true,
        message: 'Product Deleted Successfully'
    })
}
