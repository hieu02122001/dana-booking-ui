import { Select } from "@chakra-ui/react";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dropdown = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const handleSearch = () => {
    if (!search) return;
  };
  return (
    <div className="w-[450px] h-[85px] flex flex-row justify-between items-center py-5 pl-8 pr-5 bg-white rounded-full">
      <div className="flex flex-col gap-2">
        {/* <span className="font-bold text-xs">Quận</span> */}
        <Select size="lg" width="200px" variant='flushed' placeholder="Chọn Quận">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
      </div>
      <button
        onClick={handleSearch}
        className="py-3 px-7 bg-primary rounded-full text-white"
      >
        Tìm kiếm
      </button>
    </div>
  );
};

export default Dropdown;
