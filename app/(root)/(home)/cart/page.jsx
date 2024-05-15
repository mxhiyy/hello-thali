'use client'

import { Divider } from "@mui/material";
import { IoMdAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";

const CardPage = () => {
    const [ countItems, setCountItems ] = useState(1);
    const cartItems = useSelector((state) => state.cart.items);

    // if(cartItems.length > 0){
    //     const lastCartItemIndex = cartItems.length - 1;
    //     cartItems["Thali"][lastCartItemIndex].divider = false;
    // };

    return(
        <main className="w-full h-full">
            <div className="w-full mt-20 flex">
                <div className="w-3/5 h-1/2">
                    <h1 className="text-3xl ml-10 font-medium">Cart</h1>
                    <div className="mt-6 w-[90%] h-full m-auto border-2 border-gray p-2 rounded-xl flex flex-col mb-2">
                        {
                            cartItems.map((item) => {
                                return(
                                 <>
                                    <div className="flex justify-between items-center" key={item.name}>
                                        <div className="flex gap-4 items-center">
                                            <img src={item.img} alt="cart-images" className="h-28 w-28 m-3 rounded-xl"  />
                                            <h6 className="font-semibold text-base">{item.name}</h6>
                                        </div>

                                        <div className="flex justify-between items-center w-2/5">
                                            <div className="w-24 flex justify-between items-center border-2 border-gray-2 ">
                                                <IoMdAdd className="cursor-pointer bg-green-1 text-white" size={25} onClick={() => setCountItems(countItems + 1)} />
                                                <p className="text-base font-normal">{countItems}</p>
                                                <button><FiMinus className="cursor-pointer bg-green-1 text-white" size={25}  onClick={() => setCountItems(countItems - 1)} /></button>
                                            </div>

                                            <h3 className="text-base font-medium">₹ {item.sellingPrice}</h3>
                                             
                                            <IoCloseSharp size={20} className="cursor-pointer bg-gray-2 m-3 text-green-1 rounded-3xl"/>
                                        </div>

                                    </div>
                                    {item.divider && (<Divider />)}
                                 </>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="w-2/5 h-1/2">
                    <h1 className="text-3xl ml-10 font-medium">Order Summary</h1>
                    <div className="mt-6 w-[90%] h-full m-auto p-2 flex flex-col mb-2">
                        <input type="text" placeholder="Enter Coupen" className="p-3 rounded-md bg-gray-2 text-gray-400 font-semibold" style={{ outline: 'none' }} />
                        <Divider style={{ marginTop: '10px'}} />
                        <div className="mt-5 flex flex-col gap-4">
                            <div className="flex w-full justify-between items-center"><h5 className="text-base font-medium">Subtotal</h5> <h5 className="text-base font-medium">₹ 100</h5></div>
                            <div className="flex w-full justify-between items-center"><h5 className="text-base font-medium">Shipping</h5> <h5 className="text-base font-medium">₹ 10</h5></div>
                        </div>
                        <Divider style={{ marginTop: '10px'}} />

                        <div className="flex w-full justify-between items-center mt-5"><h5 className="text-base font-semibold">Total</h5> <h5 className="text-base font-semibold">₹ 110</h5></div>
                        <button className="w-full p-3 rounded-xl mt-10 text-white font-semibold text-base bg-green-1">Checkout</button>

                        <div className="mt-5 flex justify-between items-center">
                            <div className="w-2/5 border-t-2 border-gray"></div>
                            <p className="text-base font-medium text-gray">OR</p>
                            <div className="w-2/5 border-t-2 border-gray"></div>
                        </div>

                        <button className="w-full p-2 rounded-xl mt-6 flex justify-center items-center gap-2 font-semibold text-base border-2 border-green-1 text-green-1 "><Image src={"/icons/paypal-icon.png"} alt="paypal-icon" height={30} width={30} />Pay with PayPal</button>
                        
                    </div>
                </div>
            </div>
        </main>
    )

}

export default CardPage;