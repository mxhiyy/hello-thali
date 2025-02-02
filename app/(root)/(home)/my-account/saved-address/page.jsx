"use client";

import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { saveAddress, deleteAddress, editAddress } from "@/store/slices/addressSlice";
import React, { useState } from "react";
import AddressModal from "@/components/AddressModal";
import IfUserAddress from "@/components/IfUserAddress";

const Addresspage = () => {
  const userAddresses = useSelector((state) => state.address.userAddress);
  const dispatch = useDispatch();

  const handleSaveAddress = (newAddress) => {
    dispatch(saveAddress(newAddress));
  };

  const handleEditAddress = (editedAddress, index) => {
    dispatch(editAddress({ address: editedAddress, index }));
  };

  const handleDeleteAddress = (index) => {
    dispatch(deleteAddress(index));
  };

  return (
    <main>
      {!userAddresses.length && (
        <NoUserAddress setUserAddress={handleSaveAddress} />
      )}
      {userAddresses.length > 0 && (
        <IfUserAddress
          userAddresses={userAddresses}
          setUserAddress={handleSaveAddress}
          editAddress={handleEditAddress}
          deleteAddress={handleDeleteAddress}
        />
      )}
    </main>
  );
};

const NoUserAddress = ({ setUserAddress }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <div className="flex flex-col h-[500px] gap-1 justify-center items-center">
      <h1 className="font-bold text-4xl">You have no saved address</h1>
      <h1 className="font-medium text-gray-500 text-xl">
        Tell us where you want your orders delivered
      </h1>
      <Button
        className="w-auto bg-green-4 hover:bg-green-900 text-white mt-5"
        onClick={handleOpen}
      >
        Add New Address
      </Button>

      {isOpen && (
        <AddressModal
          open={isOpen}
          setIsOpen={setIsOpen}
          setUserAddress={setUserAddress}
        />
      )}
    </div>
  );
};

export default Addresspage;
