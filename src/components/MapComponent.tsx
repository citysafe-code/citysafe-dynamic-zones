
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from '@/components/ui/navigation-menu';
import { MapPin, Navigation, Locate } from 'lucide-react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// District crime data
const districtData = [
  { 
    id: 1, 
    name: 'Cyberabad', 
    years: [
      { year: 2018, murders: 28, dacoity: 173, robbery: 261, burglary: 1724, kidnapping: 1445, rape: 10973 },
      { year: 2019, murders: 18, dacoity: 284, robbery: 247, burglary: 1916, kidnapping: 1512, rape: 10613 },
      { year: 2020, murders: 11, dacoity: 304, robbery: 174, burglary: 1662, kidnapping: 1383, rape: 8292 },
      { year: 2021, murders: 60, dacoity: 304, robbery: 174, burglary: 1662, kidnapping: 1383, rape: 10613 },
      { year: 2022, murders: 111, dacoity: 174, robbery: 304, burglary: 1662, kidnapping: 1422, rape: 8292 }
    ],
    lat: 17.4932, 
    lng: 78.3913,
    level: 'red'
  },
  { 
    id: 2, 
    name: 'Hyderabad', 
    years: [
      { year: 2018, murders: 34, dacoity: 195, robbery: 254, burglary: 1568, kidnapping: 1508, rape: 7898 },
      { year: 2019, murders: 37, dacoity: 286, robbery: 320, burglary: 1668, kidnapping: 1376, rape: 7646 },
      { year: 2020, murders: 34, dacoity: 286, robbery: 320, burglary: 1668, kidnapping: 1203, rape: 8114 },
      { year: 2021, murders: 34, dacoity: 286, robbery: 320, burglary: 1668, kidnapping: 1376, rape: 8114 },
      { year: 2022, murders: 34, dacoity: 320, robbery: 286, burglary: 1668, kidnapping: 1581, rape: 8114 }
    ],
    lat: 17.3850, 
    lng: 78.4867,
    level: 'red'
  },
  { 
    id: 3, 
    name: 'Rachakonda', 
    years: [
      { year: 2018, murders: 68, dacoity: 135, robbery: 150, burglary: 1475, kidnapping: 1685, rape: 9801 },
      { year: 2019, murders: 60, dacoity: 304, robbery: 174, burglary: 1662, kidnapping: 1848, rape: 9794 },
      { year: 2020, murders: 111, dacoity: 174, robbery: 304, burglary: 1662, kidnapping: 1946, rape: 11871 },
      { year: 2021, murders: 111, dacoity: 174, robbery: 304, burglary: 1662, kidnapping: 1946, rape: 11871 },
      { year: 2022, murders: 111, dacoity: 174, robbery: 304, burglary: 1662, kidnapping: 2353, rape: 11871 }
    ],
    lat: 17.3616, 
    lng: 78.5888,
    level: 'red' 
  },
  { 
    id: 4, 
    name: 'Warangal', 
    years: [
      { year: 2018, murders: 55, dacoity: 63, robbery: 65, burglary: 469, kidnapping: 1234, rape: 3698 },
      { year: 2019, murders: 54, dacoity: 74, robbery: 50, burglary: 564, kidnapping: 1352, rape: 4175 },
      { year: 2020, murders: 63, dacoity: 74, robbery: 50, burglary: 564, kidnapping: 1542, rape: 4336 },
      { year: 2021, murders: 63, dacoity: 74, robbery: 50, burglary: 564, kidnapping: 1573, rape: 4336 },
      { year: 2022, murders: 63, dacoity: 50, robbery: 74, burglary: 564, kidnapping: 1573, rape: 4336 }
    ],
    lat: 17.9689, 
    lng: 79.5941,
    level: 'amber'
  },
  { 
    id: 5, 
    name: 'Khammam', 
    years: [
      { year: 2018, murders: 21, dacoity: 44, robbery: 38, burglary: 317, kidnapping: 837, rape: 4109 },
      { year: 2019, murders: 41, dacoity: 74, robbery: 33, burglary: 262, kidnapping: 852, rape: 3235 },
      { year: 2020, murders: 73, dacoity: 74, robbery: 33, burglary: 262, kidnapping: 798, rape: 3340 },
      { year: 2021, murders: 73, dacoity: 74, robbery: 33, burglary: 262, kidnapping: 798, rape: 3340 },
      { year: 2022, murders: 73, dacoity: 33, robbery: 74, burglary: 262, kidnapping: 798, rape: 3340 }
    ],
    lat: 17.2473, 
    lng: 80.1514,
    level: 'amber'
  },
  { 
    id: 6, 
    name: 'Karimnagar', 
    years: [
      { year: 2018, murders: 27, dacoity: 27, robbery: 16, burglary: 308, kidnapping: 513, rape: 2024 }
    ],
    lat: 18.4392, 
    lng: 79.1293,
    level: 'green'
  },
  { 
    id: 7, 
    name: 'Nizamabad', 
    years: [
      { year: 2018, murders: 11, dacoity: 14, robbery: 32, burglary: 333, kidnapping: 687, rape: 2478 }
    ],
    lat: 18.6725, 
    lng: 78.0941,
    level: 'green'
  },
  { 
    id: 8, 
    name: 'Ramagundam', 
    years: [
      { year: 2018, murders: 34, dacoity: 31, robbery: 26, burglary: 429, kidnapping: 912, rape: 4180 }
    ],
    lat: 18.7549, 
    lng: 79.4746,
    level: 'amber'
  },
  { 
    id: 9, 
    name: 'Siddipet', 
    years: [
      { year: 2018, murders: 8, dacoity: 13, robbery: 12, burglary: 162, kidnapping: 861, rape: 2613 }
    ],
    lat: 18.1018, 
    lng: 78.8501,
    level: 'green'
  },
  { 
    id: 10, 
    name: 'Adilabad', 
    years: [
      { year: 2018, murders: 16, dacoity: 7, robbery: 18, burglary: 236, kidnapping: 217, rape: 1294 }
    ],
    lat: 19.6640, 
    lng: 78.5320,
    level: 'green'
  },
  { 
    id: 11, 
    name: 'Sanga Reddy', 
    years: [
      { year: 2018, murders: 38, dacoity: 9, robbery: 4, burglary: 193, kidnapping: 236, rape: 272 }
    ],
    lat: 17.6230, 
    lng: 78.0894,
    level: 'green'
  },
  { 
    id: 12, 
    name: 'Suryapet', 
    years: [
      { year: 2018, murders: 19, dacoity: 1, robbery: 2, burglary: 88, kidnapping: 155, rape: 84 }
    ],
    lat: 17.1354, 
    lng: 79.6336,
    level: 'green'
  },
  { 
    id: 13, 
    name: 'Vikarabad', 
    years: [
      { year: 2018, murders: 22, dacoity: 2, robbery: 4, burglary: 60, kidnapping: 64, rape: 75 }
    ],
    lat: 17.3380, 
    lng: 77.9054,
    level: 'green'
  },
  { 
    id: 14, 
    name: 'Wanaparthy', 
    years: [
      { year: 2018, murders: 6, dacoity: 2, robbery: 2, burglary: 48, kidnapping: 192, rape: 36 }
    ],
    lat: 16.3622, 
    lng: 77.9381,
    level: 'green'
  },
  { 
    id: 15, 
    name: 'Nalgonda', 
    years: [
      { year: 2018, murders: 33, dacoity: 0, robbery: 9, burglary: 133, kidnapping: 172, rape: 149 }
    ],
    lat: 17.0574, 
    lng: 79.2676,
    level: 'green'
  }
];

