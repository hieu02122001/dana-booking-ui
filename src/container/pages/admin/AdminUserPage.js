import React, { useEffect, useState } from "react";
import Table from "../../../components/table/Table";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import http from "../../../config/axiosConfig";
import { PATHS } from "../../../utils/paths";
import { toast } from "react-toastify";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { AiOutlineUserAdd } from "react-icons/ai";
const AdminUserPage = () => {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  //
  const getUserList = () => {
    if (!localStorage.token) {
      navigate(PATHS.adminLogin);
    }
    setIsLoading(true);
    http
      .get(`${PATHS.adminUsers}?page=${page}&&search=${search}`)
      .then((res) => {
        console.log(res.data);
        const list = res?.data?.rows?.map((item) => {
          const users = {
            id: item.id,
            fullName: item.fullName,
            housesCount: item.houses ? item.houses.length : 0,
            email: item.email,
            phone: item.phone,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
          };
          return users;
        });
        setUserList(list);
        console.log(userList);
        setPageCount(Math.ceil(res?.data?.count / 6));
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  //
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  //
  const handleDelete = (id) => {
    http.delete(`${PATHS.adminUsers}/${id}`).then((res) => {
      if (res.status === 200) {
        toast.success("Xoá thành công");
        getUserList();
      }
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
    getUserList();
  }, [page, user, search]);
  //
  const head = [
    "Tên",
    "Số lượng nhà trọ",
    "Email",
    "SĐT",
    "Ngày tạo",
    "Ngày cập nhật",
  ];
  return (
    <div className="w-full px-5 pt-8">
      <div className="flex flex-row justify-between">
        <h1 className="font-semibold text-primary text-2xl">
          QUẢN LÝ CHỦ TRỌ
        </h1>
        <Button leftIcon={<AiOutlineUserAdd />} onClick={() => navigate(PATHS.adminAddUsers)} className="ml-auto" colorScheme="green" variant="outline">
          Thêm
        </Button>
      </div>
      <div className="w-full h-full max-w-[1400px]">
        <div className="mb-3 flex max-w-[250px]">
          <input
            type="text"
            className="px-4 py-2 border border-primary rounded-lg outline-none w-full"
            placeholder="Tìm Tên, SĐT, Email"
            value={search}
            onChange={handleSearch}
          />
        </div>
        <Table
          head={head}
          data={userList}
          page={page}
          handleDelete={handleDelete}
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

export default AdminUserPage;
