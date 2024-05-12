'use client'

import { updateProfileDetails } from "@/store/slice/userSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Profilepage = () => {
  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ address, setAddress ] = useState('');
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const route = useRouter();

  const handleUpdateProfile = (e) => {
    const updatedDetails = {
      firstName, 
      lastName,
      email, 
      address,
    };
    const user = JSON.parse(localStorage.getItem("user")) || {};
    localStorage.setItem("user", JSON.stringify({ ...user, ...updatedDetails }));
    dispatch(updateProfileDetails(updatedDetails));
    route.push("/")
  }

  return (
   <main>
    <div><h1>Profile Page</h1></div>
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

      <button type="button" onClick={handleUpdateProfile}>Update Profile</button>
    </form>
   </main>
  )
}

export default Profilepage;