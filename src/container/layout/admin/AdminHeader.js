import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../../context/authContext";
import { PATHS } from "../../../utils/paths";

const AdminHeader = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const clickCoworkingSpace = () => {
    navigate(PATHS.adminUsers);
  };
  const handleSignInOut = () => {
    if (!user.id) {
      navigate(PATHS.adminLogin);
    }
    if (user.id) {
      localStorage.removeItem("token");
      setUser({
        id: "",
      });
      setShow(false);
      navigate("/");
    }
  };
  const items = [
    {
      url: PATHS.adminUsers,
      name: "User",
    },
    {
      url: PATHS.adminHouses,
      name: "House",
    },
    {
      url: PATHS.adminSubscriptions,
      name: "Subscription",
    },
  ];
  return (
    <div className="relative header w-[100%] minH-[70px] h-[80px] max-w-[1300px] bg-white flex flex-row items-center mx-auto bg-noColor">
      <div
        className=" cursor-pointer h-[60px] flex flex-row items-center gap-3"
        onClick={() => clickCoworkingSpace()}
      >
        <div className="h-[40px] w-[40px] ">
          <img
            src="/logo.png"
            alt=""
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="text-2xl font-bungee text-primary">DANA Booking</div>
      </div>
      <div className="flex flex-row gap-4 justify-center items-center ml-16">
        {items.map((item) => (
          <NavLink
            to={user.id ? item.url : "/admin/login"}
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
        <FaUserCircle
          className="text-3xl cursor-pointer text-primary"
          onClick={() => {
            setShow((prev) => !prev);
          }}
        />
        <span className="text-primary font-medium">
          {user.id && user.fullName}
        </span>
      </div>
      {show && (
        <div
          className="cursor-pointer px-3 py-3 w-[200px] absolute -bottom-8 right-1 translate- z-20 shadow-xl border-slate-200 border drop-shadow-2xl rounded-xl bg-white  hover:bg-purple-100"
          onClick={handleSignInOut}
        >
          <span>Sign out</span>
        </div>
      )}
    </div>
  );
};

export default AdminHeader;
