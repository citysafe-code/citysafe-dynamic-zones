
import React, { useState, useEffect } from "react";
import { CircleMarker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";

// All necessary types are duplicated here for local usage
interface District {
  id: string;
  name: string;
  lat: number;
  lng: number;
  level: string;
  years: Array<{
    year: number;
    murders: number;
    dacoity: number;
    robbery: number;
    burglary: number;
    kidnapping: number;
    rape: number;
  }>;
}

interface ScaledCircleMarkersProps {
  districts: District[];
  onDistrictClick: (district: District) => void;
  getMarkerColor: (level: string) => string;
}

const ScaledCircleMarkers: React.FC<ScaledCircleMarkersProps> = ({
  districts,
  onDistrictClick,
  getMarkerColor,
}) => {
  // Get map instance and current zoom level
  const map = useMapEvents({
    zoomend: () => setZoom(map.getZoom()),
  });
  const [zoom, setZoom] = useState(map.getZoom());
  
  // Get the circle size based on risk level
  const getCircleRadius = (level: string) => {
    // Return a fixed base size for each risk level
    return level === "red" ? 10 : level === "amber" ? 8 : 6;
  };

  return (
    <>
      {districts.map((district) => {
        const color = getMarkerColor(district.level);
        const radius = getCircleRadius(district.level);
        
        return (
          <CircleMarker
            key={district.id}
            center={[district.lat, district.lng] as L.LatLngExpression}
            radius={radius}
            pathOptions={{
              color,
              fillColor: color,
              fillOpacity: 0.4,
              weight: 1,
            }}
            // Important: this ensures circles stay fixed size when zooming
            pane="markerPane"
            eventHandlers={{
              click: () => onDistrictClick(district),
            }}
          >
            <Popup>
              <div className="p-2">
                <strong>{district.name}</strong>
                <p className="text-sm">Click for details</p>
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </>
  );
};

export default ScaledCircleMarkers;
