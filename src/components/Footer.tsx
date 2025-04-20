
import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-citysafe-blue-dark text-white pt-12 pb-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-white rounded-lg p-1">
                <Navigation className="h-5 w-5 text-citysafe-blue" />
              </div>
              <span className="text-xl font-bold">CitySafe</span>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              Visualizing urban safety through advanced mapping technology. 
              Helping communities stay informed and make safer decisions.
            </p>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/map" className="text-gray-300 hover:text-white transition-colors">Map</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/information" className="text-gray-300 hover:text-white transition-colors">Information</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Crime Statistics</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Safety Tips</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Emergency Contacts</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Community Support</a></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 px-4">
          <p className="text-sm text-center text-gray-400">
            &copy; {currentYear} CitySafe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
