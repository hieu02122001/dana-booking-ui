import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
  password: yup
    .string()
    .required("Hãy nhập mật khẩu")
    .min(6, "Mật khẩu phải dài từ 6-20 ký tự")
    .max(20, "Mật khẩu phải dài từ 6-20 ký tự"),
});
const TenantRegisterPage = () => {
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
      email: "",
      fullName: "",
      phone: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  const watchPasswordConfirm = watch("passwordConfirm");
  const [isLoading, setIsLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState("");
  //
  useEffect(() => {
    const errorsList = Object.values(errors);
    if (errorsList.length > 0) {
      toast.error(errorsList[0]?.message);
    }
  }, [errors]);
  //
  const onSubmit = async (values) => {
    const userObj = {
      fullName: values.fullName,
      image: imageFiles[0].url,
      email: values.email,
      phone: values.phone,
      userType: "TENANT",
      password: values.password,
    };
    setIsLoading(true);
    await http
      .post(PATHS.users, userObj)
      .then((res) => {
        navigate(PATHS.tenantLogin);
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
      <h1 className="font-bold text-2xl max-w-[600px] mx-auto text-primary">TẠO TÀI KHOẢN MỚI</h1>
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
        <Field>
          <Label htmlFor="password">Mật khẩu</Label>
          <Input
            type="password"
            name="password"
            placeholder="Hãy nhập Mật khẩu"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="passwordConfirm">Xác nhận mật khẩu</Label>
          <Input
            type="password"
            name="passwordConfirm"
            placeholder="Hãy xác nhận Mật khẩu"
            control={control}
          ></Input>
          {getValues("password") &&
            watchPasswordConfirm !== getValues("password") && (
              <div className="text-red-500">Không khớp</div>
            )}
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

export default TenantRegisterPage;
