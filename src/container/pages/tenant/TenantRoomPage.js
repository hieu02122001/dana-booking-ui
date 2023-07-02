import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Search from "../../../components/search/Search";
import http from "../../../config/axiosConfig";
import { useSearch } from "../../../context/search-context";
import Loading from "../../../components/loading/Loading";
import { PATHS } from "../../../utils/paths";
import CardRoomTenant from "../../../components/Card/CardRoomTenant";

const TenantRoomPage = () => {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { search } = useSearch();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const district = search.districtId;
    http
      .get(`${PATHS.tenantRooms}?district=${district}`)
      .then((res) => {
        const list = res?.data?.rows?.map((item) => {
          const rooms = {
            id: item.id,
            name: item.name,
            houseId: item.houseId,
            price: item.price,
            images: item.images,
            description: item.description,
            isAds: item.isAds,
            houseName: item?.house?.name,
            houseAddress: item?.house?.address,
            houseImage: item?.house?.image,
            houseDescription: item?.house?.description,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
          };
          return rooms;
        });
        setRooms(list);
        setIsLoading(false);
        console.log(list);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, [search.districtId]);
  const handleSearch = (values) => {
    // setIsLoading(true);
    const district = search.districtId;
  };

  return (
    <div className="flex flex-row w-full relative">
      <div className="px-8 py-5 bg-opacity-20  w-[25%] shadow-lg h-[720px] sticky top-0 border border-slate-100">
        <Search handleSearch={handleSearch} col={true} />
      </div>
      <div className="w-[75%] px-5 border">
        <h1 className="text-2xl font-bold mb-5 mt-5">
          Cho Thuê Phòng Trọ, Giá Rẻ, Tiện Nghi, Mới Nhất 2023
        </h1>
        {isLoading ? (
          <Loading></Loading>
        ) : (
          <div className="grid grid-cols-3 gap-1 ">
            {rooms.length > 0 &&
              rooms.map((item) => {
                return <CardRoomTenant key={item.id} data={item} />;
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TenantRoomPage;
