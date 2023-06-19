import React from "react";
import Dropdown from "../../dropdown/Dropdown";

const HomePage = () => {
  return (
    <>
      <section className="mb-[100px]">
        <div className="relative">
          <div className="image w-[100%] h-[750px]">
            <img
              src="https://images.unsplash.com/photo-1598228723793-52759bba239c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80"
              alt="home"
              className="w-[100%] h-[100%] object-cover"
            />
          </div>
          <div className="w-full h-full absolute top-0 left-0 bg-black bg-opacity-10"></div>
          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center mb-7">
              <span className="text-5xl text-white font-bold text-center">
                KÊNH THÔNG TIN PHÒNG TRỌ ĐÀ NẴNG
              </span>
              <span className="text-xl text-white">
                Cho Thuê Phòng Trọ, Giá Rẻ, Tiện Nghi, Mới Nhất 2023
              </span>
            </div>
            <Dropdown></Dropdown>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
