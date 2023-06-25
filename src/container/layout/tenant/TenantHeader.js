import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHouseUser } from "react-icons/fa";
import { useAuth } from "../../../context/authContext";
import { PATHS } from "../../../utils/paths";

const TenantHeader = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const clickLogoHandler = () => {
    navigate(PATHS.tenantBase);
  };
  const handleSignInOut = () => {
    if (!user.id) {
      navigate(PATHS.tenantLogin);
    }
    if (user.id) {
      localStorage.removeItem("token");
      setUser({
        id: "",
        fullName: "",
        email: "",
        phone: "",
        userType: ""
      });
      setShow(false);
      navigate(PATHS.tenantLogin);
    }
  };
  const items = [
    {
      url: PATHS.tenantBase,
      name: "Trang chủ",
    },
    {
      url: PATHS.tenantRooms,
      name: "Khám phá",
    },
    {
      url: PATHS.tenantBookings,
      name: "Đặt phòng",
    },
  ];
  return (
    <div className="relative header w-[100%] minH-[70px] h-[80px] max-w-[1300px] bg-white flex flex-row items-center mx-auto bg-noColor">
      <div
        className=" cursor-pointer h-[60px] flex flex-row items-center gap-3"
        onClick={() => clickLogoHandler()}
      >
        <div className="h-[40px] w-[40px] ">
          <img
            src="/logo.png"
            alt=""
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="text-2xl font-bungee text-primary">DANA BOOKING</div>
      </div>
      <div className="flex flex-row gap-4 justify-center items-center ml-16">
        {items.map((item) => (
          <NavLink
            to={user?.id ? item.url : PATHS.tenantLogin}
            key={item.name}
            className={({ isActive }) =>
              `text-base cursor-pointer hover:text-primary border-b-noColor border-b hover:border-primary ${
                isActive ? "text-primary" : ""
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </div>
      <div className="flex flex-row gap-2 relative ml-auto">
        <FaHouseUser
          className="text-3xl cursor-pointer text-primary"
          onClick={() => {
            setShow((prev) => !prev);
          }}
        />
        <span className="text-primary font-medium">
          {user?.id && user?.fullName}
        </span>
      </div>
      {show && (
        <div className="cursor-pointer w-[200px] absolute -bottom-8 right-1 translate-y-[50%] z-20 shadow-xl border-slate-200 border drop-shadow-2xl rounded-xl bg-white">
          <div
            onClick={() => navigate(PATHS.manage)}
            className="w-full px-3 py-3 hover:bg-purple-100 rounded-xl"
          >
            Cá nhân
          </div>
          <div
            className="w-full  px-3 py-3 hover:bg-purple-100 rounded-xl"
            onClick={handleSignInOut}
          >
            {user?.id ? <span>Đăng xuất</span> : <span>Đăng nhập</span>}
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantHeader;
