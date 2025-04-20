import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from '@/components/ui/navigation-menu';
import { MapPin, Navigation, Locate } from 'lucide-react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const districtData = [
  // District crime data stays the same
];

const calculateSafetyLevel = (district) => {
  const latestYear = district.years[district.years.length - 1];
  const totalCrimes = latestYear.murders + latestYear.dacoity + latestYear.robbery + 
                     latestYear.burglary + latestYear.kidnapping;
  
  if (totalCrimes > 3000) return 'red';
  if (totalCrimes > 1000) return 'amber';
  return 'green';
};

const ZoneCard = ({ district, selectedYear, onClick }) => {
  const yearData = district.years.find(y => y.year === selectedYear) || 
                  district.years[district.years.length - 1];
  
  const totalIncidents = yearData ? 
    yearData.murders + yearData.dacoity + yearData.robbery + yearData.burglary + yearData.kidnapping :
    0;
  
  const safetyLevel = district.level;
  const levelColor = 
    safetyLevel === 'red' ? 'bg-citysafe-red text-white' :
    safetyLevel === 'amber' ? 'bg-citysafe-amber text-white' : 'bg-citysafe-green text-white';
  
  return (
    <Card className="mb-4 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={onClick}>
      <CardContent className="p-0">
        <div className={`p-4 ${safetyLevel === 'red' ? 'zone-red' : safetyLevel === 'amber' ? 'zone-amber' : 'zone-green'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <h3 className="font-medium">{district.name}</h3>
            </div>
            <Badge className={levelColor}>
              {safetyLevel === 'red' ? 'High Risk' : safetyLevel === 'amber' ? 'Medium Risk' : 'Low Risk'}
            </Badge>
          </div>
          <p className="mt-2 text-sm">
            {totalIncidents} incidents reported in this district
          </p>
          {yearData && (
            <div className="mt-2 text-xs">
              <p>Year: {yearData.year}</p>
              <p>Murders: {yearData.murders}</p>
              <p>Robberies: {yearData.robbery}</p>
              <p>Burglaries: {yearData.burglary}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const MapComponent = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapboxMapRef = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState(() => localStorage.getItem('mapbox_token') || '');
  const [filter, setFilter] = useState('all');
  const [selectedYear, setSelectedYear] = useState(2022);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<(typeof districtData)[0] | null>(null);
  const [showMapTokenInput, setShowMapTokenInput] = useState(!localStorage.getItem('mapbox_token'));
  const markersRef = useRef<{
    userMarker?: mapboxgl.Marker;
    [key: string]: mapboxgl.Marker | undefined;
  }>({});
  
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          
          if (mapboxMapRef.current) {
            if (!markersRef.current.userMarker) {
              const userMarkerElement = document.createElement('div');
              userMarkerElement.className = 'user-marker';
              userMarkerElement.innerHTML = `
                <div class="animate-pulse w-5 h-5 bg-citysafe-blue rounded-full flex items-center justify-center">
                  <div class="w-3 h-3 bg-white rounded-full"></div>
                </div>
              `;
              
              markersRef.current.userMarker = new mapboxgl.Marker(userMarkerElement)
                .setLngLat([longitude, latitude])
                .addTo(mapboxMapRef.current);
            } else {
              markersRef.current.userMarker.setLngLat([longitude, latitude]);
            }
            
            mapboxMapRef.current.flyTo({
              center: [longitude, latitude],
              zoom: 10,
              essential: true
            });
          }
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  useEffect(() => {
    if (!mapRef.current || !mapboxToken) return;
    
    mapboxgl.accessToken = mapboxToken;
    
    try {
      const map = new mapboxgl.Map({
        container: mapRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [78.4867, 17.3850],
        zoom: 7
      });
      
      mapboxMapRef.current = map;
      
      map.addControl(new mapboxgl.NavigationControl(), 'top-right');
      
      map.on('load', () => {
        districtData.forEach(district => {
          const { lat, lng, name, level } = district;
          
          const markerElement = document.createElement('div');
          markerElement.className = 'district-marker';
          const markerColor = level === 'red' ? 'bg-citysafe-red' : level === 'amber' ? 'bg-citysafe-amber' : 'bg-citysafe-green';
          markerElement.innerHTML = `
            <div class="${markerColor} w-4 h-4 rounded-full border-2 border-white shadow-md"></div>
          `;
          
          const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
            <div class="p-2">
              <strong>${name}</strong>
              <p class="text-sm">Click for details</p>
            </div>
          `);
          
          const marker = new mapboxgl.Marker(markerElement)
            .setLngLat([lng, lat])
            .setPopup(popup)
            .addTo(map);
          
          markersRef.current[district.id] = marker;
          
          markerElement.addEventListener('click', () => {
            setSelectedDistrict(district);
            map.flyTo({
              center: [lng, lat],
              zoom: 11,
              essential: true
            });
          });
        });
      });
      
      return () => {
        map.remove();
      };
    } catch (error) {
      console.error('Error initializing map:', error);
      localStorage.removeItem('mapbox_token');
      setShowMapTokenInput(true);
    }
  }, [mapboxToken]);
  
  useEffect(() => {
    if (!mapboxMapRef.current) return;
    
    districtData.forEach(district => {
      const marker = markersRef.current[district.id];
      if (!marker) return;
      
      if (filter === 'all' || district.level === filter) {
        marker.getElement().style.display = 'block';
      } else {
        marker.getElement().style.display = 'none';
      }
    });
  }, [filter]);

  const handleDistrictCardClick = (district: typeof districtData[0]) => {
    setSelectedDistrict(district);
    
    if (mapboxMapRef.current) {
      mapboxMapRef.current.flyTo({
        center: [district.lng, district.lat],
        zoom: 11,
        essential: true
      });
    }
  };

  const handleTokenSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem('mapbox_token', mapboxToken);
    setShowMapTokenInput(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="col-span-1 lg:col-span-2">
        <Card className="h-[600px]">
          <CardContent className="p-0 h-full">
            <div className="p-4 border-b">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <NavigationMenu>
                  <NavigationMenuList className="flex space-x-2 sm:space-x-4 flex-wrap">
                    <NavigationMenuItem>
                      <Button 
                        variant={filter === 'all' ? 'default' : 'outline'} 
                        onClick={() => setFilter('all')}
                      >
                        All Districts
                      </Button>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Button 
                        variant={filter === 'red' ? 'default' : 'outline'} 
                        className={filter === 'red' ? 'bg-citysafe-red hover:bg-citysafe-red/90' : ''}
                        onClick={() => setFilter('red')}
                      >
                        High Risk
                      </Button>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Button 
                        variant={filter === 'amber' ? 'default' : 'outline'} 
                        className={filter === 'amber' ? 'bg-citysafe-amber hover:bg-citysafe-amber/90' : ''}
                        onClick={() => setFilter('amber')}
                      >
                        Medium Risk
                      </Button>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Button 
                        variant={filter === 'green' ? 'default' : 'outline'} 
                        className={filter === 'green' ? 'bg-citysafe-green hover:bg-citysafe-green/90' : ''}
                        onClick={() => setFilter('green')}
                      >
                        Low Risk
                      </Button>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
                
                <div className="flex items-center gap-2 flex-wrap">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={getUserLocation}
                    title="Find my location"
                    className="mr-2"
                  >
                    <Locate className="h-4 w-4" />
                  </Button>
                  
                  {availableYears.map(year => (
                    <Button 
                      key={year}
                      variant={selectedYear === year ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => setSelectedYear(year)}
                    >
                      {year}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="h-[calc(100%-80px)] w-full">
              {showMapTokenInput ? (
                <div className="h-full flex items-center justify-center">
                  <div className="w-full max-w-md p-6">
                    <h3 className="text-lg font-semibold mb-4">Mapbox API Key Required</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      To view the interactive map, please enter your Mapbox public token. 
                      You can get one for free at <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-citysafe-blue hover:underline">mapbox.com</a>.
                    </p>
                    <form onSubmit={handleTokenSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="mapboxToken" className="text-sm font-medium">
                          Mapbox Public Token
                        </label>
                        <input 
                          type="text" 
                          id="mapboxToken"
                          value={mapboxToken}
                          onChange={(e) => setMapboxToken(e.target.value)}
                          className="w-full p-2 border rounded-md text-sm"
                          placeholder="pk.eyJ1IjoieW91..."
                          required
                        />
                      </div>
                      <Button type="submit" disabled={!mapboxToken.trim()}>
                        Load Map
                      </Button>
                    </form>
                  </div>
                </div>
              ) : (
                <div ref={mapRef} className="h-full w-full"></div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="col-span-1">
        <h2 className="text-xl font-semibold mb-4">Safety by District ({selectedYear})</h2>
        <div className="h-[550px] overflow-y-auto pr-2">
          {selectedDistrict ? (
            <div className="mb-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setSelectedDistrict(null)}
                className="mb-2"
              >
                ← Back to all districts
              </Button>
              
              <Card className="mb-4 overflow-hidden border-2" style={{ borderColor: selectedDistrict.level === 'red' ? '#DC2626' : selectedDistrict.level === 'amber' ? '#F59E0B' : '#10B981' }}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-6 w-6" />
                      <h3 className="text-xl font-semibold">{selectedDistrict.name}</h3>
                    </div>
                    <Badge className={
                      selectedDistrict.level === 'red' ? 'bg-citysafe-red text-white' :
                      selectedDistrict.level === 'amber' ? 'bg-citysafe-amber text-white' : 'bg-citysafe-green text-white'
                    }>
                      {selectedDistrict.level === 'red' ? 'High Risk' : selectedDistrict.level === 'amber' ? 'Medium Risk' : 'Low Risk'}
                    </Badge>
                  </div>
                  
                  {selectedDistrict.years.find(y => y.year === selectedYear) && (
                    <div>
                      <h4 className="font-semibold mb-2">Crime Statistics for {selectedYear}</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(selectedDistrict.years.find(y => y.year === selectedYear))
                          .filter(([key]) => key !== 'year')
                          .map(([key, value]) => (
                            <div key={key} className="bg-gray-50 p-2 rounded">
                              <p className="text-xs text-gray-500">{key.charAt(0).toUpperCase() + key.slice(1)}</p>
                              <p className="font-semibold">{value}</p>
                            </div>
                          ))
                        }
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="font-semibold mb-2">Safety Tips</h4>
                        <ul className="text-sm text-gray-600 list-disc list-inside">
                          <li>Avoid traveling alone at night in this area</li>
                          <li>Keep valuables secure and out of sight</li>
                          <li>Stay on well-lit, populated streets</li>
                          <li>Be aware of your surroundings at all times</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ) : (
            <>
              {filteredDistricts.map(district => (
                <ZoneCard 
                  key={district.id} 
                  district={district} 
                  selectedYear={selectedYear} 
                  onClick={() => handleDistrictCardClick(district)}
                />
              ))}
              
              {filteredDistricts.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No districts match the selected filter
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
