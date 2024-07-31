// import React, { useState } from "react";
// import { LatLngExpression } from "leaflet";
// import { Marker, Popup, useMapEvents } from "react-leaflet";
// import { FaMagnifyingGlassLocation } from "react-icons/fa6";

// type AddMarkerProps = {
//   setLocation?: (location: LatLngExpression) => void;
//   setUserLocation?: (location: LatLngExpression) => void;
// };

// const AddMarker: React.FC<AddMarkerProps> = ({
//   setLocation,
//   setUserLocation,
// }: any) => {
//   const [position, setPosition] = useState(null as unknown as LatLngExpression);
//   const [userPosition, setUserPosition] = useState(
//     null as unknown as LatLngExpression
//   );

//   const map = useMapEvents({
//     click: (e) => {
//       !userPosition && map.locate();
//       console.log("clicked");
//       console.log(e.latlng);
//       const newPosition: LatLngExpression = [e.latlng.lat, e.latlng.lng];
//       setPosition(newPosition);
//       setLocation && setLocation(newPosition);
//     },
//     locationfound(e) {
//       setUserPosition(e.latlng);
//       setUserLocation && setUserLocation(e.latlng);
//       map.flyTo(e.latlng, map.getZoom());
//     },
//   });

//   return (
//     <>
//       {position && <Marker position={position}></Marker>}
//       {userPosition && (
//         <Marker position={userPosition}>
//           <Popup>You are here</Popup>
//         </Marker>
//       )}
//     </>
//   );
// };

// export default AddMarker;

// import React, { useState, useImperativeHandle, forwardRef } from "react";
// import { LatLngExpression } from "leaflet";
// import { Marker, Popup, useMapEvents } from "react-leaflet";

// type AddMarkerProps = {
//   setLocation?: (location: LatLngExpression) => void;
//   setUserLocation?: (location: LatLngExpression) => void;
// };

// const AddMarker = forwardRef<
//   {
//     locateUser: () => void;
//   },
//   AddMarkerProps
// >(({ setLocation, setUserLocation }, ref) => {
//   const [position, setPosition] = useState(null as unknown as LatLngExpression);
//   const [userPosition, setUserPosition] = useState(
//     null as unknown as LatLngExpression
//   );

//   const map = useMapEvents({
//     click: (e) => {
//       !userPosition && map.locate();
//       const newPosition: LatLngExpression = [e.latlng.lat, e.latlng.lng];
//       setPosition(newPosition);
//       setLocation && setLocation(newPosition);
//     },
//     locationfound(e) {
//       setUserPosition(e.latlng);
//       setUserLocation && setUserLocation(e.latlng);
//       map.flyTo(e.latlng, map.getZoom());
//     },
//   });

//   useImperativeHandle(ref, () => ({
//     locateUser: () => {
//       map.locate();
//     },
//   }));

//   return (
//     <>
//       {position && <Marker position={position}></Marker>}
//       {userPosition && (
//         <Marker position={userPosition}>
//           <Popup>You are here</Popup>
//         </Marker>
//       )}
//     </>
//   );
// });

// export default AddMarker;

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
