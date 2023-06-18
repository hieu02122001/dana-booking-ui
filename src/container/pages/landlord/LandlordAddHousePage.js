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
import UploadImage from "../../../components/uploadImages/UploadImage";

const schema = yup.object({
  name: yup.string().required("Please enter a House's Name"),
  district: yup.string().required("Please choose a District"),
  address: yup.string().required("Please enter a House's Address"),
  description: yup.string(),
});
const LandlordAddHousePage = () => {
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
      image: "",
      district: "",
      address: "",
      description: "",
    },
  });
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [imageFiles, setImageFiles] = useState("");
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
  };
  //
  const onSubmit = async (values) => {
    const houseObj = {
      name: values.name,
      userId: user.id,
      image: imageFiles[0].url,
      district: values.district,
      address: values.address,
      description: values.description,
    };
    console.log(houseObj);
    setIsLoading(true);
    await http
      .post(PATHS.landlordHouses, houseObj)
      .then((res) => {
        navigate(PATHS.landlordHouses);
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
      <h1 className="font-bold text-2xl text-primary">ADD NEW HOUSE</h1>
      <form
        className="w-full max-w-[600px] mt-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Field>
          <Label htmlFor="name">House's Name</Label>
          <Input
            type="text"
            name="name"
            placeholder="Enter a House's Name"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="image">Image</Label>
          <div className="max-w-[1200px] w-full h-[220px] mb-5">
        <UploadImage imageFiles={imageFiles} setImageFiles={setImageFiles} />
      </div>
        </Field>
        <Field>
          <Label htmlFor="district">District</Label>
          <Dropdown>
            <Select placeholder={district || "Choose a District"}></Select>
            <List>
              {districts?.map((item) => (
                <Option
                  key={item.id}
                  onClick={() => handleDistrictSelect(item)}
                >
                  {item.name}
                </Option>
              ))}
            </List>
          </Dropdown>
        </Field>
        <Field>
          <Label htmlFor="address">Address</Label>
          <Input
            type="text"
            name="address"
            placeholder="Enter a House's Address"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="description">Description</Label>
          <Input
            type="textarea"
            name="description"
            maxLength={200}
            placeholder="Enter a House's Description"
            control={control}
          ></Input>
        </Field>
        <div className="button-container">
          <Button colorScheme="green" type="submit" isLoading={isLoading}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LandlordAddHousePage;
