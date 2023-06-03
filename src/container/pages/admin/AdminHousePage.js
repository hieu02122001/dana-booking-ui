import React, { useEffect, useState } from "react";
import Table from "../../../components/table/Table";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import http from "../../../config/axiosConfig";
import { PATHS } from "../../../utils/paths";
import { toast } from "react-toastify";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { BsFillHouseAddFill } from "react-icons/bs";

const AdminHousePage = () => {
  const navigate = useNavigate();
  const [houseList, setHouseList] = useState([]);
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  //
  const getHouseList = () => {
    if (!localStorage.token) {
      navigate(PATHS.adminLogin);
    }
    setIsLoading(true);
    http
      .get(`${PATHS.adminHouses}?page=${page}&&search=${search}`)
      .then((res) => {
        console.log(res.data);
        const list = res?.data?.rows?.map((item) => {
          const houses = {
            id: item.id,
            name: item.name,
            ownerEmail: item.owner ? item.owner.email : "(None)",
            district: item.district ? item.district.name : "(None)",
            address: item.address,
            isActivated: item.isActivated ? "Yes" : "No",
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
          };
          return houses;
        });
        setHouseList(list);
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
    http.delete(`${PATHS.adminHouses}/${id}`).then((res) => {
      if (res.status === 200) {
        toast.success("Delete successfully");
        getHouseList();
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
    getHouseList();
  }, [page, user, search]);
  //
  const head = [
    "Name",
    "Owner's Email",
    "District",
    "Address",
    "Activated",
    "Created Date",
    "Updated Date",
  ];
  return (
    <div className="w-full px-5 pt-8">
      <div className="flex flex-row justify-between">
        <h1 className="font-semibold text-primary text-2xl">
          Houses Management
        </h1>
        <Button
          leftIcon={<BsFillHouseAddFill />}
          onClick={() => navigate(PATHS.adminAddHouses)}
          className="ml-auto"
          colorScheme="green"
          variant="outline"
        >
          House
        </Button>
      </div>
      <div className="w-full h-full max-w-[1400px]">
        <div className="mb-3 flex max-w-[250px]">
          <input
            type="text"
            className="px-4 py-2 border border-primary rounded-lg outline-none w-full"
            placeholder="Search House's Name"
            value={search}
            onChange={handleSearch}
          />
        </div>
        <Table
          head={head}
          data={houseList}
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

export default AdminHousePage;
