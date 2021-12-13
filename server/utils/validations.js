const validateItemBody = (body) => {

    const errors = [];

    if(!body.itemId){
        errors.push('Item id is missing');
    }

    if(!body.itemName){
        errors.push('Item name is missing');
    }

    if(!body.itemCategory){
        errors.push('Item category is missing');
    }

    if(!body.itemPrice){
        errors.push('Item price is missing');
    }

    return errors;
}

const vallidateOrderBody = (body) => {
    const errors = [];

    if(!body.items){
        errors.push('Items are required')
    }

    if(!body.totalPrice){
        errors.push('Total price is missing')
    }
    
    return errors;
}

module.exports = {
    validateItemBody,
    vallidateOrderBody
}