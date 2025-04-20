
import React, { useState } from 'react';
import { 
  MapContainer, 
  TileLayer, 
  Marker, 
  Popup, 
  useMap, 
  CircleMarker,
  useMapEvents
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

// Component that maintains consistent heatmap sizes regardless of zoom
const ScaledCircleMarkers = ({ districts, onDistrictClick, getMarkerColor }: {
  districts: District[];
  onDistrictClick: (district: District) => void;
  getMarkerColor: (level: string) => string;
}) => {
  const map = useMapEvents({
    zoomend: () => {
      // Force re-render when zoom changes
      setZoom(map.getZoom());
    }
  });
  
  const [zoom, setZoom] = useState(map.getZoom());
  
  // Calculate scaled radius based on zoom level
  const getScaledRadius = (level: string) => {
    const baseRadius = level === 'red' ? 30 : level === 'amber' ? 20 : 10;
    // Adjust the scaling factor based on zoom level
    const scaleFactor = Math.pow(0.65, zoom - 8); // 8 is the default zoom level
    return baseRadius * scaleFactor;
  };

  return (
    <>
      {districts.map((district) => {
        const color = getMarkerColor(district.level);
        return (
          <CircleMarker
            key={district.id}
            center={[district.lat, district.lng]}
            pathOptions={{
              color,
              fillColor: color,
              fillOpacity: 0.4,
              weight: 1,
            }}
            radius={getScaledRadius(district.level)}
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

// Moved LocationButton to be rendered outside the map
const LocationButton = ({ map }: { map: L.Map | null }) => {
  const handleLocationClick = () => {
    if (!map) return;
    
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          map.flyTo([latitude, longitude], 13);
          L.marker([latitude, longitude])
            .addTo(map)
            .bindPopup("You are here")
            .openPopup();
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  return (
    <Button
      variant="secondary"
      size="icon"
      className="bg-white hover:bg-gray-100"
      onClick={handleLocationClick}
    >
      <Locate className="h-4 w-4" />
    </Button>
  );
};

// Store map reference for external controls
const MapReference = ({ setMapRef }: { setMapRef: (map: L.Map) => void }) => {
  const map = useMap();
  React.useEffect(() => {
    setMapRef(map);
  }, [map, setMapRef]);
  return null;
};

const LeafletMap: React.FC<LeafletMapProps> = ({ 
  districts, 
  selectedYear, 
  onDistrictClick,
  isHeatmapMode 
}) => {
  const [mapRef, setMapRef] = React.useState<L.Map | null>(null);
  
  const getMarkerColor = (level: string) => {
    switch (level) {
      case 'red': return '#DC2626';
      case 'amber': return '#F59E0B';
      case 'green': return '#10B981';
      default: return '#4B5563';
    }
  };

  return (
    <div className="relative h-full">
      <MapContainer
        defaultCenter={[17.3850, 78.4867]} 
        defaultZoom={8}
        style={{ height: '100%', width: '100%' }}
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
          // Regular marker mode
          districts.map((district) => {
            const color = getMarkerColor(district.level);
            
            const customIcon = new L.DivIcon({
              className: 'custom-div-icon',
              html: `<div style="background-color: ${color}" class="marker-pin w-4 h-4 rounded-full border-2 border-white shadow-md"></div>`,
              iconSize: [16, 16],
              iconAnchor: [8, 8],
            });

            return (
              <Marker
                key={district.id}
                position={[district.lat, district.lng]}
                icon={customIcon as any}
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
      
      {/* Location button moved outside map for better accessibility */}
      <div className="absolute bottom-4 right-4 z-[1000]">
        <LocationButton map={mapRef} />
      </div>
    </div>
  );
};

export default LeafletMap;
