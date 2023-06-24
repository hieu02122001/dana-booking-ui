import React, { useEffect, useState } from "react";
import http from "../../config/axiosConfig";
import Label from "../label/Label";
import "react-datetime/css/react-datetime.css";
import DatePicker from "react-datetime";
import { toast } from "react-toastify";
import RentModal from "./RentModal";
import moment from "moment";

const RentRoomForm = ({ locationId, roomId, roomDetail }) => {
  const [utilities, setUtilities] = useState([]);
  const [monthRent, setMonthRent] = useState(1);
  const [date, setDate] = useState();
  const [location, setLocation] = useState();
  const [showModalRent, setShowModalRent] = useState(false);
  useEffect(() => {
    http.get(`booking/locations/${locationId}`).then((res) => {
      setLocation(res.data);
    });
  }, [locationId]);

  const handleNextStep = (e) => {
    e.preventDefault();
    if (!date) {
      toast.error("Hãy chọn ngày bắt đầu!");
      return;
    }
    const utilitiesClient = [];
    utilities.forEach((utility) => {
      if (utility.checked === true) utilitiesClient.push(utility.value);
    });
    const booking = {
      roomId: roomId,
      startDay: date.toISOString(),
      monthNumber: monthRent,
      utilities: utilitiesClient,
    };

    setShowModalRent(true);
  };
  const monthRentNumber = (e) => {
    if (e.target.value < 1) return;
    setMonthRent(e.target.value);
  };
  const disableDate = (current, selectedDate) => {
    if (!roomDetail.availableDay) return;
    let availableDate = new Date(roomDetail.availableDay);
    let currentDate = new Date();
    const disableDate =
      currentDate > availableDate ? currentDate : availableDate;
    if (disableDate > new Date(current)) return false;
    return true;
  };
  return (
    <>
      {showModalRent && (
        <RentModal
          handleClose={() => setShowModalRent(false)}
          roomDetail={roomDetail}
          locationDetail={location}
          startDate={date}
          monthRent={monthRent}
          utilities={utilities}
        />
      )}
      <form
        onSubmit={handleNextStep}
        className="w-full mt-5 px-4 py-4 shadow-lg rounded-xl"
      >
        <Label>Ngày bắt đầu:</Label>
        <div className="date_picker_wrapper mb-5 ">
          <DatePicker
            onChange={(date) => setDate(date)}
            value={date}
            dateFormat="DD/MM/YYYY"
            timeFormat={false}
            className="datePicker"
            isValidDate={disableDate}
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
          className="w-full py-3 rounded-full bg-primary text-white font-semibold mt-5"
        >
          Bước tiếp theo
        </button>
      </form>
    </>
  );
};

export default RentRoomForm;
