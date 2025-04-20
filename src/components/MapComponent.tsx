
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Filter, Calendar, Map as MapIcon } from 'lucide-react';
import LeafletMap from './LeafletMap';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

// Define District type interface
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

const districtData = [
  {
    id: 'cyberabad',
    name: 'Cyberabad',
    lat: 17.4854,
    lng: 78.3746,
    level: 'red',
    years: [
      { year: 2018, murders: 28, dacoity: 173, robbery: 261, burglary: 1724, kidnapping: 1445, rape: 10973 },
      { year: 2019, murders: 18, dacoity: 284, robbery: 247, burglary: 1916, kidnapping: 1512, rape: 10613 },
      { year: 2020, murders: 11, dacoity: 304, robbery: 174, burglary: 1662, kidnapping: 1383, rape: 8292 },
      { year: 2021, murders: 60, dacoity: 304, robbery: 174, burglary: 1662, kidnapping: 1383, rape: 10613 },
      { year: 2022, murders: 111, dacoity: 174, robbery: 304, burglary: 1662, kidnapping: 1422, rape: 8292 }
    ]
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    lat: 17.3850,
    lng: 78.4867,
    level: 'red',
    years: [
      { year: 2018, murders: 34, dacoity: 195, robbery: 254, burglary: 1568, kidnapping: 1508, rape: 7898 },
      { year: 2019, murders: 37, dacoity: 286, robbery: 320, burglary: 1668, kidnapping: 1376, rape: 7646 },
      { year: 2020, murders: 34, dacoity: 286, robbery: 320, burglary: 1668, kidnapping: 1203, rape: 8114 },
      { year: 2021, murders: 34, dacoity: 286, robbery: 320, burglary: 1668, kidnapping: 1376, rape: 8114 },
      { year: 2022, murders: 34, dacoity: 320, robbery: 286, burglary: 1668, kidnapping: 1581, rape: 8114 }
    ]
  },
  {
    id: 'secunderabad',
    name: 'Secunderabad',
    lat: 17.4394,
    lng: 78.4982,
    level: 'amber',
    years: [
      { year: 2018, murders: 15, dacoity: 92, robbery: 127, burglary: 856, kidnapping: 754, rape: 3949 },
      { year: 2019, murders: 17, dacoity: 143, robbery: 160, burglary: 934, kidnapping: 688, rape: 3823 },
      { year: 2020, murders: 17, dacoity: 143, robbery: 160, burglary: 934, kidnapping: 601, rape: 4057 },
      { year: 2021, murders: 17, dacoity: 143, robbery: 160, burglary: 934, kidnapping: 688, rape: 4057 },
      { year: 2022, murders: 17, dacoity: 160, robbery: 143, burglary: 934, kidnapping: 790, rape: 4057 }
    ]
  },
  {
    id: 'rangareddy',
    name: 'Rangareddy',
    lat: 17.3466,
    lng: 78.3068,
    level: 'amber',
    years: [
      { year: 2018, murders: 21, dacoity: 118, robbery: 159, burglary: 1079, kidnapping: 891, rape: 4674 },
      { year: 2019, murders: 14, dacoity: 196, robbery: 179, burglary: 1277, kidnapping: 945, rape: 4464 },
      { year: 2020, murders: 14, dacoity: 196, robbery: 179, burglary: 1277, kidnapping: 824, rape: 4700 },
      { year: 2021, murders: 14, dacoity: 196, robbery: 179, burglary: 1277, kidnapping: 945, rape: 4700 },
      { year: 2022, murders: 14, dacoity: 179, robbery: 196, burglary: 1277, kidnapping: 1025, rape: 4700 }
    ]
  },
  {
    id: 'medchal',
    name: 'Medchal',
    lat: 17.5686,
    lng: 78.4744,
    level: 'green',
    years: [
      { year: 2018, murders: 9, dacoity: 46, robbery: 63, burglary: 428, kidnapping: 356, rape: 1862 },
      { year: 2019, murders: 6, dacoity: 76, robbery: 71, burglary: 557, kidnapping: 370, rape: 1771 },
      { year: 2020, murders: 6, dacoity: 76, robbery: 71, burglary: 557, kidnapping: 323, rape: 1900 },
      { year: 2021, murders: 6, dacoity: 76, robbery: 71, burglary: 557, kidnapping: 370, rape: 1900 },
      { year: 2022, murders: 6, dacoity: 71, robbery: 76, burglary: 557, kidnapping: 403, rape: 1900 }
    ]
  },
  {
    id: 'sangareddy',
    name: 'Sangareddy',
    lat: 17.6344,
    lng: 78.0441,
    level: 'green',
    years: [
      { year: 2018, murders: 12, dacoity: 61, robbery: 82, burglary: 553, kidnapping: 459, rape: 2405 },
      { year: 2019, murders: 8, dacoity: 101, robbery: 92, burglary: 719, kidnapping: 476, rape: 2288 },
      { year: 2020, murders: 8, dacoity: 101, robbery: 92, burglary: 719, kidnapping: 415, rape: 2450 },
      { year: 2021, murders: 8, dacoity: 101, robbery: 92, burglary: 719, kidnapping: 476, rape: 2450 },
      { year: 2022, murders: 8, dacoity: 92, robbery: 101, burglary: 719, kidnapping: 513, rape: 2450 }
    ]
  },
  {
    id: 'vicarabad',
    name: 'Vicarabad',
    lat: 17.3375,
    lng: 77.9044,
    level: 'green',
    years: [
      { year: 2018, murders: 7, dacoity: 38, robbery: 51, burglary: 345, kidnapping: 287, rape: 1503 },
      { year: 2019, murders: 5, dacoity: 63, robbery: 58, burglary: 451, kidnapping: 299, rape: 1435 },
      { year: 2020, murders: 5, dacoity: 63, robbery: 58, burglary: 451, kidnapping: 260, rape: 1540 },
      { year: 2021, murders: 5, dacoity: 63, robbery: 58, burglary: 451, kidnapping: 299, rape: 1540 },
      { year: 2022, murders: 5, dacoity: 58, robbery: 63, burglary: 451, kidnapping: 328, rape: 1540 }
    ]
  },
  {
    id: 'yadadri',
    name: 'Yadadri',
    lat: 17.2587,
    lng: 78.8441,
    level: 'green',
    years: [
      { year: 2018, murders: 10, dacoity: 53, robbery: 71, burglary: 479, kidnapping: 398, rape: 2090 },
      { year: 2019, murders: 7, dacoity: 88, robbery: 80, burglary: 622, kidnapping: 412, rape: 1989 },
      { year: 2020, murders: 7, dacoity: 88, robbery: 80, burglary: 622, kidnapping: 359, rape: 2130 },
      { year: 2021, murders: 7, dacoity: 88, robbery: 80, burglary: 622, kidnapping: 412, rape: 2130 },
      { year: 2022, murders: 7, dacoity: 80, robbery: 88, burglary: 622, kidnapping: 449, rape: 2130 }
    ]
  },
  {
    id: 'medak',
    name: 'Medak',
    lat: 18.0355,
    lng: 78.2683,
    level: 'green',
    years: [
      { year: 2018, murders: 11, dacoity: 59, robbery: 79, burglary: 532, kidnapping: 443, rape: 2320 },
      { year: 2019, murders: 7, dacoity: 98, robbery: 89, burglary: 691, kidnapping: 457, rape: 2204 },
      { year: 2020, murders: 7, dacoity: 98, robbery: 89, burglary: 691, kidnapping: 400, rape: 2360 },
      { year: 2021, murders: 7, dacoity: 98, robbery: 89, burglary: 691, kidnapping: 457, rape: 2360 },
      { year: 2022, murders: 7, dacoity: 89, robbery: 98, burglary: 691, kidnapping: 497, rape: 2360 }
    ]
  },
  {
    id: 'siddipet',
    name: 'Siddipet',
    lat: 18.4727,
    lng: 78.8558,
    level: 'green',
    years: [
      { year: 2018, murders: 8, dacoity: 42, robbery: 56, burglary: 378, kidnapping: 315, rape: 1656 },
      { year: 2019, murders: 5, dacoity: 70, robbery: 63, burglary: 491, kidnapping: 325, rape: 1574 },
      { year: 2020, murders: 5, dacoity: 70, robbery: 63, burglary: 491, kidnapping: 283, rape: 1690 },
      { year: 2021, murders: 5, dacoity: 70, robbery: 63, burglary: 491, kidnapping: 325, rape: 1690 },
      { year: 2022, murders: 5, dacoity: 63, robbery: 70, burglary: 491, kidnapping: 354, rape: 1690 }
    ]
  }
];

