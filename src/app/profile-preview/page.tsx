"use client";
import React from "react";
import { FaGithub, FaArrowRight } from "react-icons/fa"; // Import react-icons for GitHub and arrow icons
import { useRouter } from "next/navigation"; // Import useRouter for navigation

const ProfilePreview: React.FC = () => {
  const router = useRouter(); // Initialize useRouter

  // Function to handle the button click and navigate to the Add page
  const handleBackToEditorClick = () => {
    router.push("/add"); // Navigate to the Add page
  };

  return (
    <div className="preview w-full h-screen relative bg-gray-100 flex flex-col items-center mb-20">
      {/* Preview Top */}
      <div className="preview-top w-full h-[357px] gap-0 md:rounded-b-[32px] md:bg-[#633CFF]">
        <div className="preview-top-nav w-auto h-auto md:h-[78px] p-[16px] gap-[8px] m-4 md:rounded-[12px] md:bg-[#FFFFFF] flex items-center">
          <div className="preview-nav-main flex justify-between flex-row w-full">
            <div className="preview-nav-main-1">
              <button
                className="w-auto md:w-[159px] h-auto md:h-[46px] px-[27px] py-[11px] gap-[8px] rounded-[8px] border border-[#633CFF] text-[#633CFF]"
                onClick={handleBackToEditorClick} // Add click handler
              >
                Back to Editor
              </button>
            </div>
            <div className="preview-nav-main-2">
              <button className="w-auto md:w-[133px] h-auto md:h-[46px] px-[27px] py-[11px] gap-[8px] rounded-[8px] bg-[#633CFF] text-white">
                Share Link
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Mobile */}
      <div className="preview-mobile absolute inset-0 m-auto w-full h-full md:w-[349px] md:h-[569px] p-[40px] justify-center md:mt-48 md:rounded-[24px] md:bg-[#FFFFFF] md:shadow-[0px_0px_32px_0px_#0000001A] flex flex-col ">
        <div className="preview-mobile-main gap-[56px] flex flex-col">
          <div className="preview-mobile-main-top gap-[25px] flex flex-col items-center">
            <div className="preview-image w-[104px] h-[104px] border-[4px] rounded-full border-[#633CFF] bg-[#EEEEEE]"></div>
            <h2 className="text-[32px] font-bold leading-[48px] text-[#333333]">
              Profile Name
            </h2>
            <p className="text-[16px] font-normal leading-[24px] text-[#737373]">
              Profile Description
            </p>
          </div>
          <div className="preview-links gap-[20px] flex flex-col">
            <div className="preview-links-1 p-[16px] gap-[8px] rounded-[8px] text-white bg-[#1A1A1A] flex justify-between items-center">
              <div className="flex items-center gap-[8px]">
                <FaGithub />
                <p>GitHub</p>
              </div>
              <FaArrowRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePreview;
