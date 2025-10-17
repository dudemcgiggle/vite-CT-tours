import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import { type Tour, type InsertBooking } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function BookingSection() {
  const { toast } = useToast();
  const [selectedTour, setSelectedTour] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [timePreference, setTimePreference] = useState("");

  const { data: tours } = useQuery<Tour[]>({
    queryKey: ["/api/tours"],
  });

  const bookingMutation = useMutation({
    mutationFn: async (bookingData: InsertBooking) => {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create booking");
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Booking Request Submitted!",
        description: "We'll contact you within 24 hours to confirm your tour details.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      // Reset form
      setSelectedTour("");
      setSelectedDate("");
      setGuestCount("");
      setTimePreference("");
    },
    onError: (error: Error) => {
      toast({
        title: "Booking Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleQuickBooking = async () => {
    if (!selectedTour || !selectedDate || !guestCount || !timePreference) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to check availability.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch(`/api/availability/${selectedTour}/${selectedDate}`);
      const availability = await response.json();
      
      if (availability.available) {
        toast({
          title: "Available!",
          description: "This tour is available for your selected date. Please fill out the contact form to complete your booking.",
        });
        
        // Scroll to contact section for full booking
        const contactElement = document.getElementById("contact");
        if (contactElement) {
          contactElement.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        toast({
          title: "Not Available",
          description: "This tour is not available for your selected date. Please try another date.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to check availability. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section 
      id="booking"
      className="py-20 relative parallax-bg" 
      style={{
        backgroundImage: `linear-gradient(rgba(11, 20, 38, 0.9), rgba(30, 42, 71, 0.9)), url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')`
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-6xl font-inter font-bold mb-8">
          Ready for
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rocket-orange to-solar-gold">
            {" "}Liftoff?
          </span>
        </h2>
        
        <p className="text-xl text-asteroid-gray mb-12 max-w-2xl mx-auto leading-relaxed">
          Don't miss your chance to explore where history meets the future. Book your adventure today and create memories that will last a lifetime.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <button 
            onClick={() => {
              const contactElement = document.getElementById("contact");
              if (contactElement) {
                contactElement.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="bg-gradient-to-r from-rocket-orange to-solar-gold hover:from-solar-gold hover:to-rocket-orange text-white px-10 py-4 rounded-full text-xl font-bold transition-all duration-300 transform hover:scale-105 animate-pulse-glow"
          >
            <i className="fas fa-rocket mr-3"></i>
            Book Your Tour Now
          </button>
          <button className="border-2 border-stellar-cyan text-stellar-cyan hover:bg-stellar-cyan hover:text-space-blue px-10 py-4 rounded-full text-xl font-semibold transition-all duration-300">
            <i className="fas fa-phone mr-3"></i>
            Call Us: (321) 555-0123
          </button>
        </div>
        
        {/* Quick booking form */}
        <div className="bg-gradient-to-r from-cosmic-navy/50 to-space-blue/50 backdrop-blur-sm rounded-3xl p-8 border border-white/10 max-w-2xl mx-auto">
          <h3 className="text-2xl font-inter font-bold mb-6 text-starlight-white">Quick Availability Check</h3>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-asteroid-gray mb-2">Select Tour</label>
              <Select value={selectedTour} onValueChange={setSelectedTour}>
                <SelectTrigger className="w-full bg-space-blue border-asteroid-gray/30 text-starlight-white">
                  <SelectValue placeholder="Choose a tour..." />
                </SelectTrigger>
                <SelectContent className="bg-space-blue border-asteroid-gray/30">
                  {tours?.map((tour) => (
                    <SelectItem key={tour.id} value={tour.id} className="text-starlight-white">
                      {tour.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-asteroid-gray mb-2">Select Date</label>
              <Input 
                type="date" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-space-blue border-asteroid-gray/30 text-starlight-white"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-asteroid-gray mb-2">Guests</label>
              <Select value={guestCount} onValueChange={setGuestCount}>
                <SelectTrigger className="w-full bg-space-blue border-asteroid-gray/30 text-starlight-white">
                  <SelectValue placeholder="Number of guests" />
                </SelectTrigger>
                <SelectContent className="bg-space-blue border-asteroid-gray/30">
                  <SelectItem value="1" className="text-starlight-white">1 Guest</SelectItem>
                  <SelectItem value="2" className="text-starlight-white">2 Guests</SelectItem>
                  <SelectItem value="3" className="text-starlight-white">3 Guests</SelectItem>
                  <SelectItem value="4" className="text-starlight-white">4 Guests</SelectItem>
                  <SelectItem value="5" className="text-starlight-white">5 Guests</SelectItem>
                  <SelectItem value="6" className="text-starlight-white">6+ Guests</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-asteroid-gray mb-2">Time Preference</label>
              <Select value={timePreference} onValueChange={setTimePreference}>
                <SelectTrigger className="w-full bg-space-blue border-asteroid-gray/30 text-starlight-white">
                  <SelectValue placeholder="Preferred time" />
                </SelectTrigger>
                <SelectContent className="bg-space-blue border-asteroid-gray/30">
                  <SelectItem value="morning" className="text-starlight-white">Morning (9AM-12PM)</SelectItem>
                  <SelectItem value="afternoon" className="text-starlight-white">Afternoon (1PM-5PM)</SelectItem>
                  <SelectItem value="evening" className="text-starlight-white">Evening (6PM-9PM)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button
            onClick={handleQuickBooking}
            disabled={bookingMutation.isPending}
            className="w-full bg-gradient-to-r from-rocket-orange to-solar-gold hover:from-solar-gold hover:to-rocket-orange text-white py-4 rounded-xl text-lg font-bold transition-all duration-300 transform hover:scale-105"
          >
            <i className="fas fa-calendar-check mr-2"></i>
            {bookingMutation.isPending ? "Checking..." : "Check Availability"}
          </Button>
        </div>
        
      </div>
      
      {/* Floating rocket */}
      <div className="absolute top-1/4 right-10 text-rocket-orange animate-float opacity-30 hidden lg:block">
        <i className="fas fa-rocket text-6xl transform rotate-45"></i>
      </div>
    </section>
  );
}
