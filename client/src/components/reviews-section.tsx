import { useQuery } from "@tanstack/react-query";
import { type Review } from "@shared/schema";

export default function ReviewsSection() {
  const { data: reviews, isLoading } = useQuery<Review[]>({
    queryKey: ["/api/reviews"],
  });

  if (isLoading) {
    return (
      <section id="reviews" className="py-20 bg-gradient-to-b from-cosmic-navy to-space-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-lg text-asteroid-gray">Loading reviews...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="reviews" className="py-20 bg-gradient-to-b from-cosmic-navy to-space-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-inter font-bold mb-6">
            What Our
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-stellar-cyan to-nebula-purple">
              {" "}Explorers{" "}
            </span>
            Say
          </h2>
          <div className="flex items-center justify-center mb-4">
            <div className="flex text-solar-gold text-2xl mr-4">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </div>
            <span className="text-xl text-asteroid-gray">4.8 out of 5 stars (253 verified reviews)</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {reviews && reviews.length > 0 ? (
            reviews.slice(0, 3).map((review) => (
              <div key={review.id} className="bg-gradient-to-br from-cosmic-navy to-space-blue rounded-2xl p-8 shadow-xl border border-white/10 hover:border-stellar-cyan/30 transition-all duration-300">
                <div className="flex text-solar-gold mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <i key={i} className="fas fa-star"></i>
                  ))}
                </div>
                <p className="text-asteroid-gray mb-6 leading-relaxed">
                  "{review.comment}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4 ring-2 ring-stellar-cyan/30">
                    <img 
                      src={`/avatars/${review.guestName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}.png`}
                      alt={`${review.guestName} avatar`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        // Fallback to UI Avatars if authentic avatar not found
                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.guestName)}&background=22B5B0&color=ffffff&size=48&font-size=0.6&bold=true`;
                      }}
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-starlight-white">{review.guestName}</div>
                    <div className="text-sm text-asteroid-gray flex items-center">
                      {review.date}
                      {review.isVerified === "true" && (
                        <i className="fas fa-check-circle text-stellar-cyan ml-2 text-xs"></i>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center text-asteroid-gray">
              No reviews available at this time.
            </div>
          )}
        </div>

        {/* Google Reviews Integration */}
        <div className="text-center">
          <div className="inline-flex items-center bg-gradient-to-r from-cosmic-navy to-space-blue border border-stellar-cyan/20 rounded-full px-6 py-3 shadow-xl hover:border-stellar-cyan/40 transition-all duration-300">
            <div className="flex items-center bg-white rounded-full px-4 py-2 mr-4">
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-6 w-auto" />
            </div>
            <span className="text-starlight-white font-bold text-lg mr-2">4.8</span>
            <div className="flex text-solar-gold mr-2">
              <i className="fas fa-star text-base"></i>
              <i className="fas fa-star text-base"></i>
              <i className="fas fa-star text-base"></i>
              <i className="fas fa-star text-base"></i>
              <i className="fas fa-star text-base"></i>
            </div>
            <span className="text-starlight-white text-sm font-medium">(253 verified reviews)</span>
          </div>
          
          <div className="mt-8">
            <button className="border-2 border-stellar-cyan text-stellar-cyan hover:bg-stellar-cyan hover:text-space-blue px-8 py-3 rounded-full font-semibold transition-all duration-300">
              <i className="fas fa-external-link-alt mr-2"></i>
              Read All Reviews
            </button>
          </div>
        </div>
        
      </div>
    </section>
  );
}
