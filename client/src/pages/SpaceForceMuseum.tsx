import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import explorerImage from "@assets/Screen-Shot-2017-01-30-at-19.40.52_1755147734722.png";
import sandsReopeningImage from "@assets/news-061825d_1755149446808.jpg";
import museumExteriorImage from "@assets/USAF-Space-and-Missile-Museum-1-e1594743277163_1755149177855.webp";
import sandsInteriorImage from "@assets/HistoryCenterWideAngle2-scaled-1_1755149235032.jpg";
import museumExhibitImage from "@assets/2372_missilemuseum_1755149194199.jpg";
import spaceForceAwardImage from "@assets/482275758_673165675046327_2969275732399958566_n_1755150927032.jpg";

export default function SpaceForceMuseum() {
  return (
    <div className="min-h-screen bg-space-blue text-starlight-white">
      <Navigation />
      {/* Main Content Section */}
      <section 
        className="pt-52 pb-16 px-4 sm:px-6 lg:px-8 relative"
        style={{
          backgroundImage: `linear-gradient(rgba(26, 35, 50, 0.92), rgba(26, 35, 50, 0.95)), url(${spaceForceAwardImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            <span className="bg-gradient-to-r from-stellar-cyan to-nebula-purple bg-clip-text text-transparent">
              Cape Canaveral Space Force Museum
            </span>
          </h1>
          <p className="text-xl text-asteroid-gray mb-8" style={{ fontFamily: 'Work Sans, system-ui, sans-serif', fontWeight: 400 }}>
            Preserving the Hardware and Heritage of America's Space Ventures
          </p>
          
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-lg leading-relaxed mb-6 text-white" style={{ fontFamily: 'Sofia Sans, system-ui, sans-serif' }}>
              The Cape Canaveral Space Force Museum at Cape Canaveral Space Force Station has been open since 1966 and preserves both the hardware and the spirit of United States' ventures into space. The museum displays numerous missiles, rockets and related space flight equipment and memorabilia at several buildings and nearby facilities.
            </p>

            <p className="text-lg leading-relaxed mb-6 text-white" style={{ fontFamily: 'Sofia Sans, system-ui, sans-serif' }}>
              The Cape Canaveral Space Force Museum (formerly known as the Air Force Space & Missile Museum) is an absolute must-see for space history enthusiasts. Opened to the public in 1966, this museum has introduced millions of visitors to the history of rocketry and space flight over the decades. Uniquely, it isn't a museum built in a city or theme park – it is on location at the Cape's launch complexes, where America's early space missions actually launched.
            </p>
            
            <p className="text-lg leading-relaxed mb-6 text-white" style={{ fontFamily: 'Sofia Sans, system-ui, sans-serif' }}>
              The museum grounds encompass two adjoining launch complexes, Launch Complex 26 and Launch Complex 5/6, which are themselves artifacts of the dawn of space exploration. It's a goosebump-inducing moment to stand at Pad 26 and see the blockhouse from which the Vanguard and Jupiter-C rockets were fired.
            </p>

            {/* Historic Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
              <div 
                className="relative bg-gradient-to-br from-cosmic-navy to-card pt-3 px-6 pb-6 rounded-2xl border border-divider overflow-hidden shadow-2xl"
                style={{
                  backgroundImage: `linear-gradient(rgba(26, 35, 50, 0.95), rgba(42, 59, 80, 0.95)), url(${explorerImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                <div className="relative z-10 mb-20">
                  <h3 className="text-4xl font-bold text-red-600 mt-[0px] mb-[0px]" style={{ fontFamily: 'Manrope, system-ui, sans-serif' }}>January 31, 1958</h3>
                  <h4 className="text-xl font-semibold text-starlight-white" style={{ fontFamily: 'Manrope, system-ui, sans-serif' }}>First Satellite Launch</h4>
                </div>
                <p className="text-sm text-white relative z-10 leading-relaxed" style={{ fontFamily: 'Sofia Sans, system-ui, sans-serif' }}>
                  Historic Launch Complex 26 Blockhouse at Cape Canaveral – from here, Explorer 1 (the first U.S. satellite) was launched in 1958, a milestone commemorated by the marker. The museum has preserved the LC-26 blockhouse, a thick-walled concrete bunker with its firing room consoles intact; stepping inside, you can almost hear the crackle of 1950s countdowns.
                </p>
              </div>

              <div className="bg-gradient-to-br from-cosmic-navy to-card pt-3 px-6 pb-6 rounded-2xl border border-divider shadow-2xl">
                <div className="mb-20">
                  <h3 className="text-4xl font-bold text-red-600 mt-[0px] mb-[0px]" style={{ fontFamily: 'Manrope, system-ui, sans-serif' }}>May 5, 1961</h3>
                  <h4 className="text-xl font-semibold text-starlight-white" style={{ fontFamily: 'Manrope, system-ui, sans-serif' }}>First Americans in Space</h4>
                </div>
                <p className="text-sm text-white leading-relaxed" style={{ fontFamily: 'Sofia Sans, system-ui, sans-serif' }}>
                  The LC-5/6 blockhouse, from which the Mercury-Redstone rockets carrying America's first astronauts (Alan Shepard and Gus Grissom) were launched in 1961. The restored interior blockhouse contains original equipment from these historic Mercury Redstone flights, preserving the exact location where America's human spaceflight program began.
                </p>
              </div>
            </div>

            {/* Sands Space History Center Reopening */}
            <div 
              className="relative bg-gradient-to-br from-cosmic-navy/70 to-card/70 rounded-2xl border border-divider my-12 overflow-hidden min-h-[450px] shadow-2xl"
              style={{
                backgroundImage: `linear-gradient(rgba(26, 35, 50, 0.65), rgba(42, 59, 80, 0.65)), url(${sandsReopeningImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <div className="relative z-10 p-8 pt-[12px] pb-[12px]">
                <h2 className="text-3xl font-bold text-white mt-[0px] mb-[0px] drop-shadow-lg" style={{ fontFamily: 'Manrope, system-ui, sans-serif' }}>Sands Space History Center Reopening</h2>
                <p className="text-white leading-tight mb-16 drop-shadow-lg" style={{ fontFamily: 'Sofia Sans, system-ui, sans-serif' }}>
                  On June 17, 2025, the Sands Space History Center officially reopened after six weeks of renovations with a ribbon-cutting ceremony featuring confetti cannons and community celebration. Museum director James Draper and U.S. Space Force Historical Foundation chairman Ray Sands led the reopening ceremony, joined by Melbourne Regional Chamber members.
                </p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 pt-[0px] pb-[0px]">
                <p className="text-sm text-gray-300 italic leading-tight" style={{ fontFamily: 'Sofia Sans, system-ui, sans-serif' }}>
                  Museum director James Draper and U.S. Space Force Historical Foundation chairman Ray Sands celebrate the June 17, 2025 reopening of the renovated Sands Space History Center with Melbourne Regional Chamber members. (SLD 45)
                </p>
              </div>
            </div>

            {/* New Renovations and Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div 
                className="relative bg-gradient-to-br from-cosmic-navy/90 to-card/90 p-6 rounded-xl border border-divider overflow-hidden shadow-2xl"
                style={{
                  backgroundImage: `linear-gradient(rgba(26, 35, 50, 0.85), rgba(42, 59, 80, 0.85)), url(${sandsInteriorImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-stellar-cyan mb-3" style={{ fontFamily: 'Manrope, system-ui, sans-serif' }}>Space Force Rebranding</h3>
                  <p className="text-sm text-white leading-relaxed" style={{ fontFamily: 'Sofia Sans, system-ui, sans-serif' }}>
                    The building transformed from mostly white to dark blue inside and out to match Space Force branding, with the Space Force insignia displayed above the entrance and large-letter signage marking it as the Sands Space History Center.
                  </p>
                </div>
              </div>

              <div 
                className="relative bg-gradient-to-br from-cosmic-navy/90 to-card/90 p-6 rounded-xl border border-divider overflow-hidden shadow-2xl"
                style={{
                  backgroundImage: `linear-gradient(rgba(26, 35, 50, 0.85), rgba(42, 59, 80, 0.85)), url(${museumExhibitImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-stellar-cyan mb-3" style={{ fontFamily: 'Manrope, system-ui, sans-serif' }}>New Bumper 8 Exhibit</h3>
                  <p className="text-sm text-white leading-relaxed" style={{ fontFamily: 'Sofia Sans, system-ui, sans-serif' }}>
                    A new exhibit marks the 75th anniversary of Bumper 8, the first rocket launch from Cape Canaveral on July 24, 1950, featuring original artifacts, documents, scale models, and items from recent archaeological digs.
                  </p>
                </div>
              </div>
            </div>

            {/* Museum Facilities */}
            <h2 className="text-3xl font-bold text-stellar-cyan mb-6 mt-12">Museum Facilities</h2>
            <p className="text-lg leading-relaxed mb-6 text-white" style={{ fontFamily: 'Sofia Sans, system-ui, sans-serif' }}>
              The museum displays numerous missiles, rockets and related space flight equipment and memorabilia at several buildings and nearby facilities, including:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <div className="bg-card/50 p-4 rounded-lg border border-divider shadow-lg">
                <h4 className="font-semibold text-starlight-white mb-2">Museum Exhibit Hall</h4>
                <p className="text-sm text-asteroid-gray">Main exhibition space with artifacts and displays</p>
              </div>
              <div className="bg-card/50 p-4 rounded-lg border border-divider shadow-lg">
                <h4 className="font-semibold text-starlight-white mb-2">Launch Complex 26</h4>
                <p className="text-sm text-asteroid-gray">Blockhouse, Gantry, and Launch Pad exhibits</p>
              </div>
              <div className="bg-card/50 p-4 rounded-lg border border-divider shadow-lg">
                <h4 className="font-semibold text-starlight-white mb-2">Launch Complex 5/6</h4>
                <p className="text-sm text-asteroid-gray">Blockhouse and Launch Pad exhibits</p>
              </div>
              <div className="bg-card/50 p-4 rounded-lg border border-divider shadow-lg">
                <h4 className="font-semibold text-starlight-white mb-2">Rocket Garden</h4>
                <p className="text-sm text-asteroid-gray">Outdoor display of historic rockets and missiles</p>
              </div>
              <div className="bg-card/50 p-4 rounded-lg border border-divider shadow-lg">
                <h4 className="font-semibold text-starlight-white mb-2">Sands Space History Center</h4>
                <p className="text-sm text-asteroid-gray">Recently renovated with Space Force branding, featuring Bumper 8 anniversary exhibit and upgraded facilities</p>
              </div>
              <div className="bg-card/50 p-4 rounded-lg border border-divider shadow-lg">
                <h4 className="font-semibold text-starlight-white mb-2">Gift Shop</h4>
                <p className="text-sm text-asteroid-gray">Space-themed memorabilia and souvenirs</p>
              </div>
            </div>

            <p className="text-lg leading-relaxed mb-6 text-white" style={{ fontFamily: 'Sofia Sans, system-ui, sans-serif' }}>
              Tours and gift shop operations are provided by a group of dedicated volunteers. The United States Space Force Historical Foundation, Inc. provides funding for exhibit maintenance and museum operations. Management for the entire museum operation is the responsibility of the Museum Director, a civilian employee of Space Launch Delta 45.
            </p>

            <div className="bg-gradient-to-r from-cosmic-navy/50 to-card/50 p-6 rounded-xl border border-divider mb-6 shadow-xl">
              <h3 className="text-xl font-bold text-stellar-cyan mb-4" style={{ fontFamily: 'Manrope, system-ui, sans-serif' }}>Legacy of Launch Campaign</h3>
              <p className="text-white mb-4" style={{ fontFamily: 'Sofia Sans, system-ui, sans-serif' }}>
                The recent renovations are part of a larger "Legacy of Launch" campaign to raise $5 million for new STEAM exhibits, revive VIP tours of Cape Canaveral Space Force Station—including Hangar C and historic Mercury and Apollo sites—and reopen Exploration Tower at Port Canaveral as a museum and education center.
              </p>
              <p className="text-white" style={{ fontFamily: 'Sofia Sans, system-ui, sans-serif' }}>
                The Sands Space History Center is open free to the public Tuesday through Sunday, while visits to the Cape Canaveral Space Force Museum require advance arrangements.
              </p>
            </div>

            <div className="bg-gradient-to-r from-cosmic-navy/50 to-card/50 p-6 rounded-xl border border-divider mb-8 shadow-xl">
              <h3 className="text-xl font-bold text-stellar-cyan mb-4" style={{ fontFamily: 'Manrope, system-ui, sans-serif' }}>Visiting the Museum</h3>
              <p className="text-white mb-4" style={{ fontFamily: 'Sofia Sans, system-ui, sans-serif' }}>
                The Cape Canaveral Space Force Museum is located on Cape Canaveral Space Force Station (CCSFS), so general public access is only via guided bus tours with prior security clearance. Visiting the museum is a bit of an adventure since it's on an active military base where Space Launch Delta 45 operates and oversees all East Coast launch operations.
              </p>
              <p className="text-white" style={{ fontFamily: 'Sofia Sans, system-ui, sans-serif' }}>
                The museum preserves not only military history when it comes to missile testing and space exploration, but the actual launch facilities where America's space program began, making it a truly unique historical experience.
              </p>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-cosmic-navy to-card p-8 rounded-2xl border border-divider mt-12 shadow-2xl">
              <h2 className="text-2xl font-bold mb-4 text-stellar-cyan">
                Visit During Your Lighthouse Tour
              </h2>
              <p className="text-asteroid-gray mb-6">
                The Cape Canaveral Space Force Museum is included as part of our comprehensive Lighthouse & Spaceflight Tour experience. Explore the museum's incredible collection of space artifacts and learn about the Cape's role in America's space program.
              </p>
              <a 
                href="/"
                className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors duration-300"
              >
                Book Your Tour Today
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}