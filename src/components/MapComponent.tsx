
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu';
import { MapPin, Navigation } from 'lucide-react';

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
const ZoneCard = ({ district, selectedYear }) => {
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
    <Card className="mb-4 overflow-hidden hover:shadow-lg transition-shadow">
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
  const [filter, setFilter] = useState<'all' | 'red' | 'amber' | 'green'>('all');
  const [selectedYear, setSelectedYear] = useState<number>(2022);
  
  // Filter districts based on selected filter
  const filteredDistricts = filter === 'all' 
    ? districtData 
    : districtData.filter(district => district.level === filter);
  
  // Mock map integration (in a real app, you'd use Mapbox, Google Maps, etc.)
  useEffect(() => {
    if (!mapRef.current) return;
    
    // Mock map setup with a placeholder
    mapRef.current.innerHTML = `
      <div class="h-full w-full flex items-center justify-center bg-gray-100 rounded-lg">
        <div class="text-center">
          <div class="text-6xl mb-4">
            <span class="mx-auto" style="font-size: 48px;">🗺️</span>
          </div>
          <p class="text-lg font-medium text-gray-500">
            Map would load here with the filtered districts
          </p>
          <p class="text-sm text-gray-400 mt-2">
            Currently showing: ${filter === 'all' ? 'All Districts' : 
              filter === 'red' ? 'High Risk Districts' : 
              filter === 'amber' ? 'Medium Risk Districts' : 'Low Risk Districts'} (${selectedYear})
          </p>
        </div>
      </div>
    `;
    
    // In a real implementation, you would initialize your map library here
    // and add markers or polygons for each district
  }, [filter, selectedYear]);

  // Available years from the data
  const availableYears = [2018, 2019, 2020, 2021, 2022];
  
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
                
                <div className="flex gap-2 flex-wrap">
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
            <div ref={mapRef} className="h-[calc(100%-80px)] w-full"></div>
          </CardContent>
        </Card>
      </div>
      
      <div className="col-span-1">
        <h2 className="text-xl font-semibold mb-4">Safety by District ({selectedYear})</h2>
        <div className="h-[550px] overflow-y-auto pr-2">
          {filteredDistricts.map(district => (
            <ZoneCard key={district.id} district={district} selectedYear={selectedYear} />
          ))}
          
          {filteredDistricts.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No districts match the selected filter
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
