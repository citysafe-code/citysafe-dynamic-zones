
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MapComponent from '@/components/MapComponent';
import { Card } from '@/components/ui/card';

const Map = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">District Crime Map</h1>
          <p className="text-gray-600 mb-6">
            Explore color-coded safety districts across the region based on official crime data from 2018-2022.
          </p>
          
          <div className="mb-8">
            <Card className="p-4 bg-gray-50 border-l-4 border-citysafe-blue">
              <div className="flex items-start">
                <div>
                  <h3 className="font-semibold mb-1">Understanding the Map</h3>
                  <p className="text-sm text-gray-600">
                    <span className="inline-block w-3 h-3 bg-citysafe-red rounded-full mr-1"></span> Red zones indicate high-risk districts with over 3,000 reported incidents
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="inline-block w-3 h-3 bg-citysafe-amber rounded-full mr-1"></span> Yellow zones indicate medium-risk districts with 1,000-3,000 reported incidents
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="inline-block w-3 h-3 bg-citysafe-green rounded-full mr-1"></span> Green zones indicate low-risk districts with under 1,000 reported incidents
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>💡 Tip:</strong> Click the location button to see your current position on the map
                  </p>
                </div>
              </div>
            </Card>
          </div>
          
          <MapComponent />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Map;
