import "./iconButton.scss";

type IconButtonProps = {
  icon: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  iconColor?: string;
  alt?: string;
};

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  style,
  iconColor,
  alt,
}) => {
  return (
    <div className="buttonContainer">
      <img
        src={icon}
        alt={alt ?? icon}
        style={{ ...style, color: iconColor }}
        onClick={onClick}
      />
    </div>
  );
};

export default IconButton;
