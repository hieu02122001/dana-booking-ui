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
import { Button } from "@chakra-ui/react";
import UploadImage from "../../../components/uploadImages/UploadImage";

const schema = yup.object({
  fullName: yup.string().required("Hãy nhập TÊN Chủ trọ"),
  email: yup
    .string()
    .email("Hãy nhập Địa chỉ email hợp lệ")
    .required("Hãy nhập Địa chỉ email"),
  phone: yup
    .string()
    .required("Hãy nhập Số điện thoại")
    .matches(/^\d+$/, "Số điện thoại phải là số"),
});
const TenantProfilePage = () => {
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
    watch,
    reset
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      fullName: "",
      phone: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState("");
  const { user, setUser } = useAuth();
  //
  useEffect(() => {
    const errorsList = Object.values(errors);
    if (errorsList.length > 0) {
      toast.error(errorsList[0]?.message);
    }
  }, [errors]);
  //
  useEffect(() => {
    reset({
      fullName: user.fullName,
      image: user?.image,
      email: user.email,
      phone: user.phone,
    })
    console.log(user);
    const listFiles = { file: {name: user?.image }, url: user?.image };
    setImageFiles([listFiles]);
  }, [])
  //
  const onSubmit = async (values) => {
    const userObj = {
      fullName: values.fullName,
      image: imageFiles[0].url,
      email: values.email,
      phone: values.phone,
    };
    setIsLoading(true);
    await http
      .put(`${PATHS.landlordUsers}/${user.id}`, userObj)
      .then((res) => {
        http.get('/me').then((resMe) => {
          setUser(resMe?.data);
        })
        navigate(PATHS.tenantRooms);
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
      <h1 className="font-bold text-2xl max-w-[600px] mx-auto text-primary">CẬP NHẬT THÔNG TIN CÁ NHÂN</h1>
      <form
        className="w-full max-w-[600px] mx-auto mt-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Field>
          <Label htmlFor="fullName">Tên đầy đủ:</Label>
          <Input
            type="text"
            name="fullName"
            placeholder="Hãy nhập Tên đầy đủ"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="image">Hình ảnh:</Label>
          <div className="max-w-[1200px] w-full h-[220px] mb-5">
            <UploadImage
              imageFiles={imageFiles}
              setImageFiles={setImageFiles}
            />
          </div>
        </Field>
        <Field>
          <Label htmlFor="email" className="email">
            Email:
          </Label>
          <Input
            type="email"
            name="email"
            placeholder="Hãy nhập Địa chỉ email"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="phone">Số điện thoại</Label>
          <Input
            type="text"
            name="phone"
            placeholder="Hãy nhập số điện thoại"
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

export default TenantProfilePage;
