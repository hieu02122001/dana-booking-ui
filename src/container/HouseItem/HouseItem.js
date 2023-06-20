import React from "react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../utils/paths";

const HouseItem = ({ room }) => {
  const navigate = useNavigate();

  const handleNavigateToRoomDetail = () => {
    navigate(PATHS.roomDetails.replace(":id", room?.id));
  };

  return (
    <div className="w-[320px] h-[400px]">
      <div
        className="w-full h-[300px] relative cursor-pointer"
        onClick={handleNavigateToRoomDetail}
      >
        <img
          src={room?.imageDtos?.length && room?.imageDtos[0].url}
          alt=""
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
      <div className="flex w-full h-[100px] flex-col px-1 py-1">
        <div className="flex flex-row justify-between">
          <h3 className="type text-sm text-black font-semibold mb-1">
            {room?.roomTypeName}
          </h3>
          <div className="text-[13px] flex flex-row gap-1 items-center">
            <div className="w-3 h-3">
              <svg
                className="w-full h-full"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="presentation"
                focusable="false"
              >
                <path
                  d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </div>
            <span> 4.5</span>
          </div>
        </div>
        <h1 className="name text-sm  font-medium text-ellipsis line-clamp-2 overflow-hidden ">
          {room?.roomName}
        </h1>
        <p className="address text-sm font-light text-grayLigherText">
          {room?.provinceName}
        </p>
        <div className="flex w-full font-light text-sm">
          <span className="font-semibold">${room?.price}</span>/Day
        </div>
      </div>
    </div>
  );
};

export default HouseItem;
