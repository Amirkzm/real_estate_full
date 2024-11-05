import React, { useRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./locationInfo.scss";
import { LatLngExpression } from "leaflet";
import AddMarker from "../../../components/map/AddMarker";
import { CiLocationOn } from "react-icons/ci";

type LocationInfoProps = {
  onSelectLocation: (location: LatLngExpression) => void;
};

const LocationInfo: React.FC<LocationInfoProps> = ({ onSelectLocation }) => {
  const defaultPosition: LatLngExpression = [48.864716, 2.349];
  const addMarkerRef = useRef<{ locateUser: () => void }>(null);

  const handleLocateUser = () => {
    if (addMarkerRef.current) {
      addMarkerRef.current.locateUser();
    }
  };

  return (
    <>
      <div className="item">
        <label htmlFor="city">City</label>
        <input id="city" name="city" type="text" />
      </div>
      <div className="item">
        <label htmlFor="address">Address</label>
        <input id="address" name="address" type="text" />
      </div>
      <label htmlFor="location">Location</label>

      <MapContainer
        center={defaultPosition}
        zoom={13}
        style={{ width: "380px", height: "300px" }}
        className="koskos"
      >
        <AddMarker ref={addMarkerRef} setLocation={onSelectLocation} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <button onClick={handleLocateUser} className="kirekhar">
          <CiLocationOn />
        </button>
      </MapContainer>
    </>
  );
};

export default LocationInfo;
