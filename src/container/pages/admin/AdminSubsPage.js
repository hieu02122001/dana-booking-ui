import React, { useEffect, useState } from "react";
import Table from "../../../components/table/TableAdmin";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import http from "../../../config/axiosConfig";
import { PATHS } from "../../../utils/paths";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { AiFillFolderAdd } from "react-icons/ai";

const AdminSubsPage = () => {
  const navigate = useNavigate();
  const [subsList, setSubsList] = useState([]);
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  //
  const getSubsList = () => {
    if (!localStorage.token) {
      navigate(PATHS.adminLogin);
    }
    setIsLoading(true);
    http
      .get(`${PATHS.adminSubscriptions}?page=${page}`)
      .then((res) => {
        console.log(res.data);
        const list = res?.data?.rows?.map((item) => {
          const subs = {
            id: item.id,
            houseName: item.house ? item.house.name : "(None)",
            roomName: item.room ? item.room.name : "(None)",
            landlordEmail: item.user ? item.user.email : "(None)",
            beginDate: item.beginDate || "-",
            endDate: item.endDate || "-",
            totalPrice: item.totalPrice,
            brokerageFee: item.brokerageFee || "-",
            status: item.status,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
          };
          return subs;
        });
        setSubsList(list);
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
  }, [page, user]);
  //
  const head = [
    "Tên nhà trọ",
    "Tên phòng trọ",
    "Email chủ trọ",
    "Ngày bắt đầu",
    "Ngày kết thúc",
    "Tổng tiền (VND)",
    "Phí dịch vụ",
    "Trạng thái",
    "Ngày tạo"
  ];
  return (
    <div className="w-full px-5 pt-8">
      <div className="flex flex-row justify-between">
        <h1 className="font-semibold text-primary text-2xl">
          QUẢN LÝ ĐĂNG KÝ DỊCH VỤ
        </h1>
        <Button
          leftIcon={<AiFillFolderAdd />}
          onClick={() => navigate(PATHS.adminAddSubscriptions)}
          className="ml-auto"
          colorScheme="green"
          variant="outline"
        >
          Thêm
        </Button>
      </div>
      <div className="w-full h-full max-w-[1400px]">
        <div className="mb-3 flex max-w-[250px]">
          
        </div>
        <Table
          head={head}
          data={subsList}
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

export default AdminSubsPage;
