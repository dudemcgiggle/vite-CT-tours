import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ToursSection from "@/components/tours-section";
import AboutSection from "@/components/about-section";
import ReviewsSection from "@/components/reviews-section";
import BookingSection from "@/components/booking-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-space-blue text-starlight-white font-source">
      <Navigation />
      <HeroSection />
      <ToursSection />
      <AboutSection />
      <ReviewsSection />
      <BookingSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
