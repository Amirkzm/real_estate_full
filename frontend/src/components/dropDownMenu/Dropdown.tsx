import React, { useState } from "react";
import { DropdownItem as DropDownItemType } from "../../types/propsTypes";
import DropdownItem from "./DropdownItem";
import "./dropdown.scss";

type DropdownProps = {
  title: string;
  items: DropDownItemType[];
};

const Dropdown: React.FC<DropdownProps> = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="dropdown" onClick={() => setIsOpen((prev) => !prev)}>
      <span className="dropdownButton">{title}</span>
      <div className={`dropdownContent ${isOpen ? "open" : ""}`}>
        {items.map((item, index) => (
          <DropdownItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
