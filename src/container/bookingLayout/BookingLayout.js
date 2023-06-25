import React, { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { PATHS } from "../../utils/paths";

const booking = [
  {
    name: "Chờ xác nhận",
    url: `${PATHS.tenantBookings}/pending`,
    color: "text-yellow-500",
  },
  {
    name: "Đã xác nhận",
    url: `${PATHS.tenantBookings}/approved`,
    color: "text-cyan-500",
  },
  {
    name: "Từ chối",
    url: `${PATHS.tenantBookings}/rejected`,
    color: "text-red-500",
  },
  {
    name: "Thành công",
    url: `${PATHS.tenantBookings}/success`,
    color: "text-green-500",
  },
];

const BookingLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate(PATHS.tenantLogin);
    }
    return;
  });

  return (
    <div className="w-full flex flex-col max-w-[1250px] mx-auto">
      <div className="w-full flex flex-col h-fit shadow-lg rounded-lg mt-10 pt-5">
        <div className="w-full flex flex-row h-[60px] shadow-xl shadow-black-400/100">
          {booking.map((item, index) => {
            return (
              <NavLink
                key={index}
                to={item.url}
                className={({ isActive }) =>
                  `h-full w-[calc(100%/4)] font-semibold ${
                    item.color
                  } cursor-pointer hover:bg-green-100 flex justify-center items-center ${
                    isActive ? "bg-green-200" : "bg-transparent"
                  }`
                }
              >
                {item.name}
              </NavLink>
            );
          })}
        </div>
      </div>
      <div className="w-full min-h-[600px] shadow-lg">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default BookingLayout;
