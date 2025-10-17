import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Clock, Users, Star, DollarSign, Info, ExternalLink, Phone, Mail, RefreshCw, MapPin, Camera, Rocket, Building, AlertTriangle, CheckCircle, ChevronLeft, ChevronRight, Zap, Radio, Scan } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import MeetingPoint from "@/components/MeetingPoint";
import { NextAvailableButton } from "@/components/NextAvailableButton";
import TourCalendar from "@/components/TourCalendar";

interface TourSlot {
  productId: string;
  optionId: string;
  name: string;
  optionName: string;
  nextStartISO: string;
  capacity: number;
  vacancies: number;
  filled: number;
  price: number;
  rating: number;
  reviewCount: number;
  status: string;
  waitlist: boolean;
}

interface ToursResponse {
  updatedAt: string;
  toursByProduct: Record<string, TourSlot[]>;
  source: string;
  totalSlots: number;
  demoMode: boolean;
  calendarMonth: string;
}

// Data normalization function to prevent negative numbers and ensure consistency
function normalizeSlot(raw: any, productId: string) {
  const rawVacancies = Number(
    raw.vacancies ?? raw.spots_left ?? raw.spotsLeft ?? NaN
  );
  const rawCapacity  = Number(raw.capacity ?? NaN);
  const rawFilled    = Number(raw.filled ?? NaN);

  // Capacity: must be >= 0 and >= vacancies (never smaller than what's left)
  let capacity = Number.isFinite(rawCapacity) && rawCapacity > 0
    ? rawCapacity
    : (Number.isFinite(rawVacancies) ? rawVacancies : 0);
  if (Number.isFinite(rawVacancies) && rawVacancies > capacity) {
    capacity = rawVacancies; // guard rail: never let capacity < vacancies
  }

  // Booked: prefer explicit 'filled', otherwise derive from capacity & vacancies
  let booked = Number.isFinite(rawFilled)
    ? rawFilled
    : (Number.isFinite(capacity) && Number.isFinite(rawVacancies)
        ? capacity - rawVacancies
        : 0);

  // FINAL CLAMPS: booked must be [0, capacity]; vacancies derived from that
  booked = Math.max(0, Math.min(capacity, booked));
  const vacancies = Math.max(0, capacity - booked);

  // Percent is always 0–100
  const pct = capacity > 0 ? Math.round((booked / capacity) * 100) : 0;

  // Optional sanity log for debugging
  if (process.env.NODE_ENV !== "production") {
    if (!Number.isFinite(rawCapacity) || !Number.isFinite(rawVacancies)) {
      console.warn("[AVAILABILITY] missing capacity/vacancies", { productId, raw });
    }
    if (rawVacancies > capacity) {
      console.warn("[AVAILABILITY] vacancies > capacity; corrected", { productId, capacity, rawVacancies });
    }
  }

  return { capacity, booked, vacancies, pct };
}

