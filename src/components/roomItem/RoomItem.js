import React from "react";
import { useNavigate } from "react-router-dom";
import Rating from "../rating/Rating";

const RoomItem = ({
  url,
  availableDate,
  roomName,
  capacity,
  price,
  id,
  rating,
  locationId,
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/location-detail/${locationId}/rooms/${id}`);
  };
  return (
    <div className="w-[360px] h-[300px]">
      <div className="w-full h-[200px] relative">
        <img src={url} alt="" className="w-full h-full object-cover" />
        <div className="inline-block text-xs px-1 py-1 rounded-full text-grayText bg-white absolute top-1 right-1">
          Available from{" "}
          <span className="font-semibold"> {availableDate} </span>
        </div>
      </div>
      <div className="flex w-full h-[100px] flex-col px-1 py-1">
        <div className="w-full flex flex-row justify-between">
          <h1 className="name text-xl font-medium text-ellipsis line-clamp-2 overflow-hidden ">
            {roomName}
          </h1>
          <Rating readonly={true} rating={rating} />
        </div>
        <p className="address text-sm font-medium text-slate-600">
          <span>Capacity: </span>
          {capacity}
        </p>
        <div className="flex w-full justify-between text-primary mt-auto">
          <span className="text-2xl">
            {price} VND<sub className="text-xs">/Month</sub>
          </span>
          <button
            className="px-3 py-1 rounded-full text-white shadow-xl bg-primary"
            onClick={() => handleClick()}
          >
            Check now
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomItem;
