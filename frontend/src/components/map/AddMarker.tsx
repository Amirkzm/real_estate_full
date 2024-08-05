import { useState, useImperativeHandle, forwardRef } from "react";
import { LatLngExpression } from "leaflet";
import { Marker, Popup, useMapEvents } from "react-leaflet";

type AddMarkerProps = {
  setLocation?: (location: LatLngExpression) => void;
};

const AddMarker = forwardRef<
  {
    locateUser: () => void;
  },
  AddMarkerProps
>(({ setLocation }, ref) => {
  const [position, setPosition] = useState<LatLngExpression | null>(null);
  const [userPosition, setUserPosition] = useState(
    null as unknown as LatLngExpression
  );

  const map = useMapEvents({
    locationfound(e) {
      setUserPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  useImperativeHandle(ref, () => ({
    locateUser: () => {
      map.locate();
    },
  }));

  const handleDragEnd = (event: any) => {
    const marker = event.target;
    const newPosition: LatLngExpression = marker.getLatLng();
    setPosition(newPosition);
    setLocation && setLocation(newPosition);
    console.log("Marker dragged to:", newPosition);
  };

  return (
    <>
      {userPosition && (
        <Marker
          position={userPosition}
          draggable={true}
          eventHandlers={{
            dragend: handleDragEnd,
          }}
        >
          <Popup>You are here</Popup>
        </Marker>
      )}
    </>
  );
});

export default AddMarker;
