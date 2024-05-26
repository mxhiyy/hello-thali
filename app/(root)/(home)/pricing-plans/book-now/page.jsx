"use client"

import { Button } from "@/components/ui/button";
import { IoMdAdd } from "react-icons/io";
import { orderNowCard, tableData } from "@/constants";
import { CircularProgress, Divider, Table, TableCell, TableHead, TableRow } from "@mui/material";
import { useState } from "react";
import { CiStar } from "react-icons/ci";
import { Checkbox } from "@/components/ui/checkbox";
import { SiTicktick } from "react-icons/si";

const buttons = [
  {
    id: 1,
    name: 'Monday'
  },
  {
    id:2, 
    name: "Tuesday"
  },
  {
    id: 3, 
    name: "Wednesday"
  },
  {
    id: 4, 
    name: "Thursday"
  },
  {
    id: 5,
    name: "Friday"
  },
  {
    id:6,
    name: "Saturday"
  },
  {
    id: 7,
    name: "Sunday"
  }
]

const BookNowpage = () => {
  const [ selectedButton, setSelectedButton ] = useState("Monday");
  const [ loading, setLoading ] = useState(false);

  const handleButtonSubmit = (name) => {
    setSelectedButton(name);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);

  }
  return (
   <main>
    <div className="w-[90%] m-auto bg-[#F8F8F8AD] h-full p-3 flex flex-col gap-3 rounded-md">
      <h1 className="font-normal text-6xl text-center text-green-5">How We Offer Customisation?</h1>
      <h6 className="text-center text-[#A31111] font-semibold text-3xl">Just like our mom does in our family.</h6>
      <p className="text-center text-lg font-semibold w-[80%] m-auto">In each thali you get some item permanently such as Roti, Rice, Boondi Raita, Pickel/Chatni, Salad, Dal. Apart from that we offer customisation of one main sabji to our customers. You can choose any one sabji for any week-days and Submit the preferences.  </p>
    </div>

    <div className="grid grid-cols-7 grid-rows-1 w-[90%] m-auto mt-20">
      {
        buttons.map((data) => (
          <Button className={`text-lg font-semibold w-32 text-white  ${selectedButton === data.name ? "bg-[#082206BA] hover:bg-[#082206BA]" : "opacity-65 bg-green-4 hover:bg-green-4"} hover:text-white`} key={data.id} onClick={() => handleButtonSubmit(data.name)}>{data.name}</Button>
        ))
      }
    </div>
    <p className="text-sm font-medium w-[90%] m-auto mt-5"><span className="font-bold">Note : </span>Currently We Are Serving Only Dinner , Once We Become Operationally Efficient, We Will Expand To Lunch & Breakfast.</p>

    <div className="mt-10">
      {loading && (<div className='flex justify-center items-center'><CircularProgress /></div>)}

      {!loading && selectedButton && (
        <div  className="grid grid-cols-3 grid-rows-2 w-[90%] m-auto mt-20 gap-40">
          {orderNowCard[selectedButton].map((data) => (
            <div className="rounded-md w-[350px] h-[430px] p-3 relative" style={{ border: '1px solid #0000001A'}}>
              <img  src={data.image} alt={data.heading} width={350} />
              <img className="absolute top-5 left-5" src="/assets/veg.svg" />
              <div className="mt-2 flex justify-between items-center">
                <h5 className="font-semibold text-2xl">{data.heading}</h5>
                <p className="font-semibold text-[#FF0000FA] text-sm">{data.main}</p>
              </div>
              <p className="font-light text-xs mt-2">{data.description}</p>
              {data.mrp && (
                <div className="flex items-center gap-2 mt-2">
                <IoMdAdd />
                <p className="font-semibold line-through text-gray-500">₹{data.mrp}</p>
                <p className="font-semibold">₹{data.sellingPrice}</p>
              </div>
              )}

              <div className="flex justify-between items-center w-[90%] absolute bottom-2">
                <div className="flex gap-2 items-center">
                  <CiStar size={23} className="text-green-5" />
                  <p className="font-light text-sm">4.9</p>
                </div>
                <Button className='bg-green-4 opacity-65 text-white font-semibold text-lg'>Add</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>

    <div className="mt-20 w-[90%] m-auto">
      <h1 className="text-green-5 text-center font-normal text-4xl" style={{ fontFamily: "Inter"}}>Tabular Representation of Your Preferences</h1>
    </div>
    <div className="mt-10 w-[90%] m-auto flex justify-center">
      <Table sx={{ maxWidth: '100%', borderTopLeftRadius: "12px", borderTopRightRadius: "12px"}} >
        <TableHead>
          <TableRow>
            {tableData.map((data) => (
              <TableCell key={data.heading} style={{ fontFamily: "Inter", border: "1px solid gray", background: "#B9B9B9"}} className="font-semibold text-xs p-3 bg-opacity-60">{data.heading}</TableCell>
            ))}
          </TableRow>
        </TableHead>

      </Table>
    </div>

    <div className="w-[90%] m-auto flex flex-col gap-3 mt-10">
      <div className="flex gap-2 items-center">
      <Checkbox id="terms1" />
      <label
        htmlFor="terms1"
        className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        I understand that the term “Both” in the Tabular representation means “3 Roti and Half-Bowl Rice Combined”.
      </label>
      </div>

      <div className="flex gap-2 items-center">
      <Checkbox id="terms1" />
      <label
        htmlFor="terms1"
        className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        I understand that this plan includes only Dinner.”.
      </label>
      </div>
    </div>

    <div className="w-[90%] m-auto mt-20 flex justify-end">
      <div className="w-[350px] h-[500px] rounded-xl flex flex-col gap-2 border-2 border-black bg-[#FAF9F9] p-5" style={{ border: '1px solid #0000001A'}}>
        <h6 className="font-normal text-xl">Enter Promo Code</h6>
        <div className="flex items-center gap-3">
          <input type="text" className="p-2 w-48 rounded-md" placeholder="Promo Code" style={{ outline: 'none'}} />
          <p className="text-green-4 text-xs font-bold flex gap-1 items-center">Applied <SiTicktick color="bg-green-4" /></p>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-xl">Bill Details</h3>
          <div className="flex justify-between">
            <h1 className="font-normal text-sm">Item Total</h1>
            <h1 className="font-normal text-sm">₹ 940</h1>
          </div>
          <div className="flex justify-between">
            <h1 className="font-normal text-sm">Delivery Fee</h1>
            <h1 className="font-normal text-sm">₹ 175</h1>
          </div>
          <Divider sx={{backgroundColor: 'black'}} />
          <div className="flex justify-between">
            <h1 className="font-normal text-sm">Item Discount</h1>
            <h1 className="font-normal text-sm">-₹ 300</h1>
          </div>
          <div className="flex justify-between">
            <h1 className="font-normal text-sm">Delivery Discount</h1>
            <h1 className="font-normal text-sm">-₹ 175</h1>
          </div>
          <div className="flex justify-between">
            <h1 className="font-normal text-sm">GST and Restaurant Charges</h1>
            <h1 className="font-normal text-sm">₹ 8.09</h1>
          </div>

          <div className="flex justify-between">
            <h1 className="font-bold text-xl">TO PAY</h1>
            <h1 className="font-bold text-xl">₹ 648</h1>
          </div>

          <Button className='bg-green-4 bg-opacity-60 text-white rounded-xl text-lg font-extrabold hover:bg-green-4'>CHECKOUT</Button>
          <div className="mt-2 bg-gray-5 h-4"><p className="text-xs text-green-4 font-bold text-center">Savings of ₹475</p></div>
        
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-sm">Cancellation Policy</h1>
            <p className="font-normal text-xs">Orders cannot be cancelled once packed for delivery. In case of unexpected delays, a refund will be provided, if applicable.</p>
          </div>
        </div>
      </div>
    </div>

    <div className="w-[90%] m-auto bg-[#7997000F] h-full mt-20 flex flex-col gap-10 p-5 rounded-md">
      <h1 className="text-4xl font-bold">Need Help? Do not hesitate Dialing us:  +91 80033XX57XX4</h1>
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold">HelloThali's Mission to Bring Affordable Thali to every Customer. Good Food is like a warm hug, it nourishes the soul. </h1>
      </div>
    </div>
   </main>
  )
}

export default BookNowpage