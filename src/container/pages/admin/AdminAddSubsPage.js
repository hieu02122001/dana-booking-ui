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
      .get(`filter/landlords`)
      .then((res) => {
        setLandlords(res.data?.rows);
      })
      .catch((err) => {
        console.log(err);
      });
    http
      .get(`filter/houses`)
      .then((res) => {
        setHouses(res.data?.rows);
      })
      .catch((err) => {
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
  const handleClickLandlordEmail = (item) => {
    setLandlordEmailSelect(item.email);
    setValue({
      ...value,
      userId: item.id,
    });
  };
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
    const price = item.price.toLocaleString('vi-VI') + " VND";
    setTotalPrice(price);
    setValue({
      ...value,
      packageId: item.id,
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
      <h1 className="font-bold text-2xl text-primary">ADD NEW SUBSCRIPTION</h1>
      <div className="w-full mt-8 max-w-[500px] mb-10">
      <Field>
          <Label>Landlord's Email</Label>
          <Dropdown>
            <Select placeholder={landlordEmailSelect || "Choose an Email"}></Select>
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
          <Label>House</Label>
          <Dropdown>
            <Select placeholder={houseSelect || "Choose a House"}></Select>
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
          <Label>Package</Label>
          <Dropdown>
            <Select placeholder={packagesSelect || "Package"}></Select>
            <List>
              {packages.length > 0 &&
                packages.map((item) => (
                  <Option
                    key={item._id}
                    onClick={() => handleClickPackage(item)}
                  >
                    {`${item.name}  -  ${item.months} months`}
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
                <span className="font-semibold">Total price: </span>
                {totalPrice}
              </div>
            )}
          </div>
        )}
      </div>
      <Button onClick={handleSubmit} isLoading={isLoading}>
        Submit
      </Button>
    </div>
  );
};

export default AdminAddSubsPage;
