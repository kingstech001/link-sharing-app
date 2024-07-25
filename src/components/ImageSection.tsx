import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Option } from "@/components/CustomDropdown";

interface ImageSectionProps {
  selectedOptions: Option[];
  optionStyles: Record<string, { backgroundColor: string; color: string }>;
}

const ImageSection: React.FC<ImageSectionProps> = ({
  selectedOptions,
  optionStyles,
}) => {
  return (
    <div className="w-full h-auto empty-page-left hidden lg:w-[560px] lg:h-[834px] p-6 gap-2 rounded-xl lg:flex items-center justify-center bg-white relative">
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
          {selectedOptions.map((option, index) => (
            <div
              key={index}
              className="image-main-bottom-1 w-[237px] h-[44px] flex items-center justify-between rounded-[8px] p-3"
              style={optionStyles[option.label as keyof typeof optionStyles]}
            >
              <span>{option.icon}</span>
              <span>{option.label}</span>
              <FaArrowRight />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSection;
