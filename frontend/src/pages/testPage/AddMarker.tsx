import React, { useState } from "react";
import { LatLngExpression } from "leaflet";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import { FaMagnifyingGlassLocation } from "react-icons/fa6";

type AddMarkerProps = {
  setLocation?: (location: LatLngExpression) => void;
  setUserLocation?: (location: LatLngExpression) => void;
};

const AddMarker: React.FC<AddMarkerProps> = ({
  setLocation,
  setUserLocation,
}: any) => {
  const [position, setPosition] = useState(null as unknown as LatLngExpression);
  const [userPosition, setUserPosition] = useState(
    null as unknown as LatLngExpression
  );

  const map = useMapEvents({
    click: (e) => {
      map.locate();
      console.log("clicked");
      console.log(e.latlng);
      const newPosition: LatLngExpression = [e.latlng.lat, e.latlng.lng];
      setPosition(newPosition);
      setLocation && setLocation(newPosition);
    },
    locationfound(e) {
      setUserPosition(e.latlng);
      setUserLocation && setUserLocation(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return (
    <>
      {position && <Marker position={position}></Marker>}
      {userPosition && (
        <Marker position={userPosition}>
          <Popup>You are here</Popup>
        </Marker>
      )}
    </>
  );
};

export default AddMarker;
