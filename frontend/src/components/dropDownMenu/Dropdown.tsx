import React, { useState } from "react";
import { DropdownItem as DropDownItemType } from "../../types/propsTypes";
import DropdownItem from "./DropdownItem";
import "./dropdown.scss";

type DropdownProps = {
  title: string;
  items: DropDownItemType[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Dropdown: React.FC<DropdownProps> = ({
  title,
  items,
  isOpen,
  setIsOpen,
}) => {
  return (
    <div className="dropdown" onClick={() => setIsOpen((prev) => !prev)}>
      <div className="dropdownButton">{title}</div>
      <div className={`dropdownContent ${isOpen ? "open" : ""}`}>
        {items.map((item, index) => (
          <DropdownItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
