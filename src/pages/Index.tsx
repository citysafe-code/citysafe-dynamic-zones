
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import City3D from '@/components/City3D';
import { Navigation, MapPin, MapPinCheck, Compass } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 city-gradient text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Navigate Your City with Confidence
              </h1>
              <p className="text-lg md:text-xl text-blue-100 mb-8">
                CitySafe provides real-time crime zone mapping to help you make safer decisions 
                about where to live, work, and visit in your city.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-white text-citysafe-blue hover:bg-gray-100">
                  <Link to="/map">Explore Safety Map</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>
            
            <div className="hidden lg:block h-[400px] animate-scale-in">
              <City3D />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How CitySafe Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-citysafe-blue rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-4">Visualize Safety Zones</h3>
                <p className="text-gray-600 text-center">
                  Our map displays color-coded zones indicating high, medium, and low risk areas 
                  based on recent crime data.
                </p>
              </CardContent>
            </Card>
            
            {/* Feature 2 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-citysafe-blue rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                  <Compass className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-4">Stay Informed</h3>
                <p className="text-gray-600 text-center">
                  Access detailed crime statistics, incident reports, and safety recommendations
                  for any neighborhood.
                </p>
              </CardContent>
            </Card>
            
            {/* Feature 3 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-citysafe-blue rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                  <MapPinCheck className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-4">Make Better Decisions</h3>
                <p className="text-gray-600 text-center">
                  Use our data to choose safer routes, housing locations, or community gathering spots 
                  with confidence.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Making Cities Safer Every Day</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-citysafe-blue mb-2">25+</p>
              <p className="text-lg text-gray-600">Cities Mapped</p>
            </div>
            
            <div className="text-center">
              <p className="text-4xl font-bold text-citysafe-blue mb-2">1M+</p>
              <p className="text-lg text-gray-600">Monthly Users</p>
            </div>
            
            <div className="text-center">
              <p className="text-4xl font-bold text-citysafe-blue mb-2">200K+</p>
              <p className="text-lg text-gray-600">Zones Analyzed</p>
            </div>
            
            <div className="text-center">
              <p className="text-4xl font-bold text-citysafe-blue mb-2">98%</p>
              <p className="text-lg text-gray-600">Data Accuracy</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-citysafe-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Navigate Safely?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Start exploring safety zones in your city today and make more informed decisions about where you go.
          </p>
          <Button asChild size="lg" className="bg-white text-citysafe-blue hover:bg-gray-100">
            <Link to="/map">View Safety Map</Link>
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
