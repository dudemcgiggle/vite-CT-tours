import { useQuery } from "@tanstack/react-query";
import { type Review } from "@shared/schema";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/footer";
import googleLogo from "@assets/580b57fcd9996e24bc43c51f_1755123046881.png";
import tripadvisorLogo from "@assets/clipart1545822_1755123046881.png";
import yelpLogo from "@assets/clipart4305843_1755123046881.png";
import spaceCoastLogo from "@assets/space-coast_logo_1755126231520.png";
import visitFloridaLogo from "@assets/visit florida_1755127096347.png";
import visitCocoaBeachLogo from "@assets/cocoa_beach_1755127347939.png";

export default function Reviews() {
  const { data: reviews, isLoading } = useQuery<Review[]>({
    queryKey: ["/api/reviews"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cosmic-navy to-space-blue py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-lg text-asteroid-gray">Loading reviews...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cosmic-navy to-space-blue">
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

      {/* Spacer for fixed nav */}
      <div className="h-14 sm:h-16"></div>

      {/* Hero Section */}
      <section 
        className="py-12 relative overflow-hidden"
        style={{
          backgroundImage: `url("/space-museum-bg.jpg")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="text-4xl md:text-5xl font-inter font-bold mb-4">
            Customer
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-stellar-cyan to-nebula-purple">
              {" "}Reviews
            </span>
          </h1>
          <p className="text-lg text-asteroid-gray mb-6 max-w-2xl mx-auto">
            Real experiences from our space explorers and lighthouse adventurers
          </p>
          
          {/* Rating Summary */}
          <div className="bg-gradient-to-br from-cosmic-navy to-space-blue rounded-2xl p-6 mb-8 border border-stellar-cyan/20 max-w-3xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 items-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-solar-gold mb-1">4.7</div>
                <div className="flex justify-center text-solar-gold text-lg mb-1">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <div className="text-sm text-asteroid-gray">Average Rating Across All Platforms</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-stellar-cyan mb-1">400+</div>
                <div className="text-sm text-asteroid-gray">Total Reviews</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-rocket-orange mb-1">92%</div>
                <div className="text-sm text-asteroid-gray">5-Star Reviews Across All Sources</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Reviews Grid */}
      <section 
        className="py-8 relative"
        style={{
          backgroundImage: `url("/space-museum-bg.jpg")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/80"></div>
        
        {/* Platform Logos on space background */}
        <div className="relative z-10 flex justify-center -mt-4 pb-16">
          <div className="flex flex-col items-center gap-2 px-8 py-6 border border-white/50 rounded-2xl bg-black/30">
            <div className="text-white text-lg font-medium tracking-wide" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
              Reviews from trusted sources
            </div>
            <div className="flex gap-8 items-center">
              <img src={googleLogo} alt="Google" className="h-16 w-auto" />
              <img src={tripadvisorLogo} alt="TripAdvisor" className="h-16 w-auto" />
              <img src={yelpLogo} alt="Yelp" className="h-20 w-auto" />
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img 
                src="/google-reviews-logo.png" 
                alt="Google Customer Reviews" 
                className="h-24 w-auto"
              />
            </div>
            <p className="text-starlight-white text-lg font-normal" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>Authentic feedback from our Google customers</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews && reviews.length > 0 ? (
              reviews.filter(review => !review.platform || review.platform === 'google').map((review) => (
                <div
                  key={review.id}
                  className="shimmer-gradient relative overflow-hidden rounded-2xl p-6 shadow-xl border border-gray-200 hover:border-gray-300 hover:shadow-2xl transition-[box-shadow,border-color] duration-300"
                >
                  {/* Google G icon in top right */}
                  <div className="absolute top-4 right-4 z-30">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  </div>
                  <div className="relative z-20 flex flex-col h-full">
                    <div className="flex items-center text-yellow-500 mb-4">
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <i key={i} className="fas fa-star"></i>
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600 font-medium">
                        {review.rating} out of 5 stars
                      </span>
                    </div>
                    <p className="text-gray-700 mb-6 leading-relaxed flex-grow">
                      "{review.comment}"
                    </p>
                    <div className="flex items-center mt-auto">
                      <div className="w-16 h-16 rounded-full overflow-hidden mr-4 ring-2 ring-blue-800">
                        <img 
                          src={`/avatars/${review.guestName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}.png`}
                          alt={`${review.guestName} avatar`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.guestName)}&background=3B82F6&color=ffffff&size=64&font-size=0.6&bold=true`;
                          }}
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{review.guestName}</div>
                        <div className="text-sm text-gray-600 flex items-center">
                          {review.date}
                          {review.isVerified === "true" && (
                            <i className="fas fa-check-circle text-blue-500 ml-2 text-xs"></i>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center text-asteroid-gray">
                No Google reviews available at this time.
              </div>
            )}
          </div>
          
          {/* Google Review Buttons */}
          <div className="text-center mt-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="https://g.page/r/CWKEhFIo0RxOEBM/review"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Leave a Google Review
              </a>
              
              <a 
                href="https://search.google.com/local/reviews?placeid=ChIJx5R5rIqj4IgRYoSEUijRHE4"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                See all Google Reviews
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TripAdvisor Reviews Section */}
      <section 
        className="py-8 relative" 
        id="tripadvisor-reviews"
        style={{
          backgroundImage: `url("/space-museum-bg.jpg")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img 
                src="/tripadvisor-logo.png" 
                alt="TripAdvisor Reviews" 
                className="h-20 w-auto"
              />
            </div>
            <p className="text-starlight-white text-lg font-normal" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>What travelers are saying on TripAdvisor</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews && reviews.length > 0 ? (
              reviews.filter(review => review.platform === 'tripadvisor').map((review) => (
                <div key={review.id} className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 shadow-xl border border-emerald-800/40 hover:border-emerald-700/60 transition-all duration-300 relative">
                  {/* TripAdvisor owl icon in top right */}
                  <div className="absolute top-4 right-4 z-30">
                    <img src="/tripadvisor-icon.png" alt="TripAdvisor" className="w-6 h-6 opacity-80" style={{filter: 'brightness(0) saturate(100%) invert(72%) sepia(50%) saturate(564%) hue-rotate(118deg) brightness(101%) contrast(101%)'}} />
                  </div>
                  <div className="flex flex-col h-full">
                    <div className="flex items-center text-yellow-400 mb-4">
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <i key={i} className="fas fa-star"></i>
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-emerald-200 font-medium">
                        {review.rating} out of 5 stars
                      </span>
                    </div>
                    <p className="text-slate-100 mb-6 leading-relaxed flex-grow">
                      "{review.comment}"
                    </p>
                    <div className="flex items-center mt-auto">
                      <div className="w-16 h-16 rounded-full overflow-hidden mr-4 ring-2 ring-emerald-700">
                        <img 
                          src={`/avatars/${review.guestName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}.png`}
                          alt={`${review.guestName} avatar`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.guestName)}&background=065f46&color=ffffff&size=64&font-size=0.6&bold=true`;
                          }}
                        />
                      </div>
                      <div>
                        <a 
                          href="https://www.tripadvisor.com/Attraction_Review-g34574-d14133588-Reviews-Canaveral_Tours-Port_Canaveral_Brevard_County_Florida.html"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-white hover:text-emerald-300 transition-colors duration-200 cursor-pointer"
                        >
                          {review.guestName}
                        </a>
                        <div className="text-sm text-slate-300 flex items-center">
                          {review.date}
                          <div className="ml-2 text-xs bg-emerald-800/50 text-emerald-200 px-2 py-1 rounded-full">
                            TripAdvisor
                          </div>
                          {review.isVerified === "true" && (
                            <i className="fas fa-check-circle text-emerald-400 ml-2 text-xs"></i>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center text-asteroid-gray">
                No TripAdvisor reviews available at this time.
              </div>
            )}
          </div>
          
          {/* TripAdvisor Review Buttons */}
          <div className="text-center mt-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="https://www.tripadvisor.com/UserReviewEdit-g34574-d14133588-Canaveral_Tours-Port_Canaveral_Brevard_County_Florida.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <img src="/tripadvisor-icon.png" alt="TripAdvisor" className="w-6 h-6 mr-2" />
                Leave a TripAdvisor Review
              </a>
              
              <a 
                href="https://www.tripadvisor.com/Attraction_Review-g34574-d14133588-Reviews-Canaveral_Tours-Port_Canaveral_Brevard_County_Florida.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                See All TripAdvisor Reviews
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Yelp Reviews Section */}
      <section 
        className="py-8 relative" 
        id="yelp-reviews"
        style={{
          backgroundImage: `url("/space-museum-bg.jpg")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Yelp Platform Header */}
            <div className="md:col-span-2 lg:col-span-3 flex flex-col items-center justify-center mb-2">
              <img 
                src="/yelp-logo.png" 
                alt="Yelp Logo"
                className="h-16 w-auto mb-3"
              />
              <p className="text-white font-['Barlow_Condensed'] text-lg font-medium">
                Local recommendations from Yelp community
              </p>
            </div>
            
            {reviews && reviews.length > 0 ? (
              reviews.filter(review => review.platform === 'yelp').map((review) => (
                <div key={review.id} className="bg-gradient-to-br from-red-950 to-black rounded-2xl p-6 shadow-xl border border-red-900/40 hover:border-red-800/60 transition-all duration-300 relative">
                  {/* Yelp logo icon in top right */}
                  <div className="absolute top-4 right-4 z-30">
                    <img 
                      src="/yelp-icon-white.png" 
                      alt="Yelp Icon"
                      className="w-6 h-6 opacity-80"
                    />
                  </div>
                  <div className="flex flex-col h-full">
                    <div className="flex items-center text-yellow-400 mb-4">
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <i key={i} className="fas fa-star"></i>
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-red-200 font-medium">
                        {review.rating} out of 5 stars
                      </span>
                    </div>
                    <p className="text-red-100 mb-6 leading-relaxed flex-grow">
                      "{review.comment}"
                    </p>
                    <div className="flex items-center mt-auto">
                      <a 
                        href="https://www.yelp.com/biz/cape-canaveral-lighthouse-tours-merritt-island"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-16 h-16 rounded-full overflow-hidden mr-4 ring-2 ring-red-700 hover:ring-red-500 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                      >
                        <img 
                          src={(() => {
                            // Use authentic avatar images from Yelp
                            const avatarMap: Record<string, string> = {
                              'Jan-Michael T.': '/avatars/jan-michael-t.jpg',
                              'Connor B.': '/avatars/connor-b.jpg',
                              'Ward D.': '/avatars/ward-d.jpg'
                            };
                            return avatarMap[review.guestName] || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.guestName)}&background=B91C1C&color=ffffff&size=64&font-size=0.6&bold=true`;
                          })()}
                          alt={`${review.guestName} avatar`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback to UI Avatars if authentic image fails to load
                            const img = e.target as HTMLImageElement;
                            img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.guestName)}&background=B91C1C&color=ffffff&size=64&font-size=0.6&bold=true`;
                          }}
                        />
                      </a>
                      <div>
                        <a 
                          href="https://www.yelp.com/biz/cape-canaveral-lighthouse-tours-merritt-island"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-white hover:text-red-300 transition-colors duration-300 cursor-pointer"
                        >
                          {review.guestName}
                        </a>
                        <div className="text-sm text-red-300 flex items-center">
                          {review.date}
                          <div className="ml-2 text-xs bg-red-800/50 text-red-200 px-2 py-1 rounded-full">
                            Yelp
                          </div>
                          {review.isVerified === "true" && (
                            <i className="fas fa-check-circle text-red-400 ml-2 text-xs"></i>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center text-asteroid-gray">
                No Yelp reviews available at this time.
              </div>
            )}
          </div>
          
          {/* Yelp Action Buttons */}
          <div className="flex justify-center gap-6 mt-12">
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://www.yelp.com/writeareview/biz/ntSxDXKEIwNYQogZUXf0cA?return_url=%2Fbiz%2FntSxDXKEIwNYQogZUXf0cA&review_origin=biz-details-war-button"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
              >
                <img 
                  src="/yelp-icon-white.png" 
                  alt="Yelp Icon"
                  className="w-5 h-5 mr-2"
                />
                Leave a Yelp Review
              </a>
              <a 
                href="https://www.yelp.com/biz/cape-canaveral-lighthouse-tours-merritt-island"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-red-600 text-red-400 hover:bg-red-600 hover:text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                See All Yelp Reviews
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Official Tourism Recognition */}
      <section 
        className="py-12 relative"
        style={{
          backgroundImage: `url("/space-museum-bg.jpg")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black/85"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-starlight-white mb-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-stellar-cyan to-nebula-purple">
                Official Tourism Recognition
              </span>
            </h2>
            <p className="text-white text-lg max-w-3xl mx-auto font-light" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
              Canaveral Tours is featured and recommended by Florida's official tourism authorities
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Visit Space Coast */}
            <a 
              href="https://www.visitspacecoast.com/profile/cape-canaveral/attractions/canaveral-wildlife-tours/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 rounded-2xl p-6 border border-stellar-cyan/30 hover:border-stellar-cyan/60 transition-all duration-300 transform hover:scale-105 cursor-pointer flex flex-col h-full"
            >
              <div className="text-center mb-3">
                <div className="flex justify-center mb-1">
                  <img src={spaceCoastLogo} alt="Visit Space Coast" className="h-12 w-auto max-w-full object-contain" />
                </div>
                <h3 className="text-white font-light text-sm tracking-wide" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>Visit Space Coast</h3>
                <p className="text-stellar-cyan text-sm font-light">Official Tourism Board</p>
              </div>
              <div className="text-asteroid-gray text-sm leading-relaxed mb-4 flex-grow">
                "Discover Florida's natural wonders stress-free with Canaveral Wildlife Tours. Their 'No Sweat' experience takes you to various locations to experience the beauty and wildlife of Florida."
              </div>
              <div className="flex items-center text-stellar-cyan text-sm mt-auto">
                <i className="fas fa-external-link-alt mr-2"></i>
                <span>Featured Attraction</span>
              </div>
            </a>

            {/* Visit Florida */}
            <a 
              href="https://www.visitflorida.com/listing/canaveral-tours/15412/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-emerald-900/90 to-green-900/90 rounded-2xl p-6 border border-emerald-500/30 hover:border-emerald-500/60 transition-all duration-300 transform hover:scale-105 cursor-pointer flex flex-col h-full"
            >
              <div className="text-center mb-3">
                <div className="flex justify-center mb-1">
                  <img src={visitFloridaLogo} alt="Visit Florida" className="h-8 w-auto max-w-full object-contain" />
                </div>
                <h3 className="text-white font-light text-sm tracking-wide" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>Visit Florida</h3>
                <p className="text-emerald-400 text-sm font-light">State Tourism Authority</p>
              </div>
              <div className="text-gray-200 text-sm leading-relaxed mb-4 flex-grow">
                "Canaveral Tours offers Lighthouse, Spaceflight and Wildlife Tours. We offer a unique 'No Sweat' experience where you can relax and avoid the stress of big city crowds."
              </div>
              <div className="flex items-center text-emerald-400 text-sm mt-auto">
                <i className="fas fa-star mr-2"></i>
                <span>Official State Listing</span>
              </div>
            </a>

            {/* Visit Cocoa Beach */}
            <a 
              href="https://visitcocoabeach.visitwidget.com/places/canaveral-tours-2"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-orange-900/90 to-red-900/90 rounded-2xl px-6 pt-3 pb-6 border border-orange-500/30 hover:border-orange-500/60 transition-all duration-300 transform hover:scale-105 cursor-pointer flex flex-col h-full"
            >
              <div className="text-center mb-3">
                <div className="flex justify-center mb-1">
                  <img src={visitCocoaBeachLogo} alt="Visit Cocoa Beach" className="h-28 w-auto max-w-full object-contain" />
                </div>
                <p className="text-orange-400 text-sm font-light">Regional Tourism Guide</p>
              </div>
              <div className="text-gray-200 text-sm leading-relaxed mb-4 flex-grow">
                "Enjoy the History & Natural Wonders of Florida. Tours to the Cape Canaveral Lighthouse & Space Force Station, Merritt Island Wildlife Refuge, Canaveral Seashore."
              </div>
              <div className="flex items-center text-orange-400 text-sm mt-auto">
                <i className="fas fa-award mr-2"></i>
                <span>Recommended Tour</span>
              </div>
            </a>
          </div>

          {/* Dynamic Stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-5xl font-bold text-stellar-cyan mb-1">3</div>
              <div className="text-base text-white font-normal tracking-wide leading-tight uppercase" style={{ fontFamily: 'Barlow Condensed, sans-serif', letterSpacing: '0.06em' }}>Tourism Sites</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-1">VISIT FLORIDA</div>
              <div className="text-base text-white font-normal tracking-wide leading-tight uppercase" style={{ fontFamily: 'Barlow Condensed, sans-serif', letterSpacing: '0.08em' }}>Verified</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400 mb-1">Lighthouse • Wildlife</div>
              <div className="text-base text-white font-normal tracking-wide leading-tight" style={{ fontFamily: 'Barlow Condensed, sans-serif', letterSpacing: '0.04em' }}>Guided tour types,<br />as listed on official sites</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-solar-gold mb-1">Featured by</div>
              <div className="text-base text-white font-normal tracking-wide leading-tight relative group uppercase" style={{ fontFamily: 'Barlow Condensed, sans-serif', letterSpacing: '0.07em' }}>
                Local DMOs
                <span className="inline-block ml-1">
                  <i className="fas fa-info-circle text-xs text-solar-gold/60 hover:text-solar-gold cursor-help"></i>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                    <div className="bg-black/95 text-white text-sm rounded-lg px-3 py-2 whitespace-nowrap border border-solar-gold/30">
                      Destination Marketing Organizations
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-black/95"></div>
                    </div>
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-cosmic-navy to-space-blue rounded-3xl p-12 border border-stellar-cyan/20">
            <h2 className="text-3xl font-bold text-starlight-white mb-4">
              Ready to Create Your Own Space Adventure?
            </h2>
            <p className="text-asteroid-gray mb-8 max-w-2xl mx-auto">
              Join hundreds of satisfied customers who have experienced the wonder of Cape Canaveral's lighthouse and space history.
            </p>
            <button 
              onClick={() => {
                const element = document.getElementById('booking');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.location.href = '/#booking';
                }
              }}
              className="bg-gradient-to-r from-rocket-orange to-solar-gold hover:from-solar-gold hover:to-rocket-orange text-[#18253C] px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              <i className="fas fa-calendar-check mr-2"></i>
              Book Your Tour Today
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}