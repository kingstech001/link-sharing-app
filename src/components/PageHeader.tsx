import React from "react";
import { FaPlus } from "react-icons/fa";

interface PageHeaderProps {
  onAddNewLink: () => void;
  borderColor: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  onAddNewLink,
  borderColor,
}) => {
  return (
    <div className="page-right-work gap-6 mt-4">
      <button
        className="w-full flex items-center justify-center gap-2 p-3 rounded-lg border border-[#633CFF] text-[#633CFF] hover:bg-[#EFEBFF]"
        onClick={onAddNewLink}
        style={{ borderColor }}
      >
        <FaPlus />
        Add new link
      </button>
    </div>
  );
};

export default PageHeader;
