import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import { toast } from "react-toastify";
import http from "../../../config/axiosConfig";
import { PATHS } from "../../../utils/paths";
import Field from "../../../components/field/Field";
import Label from "../../../components/label/Label";
import Input from "../../../components/input/Input";
import Dropdown from "../../../components/dropdown/Dropdown";
import Select from "../../../components/dropdown/Select";
import List from "../../../components/dropdown/List";
import Option from "../../../components/dropdown/Option";
import { Button } from "@chakra-ui/react";

const schema = yup.object({
  name: yup.string().required("Hãy nhập Tên nhà trọ"),
  userId: yup.string().required("Hãy nhập Địa chỉ email của chủ trọ"),
  district: yup.string().required("Hãy chọn Quận"),
  address: yup.string().required("Hãy nhập địa chỉ"),
  description: yup.string(),
});
const AdminAddHousePage = () => {
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      userId: "",
      district: "",
      address: "",
      description: "",
    },
  });
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [landlords, setLandlords] = useState([]);
  const [ownerEmail, setOwnerEmail] = useState("");
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  //
  useEffect(() => {
    const errorsList = Object.values(errors);
    if (errorsList.length > 0) {
      toast.error(errorsList[0]?.message);
    }
  }, [errors]);
  //
  useEffect(() => {
    http
      .get(PATHS.filterDistrict)
      .then((res) => {
        setDistricts(res?.data?.rows);
      })
      .catch((err) => console.log(err));
  }, []);
  //
  const handleDistrictSelect = (item) => {
    setValue("district", item.id);
    setDistrict(item.name);
  }
  //
  useEffect(() => {
    http
      .get(PATHS.filterLandlord)
      .then((res) => {
        setLandlords(res?.data?.rows);
      })
      .catch((err) => console.log(err));
  }, []);
  //
  const handleLandlordSelect = (item) => {
    setValue("userId", item.id);
    setOwnerEmail(item.email);
  }
  //
  const onSubmit = async (values) => {
    const houseObj = {
      name: values.name,
      userId: values.userId,
      district: values.district,
      address: values.address,
      description: values.description,
    };
    setIsLoading(true);
    await http
      .post(PATHS.adminHouses, houseObj)
      .then((res) => {
        navigate(PATHS.adminHouses);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.data?.message);
        setIsLoading(false);
      });
  };

  return (
    <div className="p-8 w-full">
      <h1 className="font-bold text-2xl text-primary">THÊM NHÀ TRỌ MỚI</h1>
      <form
        className="w-full max-w-[600px] mt-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Field>
          <Label htmlFor="name">Tên nhà trọ:</Label>
          <Input
            type="text"
            name="name"
            placeholder="Nhập Tên"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="userId">Chủ trọ:</Label>
          <Dropdown>
            <Select placeholder={ownerEmail || "Chọn một Địa chỉ email"}></Select>
            <List>
              {landlords?.map((item) => (
                <Option key={item.id} onClick={() => handleLandlordSelect(item)}>{item.email}</Option>
              ))}
            </List>
          </Dropdown>
        </Field>
        <Field>
          <Label htmlFor="district">Quận:</Label>
          <Dropdown>
            <Select placeholder={district || "Chọn một Quận"}></Select>
            <List>
              {districts?.map((item) => (
                <Option key={item.id} onClick={() => handleDistrictSelect(item)}>{item.name}</Option>
              ))}
            </List>
          </Dropdown>
        </Field>
        <Field>
          <Label htmlFor="address">Địa chỉ:</Label>
          <Input
            type="text"
            name="address"
            placeholder="Nhập Địa chỉ"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="description">Mô tả:</Label>
          <Input
            type="text"
            name="description"
            placeholder="Nhập Mô tả"
            control={control}
          ></Input>
        </Field>
        <div className="button-container">
          <Button colorScheme="green" type="submit" isLoading={isLoading}>
            Xác nhận
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminAddHousePage;
