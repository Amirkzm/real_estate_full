import "./tag.scss";

type tagProps = {
  title: string | number;
  icon?: string;
  iconLocation?: "left" | "right";
  onClick?: () => void;
  style?: React.CSSProperties;
  tagColor?: string;
};

const Tag: React.FC<tagProps> = ({
  icon,
  iconLocation,
  title,
  onClick,
  tagColor,
  style,
}) => {
  const justifyContent = iconLocation === "left" ? "flex-start" : "flex-end";
  return (
    <div
      className="tagContainer"
      style={{
        backgroundColor: tagColor,
        ...style,
        justifyContent: justifyContent,
      }}
      onClick={onClick}
    >
      {icon && <img src={icon} alt={icon} />}
      {title}
    </div>
  );
};

export default Tag;
