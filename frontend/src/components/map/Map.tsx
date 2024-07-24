import { MapContainer, TileLayer } from "react-leaflet";
import "./map.scss";
import "leaflet/dist/leaflet.css";
import { Pin } from "../pin";
import { ListLocationType, SingleLocationType } from "../../types/commonTypes";

type MapProps =
  | { items: ListLocationType[]; item?: never }
  | { item: SingleLocationType[]; items?: never };

const Map: React.FC<MapProps> = ({ items, item }) => {
  const itemsToRender = items ?? item;
  return (
    <MapContainer
      center={[52.4797, -1.90269]}
      zoom={7}
      scrollWheelZoom={false}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {itemsToRender.map((item) => (
        <Pin item={item} key={item.id} />
      ))}
    </MapContainer>
  );
};

export default Map;
