import React, { useState } from "react";
import CustomDropdown, { Option } from "@/components/CustomDropdown";
import ImageSection from "@/components/ImageSection";

const optionStyles = {
  GitHub: { backgroundColor: "#333333", color: "#FFFFFF" },
  "Frontend Mentor": { backgroundColor: "#F7E1E1", color: "#333333" },
  Twitter: { backgroundColor: "#1DA1F2", color: "#FFFFFF" },
  LinkedIn: { backgroundColor: "#0077B5", color: "#FFFFFF" },
  YouTube: { backgroundColor: "#FF0000", color: "#FFFFFF" },
  Facebook: { backgroundColor: "#1877F2", color: "#FFFFFF" },
  Twitch: { backgroundColor: "#6441A5", color: "#FFFFFF" },
  "Dev.to": { backgroundColor: "#0A0A0A", color: "#FFFFFF" },
  CodePen: { backgroundColor: "#000000", color: "#FFFFFF" },
  FreeCodeCamp: { backgroundColor: "#0A0A0A", color: "#FFFFFF" },
  GitLab: { backgroundColor: "#FC6D26", color: "#FFFFFF" },
  Hashnode: { backgroundColor: "#2962FF", color: "#FFFFFF" },
  "Stack Overflow": { backgroundColor: "#F48024", color: "#FFFFFF" },
  Link: { backgroundColor: "#000000", color: "#FFFFFF" },
};

const ParentComponent: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const handleSelect = (option: Option | null) => {
    setSelectedOption(option);
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <CustomDropdown
        onSelect={handleSelect}
        selectedOption={selectedOption} // Pass the selectedOption prop
      />
      <ImageSection
        selectedOptions={selectedOption ? [selectedOption] : []} // Convert to array if needed
        optionStyles={optionStyles}
      />
    </div>
  );
};

export default ParentComponent;
