const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
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
    totalPrice: Number
}, { timestamps: true })

const Cart = mongoose.model('cart', CartSchema);

module.exports = Cart;