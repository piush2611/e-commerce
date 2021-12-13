const Cart = require('../models/Cart');

const getCart = async (req, res) => {
    try {
        const cart = await Cart.find({ userId: req.user._id}).sort({ _id: -1});
        res.json(cart);
    } catch (error) {
        res.json(error)
    }
}

const updateCart = async (req, res) => {
    try {
        const {items} = await Cart.find({ userId: req.user._id}).sort({ _id: -1});
        let isNewItem = true;
        let updatedItems;
        if(req.body.item.quantity === 0){
            updatedItems = items.filter(item => item.itemId !== req.body.item.itemId);
        }else{
            updatedItems = items.map(item => {
                if(item.itemId === req.body.item.itemId){
                    isNewItem = false;
                    return {...item, ...req.body.item}
                }
    
                return item;
            })
        }


        if(isNewItem){
            updatedItems = [...updatedItems, req.body.item]
        }

        const totalPrice = updatedItems.reduce((item, total) => {
            total += item.quantity*item.price
        }, 0)

        const updatedCart = await Cart.updateOne({userId: req.user._id}, {items, totalPrice: totalPrice.toFixed(2)})


        res.json(updatedCart);
    } catch (error) {
        res.json(error)
    }
}

module.exports = {
    getCart,
    updateCart,
};