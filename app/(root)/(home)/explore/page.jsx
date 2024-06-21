"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MenuLink } from "@/constants";
import { Rating, Tooltip } from "@mui/material";
import { openLoginModal, closeLoginModal } from "@/store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import StarIcon from '@mui/icons-material/Star';
import RatingModal from "@/components/RatingModal";
import { fetchRatings, fetchReviews } from "@/store/slices/feedbackSlice";
import LoginCard from "@/components/Login";
import ReviewModal from "@/components/ReviewModal";
import { addItem, decrementItem } from "@/store/slices/cartSlice";
import { IoMdAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import Image from "next/image";

const Explorepage = () => {
  const [openRating, setOpenRating] = useState(false);
  const [openReview, setOpenReview] = useState(false);
  const dispatch = useDispatch();
  const { isLoggedIn, openLogin } = useSelector((state) => state.auth);
  const { reviews } = useSelector((state) => state.feedback);
  const { items } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchRatings()); //fetch rating when the component mounts
    dispatch(fetchReviews());
  }, [dispatch]);

  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  const handleDecrementItem = (id) => {
    dispatch(decrementItem(id));
  };

  const handleAddrating = () => {
    if (!isLoggedIn) {
      dispatch(openLoginModal());
    } else {
      setOpenRating(true);
    }
  };

  const handleAddReview = () => {
    if (!isLoggedIn) {
      dispatch(openLoginModal());
    } else {
      setOpenReview(true);
    }
  };

  const n = MenuLink.length;
  const options = { day: "numeric", month: "short", year: "numeric" };

  return (
    <main className="w-full">
      <div className="relative m-auto w-[90%] h-[250px] rounded-xl mt-10">
        <div className="absolute top-0 left-0 w-full h-full  blur-md backgroundDiv rounded-xl"></div>
        <div className="flex flex-col gap-2 items-center justify-center">
          <h1 className="relative text-7xl font-extrabold text-white mt-20">
            Not Subscribed to Plan?
          </h1>
          <p className="relative font-semibold text-white text-xl">
            <span className="text-black">No Problem!</span> But we bet you
            definitely will
          </p>
        </div>
      </div>

      <div className="flex justify-center mt-20">
        <Button className="bg-green-4  text-white font-medium text-base hover:opacity-90 rounded-2xl hover:bg-green-4 hover:text-white">
          Thali
        </Button>
      </div>

      <div className="m-auto w-[80%] mt-20 h-full">
        <div
          className={`grid grid-cols-1 grid-rows-${n} place-content-between gap-5`}
        >
          {MenuLink.map((data) => {
            const itemInCart = items.find((item) => item.id === data.id);
            const discount = Math.floor(
              (1 - data.sellingPrice / data.mrp) * 100
            );

            return (
              <div
                className="flex h-[250px] p-3 rounded-lg"
                style={{ border: "1px solid #0000001A" }}
                key={data.image}
              >
                <div className="w-3/5 flex flex-col gap-4">
                  <div className="flex gap-3 items-center">
                    <Image
                      src={data.img}
                      alt={data.name}
                      width={30}
                      height={30}
                    />
                    <p className="text-sm font-bold text-red-700">
                      {data.main}
                    </p>
                  </div>
                  <h2 className="font-semibold text-2xl">{data.title}</h2>
                  <div className="flex items-center gap-3">
                    <p className="font-semibold text-base line-through text-gray-500">
                      ₹{data.mrp}
                    </p>
                    <p className="font-semibold text-base text-black">
                      ₹{data.sellingPrice}
                    </p>
                    <p className="font-semibold text-xs bg-red-700 rounded-md px-2 text-white">
                      {discount}% off
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <StarIcon className="text-yellow-400" size={23} />
                    <p className="text-sm font-normal">{data.rating}</p>
                  </div>
                  <h5 className="font-normal text-sm">{data.description}</h5>
                </div>
                <div className="w-2/5 flex flex-col items-end relative mr-10">
                  <Image
                    src={data.image}
                    alt={data.name}
                    width={190}
                    height={200}
                    className="rounded-xl"
                  />
                  {itemInCart ? (
                    <Button className="text-green-4 w-28 bg-[#EEEEEE] rounded-md absolute bottom-6 right-9 font-semibold text-xl hover:text-green-4 hover:bg-[#EEEEEE] flex justify-between">
                      <IoMdAdd size={20} onClick={() => handleAddItem(data)} />
                      {itemInCart.quantity}
                      <FiMinus
                        size={20}
                        onClick={() => handleDecrementItem(data.id)}
                      />
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleAddItem(data)}
                      className="text-black w-28 bg-[#EEEEEE] rounded-xl absolute bottom-6 right-9 font-semibold text-xl hover:text-black hover:bg-gray-200"
                    >
                      Add
                    </Button>
                  )}
                  <div className="w-48 mt-3 flex justify-center items-center">
                    <Tooltip
                      title="You can customise the items later in the cart"
                      arrow
                      placement="bottom"
                    >
                      <p className="font-semibold text-gray-400 text-base ml-3 cursor-pointer">
                        Customisable
                      </p>
                    </Tooltip>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-[90%] m-auto mt-20">
        <img
          src="/assets/ellipse.svg"
          alt="long-elipse"
          className="h-full w-full"
        />
      </div>

      <div className="w-[90%] m-auto mt-32">
        <h1 className="text-5xl font-bold text-black text-center">
          Ratings & Reviews
        </h1>
      </div>

      <div className="mt-10 h-36 flex justify-between w-[90%] m-auto">
        <div className="flex flex-col gap-3">
          <h3 className="font-normal text-4xl">Quality</h3>
          <div className="flex flex-row gap-1 items-center justify-center">
            <Rating
              name="half-rating-read"
              defaultValue={4.3}
              precision={0.5}
              readOnly
            />
            <h6 className="text-xl font-normal">4.3</h6>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="font-normal text-4xl">Affordability</h3>
          <div className="flex flex-row gap-1 items-center justify-center">
            <Rating
              name="half-rating-read"
              defaultValue={4.3}
              precision={0.5}
              readOnly
            />
            <h6 className="text-xl font-normal">4.3</h6>
          </div>
        </div>
        <div className="flex flex-col gap-3 items-center">
          <h3 className="font-normal text-4xl">Convenience</h3>
          <div className="flex flex-row gap-1 items-center justify-center">
            <Rating
              name="half-rating-read"
              defaultValue={4.3}
              precision={0.5}
              readOnly
            />
            <h6 className="text-xl font-normal">4.3</h6>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-5 justify-center">
        <Button
          className="bg-green-4 opacity-65 text-white font-medium text-base hover:opacity-90 hover:bg-green-4 hover:text-white"
          onClick={handleAddrating}
        >
          Add Ratings
        </Button>
        <Button
          onClick={handleAddReview}
          className="bg-green-4 opacity-65 text-white font-medium text-base hover:opacity-90 hover:bg-green-4 hover:text-white"
        >
          Write a Review
        </Button>
      </div>

      <div
        className="mt-20 bg-[#F0F0F0B2] rounded-2xl w-[90%] m-auto h-full flex flex-col gap-3 p-5"
        style={{ border: "1px solid #0000001A" }}
      >
        <div className="w-[80%] m-auto">
          {/* =========comment box ============= */}
          <div className="w-[80%] m-auto mt-3">
            {reviews.map((review) => (
              <>
                <div key={review._id} className="flex gap-4 items-center mt-3">
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                  <h5 className="text-base font-bold border-r-2 pr-4 border-black">
                    {review.name}
                  </h5>
                  <h5 className="text-base font-bold">
                    {new Date(review.createdAt)
                      .toLocaleDateString("en-US", options)
                      .replace(",", "")}
                  </h5>
                </div>
                <p className="mt-3 ml-20 text-base font-normal">
                  {review.review}
                </p>
              </>
            ))}
          </div>
        </div>
      </div>

      {openLogin && (
        <LoginCard
          open={openLogin}
          setOpen={() => dispatch(closeLoginModal())}
        />
      )}
      <RatingModal open={openRating} setOpen={setOpenRating} />
      <ReviewModal open={openReview} setOpen={setOpenReview} />
    </main>
  );
};

export default Explorepage;
