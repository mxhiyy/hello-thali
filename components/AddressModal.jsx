"use client";

import React from "react";
import { Modal } from "@mui/material";

const AddressModal = ({ open, setIsOpen }) => {

  const handleClose = () => {
    setIsOpen(false);
  };
  
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex justify-center items-center"
      >
        <div
          className={`rounded-md bg-white w-[500px] h-[400px] flex flex-col gap-3 p-5`}
        ></div>
      </Modal>
    </div>
  );
};

export default AddressModal;
