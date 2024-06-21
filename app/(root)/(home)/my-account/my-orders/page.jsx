"use client";

import React, { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import Menu from "@mui/material/Menu";
import { fetchOrders } from "../../../../../store/slices/orderSlice";
import { IoFilterSharp } from "react-icons/io5";
import OrderCard from "@/components/OrderCard";

const Orderspage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState([]);
  const [filterTime, setFilterTime] = useState(null);
  const dispatch = useDispatch();
  const { orders, status, error } = useSelector((state) => state.order);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStatusChange = (status) => {
    setFilterStatus((prevStatus) => {
      if (prevStatus.includes(status)) {
        return prevStatus.filter((s) => s !== status);
      } else {
        return [...prevStatus, status];
      }
    });
  };

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  useEffect(() => {
    let filtered = orders;

    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.orderID.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.totalPrice.toString().includes(searchTerm) ||
          order.items.some((item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    if (filterStatus.length > 0) {
      filtered = filtered.filter((order) =>
        filterStatus.includes(order.status)
      );
    }

    if (filterTime) {
      const now = new Date();
      if (filterTime === "Last 30 days") {
        filtered = filtered.filter(
          (order) =>
            (now - new Date(order.createdAt)) / (1000 * 60 * 60 * 24) <= 30
        );
      } else if (filterTime === "Last 6 months") {
        filtered = filtered.filter(
          (order) =>
            (now - new Date(order.createdAt)) / (1000 * 60 * 60 * 24) <= 180
        );
      }
    }

    setFilteredOrders(filtered);
  }, [orders, searchTerm, filterStatus, filterTime]);

  if (status === "loading") {
    return <CircularProgress size={25} style={{ color: "white" }} />;
  }

  if (status === "failed") {
    return <div>Error: {error?.message || "Unknown error"}</div>;
  }

  return (
    <main>
      <div className="flex gap-4 justify-center items-center mt-5">
        <div className="flex w-[81%] justify-between rounded-md border-2 border-gray-2 shadow-lg">
          <input
            className="w-[75%] outline-none p-2 placeholder:text-gray-500"
            type="text"
            placeholder="Search your Orders here..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setFilteredOrders(filteredOrders);
              }
            }}
          />
          <Button
            onClick={() => setFilteredOrders(filteredOrders)}
            className="text-base w-48  bg-gray-6 text-black hover:bg-gray-6"
          >
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
            className="bg-green-4 text-white hover:bg-green-4 text-sm font-medium"
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
                  <input
                    type="checkbox"
                    name="Pending"
                    onChange={() => handleStatusChange("Pending")}
                  />
                  <p className="text-sm font-medium text-green-4">Pending</p>
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    name="Delivered"
                    onChange={() => handleStatusChange("Delivered")}
                  />
                  <p className="text-sm font-medium text-green-4">Delivered</p>
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    name="Cancelled"
                    onChange={() => handleStatusChange("Cancelled")}
                  />
                  <p className="text-sm font-medium text-green-4">Cancelled</p>
                </div>
              </div>

              <h1 className="mt-5">Order Time</h1>
              <div className="flex flex-col gap-1">
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    name="Last 30 days"
                    onChange={() => setFilterTime("Last 30 days")}
                  />
                  <p className="text-sm font-medium text-green-4">
                    Last 30 days
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    name="Last 6 months"
                    onChange={() => setFilterTime("Last 6 months")}
                  />
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
      <div className="w-[90%] m-auto mt-5 overflow-y-auto max-h-[300px] pr-5">
      {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <OrderCard data={order} key={order.orderID} />
          ))
        ) : (
          <div>No orders found</div>
        )}
      </div>
    </main>
  );
};

export default Orderspage;
