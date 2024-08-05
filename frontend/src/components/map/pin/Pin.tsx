import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import { SingleLocationType } from "../../../types/commonTypes";
import { generateImageAddress } from "../../../lib/utils";
import "./pin.scss";

type PinProps = {
  item: SingleLocationType;
};

const DEFAULT_BEDROOM_COUNT = 1;

const Pin: React.FC<PinProps> = ({ item }) => {
  // console.log("-------------->", item.images[0]);
  return (
    <Marker position={[item.latitude, item.longitude]}>
      <Popup>
        <div className="popupContainer">
          {/* <img src={generateImageAddress(item.images[0])} alt="" /> */}
          <div className="textContainer">
            <Link to={`/${item.id}`}>{item.title}</Link>
            <span>{item.bedroom ?? DEFAULT_BEDROOM_COUNT} bedroom</span>
            <b>$ {item.price}</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default Pin;
