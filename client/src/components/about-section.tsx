export default function AboutSection() {
  return (
    <section 
      id="about" 
      className="py-20 relative parallax-bg" 
      style={{
        backgroundImage: `linear-gradient(rgba(11, 20, 38, 0.85), rgba(30, 42, 71, 0.85)), url('https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <div>
            <h2 className="text-4xl md:text-5xl font-inter font-bold mb-8">
              Where
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rocket-orange to-solar-gold">
                {" "}History{" "}
              </span>
              Meets the Future
            </h2>
            
            <p className="text-xl text-asteroid-gray mb-6 leading-relaxed">
              For over 25 years, Canaveral Tours has been the premier gateway to Cape Canaveral's most incredible experiences. We bridge the gap between historical exploration and space-age innovation.
            </p>
            
            <p className="text-lg text-asteroid-gray mb-8 leading-relaxed">
              From the lighthouse that guided early explorers to the launch pads that propel humanity to the stars, our expert guides bring these stories to life with passion and unparalleled knowledge.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center text-starlight-white">
                <div className="w-8 h-8 bg-rocket-orange rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <i className="fas fa-check text-sm text-[#18253C]"></i>
                </div>
                <span>Certified expert guides with 15+ years experience</span>
              </div>
              <div className="flex items-center text-starlight-white">
                <div className="w-8 h-8 bg-stellar-cyan rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <i className="fas fa-check text-sm text-[#18253C]"></i>
                </div>
                <span>Exclusive access to restricted historical sites</span>
              </div>
              <div className="flex items-center text-starlight-white">
                <div className="w-8 h-8 bg-solar-gold rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <i className="fas fa-check text-sm text-[#18253C]"></i>
                </div>
                <span>Small group sizes for personalized experiences</span>
              </div>
            </div>
            
            <button className="bg-gradient-to-r from-rocket-orange to-solar-gold hover:from-solar-gold hover:to-rocket-orange text-[#18253C] px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105">
              <i className="fas fa-info-circle mr-2 text-[#18253C]"></i>
              Learn Our Story
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div 
              className="bg-cover bg-center h-96 rounded-2xl shadow-xl" 
              style={{
                backgroundImage: `url('/images/hero-rocket.jpg')`,
                backgroundPosition: 'center bottom'
              }}
            ></div>
            <div 
              className="bg-cover bg-center h-64 rounded-2xl shadow-xl mt-8" 
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1446776877081-d282a0f896e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=600')`
              }}
            ></div>
          </div>
          
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-10 left-10 text-solar-gold animate-float opacity-20 hidden lg:block">
        <i className="fas fa-satellite text-3xl"></i>
      </div>
      <div className="absolute bottom-10 right-10 text-stellar-cyan animate-float opacity-20 hidden lg:block" style={{animationDelay: "-3s"}}>
        <i className="fas fa-globe text-4xl"></i>
      </div>
    </section>
  );
}
