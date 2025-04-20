import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

// Updated mock data with real statistics
const crimeStats = {
  overall: [
    { category: 'Murder for Gain', count: 57, change: '+26.7%' },
    { category: 'Robberies', count: 529, change: '-7.0%' },
    { category: 'Burglaries', count: 4806, change: '+13.6%' },
    { category: 'Ordinary Thefts', count: 15681, change: '+38.2%' },
    { category: 'Cheating', count: 23332, change: '+152.4%' },
  ],
  byZone: {
    red: [
      { zone: 'Hyderabad', incidents: 1668, mostCommon: 'Theft' },
      { zone: 'Cyberabad', incidents: 1916, mostCommon: 'Burglary' },
    ],
    amber: [
      { zone: 'Rachakonda', incidents: 1662, mostCommon: 'Theft' },
      { zone: 'Warangal', incidents: 564, mostCommon: 'Murder' },
    ],
    green: [
      { zone: 'Khammam', incidents: 262, mostCommon: 'Theft' },
    ]
  }
};

const Information = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Safety Information</h1>
          <p className="text-gray-600 mb-8">
            Access comprehensive data, statistics, and safety resources to better understand your city's safety landscape.
          </p>
          
          <Tabs defaultValue="statistics" className="mb-8">
            <TabsList>
              <TabsTrigger value="statistics">Crime Statistics</TabsTrigger>
              <TabsTrigger value="resources">Safety Resources</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>
            
            {/* Statistics Tab */}
            <TabsContent value="statistics">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Overall Stats */}
                <Card className="lg:col-span-2">
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-semibold mb-4">City-wide Crime Statistics</h2>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 px-4">Category</th>
                            <th className="text-left py-2 px-4">Incidents (Last 12 Months)</th>
                            <th className="text-left py-2 px-4">Change (YoY)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {crimeStats.overall.map((stat, index) => (
                            <tr key={index} className="border-b">
                              <td className="py-2 px-4">{stat.category}</td>
                              <td className="py-2 px-4">{stat.count}</td>
                              <td className={`py-2 px-4 ${stat.change.startsWith('+') ? 'text-red-500' : 'text-green-500'}`}>
                                {stat.change}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="text-sm text-gray-500 mt-4">
                      Source: Official Police Department Data, updated March 2025.
                    </p>
                  </CardContent>
                </Card>
                
                {/* Key Insights */}
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-semibold mb-4">Key Insights</h2>
                    <ul className="space-y-4">
                      <li className="pb-2 border-b">
                        <p className="font-medium">Vehicle theft has seen the largest increase</p>
                        <p className="text-sm text-gray-600 mt-1">
                          Up 12% year over year, with hotspots in commercial parking areas
                        </p>
                      </li>
                      <li className="pb-2 border-b">
                        <p className="font-medium">Burglary rates continue to decline</p>
                        <p className="text-sm text-gray-600 mt-1">
                          Down 8% year over year, likely due to improved home security systems
                        </p>
                      </li>
                      <li className="pb-2 border-b">
                        <p className="font-medium">Downtown remains the highest risk zone</p>
                        <p className="text-sm text-gray-600 mt-1">
                          With theft as the most common reported crime
                        </p>
                      </li>
                      <li>
                        <p className="font-medium">The safest areas are in the eastern suburbs</p>
                        <p className="text-sm text-gray-600 mt-1">
                          Particularly Riverside and Pasadena
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                {/* Zone Breakdown */}
                <Card className="lg:col-span-3 mt-6">
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-semibold mb-4">Zone Breakdown</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <h3 className="font-medium text-white py-2 px-4 bg-citysafe-red rounded-t-lg">High Risk Zones</h3>
                        <div className="border border-t-0 rounded-b-lg p-4">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left py-2">Zone</th>
                                <th className="text-left py-2">Incidents</th>
                                <th className="text-left py-2">Common Crime</th>
                              </tr>
                            </thead>
                            <tbody>
                              {crimeStats.byZone.red.map((zone, index) => (
                                <tr key={index} className={index < crimeStats.byZone.red.length - 1 ? 'border-b' : ''}>
                                  <td className="py-2">{zone.zone}</td>
                                  <td className="py-2">{zone.incidents}</td>
                                  <td className="py-2">{zone.mostCommon}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-white py-2 px-4 bg-citysafe-amber rounded-t-lg">Medium Risk Zones</h3>
                        <div className="border border-t-0 rounded-b-lg p-4">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left py-2">Zone</th>
                                <th className="text-left py-2">Incidents</th>
                                <th className="text-left py-2">Common Crime</th>
                              </tr>
                            </thead>
                            <tbody>
                              {crimeStats.byZone.amber.map((zone, index) => (
                                <tr key={index} className={index < crimeStats.byZone.amber.length - 1 ? 'border-b' : ''}>
                                  <td className="py-2">{zone.zone}</td>
                                  <td className="py-2">{zone.incidents}</td>
                                  <td className="py-2">{zone.mostCommon}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-white py-2 px-4 bg-citysafe-green rounded-t-lg">Low Risk Zones</h3>
                        <div className="border border-t-0 rounded-b-lg p-4">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left py-2">Zone</th>
                                <th className="text-left py-2">Incidents</th>
                                <th className="text-left py-2">Common Crime</th>
                              </tr>
                            </thead>
                            <tbody>
                              {crimeStats.byZone.green.map((zone, index) => (
                                <tr key={index} className={index < crimeStats.byZone.green.length - 1 ? 'border-b' : ''}>
                                  <td className="py-2">{zone.zone}</td>
                                  <td className="py-2">{zone.incidents}</td>
                                  <td className="py-2">{zone.mostCommon}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Safety Resources Tab */}
            <TabsContent value="resources">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Safety Tips */}
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-semibold mb-4">Safety Tips</h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium">For High Risk Areas</h3>
                        <ul className="list-disc pl-5 mt-2 text-gray-700">
                          <li>Stay alert and aware of your surroundings at all times</li>
                          <li>Avoid walking alone, especially at night</li>
                          <li>Keep valuables out of sight in public</li>
                          <li>Park in well-lit, high-traffic areas</li>
                          <li>Consider using ride-sharing services instead of walking</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-medium">For Medium Risk Areas</h3>
                        <ul className="list-disc pl-5 mt-2 text-gray-700">
                          <li>Remain vigilant, especially in unfamiliar locations</li>
                          <li>Travel with a companion when possible</li>
                          <li>Keep doors locked in vehicles and homes</li>
                          <li>Report suspicious activity to local authorities</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-medium">General Safety</h3>
                        <ul className="list-disc pl-5 mt-2 text-gray-700">
                          <li>Share your location with trusted contacts when traveling</li>
                          <li>Install good lighting and security systems at residences</li>
                          <li>Keep emergency contacts easily accessible</li>
                          <li>Stay informed about changing safety conditions in your area</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Emergency Contacts */}
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-semibold mb-4">Emergency Contacts</h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium">Emergency Services</h3>
                        <ul className="mt-2 space-y-2">
                          <li className="flex justify-between border-b pb-2">
                            <span>Emergency Line</span>
                            <span className="font-semibold">911</span>
                          </li>
                          <li className="flex justify-between border-b pb-2">
                            <span>Police (Non-Emergency)</span>
                            <span className="font-semibold">(555) 123-4567</span>
                          </li>
                          <li className="flex justify-between border-b pb-2">
                            <span>Fire Department</span>
                            <span className="font-semibold">(555) 765-4321</span>
                          </li>
                          <li className="flex justify-between border-b pb-2">
                            <span>Poison Control</span>
                            <span className="font-semibold">(800) 222-1222</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-medium">Support Resources</h3>
                        <ul className="mt-2 space-y-2">
                          <li className="flex justify-between border-b pb-2">
                            <span>Crime Victim Support Line</span>
                            <span className="font-semibold">(555) 987-6543</span>
                          </li>
                          <li className="flex justify-between border-b pb-2">
                            <span>Mental Health Crisis Line</span>
                            <span className="font-semibold">(800) 273-8255</span>
                          </li>
                          <li className="flex justify-between border-b pb-2">
                            <span>Domestic Violence Hotline</span>
                            <span className="font-semibold">(800) 799-7233</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Community Programs */}
                <Card className="md:col-span-2">
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-semibold mb-4">Community Safety Programs</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium mb-2">Neighborhood Watch</h3>
                        <p className="text-gray-700 mb-3">
                          Join or form a local Neighborhood Watch group to help keep your community safe through citizen involvement.
                        </p>
                        <a href="#" className="text-citysafe-blue hover:underline">Learn how to get involved →</a>
                      </div>
                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium mb-2">Safety Ambassador Program</h3>
                        <p className="text-gray-700 mb-3">
                          Volunteer to become a Safety Ambassador and help educate others about crime prevention in high-risk areas.
                        </p>
                        <a href="#" className="text-citysafe-blue hover:underline">Apply to become an ambassador →</a>
                      </div>
                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium mb-2">Community Alert System</h3>
                        <p className="text-gray-700 mb-3">
                          Sign up for text or email alerts about safety incidents, alerts, and updates in your selected neighborhoods.
                        </p>
                        <a href="#" className="text-citysafe-blue hover:underline">Register for alerts →</a>
                      </div>
                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium mb-2">Safety Workshops</h3>
                        <p className="text-gray-700 mb-3">
                          Attend free workshops on personal safety, home security, and crime prevention techniques.
                        </p>
                        <a href="#" className="text-citysafe-blue hover:underline">View upcoming workshops →</a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* FAQ Tab */}
            <TabsContent value="faq">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
                  
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>How is the safety zone data determined?</AccordionTrigger>
                      <AccordionContent>
                        Our safety zones are determined through analysis of official crime statistics from local police departments, 
                        combined with incident reports, demographic data, and historical trends. We use algorithmic models to identify 
                        patterns and classify areas into high risk (red), medium risk (yellow), and low risk (green) zones based on 
                        the frequency and severity of reported incidents over the past 12 months.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2">
                      <AccordionTrigger>How often is the data updated?</AccordionTrigger>
                      <AccordionContent>
                        We update our safety data monthly to ensure accuracy. Major incidents may be reflected more quickly. 
                        Each zone on the map displays the last update date when you click on it for detailed information.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                      <AccordionTrigger>Can I report incidents directly through CitySafe?</AccordionTrigger>
                      <AccordionContent>
                        CitySafe does not collect direct incident reports from users. We always recommend reporting 
                        any crime or suspicious activity to your local police department. These official reports are then 
                        incorporated into our data during regular updates.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-4">
                      <AccordionTrigger>Does a red zone mean I should avoid the area completely?</AccordionTrigger>
                      <AccordionContent>
                        Red zones indicate higher risk levels, but this doesn't necessarily mean these areas should be 
                        completely avoided. Many red zones are in busy downtown or commercial districts that are safe during 
                        daytime business hours but may have higher incident rates at night or in specific locations. 
                        We recommend using the detailed information provided for each zone to make informed decisions.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-5">
                      <AccordionTrigger>Is CitySafe available in my city?</AccordionTrigger>
                      <AccordionContent>
                        CitySafe currently operates in 25 major metropolitan areas across the country. We're continually 
                        expanding to new cities based on data availability and partnerships with local authorities. 
                        You can check if your city is covered by searching for it on our map page.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-6">
                      <AccordionTrigger>How can I provide feedback about zone accuracy?</AccordionTrigger>
                      <AccordionContent>
                        We welcome community feedback to improve our data accuracy. If you believe a zone is incorrectly 
                        categorized, you can submit feedback through the "Report Accuracy Issue" button on any specific 
                        zone's detail page. Our team reviews all submissions and cross-references them with official data.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-7">
                      <AccordionTrigger>Does CitySafe collect my personal data?</AccordionTrigger>
                      <AccordionContent>
                        CitySafe only collects anonymized usage data to improve our services. We do not track individual 
                        movements or store personal information beyond what is voluntarily provided if you create an account. 
                        You can use our maps anonymously without signing in. Please review our Privacy Policy for more details.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Information;