// Tour details database (prices come from webhook data)
const TOUR_DETAILS = {
  "lighthouse-spaceflight": {
    name: "Lighthouse & Spaceflight Premier Tour",
    description: "Experience the ultimate Cape Canaveral adventure combining historic lighthouse exploration with cutting-edge spaceflight facilities.",
    duration: "4 hours",
    highlights: [
      "Climb 151 foot Cape Canaveral Lighthouse",
      "Exclusive Kennedy Space Center viewing areas", 
      "LC-39A SpaceX launch pad tours"
    ],
    fullHighlights: [
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
        description: "When schedules align, this location offers the closest, cleanest view you can get on a guided tour: clear pad geometry, crisp countdown narration, and a safe, unobstructed angle on the moment a mission leaves Earth. It's as close to 'front-row at a spaceport' as most visitors will ever experience.",
        icon: Scan
      }
    ],
    included: [
      "Professional tour guide",
      "Transportation between sites", 
      "All admission fees",
      "Lighthouse climbing permit",
      "Complimentary refreshments",
      "Souvenir photo package"
    ],
    meetingPoint: "Sands Space History Center parking area (100 Space Port Way, Cape Canaveral, FL)",
    rating: 4.8,
    reviewCount: 253,
    image: "lighthouse-spaceflight.jpg",
    icon: <Rocket className="w-6 h-6" />,
    color: "from-blue-500 to-purple-600"
  },
  "hangar-c": {
    name: "Lighthouse & Hangar C Excursion",
    description: "Discover the fascinating history of early space program development and maritime navigation in this comprehensive tour.",
    duration: "2 hours",
    highlights: [
      "Historic Hangar C exploration",
      "Early rocket testing exhibits",
      "Lighthouse keeper quarters tour"
    ],
    fullHighlights: [
      {
        title: "Historic Hangar C Exploration",
        description: "Step inside the authentic Hangar C facility where America's early rockets were assembled and tested. See original equipment and learn about the pioneering engineers who worked here.",
        icon: Building
      },
      {
        title: "Early Rocket Testing Exhibits", 
        description: "Discover vintage rockets and testing equipment that paved the way for modern spaceflight. Interactive displays show how early experiments led to today's achievements.",
        icon: Rocket
      },
      {
        title: "Lighthouse Keeper Quarters",
        description: "Tour the restored lighthouse keeper's living quarters and learn about daily life maintaining the beacon that guided ships past Cape Canaveral's dangerous shoals.",
        icon: Radio
      }
    ],
    included: [
      "Expert historical guide",
      "Hangar C access pass",
      "Lighthouse grounds tour",
      "Educational materials",
      "Light refreshments"
    ],
    meetingPoint: "Sands Space History Center parking area (100 Space Port Way, Cape Canaveral, FL)",
    rating: 4.7,
    reviewCount: 189,
    image: "hangar-c.jpg", 
    icon: <Building className="w-6 h-6" />,
    color: "from-orange-500 to-red-600"
  },
  "missile-museum": {
    name: "Lighthouse & Missile Museum Excursion",
    description: "Journey through decades of missile technology advancement while exploring Cape Canaveral's maritime heritage.",
    duration: "3 hours",
    highlights: [
      "Air Force Space & Missile Museum",
      "Historic missile displays", 
      "Lighthouse restoration exhibits"
    ],
    fullHighlights: [
      {
        title: "Air Force Space & Missile Museum",
        description: "Explore the extensive collection of historic missiles and rockets at this authentic museum located on Cape Canaveral Space Force Station.",
        icon: Camera
      },
      {
        title: "Historic Missile Displays",
        description: "Get up close with actual Redstone, Atlas, and other pioneering rockets that launched America's first satellites and astronauts into space.", 
        icon: Rocket
      },
      {
        title: "Launch Complex 26 Viewing",
        description: "Visit the historic Launch Complex 26 where many early space missions began, including the first U.S. satellite launch in 1958.",
        icon: Zap
      },
      {
        title: "Interactive Space Simulators",
        description: "Experience hands-on simulators that let you feel what it's like to pilot spacecraft and understand the challenges of space exploration.",
        icon: Scan
      }
    ],
    included: [
      "Museum admission",
      "Guided missile complex tour",
      "Lighthouse access",
      "Interactive exhibits",
      "Parking included",
      "Educational handbook"
    ],
    meetingPoint: "Sands Space History Center parking area (100 Space Port Way, Cape Canaveral, FL)",
    rating: 4.9,
    reviewCount: 312,
    image: "missile-museum.jpg",
    icon: <Camera className="w-6 h-6" />,
    color: "from-green-500 to-teal-600"
  }
};

function getStatusColor(status: string) {
  switch (status) {
    case "AVAILABLE":
      return "bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 border border-emerald-200 shadow-sm";
    case "LIMITED":
      return "bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-700 border border-amber-200 shadow-sm";
    case "SOLD_OUT":
      return "bg-gradient-to-r from-red-50 to-rose-50 text-red-700 border border-red-200 shadow-sm";
    case "NO_UPCOMING":
      return "bg-gradient-to-r from-slate-50 to-gray-50 text-slate-600 border border-slate-200 shadow-sm";
    case "NO_API_ACCESS":
      return "bg-gradient-to-r from-orange-50 to-amber-50 text-orange-700 border border-orange-200 shadow-sm";
    case "API_ERROR":
      return "bg-gradient-to-r from-red-50 to-rose-50 text-red-700 border border-red-200 shadow-sm";
    case "ERROR":
      return "bg-gradient-to-r from-red-50 to-rose-50 text-red-700 border border-red-200 shadow-sm";
    case "NO_DATA":
      return "bg-gradient-to-r from-slate-50 to-gray-50 text-slate-600 border border-slate-200 shadow-sm";
    default:
      return "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200 shadow-sm";
  }
}

