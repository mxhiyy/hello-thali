"use client";

import React from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
// import { FiEdit } from "react-icons/fi";

const UserProfilepage = () => {
  const { user } = useSelector((state) => state.auth);
  const phoneNumber = Cookies.get("phoneNumber");

  return (
    <main className="p-6">
      <h1 className="text-3xl flex mt-3 font-extrabold">
        Personal Information
      </h1>
      <form className="mt-5">
        <div className="flex items-center gap-5 w-[80%]">
          <div className="flex flex-col gap-3">
            <label
              htmlFor="firstName"
              className="font-medium text-base cursor-pointer"
            >
              Firstname*
            </label>
            <input
              className="p-2 bg-gray-6 font-medium outline-none placeholder:text-gray-500 w-60 rounded-md focus:ring-2 focus:ring-green-4"
              autoFocus
              name="firstName"
              type="text"
              required
              placeholder="Enter you first name.."
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="font-medium text-base" htmlFor="lastName">
              Lastname
            </label>
            <input
              className="p-2 bg-gray-6 font-medium outline-none placeholder:text-gray-500  w-60 focus:ring-2 focus:ring-green-4 rounded-md "
              name="lastName"
              type="text"
              placeholder="Enter your last name.."
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
            className="p-2 bg-gray-6 font-medium outline-none placeholder:text-gray-500 w-60 rounded-md focus:ring-2 focus:ring-green-4"
            autoFocus
            name="phoneNumber"
            type="number"
            value={phoneNumber}
            disabled
            required
            placeholder={phoneNumber}
          />
        </div>
        <div className="flex flex-col gap-3 mt-3">
          <label htmlFor="email" className="font-medium text-base cursor-pointer">
            Email*
          </label>
          <input
            className="p-2 bg-gray-6 font-medium outline-none placeholder:text-gray-500 w-60 rounded-md focus:ring-2 focus:ring-green-4"
            autoFocus
            name="email"
            type="email"
            required
            placeholder="Enter you Email..."
          />
        </div>
        <div className="flex gap-4 mt-8">
          <button type="submit" className="w-40 p-2 rounded-lg bg-green-700 hover:bg-green-900 text-white cursor-pointer text-lg font-medium outline-none">
            Submit
          </button>
          <button className="w-40 p-2 rounded-lg bg-blue-700 hover:bg-blue-900  text-white cursor-pointer text-lg font-medium outline-none">
             Edit Profile
          </button>
        </div>
      </form>
    </main>
  );
};

export default UserProfilepage;
