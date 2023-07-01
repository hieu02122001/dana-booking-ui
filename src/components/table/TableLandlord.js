import React from "react";
import { TbEdit, TbTrashXFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import BookingPending from "../dialog/BookingPending";
import SubsReady from "../dialog/SubsReady";

const Table = ({ head, data, linkTo, handleDelete, isLoading = false }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full overflow-x-auto shadow-md rounded-lg">
      {isLoading && (
        <div className="w-10 h-10 border-8 inline-block border-t-noColor rounded-full border-purple-500 animate-spin fixed z-20 top-[50%] left-[50%]"></div>
      )}
      <table className="w-full text-sm">
        <thead className="bg-purple-200">
          <tr>
            <th>ID</th>
            {head?.length &&
              head.map((item, index) => {
                return (
                  <th className="px-6 py-4" key={index}>
                    {item}
                  </th>
                );
              })}
          </tr>
        </thead>
        {!isLoading && (
          <tbody>
            {data?.length > 0 &&
              data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    {Object.values(item)
                      .slice(1, head.length + 1)
                      .map((value, i) => {
                        return (
                          <td key={i}>
                            {value === "FAIL" ? (
                              <span style={{ color: "#d75a64" }}>THẤT BẠI</span>
                            ) : value === "REJECTED" ? (
                              <span style={{ color: "#d75a64" }}>TỪ CHỐI</span>
                            ) : value === "APPROVED" ? (
                              <span style={{ color: "#0A6EBD" }}>
                                ĐÃ XÁC NHẬN
                              </span>
                            ) : value === "PENDING" ? (
                              <BookingPending data={item} />
                            ) : value === "SUCCESS" ? (
                              <span style={{ color: "#16FF00" }}>
                                THÀNH CÔNG
                              </span>
                            ) : value === "RUNNING" ? (
                              <span style={{ color: "#0A6EBD" }}>
                                ĐANG HOẠT ĐỘNG
                              </span>
                            ) : value === "READY" ? (
                              <SubsReady data={item} />
                            ) : (
                              <span>{value}</span>
                            )}
                          </td>
                        );
                      })}
                  </tr>
                );
              })}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default Table;
