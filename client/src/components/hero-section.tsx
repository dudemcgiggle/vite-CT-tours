import heroImagePath from "@assets/image_1755145467947.png";

export default function HeroSection() {
  const scrollToBooking = () => {
    const element = document.getElementById("booking");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTours = () => {
    const element = document.getElementById("tours");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="hero relative flex items-center justify-center overflow-hidden w-full"
      style={{
        /* Fixed aspect ratio for the cropped hero image */
        aspectRatio: "1540 / 1187",
        minHeight: "100vh",

        /* expose the raw image for the ::before mirror */
        ["--hero-img" as any]: `url('${heroImagePath}')`,

        /* dual-layer background: gradient + cropped image with locked focal point */
        backgroundImage: `linear-gradient(rgba(11,20,38,.5), rgba(30,42,71,.6)), url('${heroImagePath}')`,
        backgroundSize: "cover, cover",
        backgroundRepeat: "no-repeat, no-repeat",
        backgroundPosition: "center top, 100% 51.6%",

        /* header padding only for content, not background positioning */
        paddingTop: "var(--header-h)",
      } as React.CSSProperties}
    >
      {/* overlay FIRST, behind content */}
      <div className="hero-overlay absolute inset-0 bg-gradient-to-b from-space-blue/60 via-space-blue/50 to-space-blue/70"></div>
      
      {/* Floating Elements - Enhanced Starfield */}
      {/* Sharp, clear dots */}
      <div className="absolute top-20 right-10 animate-float hidden lg:block">
        <div className="w-2 h-2 bg-white rounded-full opacity-30"></div>
      </div>
      <div className="absolute bottom-32 left-16 animate-float hidden lg:block" style={{animationDelay: "-2s"}}>
        <div className="w-1.5 h-1.5 bg-white rounded-full opacity-25"></div>
      </div>
      <div className="absolute top-32 left-20 animate-float hidden lg:block" style={{animationDelay: "-1s"}}>
        <div className="w-1.5 h-1.5 bg-white rounded-full opacity-20"></div>
      </div>
      <div className="absolute top-48 right-32 animate-float hidden lg:block" style={{animationDelay: "-3s"}}>
        <div className="w-2 h-2 bg-white rounded-full opacity-25"></div>
      </div>
      <div className="absolute bottom-48 right-20 animate-float hidden lg:block" style={{animationDelay: "-1.5s"}}>
        <div className="w-1 h-1 bg-white rounded-full opacity-20"></div>
      </div>
      <div className="absolute top-16 left-1/4 animate-float hidden lg:block" style={{animationDelay: "-2.5s"}}>
        <div className="w-1.5 h-1.5 bg-white rounded-full opacity-15"></div>
      </div>
      <div className="absolute bottom-20 right-1/3 animate-float hidden lg:block" style={{animationDelay: "-0.5s"}}>
        <div className="w-1 h-1 bg-white rounded-full opacity-25"></div>
      </div>
      <div className="absolute top-40 right-1/4 animate-float hidden lg:block" style={{animationDelay: "-3.5s"}}>
        <div className="w-1.5 h-1.5 bg-white rounded-full opacity-20"></div>
      </div>
      
      {/* Additional sharp dots */}
      <div className="absolute top-24 left-1/3 animate-float hidden lg:block" style={{animationDelay: "-4s"}}>
        <div className="w-1 h-1 bg-white rounded-full opacity-30"></div>
      </div>
      <div className="absolute bottom-40 left-1/2 animate-float hidden lg:block" style={{animationDelay: "-1.2s"}}>
        <div className="w-2 h-2 bg-white rounded-full opacity-20"></div>
      </div>
      <div className="absolute top-60 left-8 animate-float hidden lg:block" style={{animationDelay: "-3.8s"}}>
        <div className="w-1.5 h-1.5 bg-white rounded-full opacity-35"></div>
      </div>
      <div className="absolute bottom-16 left-2/3 animate-float hidden lg:block" style={{animationDelay: "-0.8s"}}>
        <div className="w-1 h-1 bg-white rounded-full opacity-15"></div>
      </div>
      <div className="absolute top-72 right-16 animate-float hidden lg:block" style={{animationDelay: "-2.8s"}}>
        <div className="w-2 h-2 bg-white rounded-full opacity-25"></div>
      </div>
      
      {/* Subtle ambient dots */}
      <div className="absolute top-36 right-1/2 animate-float hidden lg:block" style={{animationDelay: "-1.8s"}}>
        <div className="w-[1px] h-[1px] bg-white rounded-full opacity-4 blur-[8px]"></div>
      </div>
      <div className="absolute bottom-28 right-8 animate-float hidden lg:block" style={{animationDelay: "-3.2s"}}>
        <div className="w-[2px] h-[2px] bg-white rounded-full opacity-3 blur-[10px]"></div>
      </div>
      <div className="absolute top-52 left-12 animate-float hidden lg:block" style={{animationDelay: "-4.5s"}}>
        <div className="w-[1px] h-[1px] bg-white rounded-full opacity-2 blur-[12px]"></div>
      </div>
      <div className="absolute bottom-56 right-1/3 animate-float hidden lg:block" style={{animationDelay: "-0.3s"}}>
        <div className="w-[2px] h-[2px] bg-white rounded-full opacity-5 blur-[9px]"></div>
      </div>
      <div className="absolute top-80 left-1/3 animate-float hidden lg:block" style={{animationDelay: "-2.2s"}}>
        <div className="w-[1px] h-[1px] bg-white rounded-full opacity-3 blur-[11px]"></div>
      </div>
      
      {/* Ultra subtle background glow */}
      <div className="absolute top-28 left-1/2 animate-float hidden lg:block" style={{animationDelay: "-1.6s"}}>
        <div className="w-[2px] h-[2px] bg-white rounded-full opacity-2 blur-[15px]"></div>
      </div>
      <div className="absolute bottom-36 left-8 animate-float hidden lg:block" style={{animationDelay: "-3.7s"}}>
        <div className="w-[3px] h-[3px] bg-white rounded-full opacity-1 blur-[18px]"></div>
      </div>
      <div className="absolute top-44 right-12 animate-float hidden lg:block" style={{animationDelay: "-4.2s"}}>
        <div className="w-[2px] h-[2px] bg-white rounded-full opacity-3 blur-[14px]"></div>
      </div>
      <div className="absolute bottom-60 right-1/2 animate-float hidden lg:block" style={{animationDelay: "-0.7s"}}>
        <div className="w-[1px] h-[1px] bg-white rounded-full opacity-2 blur-[16px]"></div>
      </div>
      <div className="absolute top-64 left-1/4 animate-float hidden lg:block" style={{animationDelay: "-3.3s"}}>
        <div className="w-[2px] h-[2px] bg-white rounded-full opacity-4 blur-[12px]"></div>
      </div>
      
      {/* Atmospheric glow effects */}
      <div className="absolute top-12 right-1/3 animate-float hidden lg:block" style={{animationDelay: "-2.7s"}}>
        <div className="w-[3px] h-[3px] bg-white rounded-full opacity-1 blur-[20px]"></div>
      </div>
      <div className="absolute bottom-24 left-1/4 animate-float hidden lg:block" style={{animationDelay: "-4.8s"}}>
        <div className="w-[2px] h-[2px] bg-white rounded-full opacity-2 blur-[16px]"></div>
      </div>
      <div className="absolute top-56 right-4 animate-float hidden lg:block" style={{animationDelay: "-1.3s"}}>
        <div className="w-[4px] h-[4px] bg-white rounded-full opacity-1 blur-[22px]"></div>
      </div>
      <div className="absolute bottom-44 right-2/3 animate-float hidden lg:block" style={{animationDelay: "-3.9s"}}>
        <div className="w-[2px] h-[2px] bg-white rounded-full opacity-2 blur-[18px]"></div>
      </div>
      <div className="absolute top-76 left-4 animate-float hidden lg:block" style={{animationDelay: "-0.2s"}}>
        <div className="w-[1px] h-[1px] bg-white rounded-full opacity-3 blur-[14px]"></div>
      </div>
      
      {/* Mobile subtle dots */}
      <div className="absolute top-20 right-8 animate-float block lg:hidden" style={{animationDelay: "-1s"}}>
        <div className="w-[1px] h-[1px] bg-white rounded-full opacity-3 blur-[10px]"></div>
      </div>
      <div className="absolute bottom-32 left-8 animate-float block lg:hidden" style={{animationDelay: "-2.5s"}}>
        <div className="w-[2px] h-[2px] bg-white rounded-full opacity-2 blur-[12px]"></div>
      </div>
      <div className="absolute top-40 left-1/3 animate-float block lg:hidden" style={{animationDelay: "-3.2s"}}>
        <div className="w-[1px] h-[1px] bg-white rounded-full opacity-4 blur-[8px]"></div>
      </div>
      <div className="absolute bottom-48 right-1/4 animate-float block lg:hidden" style={{animationDelay: "-1.7s"}}>
        <div className="w-[2px] h-[2px] bg-white rounded-full opacity-2 blur-[14px]"></div>
      </div>
      <div className="hero-inner">
        <div className="hero-hard-center">
          <div className="hero-content">
            <h1 className="hero-title font-inter font-bold leading-tight mb-2 sm:mb-3">
              <span className="block sm:inline">
                Lighthouse&nbsp;&amp;&nbsp;
              </span>
              <span className="block sm:inline">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-stellar-cyan to-nebula-purple">Spaceflight</span>&nbsp;Tours
              </span>
            </h1>

            <p className="subhead text-sm sm:text-base md:text-lg text-starlight-white/85 max-w-xs sm:max-w-md md:max-w-xl mx-auto font-normal leading-relaxed px-4 sm:px-0">
              <span className="block sm:inline">Follow the arc of discovery—from guiding ships along</span>
              <span className="block sm:inline sm:ml-1">Florida's Atlantic shoals to launching rockets that cross the void of space.</span>
            </p>

            <div className="ctas flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full max-w-md sm:max-w-none mx-auto">
              <button
                onClick={scrollToBooking}
                className="bg-gradient-to-r from-stellar-cyan to-teal-400 hover:from-teal-400 hover:to-stellar-cyan text-space-blue px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto sm:min-w-[220px]"
              >
                <span className="hidden sm:inline">Book Your Adventure · $62.50</span>
                <span className="sm:hidden">Book Adventure · $62.50</span>
              </button>
              <button
                onClick={scrollToTours}
                className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 backdrop-blur-sm w-full sm:w-auto sm:min-w-[200px]"
              >
                View All Tours
              </button>
            </div>

            <div className="stats grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 w-full max-w-sm sm:max-w-none mx-auto">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-solar-gold">500+</div>
                <div className="text-xs sm:text-sm text-white">Tours Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-stellar-cyan">400+</div>
                <div className="text-xs sm:text-sm text-white">Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-rocket-orange">25+</div>
                <div className="text-xs sm:text-sm text-white">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-400">4.8</div>
                <div className="text-xs sm:text-sm text-white">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <i className="fas fa-chevron-down text-2xl text-asteroid-gray"></i>
      </div>
    </section>
  );
}
