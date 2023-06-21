import moment from "moment";
import React from "react";
import ReactDOM from "react-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import {
  MdLocationPin,
  MdMeetingRoom,
  MdPeople,
  MdCalendarToday,
  MdFormatListBulleted,
  MdOutlineCheckCircleOutline,
} from "react-icons/md";
import { IoMdPricetag } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import http from "../../config/axiosConfig";
import { useState } from "react";
import Button from "../button/Button";

const RentModal = ({
  handleClose,
  roomDetail,
  locationDetail,
  startDate,
  monthRent,
  utilities,
}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  if (typeof document === "undefined") return <div className="Modal"></div>;
  const utilitiesClient = [];
  utilities.forEach((utility) => {
    if (utility.checked === true) utilitiesClient.push(utility.value);
  });
  const startDateShow = moment(startDate).format("DD-MM-YYYY").toString();
  const endDate = moment(startDate)
    .add(monthRent, "months")
    .format("DD-MM-YYYY")
    .toString();
  const handleRent = () => {
    setIsLoading(true);
    const utitlitiesPriceInt = utilitiesClient.map((item) => {
      return {
        ...item,
        price: item.priceInt,
      };
    });
    const booking = {
      roomId: roomDetail.id,
      startDay: new Date(startDate).toLocaleDateString(),
      monthNumber: monthRent,
      utilities: utitlitiesPriceInt,
    };
    console.log(booking);
    http
      .post(`booking/bookings`, booking)
      .then((res) => {
        toast.success("Booking success");
        setIsLoading(false);
        navigate("/booking/1");
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
        toast.error(e.data.message);
      });
  };
  return ReactDOM.createPortal(
    <div className="modal fixed inset-0 z-50 flex items-center justify-center p-5">
      <div className="absolute inset-0 bg-black bg-opacity-30 overlay"></div>
      <div
        onClick={handleClose}
        className="w-8 h-8 absolute top-5 right-5 cursor-pointer z-60"
      >
        <AiOutlineCloseCircle className="w-full h-full" />
      </div>
      <div className="relative z-10 rounded-lg w-full max-w-[500px] h-[550px]  bg-slate-100 px-5 py-5 flex flex-col">
        <h2 className="font-bold text-3xl text-center text-primary">
          YOUR BOOKING
        </h2>
        <p className="font-semibold text-xl text-center mt-4">
          {locationDetail?.name}
        </p>
        <div className="flex flex-col gap-2 mt-5">
          <div className="flex flex-row gap-2 items-start">
            <div className="flex flex-row gap-2 items-center">
              <MdLocationPin />
              <span className="font-semibold">Location:</span>
            </div>
            <span>
              {`${locationDetail?.address}, ${locationDetail?.wards}, ${locationDetail?.district}, ${locationDetail?.city}`}
            </span>
          </div>
          <div>
            <div className="flex flex-row gap-2 items-center">
              <MdMeetingRoom />
              <span className="font-semibold">Room name:</span>
              <span>{roomDetail?.name}</span>
            </div>
          </div>
          <div>
            <div className="flex flex-row gap-2 items-center">
              <MdPeople />
              <span className="font-semibold">Capacity:</span>
              <span>{roomDetail?.capacity}</span>
            </div>
          </div>
          <div>
            <div className="flex flex-row gap-2 items-center">
              <MdCalendarToday />
              <span className="font-semibold">Start Date:</span>
              <span>{startDateShow}</span>
            </div>
          </div>
          <div>
            <div className="flex flex-row gap-2 items-center">
              <MdCalendarToday />
              <span className="font-semibold">End Date:</span>
              <span>{endDate}</span>
            </div>
          </div>
          <div>
            <div className="flex flex-row gap-2 items-center">
              <MdFormatListBulleted />
              <span className="font-semibold">Utilities:</span>
            </div>
            <div className="mt-3 ml-5">
              {utilitiesClient.map((item) => {
                return (
                  <div className="flex flex-row gap-2 items-center">
                    <IoMdPricetag />
                    <span className="font-medium">{item.name}:</span>
                    <span>{item.price} VND</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-full mt-auto flex items-center justify-center">
          <Button onClick={handleRent} isLoading={isLoading}>
            Create
          </Button>
        </div>
      </div>
    </div>,
    document.querySelector("body")
  );
};

export default RentModal;
