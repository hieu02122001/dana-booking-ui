import { Select } from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../../config/axiosConfig";
import { PATHS } from "../../utils/paths";
import { useSearch } from "../../context/search-context";

const Dropdown = () => {
  const { setSearch } = useSearch();
  const navigate = useNavigate();
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState({});

  useEffect(() => {
    http
      .get(PATHS.filterDistrict)
      .then((res) => {
        setDistricts(res?.data?.rows);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDistrictSelect = (name) => {
    console.log(name);
    const selectedDistrict = districts.find((item) => item.name === name);
    setDistrict(selectedDistrict);
  };

  const handleSearch = () => {
    setSearch((prev) => {
      return {
        ...prev,
        districtId: district.id,
        districtName: district.name
      }
    })
    navigate(PATHS.tenantRooms);
  };

  return (
    <div className="w-[450px] h-[85px] flex flex-row justify-between items-center py-5 pl-8 pr-5 bg-white rounded-full">
      <div className="flex flex-col gap-2">
        <Select
          size="lg"
          width="200px"
          variant="flushed"
          placeholder="Chọn Quận"
          onChange={(event) => handleDistrictSelect(event.target.value)}
        >
          {districts.map((item) => (
            <option key={item.id}>{item.name}</option>
          ))}
        </Select>
      </div>
      <button
        onClick={handleSearch}
        className="py-3 px-7 bg-primary rounded-full text-white"
      >
        Tìm kiếm
      </button>
    </div>
  );
};

export default Dropdown;
