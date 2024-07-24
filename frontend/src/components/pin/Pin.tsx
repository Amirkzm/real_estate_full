import { Marker, Popup } from "react-leaflet";
import "./pin.scss";
import { Link } from "react-router-dom";
import { ListLocationType, SingleLocationType } from "../../types/commonTypes";

type PinProps = {
  item: ListLocationType | SingleLocationType;
};

const DEFAULT_BEDROOM_COUNT = 1;

const Pin: React.FC<PinProps> = ({ item }) => {
  const isListLocationType = (
    item: ListLocationType | SingleLocationType
  ): item is ListLocationType => {
    return (item as ListLocationType).bedroom !== undefined;
  };

  return (
    <Marker position={[item.latitude, item.longitude]}>
      <Popup>
        <div className="popupContainer">
          <img
            src={isListLocationType(item) ? item.img : item.images[0]}
            alt=""
          />
          <div className="textContainer">
            <Link to={`/${item.id}`}>{item.title}</Link>
            <span>
              {isListLocationType(item) ? item.bedroom : DEFAULT_BEDROOM_COUNT}{" "}
              bedroom
            </span>
            <b>$ {item.price}</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default Pin;
