
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const About = () => {
  const teamMembers = [
    {
      name: "Alex Morgan",
      role: "Founder & Data Scientist",
      bio: "Former urban planner with 15 years of experience in city development and safety analysis.",
      initial: "AM"
    },
    {
      name: "Samira Khan",
      role: "Lead Developer",
      bio: "Full-stack developer specializing in geospatial applications and data visualization.",
      initial: "SK"
    },
    {
      name: "Marcus Chen",
      role: "Crime Analysis Expert",
      bio: "Former police detective with expertise in crime pattern recognition and prevention strategies.",
      initial: "MC"
    },
    {
      name: "Diana Lopez",
      role: "Community Outreach",
      bio: "Community organizer focused on building partnerships with neighborhoods and local organizations.",
      initial: "DL"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          
          {/* Mission Section */}
          <section className="mb-16">
            <h1 className="text-3xl font-bold mb-6">About CitySafe</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                <p className="text-gray-700 mb-4">
                  At CitySafe, we believe that access to accurate safety information is essential for 
                  building thriving communities. Our mission is to provide citizens with transparent, 
                  up-to-date data about safety zones in their cities, empowering them to make informed 
                  decisions about where they live, work, and spend time.
                </p>
                <p className="text-gray-700">
                  Founded in 2020, CitySafe emerged from a collaboration between urban planners, data 
                  scientists, and community advocates who recognized the need for better safety 
                  visualization tools. Today, we serve over 25 major cities across the country and 
                  continue to expand our coverage.
                </p>
              </div>
              <div className="bg-citysafe-blue rounded-lg p-8 text-white">
                <h2 className="text-2xl font-semibold mb-4">Our Approach</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="font-bold text-xl mr-2">1.</span>
                    <span>We collect crime data from official police departments and public records.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold text-xl mr-2">2.</span>
                    <span>Our algorithms analyze patterns and frequencies to identify risk levels.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold text-xl mr-2">3.</span>
                    <span>We create color-coded zones that reflect the safety profile of each area.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold text-xl mr-2">4.</span>
                    <span>Data is updated regularly to ensure accuracy and relevance.</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
          
          {/* Values Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3">Transparency</h3>
                  <p className="text-gray-600">
                    We believe in complete transparency about our data sources, methodologies, and limitations. 
                    Users deserve to know exactly how our safety assessments are created.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3">Accuracy</h3>
                  <p className="text-gray-600">
                    We are committed to providing the most accurate information possible through rigorous 
                    data verification, regular updates, and continuous refinement of our analysis methods.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3">Empowerment</h3>
                  <p className="text-gray-600">
                    Knowledge is power. By making safety information accessible, we aim to empower individuals 
                    and communities to advocate for and create positive change in their neighborhoods.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
          
          {/* Team Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map(member => (
                <Card key={member.name} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6 text-center">
                    <Avatar className="w-24 h-24 mx-auto mb-4">
                      <AvatarFallback className="bg-citysafe-blue text-white text-xl">
                        {member.initial}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-citysafe-blue font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
          
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
