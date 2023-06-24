import React, { useEffect, useState } from "react";

import Dropdown from "../../../components/dropdown/Dropdown";
import List from "../../../components/dropdown/List";
import Option from "../../../components/dropdown/Option";
import Select from "../../../components/dropdown/Select";
import Field from "../../../components/field/Field";
import Label from "../../../components/label/Label";
import http from "../../../config/axiosConfig";
import "react-datetime/css/react-datetime.css";
import Button from "../../../components/button/Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/loading/Loading";
import { PATHS } from "../../../utils/paths";

const AdminAddSubsPage = () => {
  const [landlords, setLandlords] = useState([]);
  const [landlordEmailSelect, setLandlordEmailSelect] = useState("");
  const [houses, setHouses] = useState([]);
  const [houseSelect, setHouseSelect] = useState("");
  const [rooms, setRooms] = useState([]);
  const [roomSelect, setRoomSelect] = useState("");
  const [totalPrice, setTotalPrice] = useState();
  //
  const [value, setValue] = useState();
  const [isLoading, setIsLoading] = useState(false);
  //
  const navigate = useNavigate();

  useEffect(() => {
    http
      .get(`filter/landlords`)
      .then((res) => {
        setLandlords(res.data?.rows);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleClickLandlordEmail = (item) => {
    setIsLoading(true);
    http
      .get(`${PATHS.adminHouses}?userId=${item.id}`)
      .then((res) => {
        setHouses(res.data?.rows);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
    setLandlordEmailSelect(item.email);
    setHouseSelect();
    setValue({
      ...value,
      userId: item.id,
    });
  };
  const handleClickHouse = (item) => {
    http
    .get(`${PATHS.landlordRooms}?houseId=${item.id}`)
    .then((res) => {
      setRooms(res.data?.rows);
      setIsLoading(false);
    })
    .catch((err) => {
      setIsLoading(false);
      console.log(err);
    });
    setHouseSelect(item.name);
    setRoomSelect();
    setValue({
      ...value,
      houseId: item.id,
    });
  };
  const handleClickRoom = (item) => {
    setRoomSelect(item.name);
    setTotalPrice(item.price)
    setValue({
      ...value,
      roomId: item.id,
      totalPrice: item.price
    });
  };
  const handleSubmit = () => {
    setIsLoading(true);
    const addSub = {
      ...value,
    };
    console.log(addSub);
    http
      .post(PATHS.adminSubscriptions, addSub)
      .then((res) => {
        toast.success("success");
        navigate(PATHS.adminSubscriptions);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  };

  return (
    <div className="p-8 w-full">
      <h1 className="font-bold text-2xl text-primary">THÊM ĐĂNG KÝ DỊCH VỤ MỚI</h1>
      <div className="w-full mt-8 max-w-[500px] mb-10">
      <Field>
          <Label>Email của Chủ trọ:</Label>
          <Dropdown>
            <Select placeholder={landlordEmailSelect || "Chọn một Email"}></Select>
            <List>
              {landlords.length > 0 &&
                landlords.map((item) => (
                  <Option
                    key={item.id}
                    onClick={() => handleClickLandlordEmail(item)}
                  >
                    {item.email}
                  </Option>
                ))}
            </List>
          </Dropdown>
        </Field>
        <Field>
          <Label>Nhà trọ:</Label>
          <Dropdown>
            <Select placeholder={houseSelect || "Chọn một Nhà trọ"}></Select>
            <List>
              {houses.length > 0 &&
                houses.map((item) => (
                  <Option
                    key={item.id}
                    onClick={() => handleClickHouse(item)}
                  >
                    {item.name}
                  </Option>
                ))}
            </List>
          </Dropdown>
        </Field>
        <Field>
          <Label>Phòng trọ:</Label>
          <Dropdown>
            <Select placeholder={roomSelect || "Chọn một Phòng trọ"}></Select>
            <List>
              {rooms.length > 0 &&
                rooms.map((item) => (
                  <Option
                    key={item.id}
                    onClick={() => handleClickRoom(item)}
                  >
                    {item.name}
                  </Option>
                ))}
            </List>
          </Dropdown>
        </Field>
        {isLoading ? (
          <Loading></Loading>
        ) : (
          <div className="flex flex-col gap-2">
            {totalPrice && (
              <div>
                <span className="font-semibold">Tổng tiền phòng: </span>
                {`${totalPrice} VND (Tiền hoa hồng là 5%)`}
              </div>
            )}
          </div>
        )}
      </div>
      <Button onClick={handleSubmit} isLoading={isLoading}>
        Xác nhận
      </Button>
    </div>
  );
};

export default AdminAddSubsPage;
