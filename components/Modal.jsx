'use client';

import React, { Fragment, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { Button } from "./ui/button";
import OtpInput from "react-otp-input";
import { CgSpinner } from "react-icons/cg";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "@/app/firebase.config";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast"

const LoginModal = ({ isOpen, closeModal }) => {
  const [ phoneNumber, setPhoneNumber ] = useState("");
  const [ otpSection, setOtpSection ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ user, setUser] = useState(null);
  const [ otp, setOtp ] = useState('');
  const [ showOtp, setShowOtp ] = useState(false);
  const router = useRouter();
  const { toast } = useToast()

  function onCaptchaVerifier(){
    if(!window.recaptchaVerifier){
      window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          onSignUp();
        },
        'expired-callback': () => {

        }
      }, auth);

      if(!auth){
        alert('Auth object is undefinerd')
        return;
      }
    }
  }

  function onSignUp(){
    setLoading(true)
    onCaptchaVerifier();

    const appVerifier = window.recaptchaVerifier;
    const formatPhoneNumber = '+' + phoneNumber
    signInWithPhoneNumber(auth, formatPhoneNumber, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      closeModal(false);
      setOtpSection(true);
      setLoading(false);
      setShowOtp(true);
      alert('hi')
      
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    });
  };

  function otpVerify(){
    setLoading(true);
    window.confirmationResult
    .confirm(otp)
    .then(async (res) =>{
      console.log(res);
      setUser(res.user);
      setLoading(false);
      router.push('/profile');
      setOtpSection(false);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    })
  }

  return (
    <div>
      {isOpen && (
        <Fragment>
          <div className="w-full h-full bg-black opacity-60 fixed z-50"></div>
          <div className="w-full h-full flex fixed justify-center items-center z-50">
            <div id="recaptcha-container"></div>
            <div className="w-[500px] h-[250px] bg-white flex flex-col gap-5 justify-center rounded-xl">
              <h2 className="text-center text-xl font-medium ttext-black">
                To order a Thali, you should login first 😋
              </h2>
              <div className="w-4/5 flex flex-col gap-3 justify-center ml-14">
                <PhoneInput
                  inputStyle={{ border: '2px solid gray'}}
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                  country={"in"}
                  inputProps={{
                    name: "phone",
                    required: true,
                    autoFocus: true,
                  }}
                />

                <div id="recaptcha-container"></div>
                <Button
                  onClick={onSignUp}
                  className="w-40 bg-green-1 text-white hover:bg-green-950"
                >
                  Send OTP via SMS
                </Button>
              </div>
            </div>
          </div>
        </Fragment>
      )}

      

      {otpSection && (
        <Fragment>
          <div className="w-full h-full bg-black opacity-60 fixed z-50"></div>
          <div className="w-full h-full flex fixed justify-center items-center z-50">
            <div className="w-[500px] h-[250px] bg-white flex flex-col gap-5 justify-center rounded-xl">
              <div className="w-4/5 ml-14" onClick={() => { closeModal(true); setOtpSection(false) }}><ChevronLeftIcon  className="bg-green-1 text-white rounded-2xl cursor-pointer" /></div>
              <h2 className="text-center text-md font-medium text-black">
               Enter your OTP to unlock the fun on HelloThali 🚀
              </h2>
              <div className="w-4/5 flex flex-col gap-3 justify-center ml-14">
                <OtpInput 
                  numInputs={6}
                  value={otp}
                  onChange={setOtp}
                  inputType="number"
                  disabled={false}
                  autoFocus
                  renderInput={(props) => <input {...props} />}
                  renderSeparator={<span>-</span>}
                  inputStyle={{ display: 'flex', justifyContent:'space-between', border: '1px solid lightgray', width: '40px', height: '40px', margin: 'auto'}}
                />
                <div className="">
                <Button onClick={otpVerify} className="w-32 bg-green-1 mt-4 text-white hover:bg-green-950"> {loading && (<CgSpinner size={20} className="mr-1 animate-spin" />)} Verify OTP</Button>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default LoginModal;
