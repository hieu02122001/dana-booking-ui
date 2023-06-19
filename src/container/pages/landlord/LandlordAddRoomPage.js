import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import { toast } from "react-toastify";
import http from "../../../config/axiosConfig";
import { PATHS } from "../../../utils/paths";
import Field from "../../../components/field/Field";
import Label from "../../../components/label/Label";
import Input from "../../../components/input/Input";
import { Button } from "@chakra-ui/react";
import UploadImages from "../../../components/uploadImages/UploadImages";

const schema = yup.object({
  name: yup.string().required("Hãy nhập TÊN phòng trọ"),
  price: yup.number().required("Hãy nhập GIÁ phòng"),
  description: yup.string(),
});
const LandlordAddRoomPage = () => {
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
      price: "",
      houseId: "",
      description: "",
    },
  });
  const navigate = useNavigate();
  const { state } = useLocation();
  const houseId = state?.houseId;
  const { user } = useAuth();
  const [imageFiles, setImageFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //
  useEffect(() => {
    const errorsList = Object.values(errors);
    if (errorsList.length > 0) {
      toast.error(errorsList[0]?.message);
    }
  }, [errors]);
  //
  const onSubmit = async (values) => {
    const roomObj = {
      name: values.name,
      price: values.price,
      houseId: houseId,
      images: imageFiles.map(item => item.url),
      description: values.description,
    };
    console.log(roomObj);
    setIsLoading(true);
    await http
      .post(PATHS.landlordRooms, roomObj)
      .then((res) => {
        navigate(`${PATHS.landlordRooms}/houses/${houseId}`);
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
      <h1 className="font-bold text-2xl text-primary">THÊM PHÒNG TRỌ MỚI</h1>
      <form
        className="w-full max-w-[600px] mt-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Field>
          <Label htmlFor="name">Tên:</Label>
          <Input
            type="text"
            name="name"
            placeholder="Nhập tên Phòng trọ"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="image">Hình ảnh:</Label>
          <div className="max-w-[1200px] w-full h-[220px] mb-5">
            <UploadImages
              imageFiles={imageFiles}
              setImageFiles={setImageFiles}
            />
          </div>
        </Field>
        <Field>
          <Label htmlFor="price">Giá (VND/Tháng):</Label>
          <Input
            type="text"
            name="price"
            placeholder="Nhập giá Phòng trọ"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="description">Mô tả:</Label>
          <Input
            type="text"
            name="description"
            maxLength={200}
            placeholder="Nhập mô tả Phòng tọ"
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

export default LandlordAddRoomPage;
