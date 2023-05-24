import React from "react";
import { TbEdit, TbTrashXFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";

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
                            {value === "CANCELLED" ? (
                              <span style={{ color: "#d75a64" }}>{value}</span>
                            ) : value === "APPROVED" ? (
                              <span style={{ color: "#039487" }}>{value}</span>
                            ) : value === "PENDING" ? (
                              <span style={{ color: "#6a5af9" }}>{value}</span>
                            ) : value === "PAYING" ? (
                              <span style={{ color: "#fece04" }}>{value}</span>
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
