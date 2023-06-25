import React, { useState } from "react";
import { FiClipboard } from "react-icons/fi";
import { MdMeetingRoom, MdPeople, MdCalendarToday } from "react-icons/md";
import { IoMdPricetag } from "react-icons/io";
import { FaUserPlus, FaDog } from "react-icons/fa";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import http from "../../config/axiosConfig";
import { useAuth } from "../../context/authContext";
import { toast } from "react-toastify";

const ReservationBooking = ({
  id,
  handleReject,
  handlePayment,
  booking,
}) => {
  const { user } = useAuth();
  const status = booking?.status;

  return (
    <>
      <div className="relative z-10 rounded-lg w-full bg-slate-100 px-5 py-5 flex flex-col">
        <div className="mt-5 text-lg">
          <div className="w-full flex flex-row gap-3">
            <div className="w-[150px] h-[150px]">
              <img
                src={booking?.room?.images?.length && booking?.room?.images[0]}
                alt=""
                className="object-contain w-full h-full"
              />
            </div>
            <div className="w-[calc(100%-150px)]">
              <div className="w-full grid grid-cols-2">
                <div>
                  <div className="flex flex-row gap-2 items-center">
                    <MdMeetingRoom />
                    <span className="font-semibold">Tên phòng:</span>
                    <span>{booking?.room?.name}</span>
                  </div>
                </div>

                <div>
                  <div className="flex flex-row gap-2 items-center">
                    <MdCalendarToday />
                    <span className="font-semibold">Ngày bắt đầu thuê:</span>
                    <span>{booking?.checkInDate}</span>
                  </div>
                </div>

                <div>
                  <div className="flex flex-row gap-2 items-center">
                    <MdPeople />
                    <span className="font-semibold">Tên người thuê:</span>
                    <span>{booking?.user?.fullName}</span>
                  </div>
                </div>
                <div>
                  <div className="flex flex-row gap-2 items-center">
                    <MdCalendarToday />
                    <span className="font-semibold">Ngày kết thúc:</span>
                    <span>{booking?.checkOutDate}</span>
                  </div>
                </div>
                <div>
                  <div className="flex flex-row gap-2 items-center">
                    <IoMdPricetag />
                    <span className="font-semibold">Tổng tiền:</span>
                    <span>{booking?.totalPrice}đ</span>
                  </div>
                </div>
                <div>
                  <div className="flex flex-row gap-2 items-center">
                    <FiClipboard />
                    <span className="font-semibold">Trạng thái:</span>
                    <div
                      className={`${
                        status === "APPROVED"
                          ? "bg-cyan-400"
                          : status === "PENDING"
                          ? "bg-yellow-400"
                          : status === "REJECTED"
                          ? "bg-red-400"
                          : "bg-green-400"
                      } text-white font-semibold px-2 py-1 rounded-full`}
                    >
                      {status}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex items-center justify-center gap-4">
            {status === "APPROVED" && handlePayment && (
              <>
                <PayPalScriptProvider
                  options={{
                    "client-id": "test",
                    currency: "USD",
                  }}
                >
                  <PayPalButtons
                    style={{
                      layout: "horizontal",
                      color: "black",
                      tagline: false,
                    }}
                    createOrder={(data, actions) => {      
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: ""+Math.round(Number(booking?.totalPrice.replaceAll(".", ""))/23000),
                              showSpinner: true,
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={(data, actions) => {
                      return actions.order.capture().then((details) => {
                        handlePayment(booking?.id);
                      });
                    }}
                  />
                </PayPalScriptProvider>
              </>
            )}
            {status === "PENDING" && (
              <button
                className="max-w-[150px] w-full px-4 py-2 bg-red-500 text-white shadow-lg rounded-md hover:bg-red-600 hover:-translate-y-[1px] hover:shadow-2xl"
                onClick={() => handleReject(booking?.id)}
              >
                Huỷ đăng ký
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReservationBooking;
