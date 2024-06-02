const bcrypt = require('bcryptjs');

const hashOTP = async (otp) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(otp, salt);
};

const compareOTP = async (enteredOTP, savedOTP) => {
    return await bcrypt.compare(enteredOTP, savedOTP);
}

module.exports = { hashOTP, compareOTP };