"use client";

import { CircularProgress, Modal } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
// import { loadFromLocalStora/ge } from "@/store/slices/authSlice";
import { RxCross2 } from "react-icons/rx";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import OTPInput from "react-otp-input";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, verifyOtp, setUser } from "@/store/slices/authSlice";
import toast, { Toaster } from "react-hot-toast";

const LoginCard = ({ open, setOpen }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpDiv, setOtpDiv] = useState(false);
  const [phoneDiv, setPhoneDiv] = useState(true);
  const [timeLeft, setTimeLeft] = useState(35);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleClose = () => {
    setOpen(false);
  };

  const debounceHandleChange = (value) => {
    setPhoneNumber(value);
  };

  const handleSendOtp = async () => {
    const result = await dispatch(sendOtp(phoneNumber));
    if (sendOtp.fulfilled.match(result)) {
      setPhoneDiv(false);
      setOtpDiv(true);
      setOtp("");
      setTimeLeft(35);
      setIsTimerRunning(true);
    }
  };

  const handleVerifyOtp = async () => {
    const result = await dispatch(verifyOtp({ phoneNumber, otp }));
    dispatch(setUser({ phoneNumber }));
    if (verifyOtp.fulfilled.match(result)) {
      dispatch(setUser({ phoneNumber }));
      toast.success("OTP Verified succesfully");
      handleClose();
    }
  };

  const handleResendCode = async () => {
    const result = await dispatch(sendOtp(phoneNumber));
    if (sendOtp.fulfilled.match(result)) {
      setTimeLeft(35);
      setIsTimerRunning(true);
    }
  };

  const formatPhoneNumber = (phoneNumber) => {
    let countryCode = phoneNumber.slice(0, 2);
    let mainNumber = phoneNumber.slice(2);
    return `${countryCode}-${mainNumber}`;
  };

  useEffect(() => {
    if (timeLeft > 0 && isTimerRunning) {
      const timerInterval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerInterval);
    } else {
      setIsTimerRunning(false);
    }
  }, [timeLeft, isTimerRunning]);

  return (
    <div>
      <Toaster />
      {phoneDiv && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="flex justify-center items-center"
        >
          <div
            className={`rounded-md bg-white w-auto h-auto flex flex-col gap-3 p-5`}
          >
            <div
              className="flex justify-end cursor-pointer"
              onClick={handleClose}
            >
              <RxCross2 size={15} />
            </div>
            <div className="flex justify-center">
              <img
                src="/assets/hellothali-card.svg"
                alt="hellothali-logo"
                width={100}
              />
            </div>
            <h5 className="font-bold text-3xl text-center">
              India`s First Daily Meal App
            </h5>
            <p className="font-medium text-xl text-center">Log in or Sign up</p>
            <div className="pl-10">
              <PhoneInput
                inputStyle={{ border: "2px solid gray" }}
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

            <div className="flex justify-center items-center">
              <button
                className={`w-32 p-2 flex justify-center items-center rounded-md text-white ${
                  phoneNumber.length < 12 ? "bg-gray-500" : "bg-green-4"
                } hover:opacity-100`}
                onClick={handleSendOtp}
                disabled={phoneNumber.length < 12}
              >
                {loading && (
                  <CircularProgress
                    size={20}
                    style={{ marginRight: "5px", color: "white" }}
                  />
                )}
                Send OTP
              </button>
            </div>

            <p className="text-sm font-medium text-center">
              By continuing, you agree to our
              <Link href={"#"} className="underline">
                Terms of service{" "}
              </Link>
              &{" "}
              <Link href={"#"} className="underline">
                Privacy policy
              </Link>
            </p>
          </div>
        </Modal>
      )}

      {otpDiv && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="flex justify-center items-center"
        >
          <div
            className={`rounded-md bg-white w-[500px] h-[400px] flex flex-col gap-3`}
          >
            <div className="flex border-b-2 border-gray-400 p-3 items-center">
              <IoIosArrowRoundBack
                size={25}
                className="cursor-pointer"
                onClick={() => {
                  setPhoneDiv(true);
                  setOtpDiv(false);
                }}
              />
              <div className="text-center w-full">
                <h5 className="text-xl font-semibold">OTP Verification</h5>
              </div>
            </div>

            <div className="p-5 flex flex-col gap-2">
              <p className="text-center text-base font-medium">
                We have sent a Verification Code to{" "}
              </p>
              <h5 className="text-center text-xl font-bold">
                +{formatPhoneNumber(phoneNumber)}
              </h5>

              <div className="mt-10 w-80 m-auto">
                <OTPInput
                  numInputs={4}
                  value={otp}
                  onChange={setOtp}
                  disabled={false}
                  autoFocus
                  renderInput={(props) => <input {...props} />}
                  inputStyle={{
                    display: "flex",
                    border: "1px solid green",
                    width: "55px",
                    justifyContent: "space-between",
                    height: "55px",
                    borderRadius: "6px",
                    margin: "auto",
                  }}
                />
              </div>

              <div className="flex justify-center">
                {isTimerRunning ? (
                  <p className="text-base text-center font-medium">
                    Resend Code ({timeLeft} sec)
                  </p>
                ) : (
                  <button
                    onClick={handleResendCode}
                    className="text-base flex border-none justify-center text-green-4 font-medium bg-white hover:bg-white"
                  >
                    <Link href={"/"} className="hover:underline">
                      Resend OTP
                    </Link>
                  </button>
                )}
              </div>

              <div className="flex justify-center items-center mt-10">
                <button
                  className={`w-32 p-2 flex justify-center items-center rounded-md text-white hover:opacity-100 bg-green-4`}
                  onClick={handleVerifyOtp}
                >
                  {loading && (
                    <CircularProgress
                      size={20}
                      style={{ marginRight: "5px", color: "white" }}
                    />
                  )}
                  Verify OTP
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default LoginCard;
