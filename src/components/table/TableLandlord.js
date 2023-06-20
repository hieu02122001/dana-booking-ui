import React from "react";
import { TbEdit, TbTrashXFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import Draft from "../dialog/Draft";
import Paying from "../dialog/Paying";

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
            <th></th>
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
                            {value === "CANCELED" ? (
                              <span style={{ color: "#d75a64" }}>ĐÃ HUỶ</span>
                            ) : value === "DRAFT" ? (
                              <Draft data={item} />
                            ) : value === "RUNNING" ? (
                              <span style={{ color: "#16FF00" }}>ĐANG HOẠT ĐỘNG</span>
                            ) : value === "READY" ? (
                              <span style={{ color: "#2192FF" }}>SẴN SÀNG</span>
                            ) : value === "PAYING" ? (
                              <Paying data={item} />
                            ) : value === "DONE" ? (
                              <span style={{ color: "#A149FA" }}>HOÀN THÀNH</span>
                            ) : (
                              <span>{value}</span>
                            )}
                          </td>
                        );
                      })}
                    <td>
                      <div className="flex flex-row w-full justify-end gap-2 mt-auto">
                        <Button
                          bg="bg-cyan-400"
                          onClick={() => navigate(`${linkTo}${item.id}`)}
                        >
                          <TbEdit />
                        </Button>
                        <Button
                          bg="bg-red-500"
                          onClick={() => handleDelete(item.id)}
                        >
                          <TbTrashXFilled />
                        </Button>
                      </div>
                    </td>
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
