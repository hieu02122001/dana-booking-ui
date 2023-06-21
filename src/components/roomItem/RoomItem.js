import React from "react";
import { useNavigate } from "react-router-dom";
import { Text } from "@chakra-ui/react";
import { PATHS } from "../../utils/paths";

const RoomItem = ({
  url,
  isRented,
  roomName,
  price,
  id,
  description,
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`${PATHS.tenantRooms}/${id}`);
  };

  const TruncatedText = ({ text, wordLimit }) => {
    const truncatedText = text?.slice(0, wordLimit);

    return (
      <Text>
        {truncatedText}
        {text?.length > wordLimit && "..."}
      </Text>
    );
  };

  return (
    <div className="w-[360px] h-[300px]">
      <div className="w-full h-[200px] relative">
        <img src={url} alt="" className="w-full h-full object-cover" />
        <div className="inline-block text-xs px-1 py-1 rounded-full text-grayText bg-white absolute top-1 right-1">
          {isRented ? "Not Available" : "Available"}
        </div>
      </div>
      <div className="flex w-full h-[100px] flex-col px-1 py-1">
        <div className="w-full flex flex-row justify-between">
          <h1 className="name text-xl font-medium text-ellipsis line-clamp-2 overflow-hidden ">
            {roomName}
          </h1>
        </div>
        <TruncatedText
          className="address text-sm font-medium text-slate-600"
          text={description}
          wordLimit="115"
        />
        <div className="flex w-full justify-between text-primary mt-auto">
          <span className="text-2xl">
            {price} VND<sub className="text-xs">/Tháng</sub>
          </span>
          <button
            className="px-3 py-1 rounded-full text-white shadow-xl bg-primary"
            onClick={() => handleClick()}
          >
            Xem ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomItem;
