
import React, { useState } from "react";
import { CircleMarker, Popup, useMapEvents } from "react-leaflet";

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
  // Used to force update on zoom end
  const map = useMapEvents({
    zoomend: () => setZoom(map.getZoom()),
  });
  const [zoom, setZoom] = useState(map.getZoom());

  // Maintain visually fixed-size circles by inversely scaling their radius with zoom level
  const getFixedPixelRadius = (level: string) => {
    // Approximate constant pixel size (by inversely scaling)
    // Standard Leaflet zoom, 1 unit radius ≈ 1 pixel at zoom 0, so scale down as zoom increases
    // Let's use an exponential factor for smoothness
    const baseRadius = level === "red" ? 30 : level === "amber" ? 20 : 10;
    const scale = Math.pow(2, 8 - zoom);
    return Math.max(6, baseRadius * scale);
  };

  return (
    <>
      {districts.map((district) => {
        const color = getMarkerColor(district.level);
        const pixelRadius = getFixedPixelRadius(district.level);
        return (
          <CircleMarker
            key={district.id}
            center={[district.lat, district.lng]}
            radius={pixelRadius}
            pathOptions={{
              color,
              fillColor: color,
              fillOpacity: 0.4,
              weight: 1,
            }}
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

