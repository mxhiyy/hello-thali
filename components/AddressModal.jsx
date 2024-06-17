"use client";

import React, { useState, useRef, useEffect } from "react";
import { Divider, Modal } from "@mui/material";
import { IoHomeSharp, IoAddSharp } from "react-icons/io5";
import { HiOfficeBuilding } from "react-icons/hi";
import { FaHotel } from "react-icons/fa";
import { FaLocationArrow } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import axios from "axios";
import { cn } from "@/lib/utils";

const AddressButtons = [
  {
    name: "Home",
    icon: <IoHomeSharp size={25} />,
  },
  {
    name: "Office",
    icon: <HiOfficeBuilding size={25} />,
  },
  {
    name: "Hotel",
    icon: <FaHotel size={25} />,
  },
  {
    name: "Other",
    icon: <FaLocationArrow size={25} />,
  },
];

const AddressModal = ({
  open,
  setIsOpen,
  setUserAddress,
  userAddress,
  index,
  editAddress,
}) => {
  const [selectedButton, setSelectedButton] = useState("Home");
  const [isOtherActive, setIsOtherActive] = useState(false);
  const [mapCenter, setMapCenter] = useState({
    lat: 31.2529524,
    lng: 75.6982033,
  });
  const [markerPosition, setMarkerPosition] = useState({
    lat: 31.2529524,
    lng: 75.6982033,
  });
  const [address, setAddress] = useState({
    houseNumber: "",
    pinCode: "144411",
    area: "",
    landmark: "",
    name: "",
    phone: "",
    other: "",
  });
  const [error, setError] = useState("");
  const [outsideDeliveryArea, setOutsideDeliveryArea] = useState(false);
  const autocompleteRef = useRef(null);

  useEffect(() => {
    if (userAddress) {
      setAddress(userAddress);
      setMapCenter({ lat: userAddress.lat, lng: userAddress.lng });
      setMarkerPosition({ lat: userAddress.lat, lng: userAddress.lng });
      if (userAddress.other) {
        setIsOtherActive(true);
        setSelectedButton("Other");
      }
    }
  }, [userAddress]);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
      setError("Google Maps API key is missing");
    }
  }, []);

  const handleSelectedButton = (button) => {
    if (button === "Other") {
      setIsOtherActive(!isOtherActive);
    } else {
      setSelectedButton(button);
      setIsOtherActive(false);
      setAddress((prev) => ({ ...prev, other: "" }));
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleMarkerDragEnd = async (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setMarkerPosition({ lat, lng });
    updateAddressFromCoordinates(lat, lng);
  };

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place.geometry) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setMapCenter({ lat, lng });
      setMarkerPosition({ lat, lng });
      updateAddressFromCoordinates(lat, lng);
    }
  };

  const updateAddressFromCoordinates = async (lat, lng) => {
    try {
      const res = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
      );

      if (res.data.status === "OK") {
        const result = res.data.results[0];
        const area = result.address_components.find((component) =>
          component.types.includes("sublocality_level_1")
        );
        const pinCode = result.address_components.find((component) =>
          component.types.includes("postal_code")
        );

        const newPinCode = pinCode ? pinCode.long_name : "";

        setAddress((prev) => ({
          ...prev,
          area: area ? area.long_name : "",
          pinCode: newPinCode,
        }));

        setOutsideDeliveryArea(newPinCode !== "144411");
      }
    } catch (error) {
      setError("Failed to fetch address from coordinates");
    }
  };

  const handleInputChange = async (field, value) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
    if (field === "area" || field === "pinCode") {
      try {
        const res = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${value}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
        );

        if (res.data.status === "OK") {
          const location = res.data.results[0].geometry.location;
          setMapCenter({ lat: location.lat, lng: location.lng });
          setMarkerPosition({ lat: location.lat, lng: location.lng });
        }
      } catch (error) {
        setError("Failed to fetch coordinates from address");
      }
    }
  };

  const handleSaveAddress = () => {
    if (
      !address.houseNumber ||
      !address.pinCode ||
      !address.area ||
      !address.name ||
      !address.phone
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (address.pinCode !== "144411") {
      alert("We only deliver to Law Gate, Phagwara, Punjab (144411).");
      return;
    }

    const newAddress = {
      ...address,
      type: selectedButton,
      lat: markerPosition.lat,
      lng: markerPosition.lng,
    };

    if (index >= 0) {
      editAddress(newAddress, index);
    } else {
      setUserAddress(newAddress);
    }
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
        <div className={`rounded-md bg-white w-[1100px] h-auto flex`}>
          {error && <p className="text-red-500">{error}</p>}
          <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
            libraries={["places"]}
          >
            <div className="relative h-auto w-3/5">
              <div className="absolute top-0 left-0 w-full z-10 p-2">
                <Autocomplete
                  onLoad={(ref) => (autocompleteRef.current = ref)}
                  onPlaceChanged={handlePlaceChanged}
                >
                  <input
                    type="text"
                    placeholder="Search a place"
                    className="w-full p-2 border-2 border-gray-300 rounded-md"
                  />
                </Autocomplete>
              </div>
              <GoogleMap
                key={open ? "open-map" : "closed-map"} // Force re-render
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center={mapCenter}
                zoom={15}
              >
                <Marker
                  position={markerPosition}
                  onDragEnd={handleMarkerDragEnd}
                  draggable
                />
              </GoogleMap>
            </div>
          </LoadScript>

          <div
            className="h-auto w-2/5 flex p-5 flex-col gap-2 shadow-2xl"
            style={{
              borderTopLeftRadius: "12px",
              borderBottomLeftRadius: "12px",
            }}
          >
            <h1 className="font-extrabold text-2xl">Enter Complete Address</h1>
            <Divider sx={{ border: "1px solid black" }} />
            <p className="font-normal text-base mt-2">Save Address as *</p>
            <div className="flex justify-between">
              {AddressButtons.map((button) => {
                const isActive = selectedButton === button.name;
                return (
                  <div
                    key={button.name}
                    className={cn(
                      "flex items-center gap-2 transition-transform",
                      {
                        hidden: isOtherActive && button.name !== "Other",
                        "slide-out": isOtherActive && button.name !== "Other",
                      }
                    )}
                  >
                    <Button
                      onClick={() => handleSelectedButton(button.name)}
                      className={cn(
                        "bg-gray-6 hover:bg-gray-6 w-24 font-light text-base text-green-4 flex items-center gap-1",
                        {
                          "bg-green-4 text-white hover:bg-green-4":
                            isActive ||
                            (isOtherActive && button.name === "Other"),
                        }
                      )}
                    >
                      {button.icon} {button.name}
                    </Button>
                    {isOtherActive && button.name === "Other" && (
                      <input
                        type="text"
                        placeholder="Save As"
                        name="other"
                        value={address.other}
                        onChange={(e) =>
                          handleInputChange("other", e.target.value)
                        }
                        className="outline-none p-1 placeholder:text-gray-500 border-b-2 border-gray-6 flex-grow slide-in-input"
                      />
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-2 flex flex-col gap-1">
              <input
                type="text"
                placeholder="Flat / House no. / Building name*"
                value={address.houseNumber}
                onChange={(e) =>
                  handleInputChange("houseNumber", e.target.value)
                }
                required
                autoFocus
                className="p-2 placeholder:text-gray-500 border-2 border-gray-6 rounded-md"
              />
              <input
                type="text"
                value={address.pinCode}
                placeholder="Pin Code*"
                onChange={(e) => handleInputChange("pinCode", e.target.value)}
                required
                className="p-2 placeholder:text-gray-500 border-2 border-gray-6 rounded-md"
              />
              <input
                type="text"
                value={address.area}
                onChange={(e) => handleInputChange("area", e.target.value)}
                placeholder="Area / Sector /Locality*"
                required
                className="p-2 placeholder:text-gray-500 border-2 border-gray-6 rounded-md"
              />
              <input
                type="text"
                placeholder="Landmark (Optional)"
                value={address.landmark}
                onChange={(e) => handleInputChange("landmark", e.target.value)}
                className="p-2 placeholder:text-gray-500 border-2 border-gray-6 rounded-md"
              />
            </div>

            <div className="mt-2 flex flex-col gap-2">
              <h1 className="font-bold text-base text-gray-500">
                Enter your details for seamless delivery experience
              </h1>
              <input
                type="text"
                placeholder="Your Name*"
                value={address.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="p-2 placeholder:text-gray-500 border-2 border-gray-6 rounded-md"
              />
              <input
                type="text"
                value={address.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="Your phone no. for quick Delivery"
                className="p-2 placeholder:text-gray-500 border-2 border-gray-6 rounded-md"
              />
            </div>
            <div className="mt-2">
              <Button
                onClick={handleSaveAddress}
                className="bg-green-4 text-white hover:bg-green-4 text-base font-bold"
              >
                Save Address
              </Button>
              {outsideDeliveryArea && (
                <p className="text-red-500 mt-2">
                  We do not deliver to this location.
                </p>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddressModal;
