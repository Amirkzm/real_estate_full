import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import { MapItem } from "../../../types/commonTypes";
import "./pin.scss";

type PinProps = {
  item: MapItem;
};

const DEFAULT_BEDROOM_COUNT = 1;

const Pin: React.FC<PinProps> = ({ item }) => {
  const { latitude, longitude } = item;

  const isValidPosition = !isNaN(latitude) && !isNaN(longitude);

  return (
    <>
      {isValidPosition && (
        <Marker position={[latitude, longitude]}>
          <Popup>
            <div className="popupContainer">
              <div className="textContainer">
                <Link to={`/${item.id}`}>{item.title}</Link>
                <span>{item?.bedroom ?? DEFAULT_BEDROOM_COUNT} bedroom</span>
                <b>$ {item.price}</b>
              </div>
            </div>
          </Popup>
        </Marker>
      )}
    </>
  );
};

export default Pin;
