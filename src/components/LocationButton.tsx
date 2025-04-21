
import React from "react";
import L from "leaflet";
import { Locate } from "lucide-react";
import { Button } from "./ui/button";

interface LocationButtonProps {
  map: L.Map | null;
}

const LocationButton: React.FC<LocationButtonProps> = ({ map }) => {
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

export default LocationButton;
