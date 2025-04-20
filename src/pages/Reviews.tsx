
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { Star, User } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// List of districts based on your data
const districts = [
  "Hyderabad",
  "Cyberabad",
  "Warangal",
  "Rachakonda",
  "Khammam"
];

// Mock data for district reviews (In a real app, this would come from a database)
const initialReviews = [
  {
    id: 1,
    username: "Sarah Johnson",
    district: "Hyderabad",
    rating: 4,
    content: "The area around Charminar is vibrant during the day but be cautious at night. Good police presence in tourist areas.",
    date: "2025-04-15"
  },
  {
    id: 2,
    username: "Michael Chen",
    district: "Cyberabad",
    rating: 5,
    content: "Hi-tech city area is well-lit and safe. Many corporate offices have 24/7 security which adds to the safety.",
    date: "2025-04-18"
  },
  {
    id: 3,
    username: "Priya Sharma",
    district: "Rachakonda",
    rating: 3,
    content: "Mixed experience. Some areas need better street lighting, but overall the police response is quick.",
    date: "2025-04-19"
  }
];

const Reviews = () => {
  const [reviews, setReviews] = useState(initialReviews);
  const [newReview, setNewReview] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [rating, setRating] = useState(5);
  const { toast } = useToast();

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.trim() || !selectedDistrict) {
      toast({
        title: "Error",
        description: selectedDistrict ? "Please write a review before submitting." : "Please select a district before submitting.",
        variant: "destructive"
      });
      return;
    }

    const review = {
      id: reviews.length + 1,
      username: "Anonymous User", // In a real app, this would be the logged-in user's name
      district: selectedDistrict,
      rating,
      content: newReview,
      date: new Date().toISOString().split('T')[0]
    };

    setReviews([review, ...reviews]);
    setNewReview("");
    setRating(5);
    setSelectedDistrict("");
    
    toast({
      title: "Success",
      description: "Your review has been posted!",
    });
  };

  const RatingStars = ({ rating }: { rating: number }) => (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${
            index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">District Safety Reviews</h1>
          <p className="text-gray-600 mb-8">
            Share your experiences and read others' reviews about safety in different districts.
          </p>
          
          {/* Review Form */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Select District
                  </label>
                  <Select
                    value={selectedDistrict}
                    onValueChange={setSelectedDistrict}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose a district" />
                    </SelectTrigger>
                    <SelectContent>
                      {districts.map((district) => (
                        <SelectItem key={district} value={district}>
                          {district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Safety Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`h-6 w-6 ${
                            star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Your Experience
                  </label>
                  <Textarea
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    placeholder="Share your experience about safety in this district..."
                    className="min-h-[100px]"
                  />
                </div>
                
                <Button type="submit">
                  Submit Review
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {/* Reviews List */}
          <div className="space-y-4">
            {reviews.map((review) => (
              <Card key={review.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-gray-100 p-2 rounded-full">
                        <User className="h-5 w-5 text-gray-500" />
                      </div>
                      <div>
                        <h3 className="font-medium">{review.username}</h3>
                        <p className="text-sm text-citysafe-blue font-medium">{review.district}</p>
                        <RatingStars rating={review.rating} />
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <p className="text-gray-600">{review.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Reviews;
