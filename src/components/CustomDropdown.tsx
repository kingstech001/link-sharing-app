import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaFacebook,
  FaTwitch,
  FaDev,
  FaCodepen,
  FaFreeCodeCamp,
  FaGitlab,
  FaStackOverflow,
} from "react-icons/fa";
import { FaHashnode } from "react-icons/fa6";
import { SiFrontendmentor } from "react-icons/si";

export interface Option {
  value: string;
  label: string;
  icon: JSX.Element;
}

const options: Option[] = [
  { value: "github", label: "GitHub", icon: <FaGithub /> },
  {
    value: "frontend-mentor",
    label: "Frontend Mentor",
    icon: <SiFrontendmentor />,
  },
  { value: "twitter", label: "Twitter", icon: <FaTwitter /> },
  { value: "linkedin", label: "LinkedIn", icon: <FaLinkedin /> },
  { value: "youtube", label: "YouTube", icon: <FaYoutube /> },
  { value: "facebook", label: "Facebook", icon: <FaFacebook /> },
  { value: "twitch", label: "Twitch", icon: <FaTwitch /> },
  { value: "dev", label: "Dev.to", icon: <FaDev /> },
  { value: "codepen", label: "CodePen", icon: <FaCodepen /> },
  { value: "freecodecamp", label: "FreeCodeCamp", icon: <FaFreeCodeCamp /> },
  { value: "gitlab", label: "GitLab", icon: <FaGitlab /> },
  { value: "hashnode", label: "Hashnode", icon: <FaHashnode /> },
  {
    value: "stackoverflow",
    label: "Stack Overflow",
    icon: <FaStackOverflow />,
  },
];

interface CustomDropdownProps {
  onSelect: (option: Option | null) => void;
  selectedOption: Option | null;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  onSelect,
  selectedOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (value: string) => {
    const selected = options.find((option) => option.value === value);
    onSelect(selected || null);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div
        className="w-full p-3 pl-10 rounded-lg border border-[#D9D9D9] bg-white text-[16px] font-[400] leading-[24px] text-[#333333] cursor-pointer flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <span className="mr-2">{selectedOption?.icon}</span>
          {selectedOption?.label || "Select an option"}
        </div>
        <div className="text-[#333333]">
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </div>
      {isOpen && (
        <div className="absolute w-full mt-2 border border-[#D9D9D9] bg-white rounded-lg shadow-lg z-10">
          {options.map((option) => (
            <div
              key={option.value}
              className={`flex items-center p-3 text-[16px] font-[400] leading-[24px] ${
                selectedOption?.value === option.value
                  ? "bg-white text-purple-500"
                  : "bg-white text-[#333333]"
              } border-b border-[#D9D9D9] cursor-pointer hover:text-purple-500`}
              onClick={() => handleChange(option.value)}
            >
              <span className="mr-2">{option.icon}</span>
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
