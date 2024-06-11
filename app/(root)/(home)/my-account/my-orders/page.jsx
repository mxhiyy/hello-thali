"use client";

import React, { useState } from "react";
import { Button } from "@mui/material";
import Menu from "@mui/material/Menu";
import { useSelector } from "react-redux";
import { IoFilterSharp } from "react-icons/io5";
import { orderedItem } from "@/constants";
import OrderCard from '@/components/OrderCard';

const Orderspage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const { user } = useSelector((state) => state.auth);
  return (
    <main>
      <div className="flex gap-3 justify-center items-center mt-5">
        <div className="flex w-[80%] rounded-md border-2 border-gray-2 shadow-lg">
          <input
            className="w-[75%] outline-none p-3 placeholder:text-gray-500"
            type="text"
            placeholder="Search your Orders here..."
          />
          <Button className="text-base w-48 bg-gray-6 text-black hover:bg-gray-6">
            Search Orders
          </Button>
        </div>
        <div>
          <Button
            id="basic-button"
            startIcon={<IoFilterSharp />}
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            className="text-gray-500 text-sm font-medium"
          >
            Filters
          </Button>{" "}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <div className="w-[200px] h-auto p-5 flex flex-col gap-1">
              <h1>Order Status</h1>
              <div className="flex flex-col gap-1">
                <div className="flex gap-2 items-center">
                  <input type="checkbox" name="on-the-way" />{" "}
                  <p
                    id="on-the-way"
                    className="text-sm font-medium text-green-4"
                  >
                    On the way
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <input type="checkbox" />{" "}
                  <p className="text-sm font-medium text-green-4">Delivered</p>
                </div>
                <div className="flex gap-2 items-center">
                  <input type="checkbox" />{" "}
                  <p className="text-sm font-medium text-green-4">Cancelled</p>
                </div>
              </div>

              <h1 className="mt-5">Order Time</h1>
              <div className="flex flex-col gap-1">
                <div className="flex gap-2 items-center">
                  <input type="checkbox" name="on-the-way" />{" "}
                  <p
                    id="on-the-way"
                    className="text-sm font-medium text-green-4"
                  >
                    Last 30 days
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <input type="checkbox" />{" "}
                  <p className="text-sm font-medium text-green-4">
                    Last 6 months
                  </p>
                </div>
              </div>
            </div>
          </Menu>
        </div>
      </div>

      {/* ======= ordered items here ======== */}
      <div className="w-[90%] m-auto mt-5">
        {orderedItem.map((data) => {
          return (
            <OrderCard data={data} key={data.orderId} />
          );
        })}
      </div>
    </main>
  );
};

export default Orderspage;
