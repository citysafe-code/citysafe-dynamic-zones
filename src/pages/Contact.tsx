
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MessageSquare, Phone } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
          <p className="text-gray-600 mb-8">
            Have questions about CitySafe? We're here to help and listen.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-citysafe-blue/10 p-3 rounded-full mb-4">
                  <Phone className="h-6 w-6 text-citysafe-blue" />
                </div>
                <h3 className="font-semibold mb-2">Phone</h3>
                <p className="text-gray-600 mb-4">Mon-Fri from 8am to 5pm</p>
                <a href="tel:+1234567890" className="text-citysafe-blue hover:underline">
                  (123) 456-7890
                </a>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-citysafe-blue/10 p-3 rounded-full mb-4">
                  <Mail className="h-6 w-6 text-citysafe-blue" />
                </div>
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-gray-600 mb-4">We'll respond within 24 hours</p>
                <a href="mailto:support@citysafe.com" className="text-citysafe-blue hover:underline">
                  support@citysafe.com
                </a>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-citysafe-blue/10 p-3 rounded-full mb-4">
                  <MessageSquare className="h-6 w-6 text-citysafe-blue" />
                </div>
                <h3 className="font-semibold mb-2">Live Chat</h3>
                <p className="text-gray-600 mb-4">Available 24/7</p>
                <button className="text-citysafe-blue hover:underline">
                  Start a conversation
                </button>
              </div>
            </Card>
          </div>
          
          <Card className="max-w-2xl mx-auto">
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Send us a message</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="your@email.com" />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <Input id="subject" placeholder="How can we help?" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more about your inquiry..."
                    rows={5}
                  />
                </div>
                <Button type="submit" className="w-full bg-citysafe-blue hover:bg-citysafe-blue-dark">
                  Send Message
                </Button>
              </form>
            </div>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
