"use client";
import React from "react";
import { useRouter } from "next/navigation"; // Import useRouter from next/router
import { FaPlus } from "react-icons/fa";

const EmptyPage: React.FC = () => {
  const router = useRouter(); // Initialize the router

  const handleAddNewLink = () => {
    // Navigate to the AddPage
    router.push("/add");
  };

  return (
    <div className="empty-page bg-gray-50 flex p-6 gap-6 flex-col md:flex-row">
      <div className="w-full empty-page-left hidden lg:w-[560px] lg:h-[834px] p-6 gap-2 rounded-xl lg:flex items-center justify-center bg-white relative">
        <img
          src="/Rectangle 15.png"
          alt="Example"
          className="w-full lg:w-[307px] lg:h-[631px] border border-white"
        />
        <img
          src="/Subtract.png"
          alt="Example"
          className="w-[285px] h-[611px] border border-white absolute inset-0 m-auto"
        />
        <div className="image-main w-[237px] h-auto flex flex-col gap-14 absolute top-[165px] left-[161px] ">
          <div className="image-main-head flex flex-col gap-6  items-center justify-center">
            <div className="image-main-head-1 w-[96px] h-[96px] bg-[#EEEEEE] rounded-full"></div>
            <div className="image-main-head-2 w-[160px] h-[16px] bg-[#EEEEEE] rounded-[104px]"></div>
            <div className="image-main-head-3 w-[72px] h-[8px] bg-[#EEEEEE] rounded-[104px]"></div>
          </div>
          <div className="image-main-bottom flex flex-col gap-5">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="image-main-bottom-1 w-[237px] h-[44px] bg-[#EEEEEE] rounded-[8px]"
              ></div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full empty-page-right flex-1 h-auto gap-6 p-10 rounded-xl bg-white flex flex-col">
        <div className="page-right-text gap-2">
          <h2 className="font-bold text-[32px] leading-[48px] text-[#333333]">
            Customize your links
          </h2>
          <p className="text-[16px] leading-[24px] text-[#737373]">
            Add/edit/remove links below and then share all your profiles with
            the world!
          </p>
        </div>

        <div className="page-right-work gap-6 mt-4">
          <button
            className="w-full flex items-center justify-center gap-2 p-3 rounded-lg border border-[#633CFF] text-[#633CFF] hover:bg-[#EFEBFF]"
            onClick={handleAddNewLink} // Add onClick handler
          >
            <FaPlus />
            Add new link
          </button>
        </div>

        <div className="w-full page-right-started p-8 gap-3 rounded-lg bg-[#FAFAFA] flex flex-col">
          <div className="w-full lg:w-[249.53px] lg:h-[160px] mx-auto">
            <img src="/Group 273.png" alt="Example" />
          </div>

          <div className="page-right-started-1 gap-6 text-center">
            <h1 className="font-semibold text-[32px] leading-[48px] text-[#333333]">
              Let’s get you started
            </h1>
            <p className="text-[16px] leading-[24px] text-[#737373]">
              Use the “Add new link” button to get started. Once you have more
              than one link, you can reorder and edit them. We’re here to help
              you share your profiles with everyone!
            </p>
          </div>
        </div>
        <div className="flex justify-end mt-10 border-t-2 pt-4">
          <button className="w-full md:w-[91px] md:h-[46px] p-3 rounded-lg opacity-25 bg-[#633CFF] text-white hover:bg-[#BEADFF] hover:shadow-lg hover:shadow-[#633CFF40]">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmptyPage;
