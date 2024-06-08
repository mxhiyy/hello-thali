"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReview } from "@/store/slices/feedbackSlice";
import { Button } from "./ui/button";
import toast, { Toaster } from "react-hot-toast";
import { CircularProgress, Modal } from "@mui/material";

const ReviewModal = ({ open, setOpen }) => {
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const { loading } = useSelector((state) => state.feedback);
  const dispatch = useDispatch();

  const handleReviewChange = (e) => {
    const words = e.target.value.split(/\s+/).filter((word) => word.length > 0);
    setReview(e.target.value);
    setWordCount(words.length);
  };

  const handleSubmit = async () => {
    if (!name) {
      toast.error("Please enter a Name");
    } else if (!review) {
      toast.error("Please Enter a review");
    } else if (wordCount < 15) {
      toast.error('Review should be at least 15 words')
    } else {
      const result = await dispatch(addReview({ name, review }));
      if (addReview.fulfilled.match(result)) {
        setOpen(false);
      } else {
        toast.error("Failed to submit review!");
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
          <h1 className="font-semibold text-2xl text-center">Write a Review</h1>
          <input
            type="text"
            placeholder="Enter Your Name"
            className="p-2 rounded-md border-2 border-gray-200 outline-none placeholder:text-gray-400"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            placeholder="Enter a Review"
            rows={3}
            cols={6}
            className="p-2 rounded border-2  border-gray-200 outline-none placeholder:text-gray-400"
            value={review}
            onChange={handleReviewChange}
          />
          <p className={`text-right ${wordCount < 15 ? 'text-red-500' : ''}`}>
            {wordCount < 15 
              ? `${15 - wordCount} words left` 
              : ''}
          </p>
          <Button
            className="bg-green-4 opacity-65 hover:bg-green-4 hover:opacity-100 text-white font-medium text-lg"
            onClick={handleSubmit}
          >
            {loading && (
                  <CircularProgress
                    size={20}
                    style={{ marginRight: "5px", color: "white" }}
                  />
                )}
            Add a Review
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ReviewModal;
