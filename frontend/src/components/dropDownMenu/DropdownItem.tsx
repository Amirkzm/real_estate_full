import { DropdownItem as DropDownItemProps } from "../../types/propsTypes";
import "./dropdownItem.scss";

const DropdownItem: React.FC<DropDownItemProps> = ({
  title,
  icon,
  onClick,
}) => {
  return (
    <div className="dropdownItem">
      {icon && icon}
      <span onClick={onClick}>{title}</span>
    </div>
  );
};

export default DropdownItem;
