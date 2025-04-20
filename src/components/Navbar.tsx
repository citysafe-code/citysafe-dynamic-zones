
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Navigation } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed w-full z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-citysafe-blue rounded-lg p-1">
            <Navigation className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-citysafe-blue">CitySafe</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-foreground/80 hover:text-citysafe-blue transition-colors">Home</Link>
          <Link to="/map" className="text-foreground/80 hover:text-citysafe-blue transition-colors">Map</Link>
          <Link to="/reviews" className="text-foreground/80 hover:text-citysafe-blue transition-colors">District Reviews</Link>
          <Link to="/about" className="text-foreground/80 hover:text-citysafe-blue transition-colors">About</Link>
          <Link to="/information" className="text-foreground/80 hover:text-citysafe-blue transition-colors">Information</Link>
          <Link to="/contact" className="text-foreground/80 hover:text-citysafe-blue transition-colors">Contact</Link>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-foreground p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b animate-fade-in">
          <div className="container mx-auto py-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="px-4 py-2 hover:bg-muted rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/map" 
              className="px-4 py-2 hover:bg-muted rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Map
            </Link>
            <Link 
              to="/reviews" 
              className="px-4 py-2 hover:bg-muted rounded-md"
              onClick={() => setIsOpen(false)}
            >
              District Reviews
            </Link>
            <Link 
              to="/about" 
              className="px-4 py-2 hover:bg-muted rounded-md"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/information" 
              className="px-4 py-2 hover:bg-muted rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Information
            </Link>
            <Link 
              to="/contact" 
              className="px-4 py-2 hover:bg-muted rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
