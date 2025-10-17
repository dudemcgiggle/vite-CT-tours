import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Radio, Zap, Building, Scan } from "lucide-react";
import Footer from "@/components/footer";

export default function LighthouseTours() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mapScrollProgress, setMapScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const mapSectionRef = useRef<HTMLElement>(null);

  const galleryImages = [
    "/images/lighthouse.jpg",
    "/images/lighthouse-interior.jpg",
    "/images/lighthouse-grounds.jpg",
    "/images/lighthouse-sunset.jpg"
  ];

  const tourHighlights = [
    {
      title: "Historic Cape Canaveral Lighthouse",
      description: "Walk the same iron steps mariners once trusted, then cast your eyes across dunes, shorebreak, and a lattice of modern launch infrastructure. The climb doubles as a living timeline—why the tower was rebuilt, how keepers battled weather and isolation, and how the light still serves ships beneath rocket trails.",
      icon: Radio
    },
    {
      title: "Space Force Station Access",
      description: "This isn't a museum made to look like a launch site—it is the launch site. On this escorted tour you'll visit authentic complexes where the first U.S. satellite and first American astronauts launched, then trace the story forward as your guide highlights modern pads used by today's commercial and government missions. Expect close-up history, active-base energy, and a rare look at how SLD-45 keeps nature, safety, and spaceflight in balance.",
      icon: Zap
    },
    {
      title: "Lighthouse Keeper's House",
      description: "Inside the rebuilt 19th-century keeper's quarters, trace a day in the life of the light: trimming wicks, hauling oil, winding clockworks, and braving storms. Exhibits and docents connect those routines to today's automated beacon—and to the moment rockets began launching just beyond the dunes.",
      icon: Building
    },
    {
      title: "Launch Viewing Area",
      description: "When schedules align, this location offers the closest, cleanest view you can get on a guided tour: clear pad geometry, crisp countdown narration, and a safe, unobstructed angle on the moment a mission leaves Earth. It's as close to \"front-row at a spaceport\" as most visitors will ever experience.",
      icon: Scan
    }
  ];

  // Scroll effect for background blur
  useEffect(() => {
    const handleScroll = () => {
      // Tour highlights section scroll effect
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        const sectionBottom = sectionTop + sectionHeight;
        
        let progress = 0;
        
        if (sectionTop <= windowHeight && sectionBottom >= 0) {
          const visibleHeight = Math.min(windowHeight, sectionBottom) - Math.max(0, sectionTop);
          progress = visibleHeight / Math.min(sectionHeight, windowHeight);
        }
        
        setScrollProgress(progress);
      }

      // Map section parallax scroll effect
      if (mapSectionRef.current) {
        const rect = mapSectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        const sectionBottom = sectionTop + sectionHeight;
        
        let mapProgress = 0;
        
        if (sectionTop <= windowHeight && sectionBottom >= 0) {
          // Calculate how much of the section is visible
          const visibleHeight = Math.min(windowHeight, sectionBottom) - Math.max(0, sectionTop);
          const visibility = visibleHeight / Math.min(sectionHeight, windowHeight);
          
          // Create brightness curve: bright -> original darkness in center -> bright
          // 0 = bright, 0.5 = original darkness, 1 = bright again
          if (visibility < 0.5) {
            // Approaching center: bright to dark
            mapProgress = visibility * 2; // 0 to 1
          } else {
            // Leaving center: dark to bright
            mapProgress = 2 - (visibility * 2); // 1 to 0
          }
        }
        
        setMapScrollProgress(mapProgress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tourIncludes = [
    "Professional guide with lighthouse and space program expertise",
    "Admission to Cape Canaveral Lighthouse",
    "Access to Space Force Station areas (security permitting)",
    "Historical exhibits and displays",
    "Photo opportunities at iconic locations",
    "Transportation from meeting point",
    "Small group experience (max 12 guests)"
  ];

  const itinerary = [
    {
      time: "9:00 AM",
      title: "Check-In & Briefing",
      description: "Arrive and complete security check-in. Receive a welcome and safety overview before entering the base. (Tours may adjust based on launch activities or security processing.)"
    },
    {
      time: "9:20 AM",
      title: "Enter Base & Transit",
      description: "Board the tour vehicle for an escorted drive onto Cape Canaveral Space Force Station and head toward the lighthouse area. (Access and timing may vary with Space Force operations.)"
    },
    {
      time: "9:35 AM",
      title: "Lighthouse, Keeper's House & Hangar C",
      description: "Enjoy approximately 1 hour 45 minutes on site. Includes an interior climb to the 5th level for smaller tours (3rd level for larger groups), exploration of the restored Keeper's House museum, and exhibits in Hangar C."
    },
    {
      time: "11:20 AM",
      title: "Transit to LC-26",
      description: "Travel to the next stop."
    },
    {
      time: "11:30 AM",
      title: "LC-26 Museum & Rocket Garden",
      description: "Spend about 45 minutes exploring the early days of America's space program and viewing restored rockets in the outdoor display area."
    },
    {
      time: "12:15 PM",
      title: "Heritage Pads Drive-By (As Permitted)",
      description: "See additional historic launch complexes from designated viewing areas. Stops depend on current base operations."
    },
    {
      time: "12:35 PM",
      title: "Return & Wrap-Up",
      description: "Return to the starting point with time to visit restrooms and the gift shop."
    },
    {
      time: "1:00 PM",
      title: "Tour Concludes",
      description: "Approximate total duration: 4 hours. (Start and end times may vary by departure.)"
    }
  ];

  return (
    <div className="min-h-screen section--dark">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-space-blue/90 backdrop-blur-md border-b border-stellar-cyan/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <Link href="/" className="text-lg sm:text-xl text-starlight-white hover:text-stellar-cyan transition-colors tracking-wide" style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 300 }}>
              Canaveral Tours
            </Link>
            <Link 
              href="/" 
              className="text-stellar-cyan hover:text-stellar-cyan hover:brightness-110 hover:scale-105 transition-all duration-300 text-xs sm:text-sm font-semibold"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-glow">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/images/lighthouse.jpg')`,
            backgroundPosition: 'center 20%'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-space-blue/90"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-inter font-bold text-starlight-white mb-4 sm:mb-6 drop-shadow-lg leading-tight">
            Lighthouse & 
            <span style={{ background: 'linear-gradient(90deg, var(--primary), var(--tertiary))', WebkitBackgroundClip: 'text', color: 'transparent' }}>
              {" "}Spaceflight{" "}
            </span>
            Tours
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-starlight-white mb-6 sm:mb-8 leading-relaxed drop-shadow-md max-w-4xl mx-auto">
            Follow the arc of discovery—from guiding ships along 
            <span className="hidden sm:inline"><br /></span>
            <span className="sm:hidden"> </span>
            Florida's Atlantic shoals to launching rockets that cross the void of space.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-lg mx-auto">
            <button className="btn-primary px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base hover:scale-105">
              Book Your Adventure - $62.50
            </button>
            <button className="bg-white/20 border-2 border-white text-white hover:bg-white hover:text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base hover:scale-105">
              View All Tours
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-starlight-white animate-bounce">
          <i className="fas fa-chevron-down text-xl sm:text-2xl"></i>
        </div>
      </section>
      {/* Tour Options */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 section--alt">
        <div className="max-w-[1800px] mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-inter font-bold text-starlight-white mb-4 sm:mb-6 leading-tight">
              Choose Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-stellar-cyan to-nebula-purple">
                {" "}Adventure
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-asteroid-gray max-w-4xl mx-auto px-4">Four signature experiences across the lighthouse, museums, and historic launch sites.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 xl:gap-12">
            {/* Premier Tour */}
            <div className="card rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] flex flex-col h-full">
              {/* Image Section */}
              <div className="relative h-64 sm:h-72 xl:h-80">
                <img 
                  src="/images/lighthouse-tour.jpg" 
                  alt="Cape Canaveral Lighthouse" 
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-solar-gold text-black px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                  Most Popular
                </div>
              </div>
              
              {/* Content Section */}
              <div className="p-4 sm:p-6 lg:p-8 xl:p-10 flex flex-col flex-grow">
                <div className="text-center mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-inter font-bold text-starlight-white mb-2 leading-tight">
                    Premier Lighthouse & Spaceflight Tour
                  </h3>
                  <p className="text-asteroid-gray text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
                    A fully guided, four-hour space and lighthouse heritage experience
                  </p>
                  <div className="flex items-center justify-center mb-0 leading-none">
                    <span className="text-lg sm:text-xl lg:text-2xl text-solar-gold font-bold align-super mr-1">$</span>
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-solar-gold">62.50</span>
                  </div>
                  <div className="text-starlight-white text-base sm:text-lg font-barlow-condensed font-light -mt-2 tracking-widest text-center">per person</div>
                </div>
                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 flex-grow">
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <i className="fas fa-check-circle text-rocket-orange text-xs sm:text-sm mt-1 flex-shrink-0"></i>
                    <span className="text-asteroid-gray text-xs sm:text-sm leading-relaxed">Cape Canaveral Lighthouse (interior climb to 5th floor + exterior 3rd-floor deck, ~1½ h)</span>
                  </div>
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <i className="fas fa-check-circle text-rocket-orange text-xs sm:text-sm mt-1 flex-shrink-0"></i>
                    <span className="text-asteroid-gray text-xs sm:text-sm leading-relaxed">Cape Canaveral Lighthouse Museum & grounds</span>
                  </div>
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <i className="fas fa-check-circle text-rocket-orange text-xs sm:text-sm mt-1 flex-shrink-0"></i>
                    <span className="text-asteroid-gray text-xs sm:text-sm leading-relaxed">Hangar C (indoor rocket garden with restored vehicles)</span>
                  </div>
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <i className="fas fa-check-circle text-rocket-orange text-xs sm:text-sm mt-1 flex-shrink-0"></i>
                    <span className="text-asteroid-gray text-xs sm:text-sm leading-relaxed">Cape Canaveral Space Force Museum galleries & outdoor artifacts</span>
                  </div>
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <i className="fas fa-check-circle text-rocket-orange text-xs sm:text-sm mt-1 flex-shrink-0"></i>
                    <span className="text-asteroid-gray text-xs sm:text-sm leading-relaxed">Historic Navaho launch sites (LC-9/10) & Minuteman launch complexes (LC-31/32)</span>
                  </div>
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <i className="fas fa-check-circle text-rocket-orange text-xs sm:text-sm mt-1 flex-shrink-0"></i>
                    <span className="text-asteroid-gray text-xs sm:text-sm leading-relaxed">Cape Canaveral Space Force Museum blockhouse & firing room</span>
                  </div>
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <i className="fas fa-check-circle text-rocket-orange text-xs sm:text-sm mt-1 flex-shrink-0"></i>
                    <span className="text-asteroid-gray text-xs sm:text-sm leading-relaxed">Views of Merritt Island National Wildlife Refuge, Banana River Aquatic Preserve, and roadside view of Old Pioneer Cemetery</span>
                  </div>
                </div>
                <div className="text-center mt-auto">
                  <div className="text-asteroid-gray text-xs sm:text-sm mb-3 sm:mb-4">Duration: Approximately 4 hours</div>
                  <button className="w-full px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base hover:scale-105" style={{ background: 'var(--accent)', color: '#0B1220' }}>
                    Book Now - $62.50
                  </button>
                </div>
              </div>
            </div>

            {/* Museum Excursion */}
            <div className="card rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] flex flex-col h-full">
              {/* Image Section */}
              <div className="relative h-64 sm:h-72 xl:h-80">
                <img 
                  src="/images/space-force-museum.jpg" 
                  alt="Space Force Museum" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
              </div>
              
              {/* Content Section */}
              <div className="p-4 sm:p-6 lg:p-8 xl:p-10 flex flex-col flex-grow">
                <div className="text-center mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-inter font-bold text-starlight-white mb-2 leading-tight">
                    Lighthouse & Cape Canaveral Space Force Museum Excursion
                  </h3>
                  <p className="text-asteroid-gray text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
                    A guided three-hour heritage adventure
                  </p>
                  <div className="flex items-center justify-center mb-0 leading-none">
                    <span className="text-lg sm:text-xl lg:text-2xl text-solar-gold font-bold align-super mr-1">$</span>
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-solar-gold">45</span>
                  </div>
                  <div className="text-starlight-white text-base sm:text-lg font-barlow-condensed font-light -mt-2 tracking-widest text-center">per person</div>
                </div>
                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 flex-grow">
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <i className="fas fa-check-circle text-stellar-cyan text-xs sm:text-sm mt-1 flex-shrink-0"></i>
                    <span className="text-asteroid-gray text-xs sm:text-sm leading-relaxed">Cape Canaveral Lighthouse historic grounds & Lighthouse Museum in restored Keeper's Cottage</span>
                  </div>
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <i className="fas fa-check-circle text-stellar-cyan text-xs sm:text-sm mt-1 flex-shrink-0"></i>
                    <span className="text-asteroid-gray text-xs sm:text-sm leading-relaxed">Hangar C (Cape's oldest surviving hangar) with curated display of restored missiles & early spaceflight hardware</span>
                  </div>
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <i className="fas fa-check-circle text-stellar-cyan text-xs sm:text-sm mt-1 flex-shrink-0"></i>
                    <span className="text-asteroid-gray text-xs sm:text-sm leading-relaxed">Cape Canaveral Space Force Museum at Launch Complex 26, original blockhouse & Explorer 1 launch site</span>
                  </div>
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <i className="fas fa-check-circle text-stellar-cyan text-xs sm:text-sm mt-1 flex-shrink-0"></i>
                    <span className="text-asteroid-gray text-xs sm:text-sm leading-relaxed">Coastal views, wildlife spotting near Merritt Island National Wildlife Refuge & Old Pioneer Cemetery roadside viewing</span>
                  </div>
                </div>
                <div className="text-center mt-auto">
                  <div className="text-asteroid-gray text-xs sm:text-sm mb-3 sm:mb-4">Duration: Approximately 3 hours</div>
                  <button className="w-full px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base hover:scale-105" style={{ background: 'var(--primary)', color: '#061014' }}>
                    Book Now - $45
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Discovery */}
            <div className="card rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] flex flex-col h-full">
              {/* Image Section */}
              <div className="relative h-64 sm:h-72 xl:h-80">
                <img 
                  src="/images/hangar-c.jpg" 
                  alt="Hangar C" 
                  className="w-full h-full object-cover object-bottom"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
              </div>
              
              {/* Content Section */}
              <div className="p-4 sm:p-6 lg:p-8 xl:p-10 flex flex-col flex-grow">
                <div className="text-center mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-inter font-bold text-starlight-white mb-2 leading-tight">
                    Lighthouse & Hangar C Excursion
                  </h3>
                  <p className="text-asteroid-gray text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
                    Quick heritage discovery
                  </p>
                  <div className="flex items-center justify-center mb-0 leading-none">
                    <span className="text-lg sm:text-xl lg:text-2xl text-solar-gold font-bold align-super mr-1">$</span>
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-solar-gold">35</span>
                  </div>
                  <div className="text-starlight-white text-base sm:text-lg font-barlow-condensed font-light -mt-2 tracking-widest text-center">per person</div>
                </div>
                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 flex-grow">
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <i className="fas fa-check-circle text-nebula-purple text-xs sm:text-sm mt-1 flex-shrink-0"></i>
                    <span className="text-asteroid-gray text-xs sm:text-sm leading-relaxed">Guided visit to Cape Canaveral Lighthouse (first five interior floors & third-floor exterior platform)</span>
                  </div>
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <i className="fas fa-check-circle text-nebula-purple text-xs sm:text-sm mt-1 flex-shrink-0"></i>
                    <span className="text-asteroid-gray text-xs sm:text-sm leading-relaxed">Self-guided exploration of Lighthouse Museum in restored Keeper's Cottage</span>
                  </div>
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <i className="fas fa-check-circle text-nebula-purple text-xs sm:text-sm mt-1 flex-shrink-0"></i>
                    <span className="text-asteroid-gray text-xs sm:text-sm leading-relaxed">Historic grounds walking tour</span>
                  </div>
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <i className="fas fa-check-circle text-nebula-purple text-xs sm:text-sm mt-1 flex-shrink-0"></i>
                    <span className="text-asteroid-gray text-xs sm:text-sm leading-relaxed">Hangar C tour featuring indoor collection of restored missiles & early spaceflight artifacts</span>
                  </div>
                </div>
                <div className="text-center mt-auto">
                  <div className="text-asteroid-gray text-xs sm:text-sm mb-3 sm:mb-4">Duration: Approximately 2 hours</div>
                  <button className="w-full px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base hover:scale-105" style={{ background: 'var(--tertiary)', color: '#0B1220' }}>
                    Book Now - $35
                  </button>
                </div>
              </div>
            </div>

            {/* Private Tours */}
            <div className="card rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] flex flex-col h-full">
              {/* Image Section */}
              <div className="relative h-64 sm:h-72 xl:h-80">
                <img 
                  src="/images/custom-tour.jpg" 
                  alt="Private Tours" 
                  className="w-full h-full object-cover object-[center_30%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-stellar-cyan text-space-blue px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                  Custom Experience
                </div>
              </div>
              
              {/* Content Section */}
              <div className="p-4 sm:p-6 lg:p-8 xl:p-10 flex flex-col flex-grow">
                <div className="text-center mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-inter font-bold text-starlight-white mb-2 leading-tight">
                    Private & Customized Tours
                  </h3>
                  <p className="text-asteroid-gray text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
                    Groups of 6–10 guests
                  </p>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-solar-gold mb-0 leading-none text-center">Contact Us</div>
                  <div className="text-starlight-white text-base sm:text-lg font-barlow-condensed font-light -mt-2 tracking-widest text-center">for quote</div>
                </div>
                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 flex-grow">
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <i className="fas fa-check-circle text-nebula-purple text-xs sm:text-sm mt-1 flex-shrink-0"></i>
                    <span className="text-asteroid-gray text-xs sm:text-sm leading-relaxed">Premier Lighthouse & Spaceflight Tour itinerary</span>
                  </div>
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <i className="fas fa-check-circle text-nebula-purple text-xs sm:text-sm mt-1 flex-shrink-0"></i>
                    <span className="text-asteroid-gray text-xs sm:text-sm leading-relaxed">Customized itineraries including off-hours scheduling when booking permits</span>
                  </div>
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <i className="fas fa-check-circle text-nebula-purple text-xs sm:text-sm mt-1 flex-shrink-0"></i>
                    <span className="text-asteroid-gray text-xs sm:text-sm leading-relaxed">Available Tuesday through Saturday (not Sundays & Mondays)</span>
                  </div>
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <i className="fas fa-check-circle text-nebula-purple text-xs sm:text-sm mt-1 flex-shrink-0"></i>
                    <span className="text-asteroid-gray text-xs sm:text-sm leading-relaxed">Personalized experience for 6–10 guests</span>
                  </div>
                </div>
                <div className="text-center mt-auto">
                  <div className="text-asteroid-gray text-xs sm:text-sm mb-1 sm:mb-2">Capacity: 6–10 guests</div>
                  <div className="text-asteroid-gray text-xs sm:text-sm mb-1 sm:mb-2">Available: Tuesday–Saturday</div>
                  <div className="text-asteroid-gray text-xs sm:text-sm mb-3 sm:mb-4">Pricing: Contact for personalized quote</div>
                  <button className="w-full px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base hover:scale-105" style={{ background: 'var(--tertiary)', color: '#0B1220' }}>
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Tour Highlights */}
      <section ref={sectionRef} className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Enhanced Background Image with Scroll Effects */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 ease-out"
          style={{ 
            backgroundImage: 'url(/lighthouse-background.jpg)',
            filter: `blur(${Math.max(0, 8 - scrollProgress * 8)}px) brightness(${0.7 + scrollProgress * 0.4})`,
            transform: `scale(${1 + scrollProgress * 0.1})`,
          }}
        >
          <div 
            className="absolute inset-0 transition-all duration-700 ease-out"
            style={{ 
              background: `linear-gradient(135deg, 
                rgba(0,0,0,${0.8 - scrollProgress * 0.3}) 0%, 
                rgba(11,18,32,${0.7 - scrollProgress * 0.2}) 50%, 
                rgba(0,0,0,${0.8 - scrollProgress * 0.3}) 100%)`
            }}
          ></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-inter font-bold text-starlight-white mb-4 sm:mb-6 leading-tight">
              Tour
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-stellar-cyan to-solar-gold">
                {" "}Highlights
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-asteroid-gray max-w-3xl mx-auto px-4">A living timeline of the Cape: stories, sites, and real launch complexes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {tourHighlights.map((highlight, index) => (
              <div key={index} style={{ background: 'rgba(16, 27, 44, 0.6)', border: '1px solid rgba(42, 57, 84, 0.4)' }} className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3)] hover:scale-105 hover:bg-opacity-100 hover:border-opacity-100 transition-all duration-500" onMouseEnter={(e) => { e.currentTarget.style.background = '#101B2C'; e.currentTarget.style.border = '1px solid var(--divider)'; e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0,0,0,0.5)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(16, 27, 44, 0.6)'; e.currentTarget.style.border = '1px solid rgba(42, 57, 84, 0.4)'; e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0,0,0,0.3)'; }}>
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div style={{ background: 'var(--tint-teal)', boxShadow: '0 0 20px rgba(34, 181, 176, 0.3)' }} className="p-3 sm:p-4 rounded-xl sm:rounded-2xl flex-shrink-0">
                    <highlight.icon className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: 'var(--primary)', filter: 'drop-shadow(0 0 8px rgba(34, 181, 176, 0.6))' }} />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-inter font-bold text-starlight-white mb-2 sm:mb-3 leading-tight">
                      {highlight.title}
                    </h3>
                    <p className="text-sm sm:text-base text-asteroid-gray leading-relaxed">
                      {highlight.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Detailed Itinerary */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 section--alt">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-inter font-bold text-starlight-white mb-4 sm:mb-6 leading-tight">
              Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-solar-gold to-rocket-orange">
                {" "}Adventure{" "}
              </span>
              Timeline
            </h2>
            <p className="text-lg sm:text-xl text-asteroid-gray px-4">
              A carefully crafted 4.5-hour journey through history and innovation
            </p>
          </div>

          <div className="space-y-6 sm:space-y-8">
            {itinerary.map((item, index) => (
              <div key={index} className="flex items-start space-x-4 sm:space-x-6 group">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div style={{ background: 'var(--primary)' }} className="p-2 sm:p-3 rounded-full shadow-lg">
                    <div style={{ color: '#061014' }} className="font-bold text-xs sm:text-sm whitespace-nowrap">{item.time}</div>
                  </div>
                  {index < itinerary.length - 1 && (
                    <div className="w-0.5 h-12 sm:h-16 mt-3 sm:mt-4" style={{ background: '#2A3954' }}></div>
                  )}
                </div>
                <div className="card rounded-xl sm:rounded-2xl p-4 sm:p-6 flex-1 group-hover:border-stellar-cyan/40 transition-all duration-300">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-inter font-bold text-starlight-white mb-2 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-asteroid-gray leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* What's Included */}
      <section ref={mapSectionRef} className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Enhanced Parallax Vintage Map Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url(/vintage-map.jpg)',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            opacity: 0.7
          }}
        ></div>
        <div 
          className="absolute inset-0 transition-all duration-500 ease-out"
          style={{ 
            background: `linear-gradient(135deg, 
              rgba(11,18,32,${0.85 + mapScrollProgress * 0.1}) 0%, 
              rgba(16,27,44,${0.80 + mapScrollProgress * 0.15}) 50%, 
              rgba(11,18,32,${0.85 + mapScrollProgress * 0.1}) 100%)`
          }}
        ></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-inter font-bold text-starlight-white mb-4 leading-tight">
                What's Included in Our Premier
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-stellar-cyan to-solar-gold">
                  {" "}Lighthouse & Spaceflight Tour
                </span>
              </h2>
              <p className="text-xl text-white font-medium mb-6 sm:mb-8" style={{ color: '#ffffff' }}>A fully guided space and lighthouse heritage experience</p>
              <div className="space-y-6">
                <p className="text-base text-gray-300 leading-relaxed" style={{ fontFamily: 'Barlow, sans-serif' }}>
                  Begin with a multimedia briefing on Cape Canaveral's jump from 19th-century lighthouse outpost to America's launchpad. Climb the 151-foot lighthouse: first five interior floors and—weather permitting—the third-floor exterior platform for Atlantic views.
                </p>
                
                <p className="text-base text-gray-300 leading-relaxed" style={{ fontFamily: 'Barlow, sans-serif' }}>
                  Tour the Space Force Museum at LC-26 and step into the LC-5 blockhouse where Mercury-Redstone launched America's first astronauts. Visit the Navaho sites (LC-9/10) and Minuteman complexes (LC-31/32).
                </p>
                
                <p className="text-base text-gray-300 leading-relaxed" style={{ fontFamily: 'Barlow, sans-serif' }}>
                  Back at the lighthouse, explore the Keeper's Cottage Lighthouse Museum, browse the gift shop, and stroll the historic lawn. Next door, Hangar C—the Cape's oldest surviving hangar—displays 30+ restored rockets and missiles, including Vanguard, Bomarc, and Pershing.
                </p>

              </div>
            </div>
            <div className="order-1 lg:order-2 backdrop-blur-md bg-space-blue/20 border border-stellar-cyan/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)]">
              <h3 className="text-xl sm:text-2xl font-inter font-bold text-starlight-white mb-4 sm:mb-6">
                Tour Details
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center py-2 sm:py-3 border-b border-stellar-cyan/20">
                  <span className="text-sm sm:text-base text-asteroid-gray">Duration</span>
                  <span className="text-sm sm:text-base text-starlight-white font-semibold">4.5 hours</span>
                </div>
                <div className="flex justify-between items-center py-2 sm:py-3 border-b border-stellar-cyan/20">
                  <span className="text-sm sm:text-base text-asteroid-gray">Group Size</span>
                  <span className="text-sm sm:text-base text-starlight-white font-semibold">Max 12 guests</span>
                </div>
                <div className="flex justify-between items-center py-2 sm:py-3 border-b border-stellar-cyan/20">
                  <span className="text-sm sm:text-base text-asteroid-gray">Age Requirement</span>
                  <span className="text-sm sm:text-base text-starlight-white font-semibold">8+ years</span>
                </div>
                <div className="flex justify-between items-center py-2 sm:py-3 border-b border-stellar-cyan/20">
                  <span className="text-sm sm:text-base text-asteroid-gray">Physical Level</span>
                  <span className="text-sm sm:text-base text-starlight-white font-semibold">Moderate</span>
                </div>
                <div className="py-2 sm:py-3 border-b border-stellar-cyan/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm sm:text-base text-asteroid-gray">Meeting Point</span>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm sm:text-base text-starlight-white font-semibold">Sands Space History Center parking area</div>
                    <div className="text-xs sm:text-sm text-asteroid-gray">100 Space Port Way, Cape Canaveral, FL</div>
                    <button 
                      className="text-xs text-stellar-cyan hover:text-stellar-cyan/80 underline mt-1"
                      onClick={() => window.open(`https://maps.google.com/maps/dir/?api=1&destination=${encodeURIComponent("Sands Space History Center, 100 Space Port Way, Cape Canaveral, FL")}`, '_blank')}
                    >
                      Get Directions →
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center py-2 sm:py-3 border-b border-stellar-cyan/20">
                  <span className="text-sm sm:text-base text-asteroid-gray">Includes</span>
                  <span className="text-sm sm:text-base text-starlight-white font-semibold">Transportation</span>
                </div>
                <div className="flex justify-between items-center py-2 sm:py-3 border-b border-stellar-cyan/20">
                  <span className="text-sm sm:text-base text-asteroid-gray">What to Bring</span>
                  <span className="text-sm sm:text-base text-starlight-white font-semibold">Comfortable shoes</span>
                </div>
                <div className="flex justify-between items-center py-2 sm:py-3 border-b border-stellar-cyan/20">
                  <span className="text-sm sm:text-base text-asteroid-gray">Weather Policy</span>
                  <span className="text-sm sm:text-base text-starlight-white font-semibold">Rain or shine</span>
                </div>
                <div className="flex justify-between items-center py-2 sm:py-3">
                  <span className="text-sm sm:text-base text-asteroid-gray">Price</span>
                  <span className="text-xl sm:text-2xl font-bold" style={{ background: 'var(--accent)', color: '#0B1220', padding: '4px 12px', borderRadius: '8px' }}>$62.50</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* About the Experience */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 section--dark">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-inter font-bold text-starlight-white mb-4 sm:mb-6 leading-tight">
                Discover Cape Canaveral's
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-stellar-cyan to-nebula-purple">
                  {" "}Dual
                </span>
                {" "}Legacy
              </h2>
              <p className="text-sm sm:text-base text-gray-200 mb-4 sm:mb-6 leading-loose tracking-wide font-barlow-condensed">
                Begin with a multimedia briefing that traces Cape Canaveral's evolution from a 19th-century lighthouse outpost to the birthplace of American spaceflight. Built in 1868 and standing 151 feet tall, the lighthouse has guided both mariners and rocket crews for over 150 years.
              </p>
              <p className="text-sm sm:text-base text-gray-200 mb-6 sm:mb-8 leading-loose tracking-wide font-barlow-condensed">
                You'll climb the first five interior floors and, weather permitting, step onto the third-floor exterior platform for panoramic Atlantic views. Then explore the Cape Canaveral Space Force Museum, historic grounds, and Hangar C with its collection of 30+ restored rockets and missiles.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-gradient-to-br from-cosmic-navy/50 to-space-blue/50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-stellar-cyan/20">
                  <div className="text-2xl sm:text-3xl font-bold text-solar-gold mb-1 sm:mb-2">151 ft</div>
                  <div className="text-sm sm:text-base text-asteroid-gray">Lighthouse Height</div>
                </div>
                <div className="bg-gradient-to-br from-cosmic-navy/50 to-space-blue/50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-stellar-cyan/20">
                  <div className="text-2xl sm:text-3xl font-bold text-solar-gold mb-1 sm:mb-2">1868</div>
                  <div className="text-sm sm:text-base text-asteroid-gray">Year Built</div>
                </div>
              </div>
            </div>
            <div className="relative order-1 lg:order-2">
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl h-64 sm:h-80 lg:h-96 bg-slate-600">
                <img 
                  src="/lighthouse-historic.png"
                  alt="Historic Cape Canaveral Lighthouse with early space program equipment"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Tour Requirements */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 section--alt">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-inter font-bold text-starlight-white mb-4 sm:mb-6 leading-tight">
              Important
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-stellar-cyan to-rocket-orange">
                {" "}Requirements
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-asteroid-gray px-4">
              Please arrive 15 minutes before your scheduled departure. Most tours depart at 9:00 A.M.
            </p>
          </div>

          {/* Accessibility Notice */}
          <div className="mb-8 sm:mb-12 flex justify-center">
            <div className="chip chip--teal rounded-xl sm:rounded-2xl p-4 sm:p-6 inline-flex items-center">
              <div className="bg-stellar-cyan/20 p-2 sm:p-3 rounded-xl flex-shrink-0 pl-[5px] pr-[5px]">
                <i className="fas fa-info-circle text-stellar-cyan text-2xl sm:text-3xl"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm sm:text-base text-starlight-white leading-relaxed">
                  If you require <span className="font-bold">mobility assistance</span> or accessibility <span className="font-bold">accommodations</span>, please <a href="#contact" className="text-stellar-cyan hover:text-solar-gold transition-colors duration-300 underline">contact us</a>.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="chip chip--info rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="bg-blue-500/20 p-3 rounded-xl flex-shrink-0 w-12 h-12 flex items-center justify-center">
                  <i className="fas fa-calendar-check text-blue-400 text-xl"></i>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-inter font-bold text-starlight-white mb-0.5 leading-tight">
                    Advance Reservation
                  </h3>
                  <p className="text-sm sm:text-base text-asteroid-gray leading-relaxed">
                    All tours require an advance reservation.
                  </p>
                </div>
              </div>
            </div>

            <div className="chip chip--warn rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="bg-yellow-500/20 p-3 rounded-xl flex-shrink-0 w-12 h-12 flex items-center justify-center">
                  <i className="fas fa-clock text-yellow-400 text-xl"></i>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-inter font-bold text-starlight-white mb-0.5 leading-tight">
                    Lighthouse Visit
                  </h3>
                  <p className="text-sm sm:text-base text-asteroid-gray leading-relaxed">
                    ~1½ hours on site (includes interior climb to the 5th floor).
                  </p>
                </div>
              </div>
            </div>

            <div className="chip chip--ok rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="bg-green-500/20 p-3 rounded-xl flex-shrink-0 w-12 h-12 flex items-center justify-center">
                  <i className="fas fa-ruler-vertical text-green-400 text-xl"></i>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-inter font-bold text-starlight-white mb-0.5 leading-tight">
                    Minimum Height
                  </h3>
                  <p className="text-sm sm:text-base text-asteroid-gray leading-relaxed">
                    You must be at least 42 inches tall to climb (no carrying children).
                  </p>
                </div>
              </div>
            </div>

            <div className="chip chip--violet rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="bg-violet-400/20 p-3 rounded-xl flex-shrink-0 w-12 h-12 flex items-center justify-center">
                  <i className="fas fa-restroom text-violet-400 text-xl"></i>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-inter font-bold text-starlight-white mb-0.5 leading-tight">
                    Facilities
                  </h3>
                  <p className="text-sm sm:text-base text-asteroid-gray leading-relaxed">
                    Portable and permanent restrooms are available on-site.
                  </p>
                </div>
              </div>
            </div>

            <div className="chip chip--danger rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="bg-red-400/20 p-3 rounded-xl flex-shrink-0 w-12 h-12 flex items-center justify-center">
                  <i className="fas fa-shield-alt text-red-400 text-xl"></i>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-inter font-bold text-starlight-white mb-0.5 leading-tight">
                    Security Policy
                  </h3>
                  <p className="text-sm sm:text-base text-asteroid-gray leading-relaxed">
                    Tours are open to U.S. citizens or lawful permanent residents only. Security information must be provided in advance—details sent after reservation. Bookings may be canceled without refund if required information is not received.
                  </p>
                </div>
              </div>
            </div>

            <div className="chip chip--teal rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="bg-teal-400/20 p-3 rounded-xl flex-shrink-0 w-12 h-12 flex items-center justify-center">
                  <i className="fas fa-id-card text-teal-400 text-xl"></i>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-inter font-bold text-starlight-white mb-0.5 leading-tight">
                    ID Check
                  </h3>
                  <p className="text-sm sm:text-base text-asteroid-gray leading-relaxed">
                    Guests 18+ must present a government-issued photo ID at check-in.
                  </p>
                </div>
              </div>
            </div>

            <div className="chip chip--muted rounded-xl sm:rounded-2xl p-4 sm:p-6 md:col-span-2">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="bg-gray-400/20 p-3 rounded-xl flex-shrink-0 w-12 h-12 flex items-center justify-center">
                  <i className="fas fa-calendar-times text-gray-400 text-xl"></i>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-inter font-bold text-starlight-white mb-0.5 leading-tight">
                    Changes & Refunds
                  </h3>
                  <p className="text-sm sm:text-base text-asteroid-gray leading-relaxed">
                    We offer a full refund for cancellations made at least seven (7) days before the tour date. Cancellations six (6) days or fewer before the tour date are not refundable.* A one-year credit voucher will be issued.
                  </p>
                  <p className="text-xs sm:text-sm text-asteroid-gray mt-2 italic">
                    * Contact us directly for extenuating circumstances.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Contact CTA */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-inter font-bold text-starlight-white mb-4 sm:mb-6 leading-tight">
            Ready to
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-stellar-cyan to-rocket-orange">
              {" "}Explore?
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-asteroid-gray mb-6 sm:mb-8 px-4">
            Join us for an unforgettable journey through Cape Canaveral's lighthouse and space heritage
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-lg mx-auto">
            <button className="bg-stellar-cyan hover:bg-stellar-cyan hover:brightness-110 hover:scale-105 text-space-blue px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base">
              Book Your Tour
            </button>
            <button className="border-2 border-stellar-cyan text-stellar-cyan hover:bg-stellar-cyan hover:text-space-blue hover:scale-105 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base">
              Contact Us
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}