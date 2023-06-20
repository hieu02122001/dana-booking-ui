import React, { useEffect, useState } from "react";
import { BsFilter } from "react-icons/bs";
import http from "../../../config/axiosConfig";
import { useLocation, useNavigate } from "react-router-dom";
import CardHouseTenant from "../../../components/Card/CardHouseTenant";
import { PATHS } from "../../../utils/paths";

const TenantHousePage = () => {
  const { state } = useLocation();
  const district = state?.district || "";
  const navigate = useNavigate();
  const [houses, setHouses] = useState([]);

  const filterQuery = ({ ...filter }) => {
    let filterList = "rooms/room-filter";
    const urlString = [];
    if (filter?.cityName) {
      const cityName = filter.cityName.replaceAll(" ", "_");
      urlString.push(`cityName=${cityName}`);
    }
    if (filter?.minPrice) {
      urlString.push(`minPrice=${filter?.minPrice || ""}`);
    }
    if (filter?.maxPrice < 500) {
      urlString.push(`maxPrice=${filter?.maxPrice || ""}`);
    }
    if (filter?.roomName) {
      urlString.push(`roomName=${filter?.roomName || ""}`);
    }
    if (urlString.length !== 0) {
      filterList = filterList.concat(`?${urlString.join("&")}`);
    }
    return filterList;
  };

  const getHouseList = () => {
    if (!localStorage.token) {
      navigate(PATHS.tenantLogin);
    }
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
        console.log(list);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //
  useEffect(() => {
    getHouseList();
  }, []);

  return (
    <div className="w-full flex flex-col mt-[50px]">
      <div className="w-full max-w-[600px] mx-auto relative z-20">
        <h1 className="text-2xl font-[500] mb-4 ml-3">
          KHÁM PHÁ CÁC DÃY TRỌ PHÙ HỢP VỚI BẠN
        </h1>
      </div>
      <div className="mt-[50px] grid grid-cols-4 gap-x-12 w-full max-w-[1400px] gap-y-3 mx-auto relative z-0">
        {houses.map((item) => (
          <CardHouseTenant data={item} />
        ))}
      </div>
    </div>
  );
};

export default TenantHousePage;
