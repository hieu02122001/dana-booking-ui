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
  MdAttachMoney,
} from "react-icons/md";
import { IoMdPricetag } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import http from "../../config/axiosConfig";
import { useState } from "react";
import Button from "../button/Button";
import { PATHS } from "../../utils/paths";

const RentModal = ({
  handleClose,
  roomDetail,
  userId,
  checkInDate,
  months,
}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  if (typeof document === "undefined") return <div className="Modal"></div>;
  const checkInDateShow = moment(checkInDate).format("DD/MM/YYYY").toString();
  const endDate = moment(checkInDate)
    .add(months, "months")
    .format("DD/MM/YYYY")
    .toString();
  const handleRent = () => {
    setIsLoading(true);
    const booking = {
      houseId: roomDetail.houseId,
      roomId: roomDetail.id,
      userId: userId,
      totalPrice: roomDetail.price,
      checkInDate: checkInDate,
      checkOutDate: moment(checkInDate).add(months, "months"),
    };
    console.log(booking);
    http
      .post(`${PATHS.tenantBookings}`, booking)
      .then((res) => {
        toast.success("Đặt phòng thành công!");
        setIsLoading(false);
        navigate(`${PATHS.tenantBookings}?userId=${userId}`);
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
      <div className="relative z-10 rounded-lg w-full max-w-[500px] h-[350px]  bg-slate-100 px-5 py-5 flex flex-col">
        <h2 className="font-bold text-3xl text-center text-primary">
          XÁC NHẬN ĐẶT PHÒNG
        </h2>
        <p className="font-semibold text-xl text-center mt-4">
          {roomDetail?.house?.name}
        </p>
        <div className="flex flex-col gap-2 mt-5">
          <div className="flex flex-row gap-2 items-start">
            <div className="flex flex-row gap-2 items-center">
              <MdLocationPin />
              <span className="font-semibold">Địa chỉ:</span>
            </div>
            <span>
              {`${roomDetail?.house?.address}`}
            </span>
          </div>
          <div>
            <div className="flex flex-row gap-2 items-center">
              <MdMeetingRoom />
              <span className="font-semibold">Tên phòng:</span>
              <span>{roomDetail?.name}</span>
            </div>
          </div>
          <div>
            <div className="flex flex-row gap-2 items-center">
              <MdAttachMoney />
              <span className="font-semibold">Giá phòng:</span>
              <span>{`${roomDetail?.price}đ`}</span>
            </div>
          </div>
          <div>
            <div className="flex flex-row gap-2 items-center">
              <MdCalendarToday />
              <span className="font-semibold">Ngày bắt đầu:</span>
              <span>{checkInDateShow}</span>
            </div>
          </div>
          <div>
            <div className="flex flex-row gap-2 items-center">
              <MdCalendarToday />
              <span className="font-semibold">Ngày kết thúc:</span>
              <span>{endDate}</span>
            </div>
          </div>
        </div>
        <div className="w-full mt-auto flex items-center justify-center">
          <Button onClick={handleRent} isLoading={isLoading}>
            Đặt phòng
          </Button>
        </div>
      </div>
    </div>,
    document.querySelector("body")
  );
};

export default RentModal;
