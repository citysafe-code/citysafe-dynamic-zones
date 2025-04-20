
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu';
import { MapPin, Navigation } from 'lucide-react';

// Mock data for zones
const mockZones = [
  { id: 1, name: 'Downtown', level: 'red', incidents: 45, lat: 34.0522, lng: -118.2437 },
  { id: 2, name: 'West Hills', level: 'amber', incidents: 23, lat: 34.1021, lng: -118.3587 },
  { id: 3, name: 'Riverside', level: 'green', incidents: 12, lat: 33.9806, lng: -118.1598 },
  { id: 4, name: 'Northridge', level: 'amber', incidents: 28, lat: 34.2365, lng: -118.5300 },
  { id: 5, name: 'Silver Lake', level: 'red', incidents: 37, lat: 34.0872, lng: -118.2705 },
  { id: 6, name: 'Pasadena', level: 'green', incidents: 15, lat: 34.1478, lng: -118.1445 },
];

// Zone cards component
const ZoneCard = ({ zone }: { zone: typeof mockZones[0] }) => {
  const levelColor = 
    zone.level === 'red' ? 'bg-citysafe-red text-white' :
    zone.level === 'amber' ? 'bg-citysafe-amber text-white' : 'bg-citysafe-green text-white';
  
  return (
    <Card className="mb-4 overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <div className={`p-4 ${zone.level === 'red' ? 'zone-red' : zone.level === 'amber' ? 'zone-amber' : 'zone-green'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <h3 className="font-medium">{zone.name}</h3>
            </div>
            <Badge className={levelColor}>
              {zone.level === 'red' ? 'High Risk' : zone.level === 'amber' ? 'Medium Risk' : 'Low Risk'}
            </Badge>
          </div>
          <p className="mt-2 text-sm">
            {zone.incidents} incidents reported in this zone
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

const MapComponent = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<'all' | 'red' | 'amber' | 'green'>('all');
  
  // Filter zones based on selected filter
  const filteredZones = filter === 'all' 
    ? mockZones 
    : mockZones.filter(zone => zone.level === filter);
  
  // Mock map integration (in a real app, you'd use Mapbox, Google Maps, etc.)
  useEffect(() => {
    if (!mapRef.current) return;
    
    // Mock map setup with a placeholder
    mapRef.current.innerHTML = `
      <div class="h-full w-full flex items-center justify-center bg-gray-100 rounded-lg">
        <div class="text-center">
          <div class="text-6xl mb-4">
            <Navigation className="mx-auto" size={48} />
          </div>
          <p class="text-lg font-medium text-gray-500">
            Map would load here with the filtered zones
          </p>
          <p class="text-sm text-gray-400 mt-2">
            Currently showing: ${filter === 'all' ? 'All Zones' : 
              filter === 'red' ? 'High Risk Zones' : 
              filter === 'amber' ? 'Medium Risk Zones' : 'Low Risk Zones'}
          </p>
        </div>
      </div>
    `;
    
    // In a real implementation, you would initialize your map library here
    // and add markers or polygons for each zone
  }, [filter]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="col-span-1 lg:col-span-2">
        <Card className="h-[600px]">
          <CardContent className="p-0 h-full">
            {/* Map filter controls */}
            <div className="p-4 border-b">
              <NavigationMenu>
                <NavigationMenuList className="flex space-x-4">
                  <NavigationMenuItem>
                    <Button 
                      variant={filter === 'all' ? 'default' : 'outline'} 
                      onClick={() => setFilter('all')}
                    >
                      All Zones
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
            </div>
            
            {/* Map container */}
            <div ref={mapRef} className="h-[calc(100%-65px)] w-full"></div>
          </CardContent>
        </Card>
      </div>
      
      <div className="col-span-1">
        <h2 className="text-xl font-semibold mb-4">Safety Zones</h2>
        <div className="h-[550px] overflow-y-auto pr-2">
          {filteredZones.map(zone => (
            <ZoneCard key={zone.id} zone={zone} />
          ))}
          
          {filteredZones.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No zones match the selected filter
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
