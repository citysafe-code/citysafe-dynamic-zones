
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
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
}

const LocationButton = () => {
  const map = useMap();

  const handleLocationClick = () => {
    map.locate().on('locationfound', (e) => {
      map.flyTo(e.latlng, 13);
      L.marker(e.latlng).addTo(map);
    });
  };

  return (
    <div className="leaflet-bottom leaflet-right mb-8 mr-2">
      <Button
        variant="secondary"
        size="icon"
        className="bg-white hover:bg-gray-100"
        onClick={handleLocationClick}
      >
        <Locate className="h-4 w-4" />
      </Button>
    </div>
  );
};

const LeafletMap: React.FC<LeafletMapProps> = ({ districts, selectedYear, onDistrictClick }) => {
  const getMarkerColor = (level: string) => {
    switch (level) {
      case 'red': return '#DC2626';
      case 'amber': return '#F59E0B';
      case 'green': return '#10B981';
      default: return '#4B5563';
    }
  };

  return (
    <MapContainer
      center={[17.3850, 78.4867]} // Centered on Hyderabad
      zoom={8}
      style={{ height: '100%', width: '100%' }}
      className="rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {districts.map((district) => {
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
      })}
      <LocationButton />
    </MapContainer>
  );
};

export default LeafletMap;