// Calculate safety level based on crime data for the current year
const calculateSafetyLevel = (district) => {
  const latestYear = district.years[district.years.length - 1];
  const totalCrimes = latestYear.murders + latestYear.dacoity + latestYear.robbery + 
                     latestYear.burglary + latestYear.kidnapping;
  
  if (totalCrimes > 3000) return 'red';
  if (totalCrimes > 1000) return 'amber';
  return 'green';
};

// Zone cards component
const ZoneCard = ({ district, selectedYear, onClick }) => {
  // Find the data for the selected year, or use the latest year if not found
  const yearData = district.years.find(y => y.year === selectedYear) || 
                  district.years[district.years.length - 1];
  
  // Calculate total incidents for the selected year
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
  const mapRef = useRef(null);
  const mapboxMapRef = useRef(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedYear, setSelectedYear] = useState(2022);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [showMapTokenInput, setShowMapTokenInput] = useState(true);
  const markersRef = useRef({});
  
  // Filter districts based on selected filter
  const filteredDistricts = filter === 'all' 
    ? districtData 
    : districtData.filter(district => district.level === filter);
  
  // Get user's location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          
          if (mapboxMapRef.current) {
            // Add a marker for the user's location if it doesn't exist
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
              // Update the marker position
              markersRef.current.userMarker.setLngLat([longitude, latitude]);
            }
            
            // Center the map on the user's location
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
  
  // Initialize mapbox map
  useEffect(() => {
    if (!mapRef.current || !mapboxToken) return;
    
    mapboxgl.accessToken = mapboxToken;
    
    // Create the map
    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [78.4867, 17.3850], // Centered on Hyderabad
      zoom: 7
    });
    
    // Store the map reference
    mapboxMapRef.current = map;
    
    // Add navigation controls
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    
    // Add district markers when the map loads
    map.on('load', () => {
      // Add district markers
      districtData.forEach(district => {
        const { lat, lng, name, level } = district;
        
        // Create marker element
        const markerElement = document.createElement('div');
        markerElement.className = 'district-marker';
        const markerColor = level === 'red' ? 'bg-citysafe-red' : level === 'amber' ? 'bg-citysafe-amber' : 'bg-citysafe-green';
        markerElement.innerHTML = `
          <div class="${markerColor} w-4 h-4 rounded-full border-2 border-white shadow-md"></div>
        `;
        
        // Create popup
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <div class="p-2">
            <strong>${name}</strong>
            <p class="text-sm">Click for details</p>
          </div>
        `);
        
        // Add marker to map
        const marker = new mapboxgl.Marker(markerElement)
          .setLngLat([lng, lat])
          .setPopup(popup)
          .addTo(map);
        
        // Store marker reference
        markersRef.current[district.id] = marker;
        
        // Add click event to marker
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
    
    // Cleanup
    return () => {
      map.remove();
    };
  }, [mapboxToken]);
  
  // Update markers visibility based on filter
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
  
  // Handle district card click
  const handleDistrictCardClick = (district) => {
    setSelectedDistrict(district);
    
    if (mapboxMapRef.current) {
      mapboxMapRef.current.flyTo({
        center: [district.lng, district.lat],
        zoom: 11,
        essential: true
      });
    }
  };
  
  // Available years from the data
  const availableYears = [2018, 2019, 2020, 2021, 2022];
  
  // Handle mapbox token submission
  const handleTokenSubmit = (e) => {
    e.preventDefault();
    setShowMapTokenInput(false);
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="col-span-1 lg:col-span-2">
        <Card className="h-[600px]">
          <CardContent className="p-0 h-full">
            {/* Map filter controls */}
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
            
            {/* Map container */}
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
