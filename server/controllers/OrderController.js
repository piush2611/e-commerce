const Order = require('../models/Order');
const { vallidateOrderBody } = require('../utils/validations');

const getOrder = async (req, res) => {
    try {
        const order = await Order.findOne({ id: req.params.id})

        res.status(200).json({
            order
        })
    } catch (error) {
        res.send(error);
    }
}

const placeOrder = async (req, res) => {
    try {
        const validationErrors = vallidateOrderBody(req.body);

        if(validationErrors.length){
            return res.status(400).json({
                msg: 'Fields missing',
                errors : validationErrors
            })
        }
        const order = await Order.create(req.body);

        res.status(200).json({
            message: 'Order Placed Successfully'
        })
    } catch (error) {
        res.send(error);
    }
}

const getAll = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user._id})

        res.status(200).json({
            orders
        })
    } catch (error) {
        res.json(error);
    }
}

module.exports = {
    getOrder, placeOrder, getAll
};