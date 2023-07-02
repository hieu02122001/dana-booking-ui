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
import { useAuth } from "../../../context/authContext";

const LandlordAddSubsPage = () => {
  const { user } = useAuth();
  const [houses, setHouses] = useState([]);
  const [houseSelect, setHouseSelect] = useState("");
  const [rooms, setRooms] = useState([]);
  const [roomSelect, setRoomSelect] = useState("");
  const [packages, setPackages] = useState([]);
  const [packagesSelect, setPackagesSelect] = useState("");
  const [totalPrice, setTotalPrice] = useState();
  //
  const [value, setValue] = useState();
  const [isLoading, setIsLoading] = useState(false);
  //
  const navigate = useNavigate();

  useEffect(() => {
    http
      .get(`${PATHS.landlordHouses}`)
      .then((res) => {
        setHouses(res.data?.rows);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
    http
      .get(PATHS.packages)
      .then((res) => {
        setPackages(res.data?.rows);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleClickHouse = (item) => {
    http
    .get(`${PATHS.landlordRooms}?houseId=${item.id}&&isAds=${false}`)
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
      roomId: item.id
    });
  };
  const handleClickPackage = (item) => {
    setPackagesSelect(`${item.name}  -  ${item.days} ngày`);
    setValue({
      ...value,
      packageId: item.id
    })
  }
  const handleSubmit = () => {
    setIsLoading(true);
    const addSub = {
      ...value,
      userId: user.id
    };
    console.log(addSub);
    http
      .post(PATHS.landlordSubscriptions, addSub)
      .then((res) => {
        toast.success("success");
        navigate(PATHS.landlordSubscriptions);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  };

  return (
    <div className="p-8 w-full">
      <h1 className="font-bold text-2xl text-primary">
        THÊM ĐĂNG KÝ DỊCH VỤ MỚI
      </h1>
      <div className="w-full mt-8 max-w-[500px] mb-10">
        <Field>
          <Label>Nhà trọ:</Label>
          <Dropdown>
            <Select placeholder={houseSelect || "Chọn một Nhà trọ"}></Select>
            <List>
              {houses.length > 0 &&
                houses.map((item) => (
                  <Option key={item.id} onClick={() => handleClickHouse(item)}>
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
        <Field>
          <Label>Gói:</Label>
          <Dropdown>
            <Select placeholder={packagesSelect || "Chọn một gói"}></Select>
            <List>
              {packages.length > 0 &&
                packages.map((item) => (
                  <Option
                    key={item._id}
                    onClick={() => handleClickPackage(item)}
                  >
                    {`${item.name}  -  ${item.days} ngày`}
                  </Option>
                ))}
            </List>
          </Dropdown>
        </Field>
        {/* {isLoading ? (
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
        )} */}
      </div>
      <Button colorScheme="green" onClick={handleSubmit} isLoading={isLoading}>
        Xác nhận
      </Button>
    </div>
  );
};

export default LandlordAddSubsPage;
