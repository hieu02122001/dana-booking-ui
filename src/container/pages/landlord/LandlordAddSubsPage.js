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
      .get("packages")
      .then((res) => {
        setPackages(res.data?.rows);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleClickHouse = (item) => {
    setHouseSelect(item.name);
    setValue({
      ...value,
      houseId: item.id,
    });
  };
  const handleClickPackage = (item) => {
    const houseId = value?.houseId;
    if (!houseId) return;
    setPackagesSelect(`${item.name}  -  ${item.months} months`);
    const price = item.price.toLocaleString("vi-VI") + " VND";
    setTotalPrice(price);
    setValue({
      ...value,
      packageId: item.id,
      totalPrice: item.price,
    });
  };
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
          <Label>Gói:</Label>
          <Dropdown>
            <Select placeholder={packagesSelect || "Chọn một Gói"}></Select>
            <List>
              {packages.length > 0 &&
                packages.map((item) => (
                  <Option
                    key={item._id}
                    onClick={() => handleClickPackage(item)}
                  >
                    {`${item.name}  -  ${item.months} Tháng`}
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
                <span className="font-semibold">Tổng tiền: </span>
                {totalPrice}
              </div>
            )}
          </div>
        )}
      </div>
      <Button colorScheme="green" onClick={handleSubmit} isLoading={isLoading}>
        Xác nhận
      </Button>
    </div>
  );
};

export default LandlordAddSubsPage;
