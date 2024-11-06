import { MapContainer, TileLayer } from "react-leaflet";
import "./map.scss";
import "leaflet/dist/leaflet.css";
import { Pin } from "./pin";
import { LatLngExpression, LatLngLiteral } from "leaflet";
import { MapItem } from "../../types/commonTypes";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/images/marker-shadow.png";

type MapProps =
  | {
      item: MapItem;
    }
  | {
      items: MapItem[];
    };

const defaultIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

const DEFAULT_MAP_CENTER = [44.41473043356376, 8.90560961561277];

const Map: React.FC<MapProps> = ({ ...props }: MapProps) => {
  let itemsToRender: MapItem | MapItem[];
  if ("items" in props) {
    itemsToRender = props.items;
  } else {
    itemsToRender = props.item;
  }

  return (
    <MapContainer
      center={DEFAULT_MAP_CENTER as LatLngExpression}
      zoom={"items" in props ? 5 : 7}
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
