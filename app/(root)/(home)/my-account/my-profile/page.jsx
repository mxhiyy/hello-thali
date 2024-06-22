"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUserProfile,
  updateUserProfile,
} from "../../../../../store/slices/userSlice";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";

const UserProfilepage = () => {
  const dispatch = useDispatch();
  const { profile, status } = useSelector((state) => state.user);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
      });
    }

    const encryptedPhoneNumber = Cookies.get("phone");
    if (encryptedPhoneNumber) {
      const decryptedPhoneNumber = CryptoJS.AES.decrypt(
        encryptedPhoneNumber,
        process.env.ENCRYPTION_KEY
      ).toString(CryptoJS.enc.Utf8);
      setPhoneNumber(decryptedPhoneNumber);
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateUserProfile(formData));
    setIsEditing(false);
  };

  const handleEdit = () => {
    toast.success("You can edit your data 🖊️");
    setIsEditing(true);
  };

  return (
    <main className="p-6">
      <Toaster />
      <h1 className="text-3xl flex mt-3 font-extrabold">
        Personal Information
      </h1>
      <div className="flex items-center gap-5 w-[80%] mt-4">
        <div className="flex flex-col gap-3">
          <label
            htmlFor="firstName"
            className="font-medium text-base cursor-pointer"
          >
            Firstname*
          </label>
          <input
            className={`p-2 bg-gray-6 font-medium outline-none ${
              !isEditing ? "opacity-40" : "opacity-100"
            } placeholder:text-gray-500 w-60 rounded-md focus:ring-2 focus:ring-green-4`}
            autoFocus
            name="firstName"
            type="text"
            required
            placeholder="Enter you first name.."
            value={formData.firstName}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className="font-medium text-base" htmlFor="lastName">
            Lastname
          </label>
          <input
            className={`p-2 bg-gray-6 font-medium  ${
              !isEditing ? "opacity-40" : "opacity-100"
            } outline-none placeholder:text-gray-500  w-60 focus:ring-2 focus:ring-green-4 rounded-md `}
            name="lastName"
            type="text"
            placeholder="Enter your last name.."
            value={formData.lastName}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
      </div>
      <div className="flex flex-col gap-3 mt-3">
        <label
          htmlFor="phoneNumber"
          className="font-medium text-base cursor-pointer"
        >
          Phonenumber*
        </label>
        <input
          className={`p-2 bg-gray-6 font-medium ${
            !isEditing ? "opacity-40" : "opacity-100"
          } outline-none placeholder:text-gray-500 w-60 rounded-md focus:ring-2 focus:ring-green-4`}
          autoFocus
          name="phoneNumber"
          type="number"
          value={`+${phoneNumber}`}
          disabled
          placeholder={`+${phoneNumber}`}
        />
      </div>
      <div className="flex flex-col gap-3 mt-3">
        <label htmlFor="email" className="font-medium text-base cursor-pointer">
          Email*
        </label>
        <input
          className={`p-2 bg-gray-6 font-medium ${
            !isEditing ? "opacity-40" : "opacity-100"
          } outline-none placeholder:text-gray-500 w-60 rounded-md focus:ring-2 focus:ring-green-4`}
          autoFocus
          name="email"
          type="email"
          required
          placeholder="Enter you Email..."
          value={formData.email}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>
      <div className="flex gap-4 mt-8">
        {isEditing ? (
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-40 p-2 rounded-lg bg-green-700 hover:bg-green-900 text-white cursor-pointer text-lg font-medium outline-none"
          >
            Submit
          </button>
        ) : (
          <button
            type="button"
            onClick={handleEdit}
            className="w-40 p-2 rounded-lg bg-white hover:bg-white border-2 border-green-4 text-green-4 cursor-pointer text-lg font-medium"
          >
            Edit Profile
          </button>
        )}
      </div>
    </main>
  );
};

export default UserProfilepage;
