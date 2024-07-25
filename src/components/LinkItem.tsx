import React, { ChangeEvent, FocusEvent } from "react";
import { FaLink } from "react-icons/fa";
import CustomDropdown, { Option } from "@/components/CustomDropdown";

export interface LinkItemProps {
  link: { id: number; selectedOption: Option | null; url: string };
  onSelect: (option: Option | null, id: number) => void;
  onRemove: (id: number) => void;
  onInputChange: (id: number, value: string) => void;
  onInputFocus: (id: number) => void;
  onInputBlur: () => void;
  inputBorderColor: string;
  validationMessage: string | null;
  urlError: string | null;
}

const LinkItem: React.FC<LinkItemProps> = ({
  link,
  onSelect,
  onRemove,
  onInputChange,
  onInputFocus,
  onInputBlur,
  inputBorderColor,
  validationMessage,
  urlError,
}) => {
  // Handler for input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onInputChange(link.id, e.target.value);
  };

  // Handler for input focus
  const handleInputFocus = () => {
    onInputFocus(link.id);
  };

  // Handler for input blur
  const handleInputBlur = () => {
    onInputBlur();
  };

  // Determine border color based on validationMessage
  const borderColor = validationMessage ? "border-red-500" : inputBorderColor;

  return (
    <div className="w-full page-right-started p-8 gap-3 rounded-lg bg-[#FAFAFA] flex flex-col mb-6">
      <div className="started-head-div flex justify-between mb-4">
        <div className="started-head-1 flex items-center gap-2">
          <FaLink />
          <span className="font-[Instrument Sans] text-[16px] font-[700] leading-[24px] text-[#737373]">
            Link#{link.id}
          </span>
        </div>
        <div
          className="started-head-2 cursor-pointer"
          onClick={() => onRemove(link.id)}
        >
          <span className="font-[Instrument Sans] text-[16px] font-[400] leading-[24px] text-[#737373]">
            Remove
          </span>
        </div>
      </div>

      <div className="page-form-1 mb-4">
        <label className="block font-[Instrument Sans] text-[12px] font-[400] leading-[18px] text-[#333333] mb-2">
          Platform
        </label>
        <CustomDropdown
          onSelect={(option) => onSelect(option, link.id)}
          selectedOption={link.selectedOption}
        />
      </div>

      <div className="page-form-2 mb-4">
        <label className="block font-[Instrument Sans] text-[12px] font-[400] leading-[18px] text-[#333333] mb-2">
          Link
        </label>
        <div className="relative">
          <input
            type="url"
            value={link.url}
            placeholder="https://www.github.com/johnappleseed"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            className={`w-full p-3 rounded-lg border ${borderColor} bg-white text-[16px] font-[400] leading-[24px] text-[#333333] placeholder:text-[#737373] pl-12`}
          />
          <FaLink className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#737373]" />
          {urlError && (
            <p className="text-red-500 text-xs absolute right-3 top-1/2 transform -translate-y-1/2">
              {urlError}
            </p>
          )}
          {validationMessage && (
            <p className="text-red-500 text-xs  absolute right-3 top-1/2 transform -translate-y-1/2">
              {validationMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LinkItem;
