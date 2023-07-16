const Order = require("../models/orderModel.js")
const Product = require('../models/productModel.js')
const ErrorHandler = require('../utils/ErrorHandler.js')
const catchAsyncError = require('../middlewares/catchAsyncError.js')

// Create new order
exports.newOrder = catchAsyncError(async (req, res, next) => {

    const {shippingInfo,orderItems,paymentInfo,taxsPrice,shippingPrice,totalPrice} = req.body;

    const order = await Order.create({
        shippingInfo,orderItems,paymentInfo,taxsPrice,shippingPrice,totalPrice,
        paidAt:Date.now(),
        user:req.user._id,
    })
    res.status(201).json({
        success:true,
        order,
    })
})


// Get single order details
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user","name email")

    if(!order){
        return next(new ErrorHandler("Order not found with this id",404))
    }
    res.status(200).json({
        success:true,
        order
    })
})

// Get logged in user order
exports.myOrder = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find({user:req.user._id})


    res.status(200).json({
        success:true,
        orders
    })
})

// Get all order
exports.myOrder = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find({user:req.user._id})


    res.status(200).json({
        success:true,
        orders
    })
})


// Get all order -- admin
exports.getAllOrder = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find()

    let totalAmount = 0

    orders.forEach(order=>{
        totalAmount+=order.totalPrice;
    })


    res.status(200).json({
        success:true,
        totalAmount,
        orders
    })
})
// ho skta hai error 4:42:45 pr update krte time server crash
// update order status -- admin
exports.updateOrder = catchAsyncError(async (req, res, next) => {
    
    const order = await Order.findById(req.params.id)

    if(!order){
        return next(new ErrorHandler("Order not found with this id",404))
    }

    if(order.orderStatus === "Delivered"){
        return next(new ErrorHandler('You have already deliverd this order',404))
    }

    order.orderItems.forEach(async(o)=>{
        await updateStock(o.product,o.quantity)
    });

    order.orderStatus = req.body.status;

    if(req.body.status === "Delivered"){
        order.deliveredAt = Date.now()
    }

    await order.save({validateBeforeSave:false})
    res.status(200).json({
        success:true
    });
});

async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.Stock -= quantity;

    await product.save({ validateBeforeSave: false });
}



// Delete order -- admin
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if(!order){
        return next(new ErrorHandler("Order not found with this id",404))
    }

    await order.deleteOne()

    res.status(200).json({
        success:true 
    })
})
