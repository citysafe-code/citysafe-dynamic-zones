
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Navigation } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-16">
        <div className="text-center px-4">
          <div className="bg-citysafe-blue rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <Navigation className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">
            Oops! This area hasn't been mapped yet.
          </p>
          <Button asChild size="lg" className="bg-citysafe-blue hover:bg-citysafe-blue-dark">
            <Link to="/">Return to Safety</Link>
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
