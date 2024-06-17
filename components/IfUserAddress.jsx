"use client";

import React, { useState } from "react";
import AddressModal from "@/components/AddressModal";
import { IoAddSharp } from "react-icons/io5";
import { IoHomeSharp } from "react-icons/io5";
import { HiOfficeBuilding } from "react-icons/hi";
import { FaHotel } from "react-icons/fa";
import { FaLocationArrow } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { Popover } from "@mui/material";

const addressIcons = {
  Home: <IoHomeSharp size={29} className="text-green-4" />,
  Office: <HiOfficeBuilding size={29} className="text-green-4" />,
  Hotel: <FaHotel size={29} className="text-green-4" />,
  Other: <FaLocationArrow size={29} className="text-green-4" />,
};

const IfUserAddress = ({
  userAddresses,
  setUserAddress,
  editAddress,
  deleteAddress,
}) => {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleClick = () => {
    setEditingIndex(null);
    setOpen(true);
  };

  const handlePopoverClick = (event) => {
    setIsOpen(event.currentTarget);
  };

  const handleClose = () => {
    setIsOpen(null);
  };

  const openPopover = isOpen;
  const id = open ? "simple-popover" : undefined;

  const handleEdit = (index) => {
    setEditingIndex(index);
    setOpen(true);
  };

  const handleDelete = (index) => {
    deleteAddress(index);
  };

  return (
    <main className="p-5">
      <h1 className="text-4xl font-bold">My address</h1>
      <div
        onClick={handleClick}
        className="text-green-4 font-semibold text-base flex items-center mt-5 cursor-pointer hover:underline underline-offset-4"
      >
        <IoAddSharp size={20} />
        <p>Add New Address</p>
      </div>
      {open && (
        <AddressModal
          open={open}
          setIsOpen={setOpen}
          setUserAddress={setUserAddress}
          userAddress={
            editingIndex !== null ? userAddresses[editingIndex] : null
          }
          index={editingIndex}
          editAddress={editAddress}
        />
      )}

      {userAddresses.map((userAddress, index) => (
        <div className="mt-10 flex justify-between" key={index}>
          <div className="flex gap-2 items-center">
            {addressIcons[userAddress.type]}
            <div className="flex flex-col">
              <h1 className="text-base font-bold">
                {userAddress.type === "Other"
                  ? userAddress.other
                  : userAddress.type}
              </h1>
              <p className="text-gray-500 text-sm">{`${userAddress.houseNumber}, ${userAddress.area}, ${userAddress.pinCode}`}</p>
            </div>
          </div>
          <div className="">
            <Button
              aria-describedby={id}
              className="bg-white text-black hover:bg-white"
              onClick={handlePopoverClick}
            >
              <BsThreeDotsVertical size={25} />
            </Button>
            <Popover
              id={id}
              open={openPopover}
              anchorEl={isOpen}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <p
                className="text-base font-bold px-4 cursor-pointer hover:underline underline-offset-4 py-2 text-green-4"
                onClick={() => handleEdit(index)}
              >
                Edit
              </p>
              <p
                className="text-base font-bold px-4 cursor-pointer hover:underline underline-offset-4 py-2 text-red-500"
                onClick={() => handleDelete(index)}
              >
                Delete
              </p>
            </Popover>
          </div>
        </div>
      ))}
    </main>
  );
};

export default IfUserAddress;
