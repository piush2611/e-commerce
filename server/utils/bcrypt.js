const bcrypt = require('bcrypt');

const genHashedPassowrd = async (password) => {
    const salt = await bcrypt.genSalt(5);
    console.log(salt)
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

exports.genHashedPassowrd = genHashedPassowrd;