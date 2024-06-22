const request = require('request');
const User = require('../models/User');
const bcrypt = require('../handlers/bcrypt');
const jwt = require('../handlers/jwt');
const dotenv = require('dotenv');

dotenv.config();


const sendOTP = async (req, res, next) => {
    const { phoneNumber } = req.body;

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    try {
        const hashedOTP = await bcrypt.hashOTP(otp);
        const otpExpires = new Date(Date.now() + 35 * 1000);

        const options = {
            method: 'POST',
            url:  'https://smsapi.bitss.tech/api/v5/flow',
            headers: {
                authkey: '422988AOjuk69R4q6X66584b8aP1',
                'Content-Type' : 'application/json'
            },
            
            body: JSON.stringify({
                flow_id : '665877dc9c3e3d5f5e174ed4',
                sender: 'BITSTE',
                mobiles: phoneNumber,
                OTPCODE: otp
            })
        };

        request(options, async (error, response) => {
            if(error) {
                console.error('Error in request: ', error);
                return next(error);
            }
            const responseBody = JSON.parse(response.body);
            console.log('Response from Bitts:', responseBody);

            if(responseBody.type !== 'success'){
                return res.status(400).json({ message: 'Failed to send OTP!'});
            }

            const messageId = responseBody.message;

            let user = await User.findOne({ phoneNumber});
            if(user){
                user.otp = hashedOTP;
                user.otpExpires = otpExpires;
                user.messageId = messageId;
            }else{
                user = new User({ phoneNumber, otp: hashedOTP, otpExpires, messageId });
            }

            await user.save();
            res.json({ message: 'OTP Send sucessfully'})
        });
    } 
    
    catch (error) {
        console.error('Error in sendOTP', error);
        next(error);
    }
};

const verifyOTP = async (req, res, next) => {
    const { phoneNumber, otp } = req.body;

    try{
        const user = await User.findOne({ phoneNumber });
        
        if(!user){
            return res.status(400).json({ message: 'User not found '});
        }

        const isOTPValid = await bcrypt.compareOTP(otp, user.otp);

        if(!isOTPValid || user.otpExpires < Date.now()){
            return res.status(400).json({ message: 'Invalid or Expired OTP'});
        }

        res.json({ message: 'OTP verified Succesfully',  token: jwt.generateToken(user) });

    }catch(error){
        console.error('Error in verified OTP', error);
        next(error);
    }
};

const resendOTP = async (req, res, next) => {
    const { phoneNumber } = req.body;
    try {
        const user = await User.findOne({ phoneNumber });

        if(!user){
            return res.status(400).json({ message: 'User not found'});
        }
        const otp = Math.floor(1000 + Math.random() * 9000).toString();

        const hashedOTP = await bcrypt.hashOTP(otp);
        user.otp = hashedOTP;
        user.otpExpires = new Date(Date.now() + 60 * 1000);
        await user.save();

        const options = {
            method: 'POST',
            url: 'https://smsapi.bitss.tech/api/v5/flow',
            headers: {
              authkey: process.env.BITTS_AUTH_KEY,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              flow_id: '665877dc9c3e3d5f5e174ed4',
              sender: 'BITSTE',
              mobiles: phoneNumber,
              OTPCODE: otp
            })
          };
      
          request(options, (error, response) => {
            if (error) return next(error);
            res.json({ message: 'OTP resent successfully'});
          });

    } catch (error) {
        next(error);
    }
};


module.exports = { sendOTP, verifyOTP, resendOTP };