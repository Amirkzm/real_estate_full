import { MapContainer, TileLayer } from "react-leaflet";
import "./map.scss";
import "leaflet/dist/leaflet.css";
import { SingleLocationType } from "../../types/commonTypes";
import { Pin } from "./pin";
import { LatLngLiteral } from "leaflet";

type MapProps =
  | {
      item: SingleLocationType;
    }
  | {
      items: SingleLocationType[];
    };

const generateMapCenter = (
  items: SingleLocationType | SingleLocationType[]
) => {
  let center: [number, number];
  const defaultCenter = [52.4797, -1.90269];
  if (Array.isArray(items)) {
    center = [items[0]?.latitude, items[0]?.longitude];
  } else {
    center = [items?.latitude, items?.longitude];
  }

  if (center[0] && center[1]) {
    return center;
  } else {
    return defaultCenter;
  }
};

const Map: React.FC<MapProps> = ({ ...props }: MapProps) => {
  let itemsToRender: SingleLocationType | SingleLocationType[];
  if ("items" in props) {
    itemsToRender = props.items;
  } else {
    itemsToRender = props.item;
  }

  const mapCenter = generateMapCenter(
    itemsToRender
  ) as unknown as LatLngLiteral;

  return (
    <MapContainer
      center={mapCenter}
      zoom={7}
      scrollWheelZoom={false}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {itemsToRender &&
        (Array.isArray(itemsToRender) ? (
          itemsToRender.map((item) => <Pin item={item} key={item.id} />)
        ) : (
          <Pin item={itemsToRender} />
        ))}
    </MapContainer>
  );
};

export default Map;
