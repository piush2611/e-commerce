const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    items: [{
        itemId: {
            type: String
        },
        name: String,
        quantity: Number,
        price: Number
    }],
    totalPrice: {
        type: Number,
        required: true
    }
}, { timestamps: true })

const Order = mongoose.model('order', OrderSchema);

module.exports = Order;