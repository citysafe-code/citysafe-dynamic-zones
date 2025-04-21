
import React, { useState } from 'react';
import { 
  MapContainer, 
  TileLayer, 
  Marker, 
  Popup
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Locate } from 'lucide-react';
import { Button } from './ui/button';

// Fix Leaflet default marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

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

interface LeafletMapProps {
  districts: District[];
  selectedYear: number;
  onDistrictClick: (district: District) => void;
  isHeatmapMode: boolean;
}

import ScaledCircleMarkers from "./ScaledCircleMarkers";
import LocationButton from "./LocationButton";
import MapReference from "./MapReference";

const LeafletMap: React.FC<LeafletMapProps> = ({
  districts,
  selectedYear,
  onDistrictClick,
  isHeatmapMode,
}) => {
  const [mapRef, setMapRef] = React.useState<L.Map | null>(null);

  const getMarkerColor = (level: string) => {
    switch (level) {
      case "red":
        return "#DC2626";
      case "amber":
        return "#F59E0B";
      case "green":
        return "#10B981";
      default:
        return "#4B5563";
    }
  };

  return (
    <div className="relative h-full">
      <MapContainer
        center={[17.385, 78.4867] as L.LatLngExpression}
        zoom={8}
        style={{ height: "100%", width: "100%" }}
        className="rounded-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapReference setMapRef={setMapRef} />

        {isHeatmapMode ? (
          <ScaledCircleMarkers
            districts={districts}
            onDistrictClick={onDistrictClick}
            getMarkerColor={getMarkerColor}
          />
        ) : (
          districts.map((district) => {
            const color = getMarkerColor(district.level);
            const customIcon = new L.DivIcon({
              className: "custom-div-icon",
              html: `<div style="background-color: ${color}" class="marker-pin w-4 h-4 rounded-full border-2 border-white shadow-md"></div>`,
              iconSize: [16, 16],
              iconAnchor: [8, 8],
            });
            return (
              <Marker
                key={district.id}
                position={[district.lat, district.lng] as L.LatLngExpression}
                icon={customIcon}
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
              </Marker>
            );
          })
        )}
      </MapContainer>

      <div className="absolute bottom-4 right-4 z-[1000]">
        <LocationButton map={mapRef} />
      </div>
    </div>
  );
};

export default LeafletMap;
