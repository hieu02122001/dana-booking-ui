import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Label from "../../components/label/Label";
import Dropdown from "../../components/dropdown/Dropdown";
import Select from "../../components/dropdown/Select";
import List from "../../components/dropdown/List";
import http from "../../config/axiosConfig";
import Option from "../../components/dropdown/Option";
import Button from "../../components/button/Button";
import { Slider } from "@mui/material";
import CheckboxNoForm from "../../components/checkbox/CheckboxNoForm";
import { useSearch } from "../../context/search-context";

const FilterHouses = ({ handleClose, handleConfirm }) => {
  const { filter } = useSearch();
  const [cities, setCites] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [persons, setPersons] = useState(filter?.maxQuantityPeople);
  const [roomTypesName, setRoomTypesName] = useState(filter?.roomTypeName);
  const [roomTypesId, setRoomTypesId] = useState(filter?.typeRoomId);
  const [cityName, setCityName] = useState(filter?.cityName);
  const [cityId, setCityId] = useState(filter?.cityId);
  const [isPet, setIsPet] = useState(filter?.animal);
  const [price, setPrice] = useState([filter?.minPrice, filter?.maxPrice]);

  useEffect(() => {
    http
      .get(`address/provinces`)
      .then((res) => {
        setCites(res?.data);
      })
      .catch((err) => {
        console.error("cities err", err);
      });

    http
      .get(`room-types`)
      .then((res) => {
        setRoomTypes(res?.data);
      })
      .catch((err) => {
        console.error("roomTypes err", err);
      });
  }, []);

  const handleClickCity = (city) => {
    setCityName(city?.name);
    setCityId(city.code);
  };

  const handleClickRoomType = (room) => {
    setRoomTypesName(room?.name);
    setRoomTypesId(room?.id);
  };

  const handlePriceChange = (_, value) => {
    setPrice(value);
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
      <div className="relative z-10 rounded-lg w-full max-w-[600px] h-[600px] bg-white px-5 py-5 flex flex-col justify-between">
        <div className="">
          <h2 className="text-xl font-semibold text-center">
            Filter List Rooms
          </h2>
          <div className="flex flex-col gap-2">
            <Label name="City">City</Label>
            <Dropdown>
              <Select placeholder={cityName || "Province"} />
              <List>
                {cities.map((city) => (
                  <Option key={city.code} onClick={() => handleClickCity(city)}>
                    {city.name}
                  </Option>
                ))}
              </List>
            </Dropdown>
          </div>
          <div className="flex flex-col gap-2 mt-8">
            <Label name="City">Room Types</Label>
            <Dropdown>
              <Select placeholder={roomTypesName || "Room Types"} />
              <List>
                {roomTypes.map((item) => (
                  <Option
                    key={item?.id}
                    onClick={() => handleClickRoomType(item)}
                  >
                    {item.name}
                  </Option>
                ))}
              </List>
            </Dropdown>
          </div>
          <div className="flex flex-row gap-10 mt-8 items-center">
            <div className="flex flex-row gap-3 items-center">
              <Label>Pet</Label>
              <CheckboxNoForm
                checked={isPet}
                onChange={() => {
                  setIsPet((prev) => !prev);
                  console.log("isPet", isPet);
                }}
              />
            </div>
            <div className="flex flex-row gap-3 items-center">
              <Label>Max Persons</Label>
              <input
                type="number"
                value={persons}
                onChange={(e) => setPersons(e.target.value)}
                className="px-3 py-2 max-w-[100px] rounded-md outline-none border focus:border-primary"
              />
            </div>
          </div>
          <div className="flex flex-col gap-14 mt-5">
            <Label>Price</Label>
            <Slider
              value={price}
              onChange={handlePriceChange}
              valueLabelDisplay="on"
              getAriaValueText={() => {}}
              min={0}
              max={500}
            />
          </div>
        </div>
        <Button
          onClick={() =>
            handleConfirm({
              cityId,
              roomTypesId,
              isPet,
              persons,
              price,
              roomTypesName,
              cityName,
            })
          }
        >
          OK
        </Button>
      </div>
    </div>,
    document.querySelector("body")
  );
};

export default FilterHouses;
