import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import http from "../../../config/axiosConfig";
import { FiEdit2 } from "react-icons/fi";
import RentRoomForm from "../../../components/rent/RentRoomForm";
import ModalLoading from "../../../components/loading/ModalLoading";
import { useAuth } from "../../../context/authContext";
import ConfirmModal from "../../../components/modal/ConfirmModal";
import { PATHS } from "../../../utils/paths";

const TenantRoomDetailPage = () => {
  const params = useParams();
  const roomId = params.roomId;
  const locationId = params.locationId;
  const [roomDetail, setRoomDetail] = useState();
  const [houseDetail, setHouseDetail] = useState();
  const [showBooking, setShowBooking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { user } = useAuth();

  const navigate = useNavigate();
  useEffect(() => {
    setIsLoading(true);
    http
      .get(`${PATHS.tenantRooms}/${roomId}`)
      .then((res) => {
        setIsLoading(false);
        setRoomDetail(res.data);
        http
          .get(`${PATHS.tenantHouses}/${res.data?.houseId}`)
          .then((res1) => {
            setHouseDetail(res1.data);
            setIsLoading(false);
          })
          .catch((err) => {
            setIsLoading(false);
          });
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [roomId, locationId]);

  const handleRentNow = () => {
    if (!user.id) {
      setShowConfirmation(true);
    } else {
      setShowBooking((prev) => !prev);
    }
  };
  const handleCloseConfirm = () => {
    setShowConfirmation(false);
  };
  const handleConfirm = () => {
    navigate(PATHS.tenantLogin);
  };
  return (
    <>
      {showConfirmation && (
        <ConfirmModal
          message="Bạn cần phải Đăng nhập để có thể đặt phòng!"
          handleClose={handleCloseConfirm}
          handleConfirm={handleConfirm}
        />
      )}
      {isLoading ? (
        <ModalLoading />
      ) : (
        <div className="h-full w-full flex flex-col mb-10 max-w-[1450px] mx-auto">
          <div className="w-full h-[300px] h-fit relative py-3 px-3 rounded-lg bg-slate-200">
            <div className="w-full flex flex-row gap-3 items-start">
              <div className="w-[300px] h-[300px] mt-3">
                <img
                  src={houseDetail?.image}
                  alt=""
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="py-3 w-[calc(100%-300px)]">
                <h1 className="text-3xl font-bold text-primary">
                  {houseDetail?.name}
                </h1>
                <div className="flex flex-row gap-2 mt-3">
                  <span className="font-bold">Địa chỉ: </span>
                  <span className="font-medium text-slate-800 ">
                    {houseDetail &&
                      `${houseDetail?.address}, ${houseDetail?.district.name}, Đà Nẵng`}
                  </span>
                </div>
                <div className="w-full font-medium flex flex-row gap-3 items-start mt-3 text-slate-600">
                  <div>
                    <FiEdit2 />
                  </div>
                  {houseDetail?.description}
                </div>
                <div className="flex flex-row gap-2 mt-3">
                  <span className="font-bold">Chủ trọ: </span>
                  <span className="font-medium text-slate-800 ">
                    {houseDetail?.owner.fullName}
                  </span>
                </div>
                <div className="flex flex-row gap-2 mt-3">
                  <span className="font-bold">Số điện thoại: </span>
                  <span className="font-medium text-slate-800 ">
                    {houseDetail?.owner.phone}
                  </span>
                </div>
                <div className="flex flex-row gap-2 mt-3">
                  <span className="font-bold">Địa chỉ email: </span>
                  <span className="font-medium text-slate-800 ">
                    {houseDetail?.owner.email}
                  </span>
                </div>
              </div>
            </div>
          </div>
        <div className="mt-[80px] w-full max-w-[1250px] mx-auto">
          <div className="flex flex-row gap-5 justify-between">
            <div className="w-[65%]">
              <div className="h-[400px] w-full">
                <img
                  src={roomDetail?.images[0]}
                  alt=""
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="w-full grid grid-cols-4 gap-3 mt-3">
                {roomDetail?.images.map((item, index) => {
                  if (index > 0 && index < 5) {
                    return (
                      <div className="w-[190px] h-[190px]">
                        <img
                          src={item}
                          alt=""
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    );
                  }
                  return <></>
                })}
              </div>
            </div>
            <div className="h-full w-[35%]">
              <div className="flex flex-col gap-3 px-5 py-5 rounded-xl shadow-lg relative">
                <h1 className="text-4xl font-bold">{roomDetail?.name}</h1>
                <div className="flex flex-col gap-2 mt-5">
                  <div>
                    <span className="font-semibold text-xl">Mô tả:</span>
                    <span className="text-xl">
                      {roomDetail?.description || " (Không có)"}
                    </span>
                  </div>
                  <div className="text-4xl mt-6">
                    {roomDetail?.price} VND<sub className="text-xs">/Tháng</sub>
                  </div>
                </div>
                <button
                  onClick={handleRentNow}
                  className="w-full py-3 rounded-full bg-cyan-400 text-white font-semibold disabled:bg-grayLight"
                >
                  Thuê ngay
                </button>
              </div>
              {showBooking && (
                <RentRoomForm
                  houseId={houseDetail.id}
                  roomId={roomId}
                  roomDetail={roomDetail}
                />
              )}
            </div>
          </div>
        </div>
        </div>
      )}
    </>
  );
};

export default TenantRoomDetailPage;
