import "./topHeader.scss";

type TopHeaderProps = {
  name: string;
  avatar: string;
  onClose: () => void;
};
const TopHeader: React.FC<TopHeaderProps> = ({ avatar, name, onClose }) => {
  return (
    <div className="topHeader">
      <div className="left">
        <img src={avatar} alt={"name's" + "avatar"} />
        <p className="name">{name}</p>
      </div>
      <span className="close" onClick={onClose}>
        X
      </span>
    </div>
  );
};

export default TopHeader;
