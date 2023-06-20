import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Search from "../../../components/search/Search";
import http from "../../../config/axiosConfig";
import { useSearch } from "../../../context/search-context";
import Loading from "../../../components/loading/Loading";
import { PATHS } from "../../../utils/paths";
import CardHouseTenant from "../../../components/Card/CardHouseTenant";

const TenantHousePage = () => {
  const [houses, setHouses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { search } = useSearch();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const district = search.districtId;
    http
      .get(`${PATHS.tenantHouses}?district=${district}`)
      .then((res) => {
        const list = res?.data?.rows?.map((item) => {
          const houses = {
            id: item.id,
            name: item.name,
            description: item.description,
            image: item.image,
            district: item.district ? item.district.name : "(None)",
            address: item.address,
            roomCount: item.roomCount,
            priceMin: item.priceMin,
            priceMax: item.priceMax,
            rentedRoomCount: item.rentedRoomCount,
            isActivated: item.isActivated ? "Yes" : "No",
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
          };
          return houses;
        });
        setHouses(list);
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
            {houses.length > 0 &&
              houses.map((item) => {
                return <CardHouseTenant data={item} />;
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TenantHousePage;
