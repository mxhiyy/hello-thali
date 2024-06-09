"use client";

import { Divider, Modal } from "@mui/material";
import { IoMdAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import { Button } from "@/components/ui/button";
import { MdDeleteForever } from "react-icons/md";
import { SiTicktick } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  addItem,
  decrementItem,
  removeItem,
  updateCustomisation,
} from "@/store/slices/cartSlice";
import { FaLeftLong } from "react-icons/fa6";

const CartPage = () => {
  const dispatch = useDispatch();
  const { items, totalQuantity } = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const handleUpdateCustomisation = (id, customisation) => {
    dispatch(updateCustomisation({ id, customisation }));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  const handleDecrementItem = (id) => {
    dispatch(decrementItem(id));
  };

  const calculateItemTotal = () => {
    return items.reduce((total, item) => total + item.mrp * item.quantity, 0);
  };

  const calcuateSellingTotal = () => {
    return items.reduce(
      (total, item) => total + item.sellingPrice * item.quantity,
      0
    );
  };

  const calculateItemDiscount = () => {
    return items.reduce(
      (total, item) => total + (item.mrp - item.sellingPrice) * item.quantity,
      0
    );
  };

  const itemTotal = calculateItemTotal();
  const itemDiscount = calculateItemDiscount();
  const sellingPriceTotal = calcuateSellingTotal();
  const deliveryFee = 25;
  const deliveryDiscount = 20;
  const gstCharges = (
    (itemTotal + deliveryFee - itemDiscount - deliveryDiscount) *
    0.05
  ).toFixed(2);
  const toPay = (
    itemTotal +
    deliveryFee -
    itemDiscount -
    deliveryDiscount +
    parseFloat(gstCharges)
  ).toFixed(2);
  const savings = itemDiscount + deliveryDiscount;

  return (
    <main className="w-full h-full">
      <div
        className="flex flex-col gap-7 w-[90%] m-auto"
        style={{ fontFamily: "Inter" }}
      >
        <h1 className="font-normal text-7xl">Your Cart</h1>
        <div className="flex justify-between text-base font-normal">
          <div className="flex items-center gap-2 cursor-pointer underline text-green-4 decoration-green-4 underline-offset-2">
            <FaLeftLong />
            <h6 onClick={() => router.push("/explore")}>Continue Shopping</h6>
          </div>
          <h6>{totalQuantity} Items</h6>
          <h6>Need Help? Call +91 80033XX0XX</h6>
        </div>
      </div>
      <div className="w-[90%] m-auto">
        <Divider sx={{ border: "1px solid black" }} />
      </div>

      <div className="w-[90%] m-auto flex gap-4 mt-20">
        <div className="w-[85%] overflow-y-auto max-h-[600px] ">
          {items.length > 0 ? (
            items.map((item) => {
              const discount = Math.floor(
                (1 - item.sellingPrice / item.mrp) * 100
              );
              console.log(item);
              return (
                <div className="flex gap-2 mt-5" key={item.id}>
                  <div
                    className="flex w-[80%] h-[200px] p-3 rounded-lg"
                    style={{ border: "1px solid #0000001A" }}
                  >
                    <div className="w-3/5 flex flex-col gap-2">
                      <div className="flex gap-3 items-center">
                        <img
                          src="/assets/veg.svg"
                          alt="veg"
                          width={30}
                          height={30}
                        />
                        <p className="text-sm font-bold text-red-700">
                          {item.main}
                        </p>
                      </div>
                      <h2 className="font-semibold text-2xl">{item.title}</h2>
                      <div className="flex items-center gap-3">
                        <p className="font-semibold text-base line-through text-gray-500">
                          {item.mrp}
                        </p>
                        <p className="font-semibold text-base text-black">
                          ₹ {item.sellingPrice}
                        </p>
                        <p className="font-semibold text-xs bg-red-700 rounded-md px-2 text-white">
                          {discount}% off
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <StarIcon className="text-yellow-400" size={23} />
                        <p className="text-sm font-light">{item.rating}</p>
                      </div>
                      <h5 className="font-normal text-sm">
                        {item.description}
                      </h5>
                    </div>
                    <div className="w-2/5 flex flex-col relative items-end mr-10">
                      <div>
                        <img
                          src={item.image}
                          alt="paneer"
                          width={150}
                          height={150}
                          className="rounded-xl"
                        />
                        <Button className="text-green-4 w-28 bg-[#EEEEEE] rounded-md absolute bottom-4 right-5 font-semibold text-xl hover:text-green-4 hover:bg-[#EEEEEE] flex justify-between">
                          <IoMdAdd
                            size={20}
                            onClick={() => handleAddItem(item)}
                          />
                          {item.quantity}
                          <FiMinus
                            size={20}
                            onClick={() => handleDecrementItem(item.id)}
                          />
                        </Button>
                        <div className="mt-3 flex justify-center items-center">
                          <p
                            onClick={handleOpen}
                            className="text-center font-semibold cursor-pointer bg-green-4 opacity-65 text-white text-[10px] p-[0.8px] rounded-2xl w-24"
                          >
                            Customisable Now
                          </p>
                        </div>

                        <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                          className="flex justify-center items-center"
                        >
                          <div
                            className={`rounded-md bg-white w-[800px] h-[350px] flex flex-col gap-7 p-5`}
                          >
                            <h1 className="font-bold text-center text-4xl text-green-4 opacity-65">
                              Customise as per your taste
                            </h1>
                            <div className="text-xl font-bold flex justify-between w-96">
                              <p>Matar Paneer</p> | <p>₹ 130</p>
                            </div>
                            <div className="flex justify-between">
                              <div className="w-[450px] bg-[#E3E3E380] p-5 rounded-md">
                                <form className="flex flex-col gap-5">
                                  <div className="flex justify-between">
                                    <div className="flex gap-2">
                                      <img
                                        src="/assets/veg.svg"
                                        alt="veg"
                                        width={30}
                                        height={30}
                                      />
                                      <label
                                        className="font-bold text-lg"
                                        id="option1"
                                      >
                                        3 Roti & Half-Bowl Rice
                                      </label>
                                    </div>
                                    <input
                                      type="radio"
                                      id="option1"
                                      name="options"
                                      placeholder="w-30 h-30"
                                      onChange={(e) =>
                                        handleUpdateCustomisation(
                                          "item-id",
                                          e.target.value
                                        )
                                      }
                                      value="Roti & Half-Bowl Rice"
                                    />
                                  </div>

                                  <div className="flex justify-between">
                                    <div className="flex gap-2">
                                      <img
                                        src="/assets/veg.svg"
                                        alt="veg"
                                        width={30}
                                        height={30}
                                      />
                                      <label
                                        className="font-bold text-lg"
                                        id="option1"
                                      >
                                        6 Roti
                                      </label>
                                    </div>
                                    <input
                                      type="radio"
                                      id="option1"
                                      name="options"
                                      placeholder="w-30 h-30"
                                      onChange={(e) =>
                                        handleUpdateCustomisation(
                                          "item-id",
                                          e.target.value
                                        )
                                      }
                                      value="6 Roti"
                                    />
                                  </div>

                                  <div className="flex justify-between">
                                    <div className="flex gap-2">
                                      <img
                                        src="/assets/veg.svg"
                                        alt="veg"
                                        width={30}
                                        height={30}
                                      />
                                      <label
                                        className="font-bold text-lg"
                                        id="option1"
                                      >
                                        Full Bowl Rice
                                      </label>
                                    </div>
                                    <input
                                      type="radio"
                                      id="option1"
                                      name="options"
                                      placeholder="w-30 h-30"
                                      onChange={(e) =>
                                        handleUpdateCustomisation(
                                          "item-id",
                                          e.target.value
                                        )
                                      }
                                      value="Full Bowl Rice"
                                    />
                                  </div>
                                </form>
                              </div>

                              <div className="flex flex-col justify-end w-[250px]">
                                <div className="w-full flex flex-col gap-1 items-center justify-center">
                                  <p className="font-bold text-[#B10000] text-sm">
                                    Customisation at No Extra Cost
                                  </p>
                                  <Button
                                    className="bg-green-4 opacity-65 hover:bg-green-4 text-white text-xl font-semibold"
                                    onClick={handleClose}
                                  >
                                    Update Items
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Modal>
                      </div>
                    </div>
                  </div>

                  {/* Delete secion================== */}
                  <div
                    className="w-5 rounded-md cursor-pointer bg-[#EFEDED] flex items-center justify-center"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <MdDeleteForever className="text-black" />
                  </div>
                </div>
              );
            })
          ) : (
            <div>No cart items, Please select items from Menu </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="w-[30%] mt-5">
            <div
              className="w-[350px] h-[500px] rounded-xl flex flex-col gap-2 border-2 border-black bg-[#FAF9F9] p-5"
              style={{ border: "1px solid #0000001A" }}
            >
              <h6 className="font-normal text-xl">Enter Promo Code</h6>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  className="p-2 w-48 rounded-md"
                  placeholder="Promo Code"
                  style={{ outline: "none" }}
                />
                <p className="text-green-4 text-xs font-bold flex gap-1 items-center">
                  Applied <SiTicktick color="bg-green-4" />
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-bold text-xl">Bill Details</h3>
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <h1 className="font-medium text-sm">Item Total</h1>
                    <div className="px-1 bg-blue-100 rounded-md"><p className="font-semibold text-xs text-blue-500">Saved ₹{itemDiscount} </p></div>
                  </div>
                  <div className="flex gap-2">
                    <h1 className="font-medium text-sm line-through">
                      ₹ {itemTotal}
                    </h1>
                    <h1 className="font-medium text-sm">
                      ₹ {sellingPriceTotal}
                    </h1>
                  </div>
                </div>
                <div className="flex justify-between">
                  <h1 className="font-medium text-sm">Delivery Fee</h1>
                  <h1 className="font-medium text-sm">₹ {deliveryFee}</h1>
                </div>
                <Divider sx={{ backgroundColor: "black" }} />
                <div className="flex justify-between">
                  <h1 className="font-medium text-sm">Delivery Discount</h1>
                  <h1 className="font-medium text-sm">-₹ {deliveryDiscount}</h1>
                </div>
                <div className="flex justify-between">
                  <h1 className="font-medium text-sm">
                    GST and Restaurant Charges
                  </h1>
                  <h1 className="font-medium text-sm">₹ {gstCharges}</h1>
                </div>

                <div className="flex justify-between">
                  <h1 className="font-bold text-xl">TO PAY</h1>
                  <h1 className="font-bold text-xl">₹ {toPay}</h1>
                </div>

                <Button className="bg-green-4 bg-opacity-60 text-white rounded-xl text-lg font-extrabold hover:bg-green-4">
                  CHECKOUT
                </Button>
                <div className="mt-2 bg-gray-5 h-4">
                  <p className="text-xs text-green-4 font-bold text-center">
                    Savings of ₹{savings}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <h1 className="font-bold text-sm">Cancellation Policy</h1>
                  <p className="font-normal text-xs">
                    Orders cannot be cancelled once packed for delivery. In case
                    of unexpected delays, a refund will be provided, if
                    applicable.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default CartPage;
