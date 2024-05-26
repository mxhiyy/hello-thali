"use client"

import { CircularProgress, Modal } from "@mui/material";
import debounce from "lodash.debounce";
import Link from "next/link";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
// import Lottie from "react-lottie";
import * as LoadingDots from '@/components/loadingdots.json';
import PhoneInput from "react-phone-input-2";

import "react-phone-input-2/lib/material.css";
import OTPInput from "react-otp-input";


const LoginCard = ({ open, setOpen }) => {
  // const defaultOptions = {
  //   loop: true,
  //   autoplay: true, 
  //   animationData: LoadingDots,
  // };
  const [ phoneNumber, setPhoneNumber ] = useState('');
  const handleClose = () => setOpen(false);
  const [ loading, setLoading ] = useState(false);
  const [ otpDiv , setOtpDiv ] = useState(false);
  const [ otp, setOtp ] = useState('');

  const debounceHandleChange = debounce((value) => {
    setPhoneNumber(value);
  }, 500);

  const handleSendOtp  = (e) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpDiv(true);
    }, 3000);
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex justify-center items-center"
      >
        <div className={`rounded-md bg-white w-[500px] ${otpDiv && "h-[450px]"} h-[400px] flex flex-col gap-3 p-5`}>
          <div className="flex justify-end cursor-pointer" onClick={handleClose}><RxCross2 size={15} /></div>
          <div className="flex justify-center">
            <img src="/assets/hellothali-card.svg" width={100} />
          </div>
          <h5 className="font-bold text-3xl text-center">India's First Daily Meal App</h5>
          <p className="font-medium text-xl text-center">Log in or Sign up</p>
          {/* <form className="flex justify-center">
            <input type="text" name="phoneNumber" placeholder="+91" className="p-3 w-60 rounded-md bg-gray-1 text-base font-medium" style={{ outline: 'none'}} />
            <button className="p-2 flex justify-center items-center text-white bg-green-4 opacity-65 hover:bg-green-4 hover:opacity-100" style={{ borderTopRightRadius: '7px', borderBottomRightRadius: '7px' }}>Send OTP</button>
          </form> */}
          <div className="pl-20">
              <PhoneInput
                  inputStyle={{ border: '2px solid gray'}}
                  value={phoneNumber}
                  onChange={debounceHandleChange}
                  country={"in"}
                  inputProps={{
                    name: "phone",
                    required: true,
                    autoFocus: true,
                  }}
                />          
          </div>

          <div className="mt-3 w-80 m-auto">
            { otpDiv && (
              <OTPInput 
              numInputs={4}
              value={otp}
              onChange={setOtp}
              disabled={false}
              autoFocus
              renderInput={(props) => <input {...props} />}
              renderSeparator={<span>-</span>}
              inputStyle={{ display: 'flex', border: '1px solid lightgray', width: '45px', height: '40px', margin: 'auto'}}
            />
            )}
          </div>

          <div className="flex justify-center items-center">
              <button className={`w-32 p-2 flex justify-center items-center rounded-md text-white ${phoneNumber.length < 12 ? "bg-gray-500" : "bg-green-4"} hover:opacity-100`} onClick={handleSendOtp} disabled={phoneNumber.length < 12}>{loading ?  <CircularProgress size={20} style={{ marginRight: '5px', color: 'white'}} /> : otpDiv ? "Verify OTP" : "Send OTP"}</button>
          </div>

          <p className="text-sm font-medium text-center">By continuing, you agree to our <Link href={"#"} className="underline">Terms of service</Link> & <Link href={"#"} className="underline">Privacy policy</Link></p>
        </div>
      </Modal>
    </div>
  );
};


export default LoginCard;
