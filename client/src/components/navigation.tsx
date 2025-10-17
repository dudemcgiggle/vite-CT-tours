import { useState, useEffect, useId, useRef } from "react";
import { Link } from "wouter";
import { useScroll } from "@/hooks/use-scroll";
import logoPath from "@assets/Asset 2mdpi_1755027691874.png";

// Sleek dropdown component
function ToursDropdown() {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const openTimer = useRef<NodeJS.Timeout | null>(null);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);
  const menuId = useId();

  // Menu items
  const items = [
    {
      label: "Lighthouse & Spaceflight Tour",
      href: "/lighthouse-tours"
    },
    {
      label: "Wildlife Tours",
      href: "/wildlife-tours"
    },
    {
      label: "Airboat Tours",
      href: "/airboat-tours"
    },
  ];

  // Open with slight intent delay on hover
  const handleMouseEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    openTimer.current = setTimeout(() => setOpen(true), 80);
  };
  const handleMouseLeave = () => {
    if (openTimer.current) clearTimeout(openTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  };

  const toggle = () => setOpen((v) => !v);

  // Close on outside click
  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, []);

  // Reset highlight when closed
  useEffect(() => {
    if (!open) setActiveIndex(-1);
  }, [open]);

  // Keyboard on button
  const onButtonKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
      setTimeout(() => {
        setActiveIndex(0);
        itemsRef.current[0]?.focus();
      }, 0);
    }
  };

  // Keyboard on menu
  const onMenuKeyDown = (e: React.KeyboardEvent) => {
    const max = items.length - 1;
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = activeIndex < max ? activeIndex + 1 : 0;
      setActiveIndex(next);
      itemsRef.current[next]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = activeIndex > 0 ? activeIndex - 1 : max;
      setActiveIndex(prev);
      itemsRef.current[prev]?.focus();
    }
  };

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger */}
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={toggle}
        onKeyDown={onButtonKeyDown}
        className="group inline-flex items-center gap-1 text-sm tracking-wider transition-colors duration-300 text-white hover:text-rocket-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-rocket-orange/30 leading-none"
        style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 300 }}
      >
        Tours
        <ChevronIcon
          className={`ml-1 h-3 w-3 transition-transform duration-300 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
        <span className="sr-only">Open Tours menu</span>
      </button>

      {/* Menu */}
      <div
        id={menuId}
        role="menu"
        aria-label="Tours"
        onKeyDown={onMenuKeyDown}
        className={`absolute left-0 top-full z-[9999] w-72 pt-2 transition-all duration-200 ease-out origin-top ${
          open
            ? "pointer-events-auto opacity-100 translate-y-0 scale-100"
            : "pointer-events-none opacity-0 -translate-y-1 scale-95"
        }`}
      >
        {/* Drop shadow + border + subtle glass */}
        <div className="relative rounded-xl border border-gray-200/80 bg-white/95 backdrop-blur-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.4)] ring-1 ring-black/5">
          {/* Caret */}
          <div className="pointer-events-none absolute -top-1.5 left-6 h-3 w-3 rotate-45 bg-white border-l border-t border-gray-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.06)]" />


          {/* Optional heading */}
          <div className="px-4 pt-3 pb-2">
            <p className="text-[11px] uppercase tracking-[0.18em] text-gray-500">
              Explore
            </p>
          </div>

          <ul className="py-1">
            {items.map((item, i) => (
              <li key={item.href}>
                <a
                  ref={(el) => (itemsRef.current[i] = el)}
                  role="menuitem"
                  href={item.href}
                  tabIndex={open ? 0 : -1}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`block w-full text-left px-4 py-2.5 outline-none text-sm text-gray-400 hover:text-[#18253C] transition-all duration-200 ${
                    activeIndex === i ? "bg-gray-50/50 text-[#18253C] shadow-md" : "bg-transparent"
                  }`}
                  style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 300 }}
                >
                  <div className="flex items-center gap-3">
                    <div>
                      <SparkleIcon className={`h-4 w-4 transition-all duration-200 ${
                        activeIndex === i ? "opacity-100 text-[#18253C] drop-shadow-sm" : "opacity-70"
                      }`} />
                    </div>
                    <div className="truncate">{item.label}</div>
                  </div>
                </a>
              </li>
            ))}
          </ul>


        </div>
      </div>
    </div>
  );
}

// Minimal inline icons
function ChevronIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SparkleIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 2l1.6 4.3L18 8l-4.4 1.7L12 14l-1.6-4.3L6 8l4.4-1.7L12 2z" fill="currentColor" />
    </svg>
  );
}

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollY = useScroll();

  const navBackground = scrollY > 50 
    ? "backdrop-blur-md bg-[#15233A]/80 border-b border-white/10" 
    : "backdrop-blur-md bg-[#15233A]/70";

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`w-full transition-all duration-300 ${navBackground} fixed top-0 z-50`}>
      <div className="max-w-none mx-auto px-6 lg:px-12 xl:px-16 2xl:px-24 pt-[4px] pb-[4px]">
        <div className="flex justify-between items-center py-2">
          <div className="flex items-center">
            <img 
              src={logoPath} 
              alt="Canaveral Tours Logo" 
              className="h-20 sm:h-24 lg:h-28 w-auto mr-2 sm:mr-3 lg:mr-4 object-contain"
            />
            <div className="text-lg sm:text-xl text-white tracking-wide" style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 300 }}>
              Canaveral Tours
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-baseline space-x-4 lg:space-x-6 xl:space-x-8">
            <button 
              onClick={() => scrollToSection("home")}
              className="text-sm text-white hover:text-rocket-orange transition-colors duration-300 tracking-wider leading-none"
              style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 300 }}
            >
              Home
            </button>
            <ToursDropdown />
            <button 
              onClick={() => scrollToSection("about")}
              className="text-sm text-white hover:text-rocket-orange transition-colors duration-300 tracking-wider leading-none"
              style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 300 }}
            >
              About
            </button>
            <Link 
              href="/reviews"
              className="text-sm text-white hover:text-rocket-orange transition-colors duration-300 tracking-wider leading-none"
              style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 300 }}
            >
              Reviews
            </Link>
            <Link 
              href="/availability"
              className="text-sm text-white hover:text-rocket-orange transition-colors duration-300 tracking-wider leading-none"
              style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 300 }}
            >
              Live Tours
            </Link>
            <button 
              onClick={() => scrollToSection("contact")}
              className="text-sm text-white hover:text-rocket-orange transition-colors duration-300 tracking-wider leading-none"
              style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 300 }}
            >
              Contact
            </button>
          </div>
          
          <div className="hidden md:block">
            <button 
              onClick={() => scrollToSection("booking")}
              className="text-[#18253C] px-4 py-1.5 rounded-full transition-all duration-300 animate-pulse-glow hover:opacity-80 text-sm"
              style={{ backgroundColor: '#FFC107', fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}
            >
              Book Now
            </button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white"
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-effect border-t border-white/20">
          <div className="px-4 py-4 space-y-3">
            <button 
              onClick={() => scrollToSection("home")}
              className="block text-sm text-white hover:text-rocket-orange transition-colors w-full text-left tracking-wider"
              style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 300 }}
            >
              Home
            </button>
            <Link
              href="/lighthouse-tours"
              className="block text-sm text-white hover:text-rocket-orange transition-colors w-full text-left tracking-wider"
              style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 300 }}
            >
              Tours
            </Link>
            <button 
              onClick={() => scrollToSection("about")}
              className="block text-sm text-white hover:text-rocket-orange transition-colors w-full text-left tracking-wider"
              style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 300 }}
            >
              About
            </button>
            <Link
              href="/reviews"
              className="block text-sm text-white hover:text-rocket-orange transition-colors w-full text-left tracking-wider"
              style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 300 }}
            >
              Reviews
            </Link>
            <Link
              href="/availability"
              className="block text-sm text-white hover:text-rocket-orange transition-colors w-full text-left tracking-wider"
              style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 300 }}
            >
              Live Tours
            </Link>
            <button 
              onClick={() => scrollToSection("contact")}
              className="block text-sm text-white hover:text-rocket-orange transition-colors w-full text-left tracking-wider"
              style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 300 }}
            >
              Contact
            </button>
            <button 
              onClick={() => scrollToSection("booking")}
              className="w-full text-[#18253C] px-6 py-2 rounded-full transition-all duration-300 mt-4 hover:opacity-80"
              style={{ backgroundColor: '#FFC107', fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}
            >
              Book Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