const availableYears = [2018, 2019, 2020, 2021, 2022];

const calculateSafetyLevel = (district: District) => {
  const latestYear = district.years[district.years.length - 1];
  const totalCrimes = latestYear.murders + latestYear.dacoity + latestYear.robbery + 
                     latestYear.burglary + latestYear.kidnapping;
  
  if (totalCrimes > 3000) return 'red';
  if (totalCrimes > 1000) return 'amber';
  return 'green';
};

const ZoneCard = ({ district, selectedYear, onClick }: { 
  district: District; 
  selectedYear: number;
  onClick: () => void;
}) => {
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
  const [selectedYear, setSelectedYear] = useState(2022);
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
  const [filter, setFilter] = useState('all');
  const [isHeatmapMode, setIsHeatmapMode] = useState(false);

  const filteredDistricts = districtData.filter(
    district => filter === 'all' || district.level === filter
  );

  const handleDistrictCardClick = (district: District) => {
    setSelectedDistrict(district);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="col-span-1 lg:col-span-2">
        <Card className="h-[600px]">
          <CardContent className="p-0 h-full relative">
            {/* Map controls floating on top of the map with higher z-index */}
            <div className="absolute top-4 left-4 right-4 z-[1000] flex flex-row flex-wrap justify-between gap-2">
              <div className="flex flex-row gap-2 flex-wrap">
                {/* Filter control */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="secondary" className="bg-white/90 hover:bg-white shadow-md flex items-center gap-1">
                      <Filter className="h-4 w-4" />
                      {filter === 'all' ? 'All Districts' : 
                      filter === 'red' ? 'High Risk' : 
                      filter === 'amber' ? 'Medium Risk' : 'Low Risk'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56 p-2 z-[1001] bg-white shadow-lg">
                    <div className="flex flex-col gap-2">
                      <Button 
                        variant={filter === 'all' ? 'default' : 'outline'} 
                        onClick={() => setFilter('all')}
                        className="justify-start"
                      >
                        All Districts
                      </Button>
                      <Button 
                        variant={filter === 'red' ? 'default' : 'outline'} 
                        className={`justify-start ${filter === 'red' ? 'bg-citysafe-red hover:bg-citysafe-red/90' : ''}`}
                        onClick={() => setFilter('red')}
                      >
                        High Risk
                      </Button>
                      <Button 
                        variant={filter === 'amber' ? 'default' : 'outline'} 
                        className={`justify-start ${filter === 'amber' ? 'bg-citysafe-amber hover:bg-citysafe-amber/90' : ''}`}
                        onClick={() => setFilter('amber')}
                      >
                        Medium Risk
                      </Button>
                      <Button 
                        variant={filter === 'green' ? 'default' : 'outline'} 
                        className={`justify-start ${filter === 'green' ? 'bg-citysafe-green hover:bg-citysafe-green/90' : ''}`}
                        onClick={() => setFilter('green')}
                      >
                        Low Risk
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
                
                {/* Heatmap toggle button */}
                <Button 
                  variant={isHeatmapMode ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => setIsHeatmapMode(!isHeatmapMode)}
                  className={`${isHeatmapMode ? 'bg-white/90 hover:bg-white' : 'bg-white/90 hover:bg-white'} shadow-md`}
                >
                  <MapIcon className="h-4 w-4 mr-1" />
                  {isHeatmapMode ? "Marker Mode" : "Heatmap Mode"}
                </Button>
              </div>
              
              {/* Year selector */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="secondary" className="bg-white/90 hover:bg-white shadow-md flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Year: {selectedYear}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-2 z-[1001] bg-white shadow-lg">
                  <div className="flex flex-wrap gap-2 justify-center">
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
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="h-full w-full">
              <LeafletMap
                districts={filteredDistricts}
                selectedYear={selectedYear}
                onDistrictClick={setSelectedDistrict}
                isHeatmapMode={isHeatmapMode}
              />
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
                        {Object.entries(selectedDistrict.years.find(y => y.year === selectedYear) || {})
                          .filter(([key]) => key !== 'year')
                          .map(([key, value]) => (
                            <div key={key} className="bg-gray-50 p-2 rounded">
                              <p className="text-xs text-gray-500">{key.charAt(0).toUpperCase() + key.slice(1)}</p>
                              <p className="font-semibold">{value as React.ReactNode}</p>
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
