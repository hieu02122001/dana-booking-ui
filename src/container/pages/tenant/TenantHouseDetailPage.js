import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RoomItem from "../../../components/roomItem/RoomItem";
import http from "../../../config/axiosConfig";
import { FiEdit2 } from "react-icons/fi";
import ModalLoading from "../../../components/loading/ModalLoading";
import { PATHS } from "../../../utils/paths";

const TenantHouseDetailPage = () => {
  const params = useParams();
  const [houseDetail, setHouseDetail] = useState();
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const houseId = params.houseId;

  const getDetailHouse = async () => {
    setIsLoading(true);
    http
      .get(`${PATHS.tenantHouses}/${houseId}`)
      .then((res) => {
        setHouseDetail(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };
  const getListRoom = async () => {
    setIsLoading(true);
    http
      .get(`${PATHS.tenantRooms}?houseId=${houseId}`)
      .then((res) => {
        setRooms(res.data.rows);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const getData = async () => {
    await getDetailHouse();
    await getListRoom();
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {isLoading ? (
        <ModalLoading></ModalLoading>
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
          <div className="w-full grid grid-cols-4 gap-1 gap-y-3 mt-5">
            {rooms.map((room) => {
              return (
                <RoomItem
                  key={room.id}
                  id={room.id}
                  locationId={houseId}
                  url={
                    room.imgUrl ||
                    " https://images.unsplash.com/photo-1670366732840-f34c7c12fd5a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                  }
                  isAvailable={!!room.userId}
                  roomName={room.name}
                  price={room.price}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default TenantHouseDetailPage;
