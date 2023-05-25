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

const schema = yup.object({
  fullName: yup.string().required("Please enter your Full name"),
  email: yup
    .string()
    .email("Please enter valid Email address")
    .required("Please enter your Email"),
  phone: yup
    .string()
    .required("Please enter your phone Number")
    .matches(/^\d+$/, "Phone must be Number"),
  password: yup
    .string()
    .required("Please enter your Password")
    .min(6, "Password length must be from 6-20 characters")
    .max(20, "Password length must be from 6-20 characters"),
});
const AdminAddUserPage = () => {
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
  const { user } = useAuth();
  const watchPasswordConfirm = watch("passwordConfirm");
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
    const userObj = {
      fullName: values.fullName,
      email: values.email,
      phone: values.phone,
      password: values.password,
    };
    setIsLoading(true);
    await http
      .post(PATHS.adminUsers, userObj)
      .then((res) => {
        navigate(PATHS.adminUsers);
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
      <h1 className="font-bold text-2xl text-primary">ADD NEW LANDLORD</h1>
      <form
        className="w-full max-w-[600px] mt-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Field>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            type="text"
            name="fullName"
            placeholder="Enter your Full name"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="email" className="email">
            Email
          </Label>
          <Input
            type="email"
            name="email"
            placeholder="Enter your Email"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            type="text"
            name="phone"
            placeholder="Enter your Phone number"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Enter your Password"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="passwordConfirm">Password Confirm</Label>
          <Input
            type="password"
            name="passwordConfirm"
            placeholder="Confirm your password"
            control={control}
          ></Input>
          {getValues("password") &&
            watchPasswordConfirm !== getValues("password") && (
              <div className="text-red-500">Not match</div>
            )}
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

export default AdminAddUserPage;
