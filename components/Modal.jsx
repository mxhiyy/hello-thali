'use client';

import React, { Fragment, useState, useCallback } from "react";
import PhoneInput from "react-phone-input-2";
import { memo } from "react";
import "react-phone-input-2/lib/material.css";
import { Button } from "./ui/button";
import OtpInput from "react-otp-input";
import { CgSpinner } from "react-icons/cg";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "@/app/firebase.config";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import debounce from 'lodash.debounce';
import { useDispatch } from "react-redux";
import { updatePhoneNumber } from "@/store/slice/userSlice";

const LoginModal = memo(({ isOpen, closeModal }) => {
  const [ phoneNumber, setPhoneNumber ] = useState("");
  const [ otpSection, setOtpSection ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ otp, setOtp ] = useState('');
  const [ showOtp, setShowOtp ] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { toast } = useToast();

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

  const onSignUp = useCallback(() => {
    setLoading(true);
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
      toast({ title: "Otp Send Successfully", variant: 'success'})
    })
    .catch((error) => {
      setLoading(false);
      if (error.code === 'auth/too-many-requests') {
        toast({
          title: "Too many requests! Try again later.",
          variant: "destructive"
        });
      }
      if(error){
        toast({
          title: "Something Bad Happened. Please try again!",
          variant: "destructive"
        })
      }
    });
  }, [phoneNumber, otp]);

  const otpVerify = useCallback(() => {
    setLoading(true);
    window.confirmationResult.confirm(otp)
    .then(async(res) =>{
      setLoading(false);
      dispatch(updatePhoneNumber(phoneNumber)); // dispatch the phonenumber here
      window.localStorage.setItem("user", JSON.stringify({ phoneNumber })); // settting the user object, in the localstorage
      setOtpSection(false);
      toast({ 
        title: "Login Sucessfully",
        variant: 'success'
      });
      router.push('/profile');
      
    })
    .catch((error) => {
      setLoading(false);
      if(error.code === 'auth/invalid-verification-code'){
        toast({title:"Invalid OTP!", variant: 'destructive'})
      }
    })
  }, [otp ]);

  const debounceHandleChange = debounce((value) => {
    setPhoneNumber(value);
  }, 500);

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
                  onChange={debounceHandleChange}
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
                  {loading && (<CgSpinner size={30} className="mr-1 animate-spin" />)}
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
});

export default LoginModal;
