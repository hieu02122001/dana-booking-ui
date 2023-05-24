import React, { useEffect, useState } from "react";
import Table from "../../../components/table/Table";
import { Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import http from "../../../config/axiosConfig";
import { PATHS } from "../../../utils/paths";
import { toast } from "react-toastify";

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
    let userType = "LANDLORD";
    setIsLoading(true);
    http
      .get(`${PATHS.adminUsers}?userType=${userType}`)
      .then((res) => {
        console.log(res.data);
        const list = res?.data?.rows?.map((item) => {
          const users = {
            id: item.id,
            fullName: item.fullName,
            housesCount: item.housesCount ? item.housesCount : 0,
            email: item.email,
            phone: item.phone,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
          };
          return users;
        });
        setUserList(list);
        console.log(userList);
        setPageCount(Math.ceil(res?.data?.count / 10));
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
        toast.success("delete success");
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
    "Full Name",
    "Number Of Houses",
    "Email",
    "Phone",
    "Created Date",
    "Updated Date",
  ];
  return (
    <>
      <Heading size="lg" fontSize="2rem" color="teal.600" textAlign="center">
        Landlord Management
      </Heading>
      <Table
        head={head}
        data={userList}
        page={page}
        handleDelete={handleDelete}
        isLoading={isLoading}
      ></Table>
    </>
  );
};

export default AdminUserPage;
