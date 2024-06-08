"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRating } from "@/store/slices/feedbackSlice";
import { Button } from "./ui/button";
import { Rating, Modal, CircularProgress } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";

const RatingModal = ({ open, setOpen }) => {
  const [quality, setQuality] = useState(0);
  const [affordability, setAffordability] = useState(0);
  const [convenience, setConvenience] = useState(0);
  const { loading } = useSelector((state) => state.feedback);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if(!quality && !affordability && !convenience){
      toast.error('Choose at least One')
    }
    else{
      const result = await dispatch(
        addRating({ quality, affordability, convenience })
      );
      if (addRating.fulfilled.match(result)) {
        setOpen(false);
      } else {
        toast.error("Failed to Submit rating!");
      }
    }
  };

  return (
    <>
    <Toaster />
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex justify-center items-center"
    >
      <div
        className={`rounded-md bg-white w-[500px] h-auto flex flex-col gap-3 p-5`}
      >
        <h4 className="font-semibold text-2xl text-center">Rate The Product</h4>
        <div className="flex justify-between items-center gap-2">
          <div className="flex flex-col items-center gap-1">
            <h2 className="text-base font-normal">Quality</h2>
            <Rating
              value={quality}
              onChange={(e, newValue) => setQuality(newValue)}
            />
          </div>

          <div className="flex flex-col items-center gap-1">
            <h2 className="text-base font-normal">Affordability</h2>
            <Rating
              value={affordability}
              onChange={(e, newValue) => setAffordability(newValue)}
            />
          </div>

          <div className="flex flex-col items-center gap-1">
            <h2 className="text-base font-normal">Convenience</h2>
            <Rating
              value={convenience}
              onChange={(e, newValue) => setConvenience(newValue)}
            />
          </div>

        </div>
          <div className="flex justify-center items-center mt-5">
            <Button
              className="w-32 bg-green-4 opacity-65 text-base text-white border-none hover:bg-green-4 hover:opacity-100"
              onClick={handleSubmit}
            >
               {loading && (
                  <CircularProgress
                    size={20}
                    style={{ marginRight: "5px", color: "white" }}
                  />
                )}
              Add a Rating
            </Button>
          </div>
      </div>
    </Modal>
    </>
  );
};

export default RatingModal;
