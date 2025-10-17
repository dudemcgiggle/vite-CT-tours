import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import { type InsertContactMessage } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    tourInterest: "",
    message: ""
  });

  const contactMutation = useMutation({
    mutationFn: async (contactData: InsertContactMessage) => {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to send message");
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your inquiry. We'll get back to you within 24 hours.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/contact"] });
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        tourInterest: "",
        message: ""
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to Send Message",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    contactMutation.mutate(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-space-blue to-cosmic-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-inter font-bold mb-6">
            Mission
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-stellar-cyan to-nebula-purple">
              {" "}Control
            </span>
          </h2>
          <p className="text-xl text-asteroid-gray max-w-2xl mx-auto">
            Have questions about your space exploration adventure? Our crew is standing by to help you plan the perfect tour.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Contact Info */}
          <div>
            <div className="space-y-8">
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-rocket-orange rounded-2xl flex items-center justify-center mr-4 flex-shrink-0">
                  <i className="fas fa-map-marker-alt text-white"></i>
                </div>
                <div>
                  <h4 className="text-lg font-inter font-semibold text-starlight-white mb-2">Launch Location</h4>
                  <p className="text-asteroid-gray">
                    123 Space Coast Blvd<br />
                    Cape Canaveral, FL 32920
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-stellar-cyan rounded-2xl flex items-center justify-center mr-4 flex-shrink-0">
                  <i className="fas fa-phone text-white"></i>
                </div>
                <div>
                  <h4 className="text-lg font-inter font-semibold text-starlight-white mb-2">Communication Channel</h4>
                  <p className="text-asteroid-gray">
                    Phone: (321) 555-0123<br />
                    WhatsApp: (321) 555-0124
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-solar-gold rounded-2xl flex items-center justify-center mr-4 flex-shrink-0">
                  <i className="fas fa-envelope text-white"></i>
                </div>
                <div>
                  <h4 className="text-lg font-inter font-semibold text-starlight-white mb-2">Data Transmission</h4>
                  <p className="text-asteroid-gray">
                    info@canveraltours.com<br />
                    bookings@canveraltours.com
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-nebula-purple rounded-2xl flex items-center justify-center mr-4 flex-shrink-0">
                  <i className="fas fa-clock text-white"></i>
                </div>
                <div>
                  <h4 className="text-lg font-inter font-semibold text-starlight-white mb-2">Mission Hours</h4>
                  <p className="text-asteroid-gray">
                    Monday - Sunday: 8:00 AM - 8:00 PM<br />
                    Emergency: 24/7 Support Available
                  </p>
                </div>
              </div>
              
            </div>
            
            {/* Social Links */}
            <div className="mt-12">
              <h4 className="text-lg font-inter font-semibold text-starlight-white mb-4">Follow Our Journey</h4>
              <div className="flex space-x-4">
                <a href="#" className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-gradient-to-br from-cosmic-navy to-space-blue rounded-3xl p-8 shadow-2xl border border-white/10">
            <h3 className="text-2xl font-inter font-bold text-starlight-white mb-6">Send a Transmission</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-asteroid-gray mb-2">First Name *</label>
                  <Input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className="w-full bg-space-blue border-asteroid-gray/30 text-starlight-white placeholder-asteroid-gray"
                    placeholder="Commander"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-asteroid-gray mb-2">Last Name *</label>
                  <Input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className="w-full bg-space-blue border-asteroid-gray/30 text-starlight-white placeholder-asteroid-gray"
                    placeholder="Explorer"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-asteroid-gray mb-2">Email Address *</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full bg-space-blue border-asteroid-gray/30 text-starlight-white placeholder-asteroid-gray"
                  placeholder="explorer@space.com"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-asteroid-gray mb-2">Phone Number</label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full bg-space-blue border-asteroid-gray/30 text-starlight-white placeholder-asteroid-gray"
                  placeholder="(321) 555-0123"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-asteroid-gray mb-2">Tour Interest</label>
                <Select value={formData.tourInterest} onValueChange={(value) => handleInputChange("tourInterest", value)}>
                  <SelectTrigger className="w-full bg-space-blue border-asteroid-gray/30 text-starlight-white">
                    <SelectValue placeholder="Select a tour..." />
                  </SelectTrigger>
                  <SelectContent className="bg-space-blue border-asteroid-gray/30">
                    <SelectItem value="lighthouse-spaceflight" className="text-starlight-white">Lighthouse & Spaceflight Tour</SelectItem>
                    <SelectItem value="wildlife-safari" className="text-starlight-white">Wildlife Safari</SelectItem>
                    <SelectItem value="space-force-station" className="text-starlight-white">Space Force Station</SelectItem>
                    <SelectItem value="private-group" className="text-starlight-white">Private Group Tour</SelectItem>
                    <SelectItem value="custom" className="text-starlight-white">Custom Experience</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-asteroid-gray mb-2">Mission Brief *</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  className="w-full bg-space-blue border-asteroid-gray/30 text-starlight-white placeholder-asteroid-gray resize-none"
                  placeholder="Tell us about your ideal space exploration experience..."
                  rows={4}
                  required
                />
              </div>
              
              <Button
                type="submit"
                disabled={contactMutation.isPending}
                className="w-full bg-gradient-to-r from-rocket-orange to-solar-gold hover:from-solar-gold hover:to-rocket-orange text-white py-4 rounded-xl text-lg font-bold transition-all duration-300 transform hover:scale-105"
              >
                <i className="fas fa-paper-plane mr-2"></i>
                {contactMutation.isPending ? "Sending..." : "Launch Message"}
              </Button>
            </form>
          </div>
          
        </div>
      </div>
    </section>
  );
}
