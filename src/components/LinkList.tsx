// LinkList.tsx
import React from "react";
import { Option } from "./CustomDropdown";
import LinkItem from "./LinkItem";

interface LinkListProps {
  links: { id: number; selectedOption: Option | null; url: string }[];
  onSelect: (option: Option | null, id: number) => void;
  onRemove: (id: number) => void;
  onInputChange: (id: number, value: string) => void;
  onInputFocus: (id: number) => void;
  onInputBlur: () => void;
  inputBorderColor: string;
  validationMessage: string | null;
  urlError: string | null;
}

const LinkList: React.FC<LinkListProps> = ({
  links,
  onSelect,
  onRemove,
  onInputChange,
  onInputFocus,
  onInputBlur,
  inputBorderColor,
  validationMessage,
  urlError,
}) => {
  return (
    <div>
      {links.map((link) => (
        <LinkItem
          key={link.id}
          link={link}
          onSelect={onSelect}
          onRemove={onRemove}
          onInputChange={onInputChange}
          onInputFocus={onInputFocus}
          onInputBlur={onInputBlur}
          inputBorderColor={inputBorderColor}
          validationMessage={validationMessage}
          urlError={urlError}
        />
      ))}
    </div>
  );
};

export default LinkList;
