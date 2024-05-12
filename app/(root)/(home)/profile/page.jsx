"use client";

import { updateProfileDetails } from "@/store/slice/userSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IoIosLock } from "react-icons/io";

const Profilepage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();
  const route = useRouter();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const handleUpdateProfile = (e) => {
    const updatedDetails = {
      firstName,
      lastName,
      email,
      address,
    };
    localStorage.setItem(
      "user",
      JSON.stringify({ ...user, ...updatedDetails })
    );
    dispatch(updateProfileDetails(updatedDetails));
    route.push("/");
  };

  return (
    <main>
      {user?.phoneNumber ? (
        <form>
          <div>
            <label htmlFor="firstname">*Firstname: </label>
            <input
              type="text"
              id="firstname"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div>
            <label htmlFor="lastname">Lastname: </label>
            <input
              type="text"
              id="lastname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="email">*Email: </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="phonenumber">Phonenumber: </label>
            <input
              type="text"
              id="phonenumbner"
              value={`+91 ${user.phoneNumber}`}
              onChange={(e) => setFirstName(e.target.value)}
              disabled
            />
          </div>

          <div>
            <label htmlFor="address">*Address: </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <button type="button" onClick={handleUpdateProfile}>
            Update Profile
          </button>
        </form>
      ) : (
        <div className="h-[600px] flex justify-center items-center">
          <Card >
            <CardHeader>
              <CardTitle className='flex items-center'><IoIosLock size={30} className="text-green-1"/> Please Login Through Mobile Number!</CardTitle>
              <CardDescription>After login Please Update your profile</CardDescription>
            </CardHeader>
          </Card>
        </div>
      )}
    </main>
  );
};

export default Profilepage;
