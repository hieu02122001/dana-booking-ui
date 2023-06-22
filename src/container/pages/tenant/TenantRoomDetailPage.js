import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import http from "../../../config/axiosConfig";
import RentRoomForm from "../../../components/rent/RentRoomForm";
import ModalLoading from "../../../components/loading/ModalLoading";
import { useAuth } from "../../../context/authContext";
import ConfirmModal from "../../../components/modal/ConfirmModal";
import moment from "moment";
import { PATHS } from "../../../utils/paths";

const TenantRoomDetailPage = () => {
  const params = useParams();
  const roomId = params.roomId;
  const locationId = params.locationId;
  const [roomDetail, setRoomDetail] = useState();
  const [showBooing, setShowBooking] = useState(false);
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

                  <div>
                    <span className="font-semibold text-xl">Tình trạng:</span>
                    <span className="text-xl">
                      {roomDetail?.userId ? " Đã được đặt" : " Còn trống"}
                    </span>
                  </div>

                  <div className="text-4xl mt-6">
                    {roomDetail?.price} VND<sub className="text-xs">/Tháng</sub>
                  </div>
                </div>
                <button
                  onClick={handleRentNow}
                  className="w-full py-3 rounded-full bg-primary text-white font-semibold disabled:bg-grayLight"
                  disabled={!!roomDetail?.userId}
                >
                  Thuê ngay
                </button>
              </div>
              {showBooing && (
                <RentRoomForm
                  locationId={locationId}
                  roomId={roomId}
                  roomDetail={roomDetail}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TenantRoomDetailPage;
