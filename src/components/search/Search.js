import React, { useEffect, useState } from "react";
import Dropdown from "../dropdown/Dropdown";
import List from "../dropdown/List";
import Select from "../dropdown/Select";
import Field from "../field/Field";
import Option from "../dropdown/Option";
import Label from "../label/Label";
import http from "../../config/axiosConfig";
import { useForm } from "react-hook-form";
import { useSearch } from "../../context/search-context";
import { PATHS } from "../../utils/paths";

const Search = ({ handleSearch, col = false }) => {
  const [districts, setDistricts] = useState([]);
  const [districtName, setDistrictName] = useState("");
  const { setSearch, search } = useSearch();

  const { handleSubmit, setValue, register } = useForm({
    mode: "onSubmit",
  });

  useEffect(() => {
    http
      .get(PATHS.filterDistrict)
      .then((res) => {
        setDistricts(res?.data?.rows);
      })
      .catch((err) => console.log(err));
    setDistrictName(search.districtName);
  }, []);

  const handleClickDistrict = async (district) => {
    setValue("district", district.id);
    setDistrictName(district.name);
    setSearch((prev) => {
      return {
        ...prev,
        districtName: district.name,
        districtId: district.id,
      };
    });
  };

  const handleClearFilter = () => {
    setSearch({
      districtId: "",
      districtName: "",
    });
    setDistrictName("");
    setValue("minPrice", "");
    setValue("maxPrice", "");
  };
  return (
    <form
      onSubmit={handleSubmit(handleSearch)}
      className={`grid gap-3 ${
        col ? "grid-rows-1 w-full" : "grid-cols-4 w-full"
      } `}
    >
      <Field>
        <Label name="district">Quận:</Label>
        <Dropdown>
          <Select placeholder={districtName || "Chọn Quận"}></Select>
          <List>
            {districts.map((district) => (
              <Option
                key={district.id}
                onClick={() => handleClickDistrict(district)}
              >
                {district.name}
              </Option>
            ))}
          </List>
        </Dropdown>
      </Field>
      {col && (
        <div className="w-full">
          <Label>{`Giá phòng (VND):`}</Label>
          <div className="flex flex-row gap-5 mt-3">
            <input
              type="number"
              placeholder="Từ"
              name="minPrice"
              className="w-full py-2 px-3 rounded-md outline-none order bg-grayLight focus:border-primary bg-slate-100"
              {...register("minPrice", { required: true })}
            />
            <input
              type="number"
              placeholder="Đến"
              name="maxPrice"
              className="w-full py-2 px-3 rounded-md outline-none order bg-grayLight focus:border-primary bg-slate-100"
              {...register("maxPrice", { required: true })}
            />
          </div>
        </div>
      )}
      <div className="flex flex-col gap-3">
        <div className="flex flex-row gap-1 font-semibold items-center">
          <span onClick={handleClearFilter} className="ml-auto cursor-pointer">
            Hoàn tác
          </span>
        </div>
        <button
          type="submit"
          className="px-5 py-2 rounded-full bg-primary text-white"
        >
          Tìm kiếm
        </button>
      </div>
    </form>
  );
};

export default Search;
