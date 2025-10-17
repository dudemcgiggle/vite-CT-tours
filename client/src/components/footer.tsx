import logoPath from "@assets/Asset 2mdpi_1755027691874.png";

export default function Footer() {
  return (
    <footer className="footer text-white" style={{ backgroundColor: '#5a5a5a', boxShadow: '0 -8px 16px rgba(0, 0, 0, 0.3)' }}>
      {/* Top Keyline Separator */}
      <div className="h-px" style={{ backgroundColor: '#d0d0d0' }}></div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Logo and Company Name Section */}
        <div className="flex items-center justify-center mb-12">
          <img 
            src={logoPath} 
            alt="Canaveral Tours Logo" 
            className="h-20 w-auto mr-4"
            loading="lazy"
          />
          <div className="text-2xl text-starlight-white tracking-wide" style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 300 }}>
            Canaveral Tours
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Tours & Experiences */}
          <div className="footer-col">
            <h3 className="footer-heading text-lg font-semibold mb-4 text-starlight-white">
              Tours & Experiences
            </h3>
            <ul className="footer-list space-y-2">
              <li>
                <a 
                  href="https://canaveral.tours/lighthouse-tours/" 
                  target="_blank" 
                  rel="noopener"
                  className="footer-link text-asteroid-gray hover:text-stellar-cyan transition-colors duration-300"
                >
                  Lighthouse & Spaceflight Tour
                </a>
              </li>
              <li>
                <a 
                  href="https://canaveral.tours/wildlife-tours/" 
                  target="_blank" 
                  rel="noopener"
                  className="footer-link text-asteroid-gray hover:text-stellar-cyan transition-colors duration-300"
                >
                  Wildlife Tour
                </a>
              </li>
              <li>
                <a 
                  href="https://canaveral.tours/book-your-tour/" 
                  target="_blank" 
                  rel="noopener"
                  className="footer-link text-asteroid-gray hover:text-stellar-cyan transition-colors duration-300"
                >
                  Book Your Tour
                </a>
              </li>
            </ul>
          </div>

          {/* Helpful Links */}
          <div className="footer-col">
            <h3 className="footer-heading text-lg font-semibold mb-4 text-starlight-white">
              Helpful Links
            </h3>
            <ul className="footer-list space-y-2">
              <li>
                <a 
                  href="https://canaveral.tours/about-us/" 
                  target="_blank" 
                  rel="noopener"
                  className="footer-link text-asteroid-gray hover:text-stellar-cyan transition-colors duration-300"
                >
                  About Us
                </a>
              </li>
              <li>
                <a 
                  href="https://canaveral.tours/meet-your-guides/" 
                  target="_blank" 
                  rel="noopener"
                  className="footer-link text-asteroid-gray hover:text-stellar-cyan transition-colors duration-300"
                >
                  Meet Your Guides
                </a>
              </li>
              <li>
                <a 
                  href="https://canaveral.tours/tour-reviews/" 
                  target="_blank" 
                  rel="noopener"
                  className="footer-link text-asteroid-gray hover:text-stellar-cyan transition-colors duration-300"
                >
                  Tour Reviews
                </a>
              </li>
              <li>
                <a 
                  href="https://canaveral.tours/f-a-q/" 
                  target="_blank" 
                  rel="noopener"
                  className="footer-link text-asteroid-gray hover:text-stellar-cyan transition-colors duration-300"
                >
                  F.A.Q.
                </a>
              </li>
              <li>
                <a 
                  href="https://canaveral.tours/lhsecurityinfo/" 
                  target="_blank" 
                  rel="noopener"
                  className="footer-link text-asteroid-gray hover:text-stellar-cyan transition-colors duration-300"
                >
                  Security Clearance Form
                </a>
              </li>
            </ul>
          </div>

          {/* More Resources */}
          <div className="footer-col">
            <h3 className="footer-heading text-lg font-semibold mb-4 text-starlight-white">
              More Resources
            </h3>
            
            <h4 className="footer-subheading text-sm font-medium mb-2 text-stellar-cyan">
              Lighthouse
            </h4>
            <ul className="footer-list space-y-2 mb-4">
              <li>
                <a 
                  href="/space-force-museum"
                  className="footer-link text-asteroid-gray hover:text-stellar-cyan transition-colors duration-300"
                >
                  Space Force Museum
                </a>
              </li>
              <li>
                <a 
                  href="https://canaveral.tours/a-living-light/" 
                  target="_blank" 
                  rel="noopener"
                  className="footer-link text-asteroid-gray hover:text-stellar-cyan transition-colors duration-300"
                >
                  A Living Light Exhibit
                </a>
              </li>
              <li>
                <a 
                  href="https://canaverallight.org/visit/" 
                  target="_blank" 
                  rel="noopener"
                  className="footer-link text-asteroid-gray hover:text-stellar-cyan transition-colors duration-300"
                >
                  Canaveral Lighthouse Foundation
                </a>
              </li>
            </ul>

            <h4 className="footer-subheading text-sm font-medium mb-2 text-stellar-cyan">
              Wildlife
            </h4>
            <ul className="footer-list space-y-2">
              <li>
                <a 
                  href="https://canaveral.tours/merritt-island-wildlife-refuge/" 
                  target="_blank" 
                  rel="noopener"
                  className="footer-link text-asteroid-gray hover:text-stellar-cyan transition-colors duration-300"
                >
                  Merritt Island Wildlife Refuge
                </a>
              </li>
              <li>
                <a 
                  href="https://canaveral.tours/area-history/" 
                  target="_blank" 
                  rel="noopener"
                  className="footer-link text-asteroid-gray hover:text-stellar-cyan transition-colors duration-300"
                >
                  Space Coast Area History
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h3 className="footer-heading text-lg font-semibold mb-4 text-starlight-white">
              Contact
            </h3>
            <address className="footer-address not-italic space-y-2">
              <div>
                <a 
                  href="tel:+13213072900" 
                  className="footer-contact text-asteroid-gray hover:text-stellar-cyan transition-colors duration-300"
                >
                  (321) 307‑2900
                </a>
              </div>
              <div>
                <a 
                  href="mailto:contactus@canaveral.tours" 
                  className="footer-contact text-asteroid-gray hover:text-stellar-cyan transition-colors duration-300"
                >
                  contactus@canaveral.tours
                </a>
              </div>
              <div className="text-asteroid-gray text-sm leading-relaxed">
                P.O. BOX 365,<br />
                Titusville, FL 32781
              </div>
            </address>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10" style={{ backgroundColor: '#4a4a4a' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            
            {/* Empty space for logo (now moved above) */}
            <div className="flex-shrink-0"></div>

            {/* Policies */}
            <div className="footer-policies text-center">
              <div className="text-sm text-asteroid-gray">
                <a 
                  href="https://canaveral.tours/cancellation-policy/" 
                  target="_blank" 
                  rel="noopener"
                  className="hover:text-stellar-cyan transition-colors duration-300"
                >
                  Cancellation Policy
                </a>
                <span className="mx-2">|</span>
                <a 
                  href="https://canaveral.tours/privacy-policy/" 
                  target="_blank" 
                  rel="noopener"
                  className="hover:text-stellar-cyan transition-colors duration-300"
                >
                  Privacy Policy
                </a>
              </div>
            </div>

            {/* Brand Section */}
            <div className="footer-brand flex items-center gap-6">
              
              {/* Review Badges */}
              <div className="flex items-center gap-3">
                <a 
                  href="https://www.kayak.com" 
                  target="_blank" 
                  rel="noopener"
                  className="footer-badge opacity-70 hover:opacity-100 transition-opacity duration-300"
                >
                  <img 
                    src="https://content.r9cdn.net/rimg/seo/badges/v1/DARK_LARGE_LOGO_KAYAK.png" 
                    alt="Kayak badge" 
                    className="h-6"
                    loading="lazy"
                  />
                </a>
                <a 
                  href="https://www.tripadvisor.com/Attraction_Review-g34574-d14133588-Reviews-Canaveral_Tours-Port_Canaveral_Brevard_County_Florida.html#REVIEWS" 
                  target="_blank" 
                  rel="noopener"
                  className="footer-badge opacity-70 hover:opacity-100 transition-opacity duration-300"
                >
                  <img 
                    src="https://canaveral.tours/wp-content/uploads/2024/07/TA.png" 
                    alt="Tripadvisor badge" 
                    className="h-6"
                    loading="lazy"
                  />
                </a>
              </div>

              {/* Social Media Icons */}
              <div className="footer-social flex items-center gap-4">
                <a 
                  href="https://www.facebook.com/CanaveralLighthouseandWildlifeTours/photos/" 
                  aria-label="Facebook" 
                  rel="noopener" 
                  target="_blank"
                  className="text-asteroid-gray hover:text-stellar-cyan transition-colors duration-300"
                >
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2C6.5 2 2 6.5 2 12c0 5 3.7 9.1 8.4 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2 0.2 2.2 0.2v2.5h-1.3c-1.2 0-1.6 0.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7C18.3 21.1 22 17 22 12c0-5.5-4.5-10-10-10z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.instagram.com/canaveral.tours/" 
                  aria-label="Instagram" 
                  rel="noopener" 
                  target="_blank"
                  className="text-asteroid-gray hover:text-stellar-cyan transition-colors duration-300"
                >
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}