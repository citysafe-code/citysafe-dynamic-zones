
import React from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

// Extracted for clarity and maintainability
interface MapReferenceProps {
  setMapRef: (map: L.Map) => void;
}

const MapReference: React.FC<MapReferenceProps> = ({ setMapRef }) => {
  const map = useMap();
  React.useEffect(() => {
    setMapRef(map);
  }, [map, setMapRef]);
  return null;
};

export default MapReference;
