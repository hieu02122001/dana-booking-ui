import React, { useEffect, useState } from "react";
import http from "../../config/axiosConfig";
import Label from "../label/Label";
import "react-datetime/css/react-datetime.css";
import DatePicker from "react-datetime";
import { toast } from "react-toastify";
import RentModal from "./RentModal";
import { PATHS } from "../../utils/paths";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const RentRoomForm = ({ houseId, roomId, roomDetail }) => {
  console.log(roomDetail);
  const { user } = useAuth();
  const [monthRent, setMonthRent] = useState(1);
  const [date, setDate] = useState();
  const [house, setHouse] = useState();
  const [showModalRent, setShowModalRent] = useState(false);
  useEffect(() => {
    http.get(`${PATHS.tenantHouses}/${houseId}`).then((res) => {
      setHouse(res.data);
    });
  }, [houseId]);

  const handleDateSelect = (data) => {
    setDate(data)
  }
  const handleNextStep = (e) => {
    e.preventDefault();
    if (!date) {
      toast.error("Hãy chọn ngày bắt đầu!");
      return;
    }
    console.log(date);
    setShowModalRent(true);
  };
  const monthRentNumber = (e) => {
    if (e.target.value < 1) return;
    setMonthRent(e.target.value);
  };
  return (
    <>
      {showModalRent && (
        <RentModal
          handleClose={() => setShowModalRent(false)}
          roomDetail={roomDetail}
          userId={user.id}
          checkInDate={date}
          months={monthRent}
        />
      )}
      <form
        onSubmit={handleNextStep}
        className="w-full mt-5 px-4 py-4 shadow-lg rounded-xl"
      >
        <Label>Ngày bắt đầu:</Label>
        <div className="date_picker_wrapper mb-5 ">
          <DatePicker
            onChange={handleDateSelect}
            value={date}
            dateFormat="DD/MM/YYYY"
            timeFormat={false}
            className="datePicker"
            closeOnSelect={true}
            inputProps={{ readOnly: true }}
          />
        </div>
        <Label>Số tháng thuê:</Label>
        <div className="w-full mt-5 mb-5">
          <input
            type="number"
            value={monthRent}
            onChange={monthRentNumber}
            className="w-full px-3 py-2 max-w-[240px] rounded-md outline-none border-slate-200 bg-slate-100 focus:border-red-400 border"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 rounded-full bg-green-600 text-white font-semibold mt-5"
        >
          Bước tiếp theo
        </button>
      </form>
    </>
  );
};

export default RentRoomForm;
