import { Link } from "react-router-dom";
import "./card.scss";
import { SingleLocationType } from "../../types/commonTypes";
import { Tag } from "../tag";
import { IconButton } from "../iconButton";
import { generateImageAddress } from "../../lib/utils";

type CardProps = {
  item: SingleLocationType;
};

const Card: React.FC<CardProps> = ({ item }) => {
  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img
          src={
            item.images.length > 0
              ? generateImageAddress(item.images[0])
              : "default-location-pic.png"
          }
          alt=""
        />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <div className="address">
          <Tag title={item.address} tagColor="transparent" />
        </div>
        <span className="price">
          <Tag
            title={"$ " + item.price}
            tagColor="rgba(254, 205, 81, 0.438)"
            style={{ fontSize: "20px" }}
          />
        </span>
        <div className="bottom">
          <div className="features">
            <Tag icon="/bed.png" title={item.bedroom + " bedroom"} />
            <Tag icon="/bath.png" title={item.bathroom + " bathroom"} />
          </div>
          <div className="icons">
            <IconButton icon="/save.png" />
            <IconButton icon="/chat.png" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
