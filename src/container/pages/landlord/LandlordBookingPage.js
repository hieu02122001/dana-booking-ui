import React, { useEffect, useState } from "react";
import Table from "../../../components/table/TableLandlord";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import http from "../../../config/axiosConfig";
import { PATHS } from "../../../utils/paths";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

const LandlordBookingPage = () => {
  const navigate = useNavigate();
  const [bookingList, setBookingList] = useState([]);
  const { user } = useAuth();
  const userId = user.id;
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  //
  const getSubsList = () => {
    if (!localStorage.token) {
      navigate(PATHS.landlordLogin);
    }
    setIsLoading(true);
    http
      .get(`${PATHS.landlordBookings}?page=${page}&landlordId=${userId}`)
      .then((res) => {
        console.log(res.data);
        const list = res?.data?.rows?.map((item) => {
          const subs = {
            id: item.id,
            houseName: item.house ? item.house.name : "(None)",
            roomName: item.room ? item.room.name : "(None)",
            userName: item.user ? item.user.fullName : "(None)",
            checkInDate: item.checkInDate || "-",
            checkOutDate: item.checkOutDate || "-",
            totalPrice: item.totalPrice,
            status: item.status,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
          };
          return subs;
        });
        setBookingList(list);
        setPageCount(Math.ceil(res?.data?.count / 6));
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  // Paging
  const previousPage = () => {
    if (page <= 1) return;
    setPage(page - 1);
  };
  const nextPage = () => {
    if (page >= pageCount) return;
    setPage(page + 1);
  };
  //
  useEffect(() => {
    getSubsList();
  }, [page, userId]);
  //
  const head = [
    "Tên Nhà trọ",
    "Tên phòng trọ",
    "Tên người thuê",
    "Ngày bắt đầu",
    "Ngày kết thúc",
    "Tổng tiền (VND)",
    "Trạng thái",
    "Ngày tạo"
  ];
  return (
    <div className="w-full px-5 pt-8">
      <div className="flex flex-row justify-between">
        <h1 className="font-semibold text-primary text-2xl">
          QUẢN LÝ ĐĂNG KÝ THUÊ PHÒNG
        </h1>
      </div>
      <div className="w-full h-full max-w-[1400px]">
        <div className="mb-3 flex max-w-[250px]">
          
        </div>
        <Table
          head={head}
          data={bookingList}
          page={page}
          isLoading={isLoading}
        ></Table>
        <div className="flex flex-row gap-4 justify-end text-xl items-center mt-4">
          <BiLeftArrow className="cursor-pointer" onClick={previousPage} />
          <span>{page}</span>
          <BiRightArrow className="cursor-pointer" onClick={nextPage} />
        </div>
      </div>
    </div>
  );
};

export default LandlordBookingPage;
