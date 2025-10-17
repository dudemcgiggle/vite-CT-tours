import { useQuery } from "@tanstack/react-query";
import { type Tour } from "@shared/schema";

export default function ToursSection() {
  const { data: tours, isLoading } = useQuery<Tour[]>({
    queryKey: ["/api/tours"],
  });

  const scrollToBooking = () => {
    const element = document.getElementById("booking");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (isLoading) {
    return (
      <section id="tours" className="tours-section pt-12 pb-20 bg-gradient-to-b from-[hsl(216,50%,15%)] to-[hsl(222,35%,19%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-lg text-asteroid-gray">Loading tours...</div>
          </div>
        </div>
      </section>
    );
  }

  if (!tours || tours.length === 0) {
    return (
      <section id="tours" className="tours-section pt-12 pb-20 bg-gradient-to-b from-[hsl(216,50%,15%)] to-[hsl(222,35%,19%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-lg text-asteroid-gray">No tours available at this time.</div>
          </div>
        </div>
      </section>
    );
  }

  const featuredTours = tours.filter(tour => ["signature", "nature"].includes(tour.category));
  const otherTours = tours.filter(tour => !["signature", "nature"].includes(tour.category));

  return (
    <section id="tours" className="tours-section pt-12 pb-20 bg-gradient-to-b from-[hsl(216,50%,15%)] to-[hsl(222,35%,19%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-inter font-bold mb-4 sm:mb-6 leading-tight">
            Our
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-stellar-cyan to-nebula-purple">
              {" "}Signature{" "}
            </span>
            Tours
          </h2>
          <p className="text-lg sm:text-xl text-asteroid-gray max-w-3xl mx-auto px-4">
            Discover the perfect blend of space exploration and natural beauty with our expertly curated tour experiences.
          </p>
        </div>

        {/* Featured Tours */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12 items-stretch">
          {featuredTours.map((tour, index) => (
            <div key={tour.id} className="group relative bg-gradient-to-br from-cosmic-navy to-space-blue rounded-3xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] transform hover:scale-105 transition-all duration-500 flex flex-col min-h-[500px]">
              <div 
                className="h-80 relative bg-cover bg-center"
                style={{
                  backgroundImage: tour.id === "lighthouse-spaceflight" 
                    ? `url('/images/lighthouse.jpg')`
                    : tour.id === "wildlife-safari"
                    ? `url('/images/wildlife-safari.jpg')`
                    : index === 0 
                    ? `url('/images/hero-rocket.jpg')`
                    : `url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600')`,
                  backgroundPosition: tour.id === "lighthouse-spaceflight" ? 'center 20%' : index === 0 && tour.id !== "lighthouse-spaceflight" && tour.id !== "wildlife-safari" ? 'center bottom' : 'center'
                }}
              >
                {index === 0 && (
                  <div className="absolute top-4 right-4 bg-solar-gold text-black px-3 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                {tour.category === "nature" && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Eco-Friendly
                  </div>
                )}
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center mb-3">
                  <i className={`${tour.category === "signature" ? "fas fa-lighthouse" : "fas fa-leaf"} ${tour.category === "signature" ? "text-solar-gold" : "text-green-400"} text-2xl -ml-1`}></i>
                  <h3 className="text-2xl font-inter font-bold text-starlight-white ml-[6px] mr-[6px]">{tour.name}</h3>
                </div>
                
                <p className="text-asteroid-gray mb-4 text-[14px] h-16 overflow-hidden">
                  {tour.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-asteroid-gray">
                    <i className="fas fa-clock mr-2"></i>
                    <span>{tour.duration}</span>
                  </div>
                  <div className="flex items-center text-sm text-asteroid-gray">
                    <i className="fas fa-users mr-2"></i>
                    <span>Max {tour.maxGuests} guests</span>
                  </div>
                  <div className="text-2xl font-bold text-solar-gold">${Number(tour.price).toFixed(2)}</div>
                </div>
                
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center text-solar-gold text-sm">
                    {[...Array(Math.floor(tour.rating || 0))].map((_, i) => (
                      <i key={i} className="fas fa-star"></i>
                    ))}
                    {tour.rating && tour.rating % 1 !== 0 && (
                      <i className="fas fa-star-half-alt"></i>
                    )}
                    <span className="ml-2 text-asteroid-gray">({tour.reviewCount} reviews)</span>
                  </div>
                  <button 
                    onClick={() => window.location.href = tour.id === 'lighthouse-spaceflight' ? '/lighthouse-tours' : '/adventures'}
                    className="bg-stellar-cyan hover:bg-stellar-cyan hover:brightness-110 hover:scale-105 text-space-blue px-6 py-2 rounded-full font-semibold transition-all duration-300"
                  >
                    Choose Your Adventure
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* More Tours Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {otherTours.map((tour) => (
            <div key={tour.id} className="bg-gradient-to-br from-cosmic-navy to-space-blue rounded-2xl overflow-hidden shadow-[0_20px_25px_-5px_rgba(0,0,0,0.4)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] transition-all duration-300">
              <div 
                className="h-48 bg-cover bg-center" 
                style={{
                  backgroundImage: `url('${
                    tour.name.toLowerCase().includes('lighthouse') || tour.id === 'lighthouse-spaceflight'
                      ? '/images/lighthouse.jpg'
                      : tour.name.toLowerCase().includes('wildlife') || tour.id === 'wildlife-safari'
                      ? '/images/wildlife-safari.jpg'
                      : tour.category === "space" 
                      ? 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600'
                      : tour.category === "photography"
                      ? 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600'
                      : 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600'
                  }')`
                }}
              ></div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <i className={`${
                    tour.category === "space" ? "fas fa-rocket text-rocket-orange" :
                    tour.category === "photography" ? "fas fa-camera text-solar-gold" :
                    "fas fa-users text-nebula-purple"
                  } mr-2`}></i>
                  <h4 className="text-lg font-inter font-semibold">{tour.name}</h4>
                </div>
                <p className="text-asteroid-gray text-sm mb-4">
                  {tour.description.substring(0, 80)}...
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-solar-gold font-bold">
                    {tour.category === "private" ? `From $${tour.price}` : `$${tour.price}`}
                  </span>
                  <button 
                    onClick={() => window.location.href = tour.name.toLowerCase().includes('lighthouse') || tour.id === 'lighthouse-spaceflight' ? '/lighthouse-tours' : '/adventures'}
                    className="text-stellar-cyan hover:text-stellar-cyan hover:brightness-110 hover:scale-105 transition-all duration-300 text-sm font-semibold"
                  >
                    Learn More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Tours CTA */}
        <div className="text-center mt-12">
          <button 
            onClick={() => window.location.href = '/adventures'}
            className="border-2 border-stellar-cyan text-stellar-cyan hover:bg-stellar-cyan hover:text-space-blue hover:brightness-110 hover:scale-105 px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300"
          >
            View All Tours & Experiences
          </button>
        </div>
        
      </div>
    </section>
  );
}