function getStatusText(status: string) {
  switch (status) {
    case "AVAILABLE":
      return "Available Now";
    case "LIMITED":  
      return "Few Spots Left";
    case "SOLD_OUT":
      return "Sold Out";
    case "NO_UPCOMING":
      return "No Upcoming Tours";
    case "NO_API_ACCESS":
      return "API Configuration Required";
    case "API_ERROR":
      return "Connection Error";
    case "NO_DATA":
      return "Loading Availability";
    case "ERROR":
      return "System Error";
    default:
      return "Checking Availability";
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case "AVAILABLE":
      return <CheckCircle className="w-4 h-4" />;
    case "LIMITED":
      return <AlertTriangle className="w-4 h-4" />;
    case "SOLD_OUT":
    case "API_ERROR":
    case "ERROR":
      return <AlertTriangle className="w-4 h-4" />;
    default:
      return <Clock className="w-4 h-4" />;
  }
}

function TourCard({ 
  productId, 
  allToursForProduct, 
  currentTourIndex, 
  details, 
  onTourChange, 
  lastDirection
}: {
  productId: string;
  allToursForProduct: TourSlot[];
  currentTourIndex: number;
  details: any;
  onTourChange: (productId: string, direction: 'next' | 'prev') => void;
  lastDirection?: 'next' | 'prev' | null;
}) {
  const tour = allToursForProduct[currentTourIndex];
  if (!tour) return null;

  const nextTourDate = tour.nextStartISO 
    ? format(new Date(tour.nextStartISO), "MMM d, h:mm a")
    : "No upcoming dates";

  // Use normalized data to prevent negative numbers and ensure consistency
  const { capacity, booked, vacancies: spotsLeft, pct: occupancyPct } =
    normalizeSlot(tour, productId);
  const soldOut = capacity > 0 && booked >= capacity;

  return (
    <Card className="h-full grid grid-rows-[auto_1fr_auto]">
      {/* HEADER */}
      <CardHeader className="pb-3 space-y-2">
        {/* Row 1: Title + Price */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold leading-tight">{details.name}</h3>
          <div className="text-right">
            <div className="text-lg font-semibold text-emerald-300">${tour.price.toFixed(2)}</div>
            <div className="text-[11px] opacity-80">per person</div>
          </div>
        </div>

        {/* Row 2: Date/Time pill + Availability status badge */}
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center rounded-full px-3 py-1 text-[12px] bg-white/10">
            {nextTourDate}
          </span>
          {soldOut ? (
            <span className="inline-flex items-center rounded-full px-2.5 py-1 text-[12px] bg-red-500/20 text-red-300">
              Sold out
            </span>
          ) : (
            <span className="inline-flex items-center rounded-full px-2.5 py-1 text-[12px] bg-white/10 text-emerald-200">
              {spotsLeft} spots available
            </span>
          )}
        </div>

        {/* Row 3: Meta line (duration only) */}
        <div className="text-xs opacity-80">{details.duration}</div>
      </CardHeader>

      {/* BODY */}
      <CardContent className="pt-0 space-y-3">
        {/* REMOVED: Description paragraphs as requested */}
        
        {/* Progress rail + numeric label (always visible) */}
        <div role="group" aria-label="Tour capacity">
          {capacity > 0 ? (
            <>
              {/* Capacity bar (no inner text) */}
              <Progress value={occupancyPct} className="mt-2" />
              
              {/* Text lives OUTSIDE the bar */}
              <div className="text-center text-[13px] mt-1.5 font-medium" aria-live="polite">
                {soldOut ? (
                  <span className="text-red-400">
                    {booked} of {capacity} booked • 0 left ({occupancyPct}% full) - Sold out
                  </span>
                ) : (
                  <span className="text-gray-100">
                    {booked} of {capacity} booked • {spotsLeft} left ({occupancyPct}% full)
                  </span>
                )}
              </div>
            </>
          ) : (
            <div className="mt-2 text-center text-xs opacity-80">
              Capacity to be announced—join waitlist.
            </div>
          )}
        </div>

        {/* Highlights (max 3) */}
        <div>
          <ul className="space-y-1.5 text-sm" style={{ fontFamily: 'Barlow Condensed', color: '#ffffff', letterSpacing: '0.03em' }}>
            {details.highlights.slice(0,3).map((highlight: string, idx: number) => (
              <li key={idx} className="font-normal">• {highlight}</li>
            ))}
          </ul>
          {details.highlights.length > 3 && (
            <button className="mt-2 text-[12px] opacity-80 underline">
              View all highlights
            </button>
          )}
        </div>

        {/* Meeting Point (collapsible) */}
        <details className="group">
          <summary className="list-none flex items-center justify-between cursor-pointer">
            <span className="text-sm font-medium flex items-center gap-2">
              <MapPin className="size-4" /> Meeting point
            </span>
            <Button asChild variant="secondary" size="sm" className="shrink-0">
              <a 
                href={`https://maps.google.com/maps/dir/?api=1&destination=${encodeURIComponent("Sands Space History Center, 100 Space Port Way, Cape Canaveral, FL")}`} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Get Directions
              </a>
            </Button>
          </summary>
          <div className="mt-3 text-sm leading-6">
            <div>Sands Space History Center parking area</div>
            <div>100 Space Port Way, Cape Canaveral, FL</div>
            <p className="text-xs opacity-80 mt-2">Located immediately right of guard lanes onto Cape Canaveral Space Force Station. Look for brown 'Sands Space History Center' signs.</p>
          </div>
        </details>
      </CardContent>

      {/* FOOTER */}
      <CardFooter className="pt-0 gap-3">
        {soldOut ? (
          <Button className="w-full bg-amber-500 hover:bg-amber-600" style={{ color: '#172554' }}>Join the Waitlist</Button>
        ) : (
          <Button className="w-full text-navy-900" style={{ color: '#172554' }}>Book Now</Button>
        )}
        
        <NextAvailableButton
          productId={productId}
          currentTourIndex={currentTourIndex}
          allToursForProduct={allToursForProduct}
          onTourChange={onTourChange}
        />
      </CardFooter>
    </Card>
  );
}



export default function AvailabilityDashboard() {
  const { data, isLoading, error, refetch } = useQuery<ToursResponse>({
    queryKey: ["/api/tours/all"],
    refetchInterval: 60000, // Auto-refresh every minute
  });

  // State to track which tour is currently displayed for each product  
  const [currentTourIndices, setCurrentTourIndices] = useState<Record<string, number>>({});
  
  // Card refs for NextAvailableButton functionality
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  const lastUpdate = data?.updatedAt 
    ? format(new Date(data.updatedAt), "MMM d, yyyy 'at' h:mm:ss a")
    : null;

  // Flatten all tours for NextAvailableButton
  const allTours: TourSlot[] = data?.toursByProduct 
    ? Object.values(data.toursByProduct).flat()
    : [];

  // Initialize current tour indices when data loads
  useEffect(() => {
    if (data?.toursByProduct) {
      const initialIndices: Record<string, number> = {};
      Object.keys(data.toursByProduct).forEach(productId => {
        if (currentTourIndices[productId] === undefined) {
          initialIndices[productId] = 0; // Start with the first tour for each product
        }
      });
      if (Object.keys(initialIndices).length > 0) {
        setCurrentTourIndices(prev => ({ ...prev, ...initialIndices }));
      }
    }
  }, [data?.toursByProduct, currentTourIndices]);

  // Ensure cardRefs array matches tour count
  useEffect(() => {
    if (allTours.length > 0) {
      cardRefs.current = cardRefs.current.slice(0, allTours.length);
    }
  }, [allTours.length]);

  // Keep last direction for slide-in animations
  const lastDirectionRef = useRef<{[productId: string]: 'next' | 'prev'}>({});

  const handleTourChange = (productId: string, direction: 'next' | 'prev') => {
    const list = data?.toursByProduct?.[productId] || [];
    if (list.length === 0) return;

    setCurrentTourIndices(prev => {
      const curr = prev[productId] ?? 0;
      const max = list.length - 1;
      const next = direction === 'next' ? Math.min(curr + 1, max) : Math.max(curr - 1, 0);
      if (next === curr) return prev; // no change at bounds
      // remember direction for this product so the new card knows which way to slide in
      lastDirectionRef.current[productId] = direction;
      return { ...prev, [productId]: next };
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Live Tour Availability</h1>
            <p className="text-muted-foreground mt-1">Real-time booking status and tour information</p>
            <div className="flex items-center gap-2 mt-2 text-sm text-blue-600">
              <Calendar className="w-4 h-4" />
              <span>Hover over cards and use ← → arrows to browse different tour dates</span>
            </div>
          </div>
          <Skeleton className="h-10 w-24" />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="h-2 bg-gray-200" />
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-lg" />
                    <div>
                      <Skeleton className="h-5 w-48 mb-2" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                  <div className="text-right">
                    <Skeleton className="h-6 w-16 mb-2" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-4 w-3/4 mb-4" />
                <div className="space-y-2">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-2 w-full" />
                </div>
                <div className="mt-4 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
                <Skeleton className="h-10 w-full mt-4" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <AlertTriangle className="w-12 h-12 text-destructive" />
        <h2 className="text-xl font-semibold">Unable to Load Tour Data</h2>
        <p className="text-muted-foreground text-center max-w-md">
          We're having trouble connecting to our booking system. Please try again in a moment.
        </p>
        <Button onClick={() => refetch()} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Live Tour Availability</h1>
          <p className="text-muted-foreground mt-1">
            Real-time booking status and detailed tour information
          </p>
          {lastUpdate && (
            <p className="text-sm text-muted-foreground mt-1">
              Last updated: {lastUpdate}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
            Live Data
          </Badge>
          <Button 
            onClick={() => refetch()} 
            variant="outline" 
            size="sm"
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>





      {/* Tour Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch">
        {data?.toursByProduct && Object.keys(data.toursByProduct).length > 0 ? (
          Object.entries(data.toursByProduct).map(([productId, rawTours]) => {
            const details = TOUR_DETAILS[productId as keyof typeof TOUR_DETAILS];
            if (!details || !rawTours || rawTours.length === 0) return null;
            
            // Client-side safety net: de-dupe and sort before render
            const sorted = [...rawTours].sort((a, b) =>
              new Date(a.nextStartISO).getTime() - new Date(b.nextStartISO).getTime()
            );
            const seen = new Set<string>();
            const toursForProduct = sorted.filter(t => {
              const k = `${t.optionId ?? ''}|${t.nextStartISO}`;
              if (seen.has(k)) return false;
              seen.add(k);
              return true;
            });
            
            const currentIndex = currentTourIndices[productId] || 0;
            const cardIndex = Object.keys(data.toursByProduct).indexOf(productId);

            return (
              <div
                key={`${productId}-${currentIndex}`}
                ref={el => (cardRefs.current[cardIndex] = el)}
                tabIndex={-1}
                className="outline-none"
              >
                <TourCard 
                  productId={productId}
                  allToursForProduct={toursForProduct}
                  currentTourIndex={currentIndex}
                  details={details}
                  onTourChange={handleTourChange}
                  lastDirection={lastDirectionRef.current[productId] || null}
                />
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center py-12">
            <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Loading tour information...</h3>
            <p className="text-muted-foreground">Please wait while we load the latest tour data.</p>
          </div>
        )}
      </div>

      {/* Rating Context Note */}
      <div className="text-center py-4">
        <p className="text-sm text-muted-foreground">
          ⭐ Customer ratings shown are based on 253 combined reviews across all Canaveral Tours experiences
        </p>
      </div>

      {/* Tour Calendar */}
      <div className="mt-8">
        <TourCalendar />
      </div>

      {/* Footer Information */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-lg">Important Booking Information</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-2">Arrival & Check-in</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• <span className="font-medium">Arrive 15 minutes early</span></li>
              <li>• Check-in at main visitor center</li>
              <li>• Valid photo ID required for all guests</li>
              <li>• Tour departs promptly at scheduled time</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Cancellation Policy</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Full refund 24+ hours before tour</li>
              <li>• 50% refund 12-24 hours before</li>
              <li>• No refund less than 12 hours</li>
              <li>• Weather cancellations fully refunded</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}