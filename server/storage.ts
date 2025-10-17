import { type User, type InsertUser, type Booking, type InsertBooking, type ContactMessage, type InsertContactMessage, type Tour, type InsertTour, type Review, type InsertReview } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Tour methods
  getTours(): Promise<Tour[]>;
  getTour(id: string): Promise<Tour | undefined>;
  createTour(tour: InsertTour): Promise<Tour>;
  
  // Booking methods
  getBookings(): Promise<Booking[]>;
  getBooking(id: string): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBookingStatus(id: string, status: string): Promise<Booking | undefined>;
  
  // Contact message methods
  getContactMessages(): Promise<ContactMessage[]>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  
  // Review methods
  getReviews(): Promise<Review[]>;
  getReviewsByTour(tourId: string): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private tours: Map<string, Tour>;
  private bookings: Map<string, Booking>;
  private contactMessages: Map<string, ContactMessage>;
  private reviews: Map<string, Review>;

  constructor() {
    this.users = new Map();
    this.tours = new Map();
    this.bookings = new Map();
    this.contactMessages = new Map();
    this.reviews = new Map();
    
    // Initialize with sample tours
    this.initializeTours();
    this.initializeReviews();
  }

  private initializeTours() {
    const sampleTours: Tour[] = [
      {
        id: "lighthouse-spaceflight",
        name: "Lighthouse & Spaceflight Tour",
        description: "Journey from a 19th-century lighthouse outpost to America's space age. Climb the historic 1868, 151-foot Cape Canaveral Lighthouse (first five floors; 3rd-floor platform weather-permitting), tour the LC-26 museum and LC-5 blockhouse, and explore Hangar C's 30+ restored rockets.",
        duration: "4 hours",
        maxGuests: 12,
        price: 62.50,
        category: "signature",
        features: ["Lighthouse access", "Space Force Station", "Expert guide", "Small group"],
        availability: { days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"], times: ["9:00", "13:00"] },
        rating: 4.8,
        reviewCount: 253,
        isActive: "true"
      },
      {
        id: "wildlife-safari",
        name: "Merritt Island Wildlife Safari",
        description: "Explore the pristine Merritt Island National Wildlife Refuge. Spot manatees, dolphins, and over 300 bird species in their natural habitat.",
        duration: "3 hours",
        maxGuests: 8,
        price: 65,
        category: "nature",
        features: ["Wildlife viewing", "Eco-friendly", "Photography opportunities", "Nature guide"],
        availability: { days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"], times: ["8:00", "14:00"] },
        rating: 4.5,
        reviewCount: 2,
        isActive: "true"
      },
      {
        id: "space-force-station",
        name: "Space Force Station Tour",
        description: "Exclusive access to missile museums and launch complexes. Experience the history of space exploration up close.",
        duration: "2.5 hours",
        maxGuests: 10,
        price: 75,
        category: "space",
        features: ["Museum access", "Launch complex", "Missile displays", "Historical artifacts"],
        availability: { days: ["tuesday", "thursday", "saturday"], times: ["10:00", "15:00"] },
        rating: 5,
        reviewCount: 0,
        isActive: "true"
      },
      {
        id: "sunset-photography",
        name: "Sunset Photography Tour",
        description: "Capture stunning golden hour moments across historic landmarks with professional photography guidance.",
        duration: "2 hours",
        maxGuests: 6,
        price: 55,
        category: "photography",
        features: ["Photography guide", "Golden hour timing", "Historic locations", "Tips & techniques"],
        availability: { days: ["friday", "saturday", "sunday"], times: ["17:00", "18:00"] },
        rating: 5,
        reviewCount: 0,
        isActive: "true"
      },
      {
        id: "private-group",
        name: "Private Group Tours",
        description: "Customized experiences for families, corporate groups, and special events. Tailored to your interests and schedule.",
        duration: "Flexible",
        maxGuests: 20,
        price: 200,
        category: "private",
        features: ["Customizable", "Private guide", "Flexible schedule", "Group activities"],
        availability: { days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"], times: ["flexible"] },
        rating: 5,
        reviewCount: 0,
        isActive: "true"
      }
    ];

    sampleTours.forEach(tour => {
      this.tours.set(tour.id, tour);
    });
  }

  private initializeReviews() {
    const authenticReviews: Review[] = [
      {
        id: "review-1",
        tourId: "lighthouse-spaceflight",
        guestName: "Chuck Voelker",
        rating: 5,
        comment: "Absolutely awesome tour if you love any piece of rocket and space history. The guide and docents were excellent and the sights you get to see are some of the best. Add this to your NASA Kennedy tour to get a full understanding of what has, as still is, happening around the Cape. I would do this again!",
        date: "4 months ago",
        isVerified: "true"
      },
      {
        id: "review-2", 
        tourId: "lighthouse-spaceflight",
        guestName: "Joseph LaBauve",
        rating: 5,
        comment: "The entire team was pleasant and eager to share the history of the Lighthouse and launch pads we saw. We even saw equipment that was original to the Mercury, Gemini program as well as Air Force early missile program. Definitely worth the time and money.",
        date: "a month ago",
        isVerified: "true"
      },
      {
        id: "review-3",
        tourId: "lighthouse-spaceflight", 
        guestName: "Elizabeth Testa",
        rating: 5,
        comment: "We had an amazing day. Karen was the lead and she was so informative and you can tell that she loves the space program. Carl was the docent at launchpad 26. He did a tremendous job explaining the program and answering all our questions.",
        date: "a month ago",
        isVerified: "true"
      },
      {
        id: "review-4",
        tourId: "lighthouse-spaceflight",
        guestName: "R Dean Bunderson",
        rating: 5,
        comment: "The entire experience from online initial processing/clearance to real-time onsite was easy and well worth every penny. All interactions with Staff were friendly, personable and knowledgeable. All the docents were great!",
        date: "3 months ago", 
        isVerified: "true"
      },
      {
        id: "review-5",
        tourId: "lighthouse-spaceflight",
        guestName: "Stephanie Schrader",
        rating: 5,
        comment: "The Lighthouse & Spaceflight tour was fantastically fascinating. Lots of history and all the tour guides were so knowledgeable. I was impressed how they answered every question in detail.",
        date: "2 months ago",
        isVerified: "true"
      },
      {
        id: "review-6",
        tourId: "lighthouse-spaceflight", 
        guestName: "Steve Rucci",
        rating: 5,
        comment: "We went on the tour of the Cape Canaveral lighthouse and Space Force missile museums. The tour was fantastic, taking us to see everything and having time to look around and take it all in. If you like space history, this is a must!",
        date: "a year ago",
        isVerified: "true"
      },
      {
        id: "review-7",
        tourId: "lighthouse-spaceflight",
        guestName: "Lisa Spann",
        rating: 5,
        comment: "My family and I took the full 4-hour tour this weekend and it was one of the best experiences we have ever had. The tour is very well put together and the Tour guide was extremely knowledgeable, pleasant, and answered all our questions.",
        date: "4 months ago",
        isVerified: "true"
      },
      {
        id: "review-8", 
        tourId: "lighthouse-spaceflight",
        guestName: "Bob Lovell",
        rating: 5,
        comment: "An excellent historical tour. Small group, 2 docents who are friendly and knowledgeable. The KSC visitor center, which most resembles a theme park, would be your choice for kids. Adults should take this tour and skip KSC.",
        date: "4 months ago",
        isVerified: "true"
      },
      {
        id: "review-9",
        tourId: "lighthouse-spaceflight",
        guestName: "Etta LoPresti",
        rating: 5,
        comment: "We had an awesome time on our Lighthouse and Spaceflight tour. Our tour guide, Joanne, was top notch! She had lots of positive energy and was very knowledgeable. She went out of her way to make sure all had a great experience.",
        date: "2 months ago",
        isVerified: "true"
      },
      {
        id: "review-10",
        tourId: "lighthouse-spaceflight",
        guestName: "Lauren",
        rating: 5,
        comment: "An excellent tour! I've never been on a tour like this before but this year I've been stepping out of my comfort zone to overcome my social anxiety. I saw a post on Facebook about the tour and immediately knew I had to do it.",
        date: "a year ago",
        isVerified: "true"
      },
      {
        id: "review-11",
        tourId: "lighthouse-spaceflight",
        guestName: "PNW Nikki",
        rating: 5,
        comment: "Fantastic tour and guides! I took the tour mostly to visit the lighthouse but it turned out to be so much more. We stopped at multiple launch sites, a couple of small museums and even a quick stop at a beach.",
        date: "a year ago",
        isVerified: "true"
      },
      {
        id: "review-12",
        tourId: "lighthouse-spaceflight",
        guestName: "Susan Baker Cartledge",
        rating: 5,
        comment: "On a retirement trip for my husband, I normally am not interested in space.. But, our guide's enthusiasm was contagious and made everything fun and interesting. Thank you!",
        date: "2 months ago",
        isVerified: "true"
      },
      // Authentic TripAdvisor Reviews from official Canaveral Tours page
      {
        id: "tripadvisor-1",
        tourId: "lighthouse-spaceflight",
        guestName: "pajen76",
        rating: 5,
        comment: "What a terrific experience this was! Early NASA history has been a bit of a hobby of mine for a few years now and I appreciated so much getting to see in person some of the historic launch sites, museums, the lighthouse, and other artifacts. Well worth your time and money!",
        date: "August 2025",
        isVerified: "true",
        platform: "tripadvisor"
      },
      {
        id: "tripadvisor-2",
        tourId: "lighthouse-spaceflight",
        guestName: "Ashley",
        rating: 5,
        comment: "Outstanding tour and fabulous historical information was provided by Brady, our tour guide. We look forward to joining you again in the future!",
        date: "July 2025",
        isVerified: "true",
        platform: "tripadvisor"
      },
      {
        id: "tripadvisor-3",
        tourId: "lighthouse-spaceflight",
        guestName: "David J",
        rating: 4,
        comment: "Very nice tour with great historical displays, original artifacts, and wonderful, knowledgeable guides. The best part for me was the original launch facility with the block house and museum. Hanger C was also a big highlight.",
        date: "May 2025",
        isVerified: "true",
        platform: "tripadvisor"
      },
      {
        id: "tripadvisor-4",
        tourId: "lighthouse-spaceflight",
        guestName: "Lee R",
        rating: 5,
        comment: "Better than we expected! Docents were extremely knowledgeable. Guides were great! Well worth the money to learn the history of the US Space Program!",
        date: "March 2025",
        isVerified: "true",
        platform: "tripadvisor"
      },
      {
        id: "tripadvisor-5",
        tourId: "lighthouse-spaceflight",
        guestName: "Lisa S",
        rating: 5,
        comment: "My family and I took the full 4-hour tour this weekend and it was one of the best experiences we have ever had. The tour is very well put together and the Tour guide was extremely knowledgeable, pleasant, and helpful. The lighthouse is beautiful and very well preserved. A must see for lighthouse enthusiasts. I highly recommend this tour!",
        date: "March 2025",
        isVerified: "true",
        platform: "tripadvisor"
      },
      {
        id: "tripadvisor-6",
        tourId: "lighthouse-spaceflight",
        guestName: "M C",
        rating: 5,
        comment: "Awesome tour! Great tour guide told us lots of interesting facts as we traveled from point to point. They even took photos of us at the Lighthouse! Thanks for that!",
        date: "February 2025",
        isVerified: "true",
        platform: "tripadvisor"
      },
      {
        id: "tripadvisor-7",
        tourId: "lighthouse-spaceflight",
        guestName: "JGBeck",
        rating: 5,
        comment: "Joined a small group and my husband and I really enjoyed the tour. It included the lighthouse, Hanger C, and other stops on the base. The communication from the tour company by both text and email was excellent when our time slot changed due to a rescheduled launch.",
        date: "February 2025",
        isVerified: "true",
        platform: "tripadvisor"
      },
      {
        id: "tripadvisor-8",
        tourId: "lighthouse-spaceflight",
        guestName: "D W",
        rating: 5,
        comment: "Our guide and the docents at all of the stops were friendly and very knowledgeable. I highly recommend this tour! There was so much more to see than just the lighthouse - there is a hangar full of cruise missiles and other memorabilia and a blockhouse at one of the first launch pads.",
        date: "February 2025",
        isVerified: "true",
        platform: "tripadvisor"
      },
      {
        id: "tripadvisor-9",
        tourId: "lighthouse-spaceflight",
        guestName: "Robert L",
        rating: 5,
        comment: "We took the 4 hour tour, we had great tour guides. The Lighthouse and Hanger C far exceeded expectations! This needs to be a 'must do' activity when you visit the Space Coast!",
        date: "October 2024",
        isVerified: "true",
        platform: "tripadvisor"
      },
      // Authentic Yelp Reviews
      {
        id: "yelp-1",
        tourId: "lighthouse-spaceflight",
        guestName: "Jan-Michael T.",
        rating: 4,
        comment: "The Cape Canaveral Lighthouse Tour has been one of those \"backyard adventures\" I've been wanting to go on for the longest time. Eventually, I was able to partake in said adventure with my friends, Nate and Chops. Afterwards, I have to say that even for a probably \"one-and-done\" for a tour, it is definitely worth every penny spent. This tour was everything I wanted and loved, and it delivered. We visited four different launch sites, three museums, and the Cape Canaveral lighthouse. I personally loved the lighthouse and Hanger \"A\" which housed some of the larger historic rockets and jets that have helped bring NASA and the U.S. military where it is now.",
        date: "Jun 13, 2025",
        isVerified: "true",
        platform: "yelp"
      },
      {
        id: "yelp-2",
        tourId: "lighthouse-spaceflight",
        guestName: "Jamie P.",
        rating: 5,
        comment: "We went today. A group of 4. Our tour guide was FANTASTIC. We had the 2 hour tour. Great place. Can take the 4 hour or two hour tour. I would recommend this but probably not in July and August. FL can be brutal those months. Today was perfect!! We will definitely go again. This tour group is very professional and personable.",
        date: "Jan 20, 2024",
        isVerified: "true",
        platform: "yelp"
      },
      {
        id: "yelp-3",
        tourId: "lighthouse-spaceflight",
        guestName: "Connor B.",
        rating: 5,
        comment: "My family and I took the full 4-hour tour, which included visits to the lighthouse, Hangar C, several launch pads, and blockhouses. Shelly and Karen, our tour guides, were fantastic—extremely knowledgeable and always ready to answer any questions we had. As a bonus, we were lucky enough to watch a SpaceX launch from the museum parking lot. Overall, it was a 10/10 experience that we would definitely do again.",
        date: "Aug 12, 2024",
        isVerified: "true",
        platform: "yelp"
      },
      {
        id: "yelp-4",
        tourId: "lighthouse-spaceflight",
        guestName: "Sky T.",
        rating: 5,
        comment: "Talk about history and what made this part of Florida known as the Space Coast! This is really cool experience and can vary on what you are able to see at Cape Canaveral. They have weekly tours (typically Tuesday, Thursday, and Saturday) that are about three hours long that will take you to the lighthouse, launch complexes, and some of their programs that are on station. Their guides are super knowledgeable and will help paint the rich history of the space program here.",
        date: "Nov 24, 2019",
        isVerified: "true",
        platform: "yelp"
      },
      {
        id: "yelp-5",
        tourId: "lighthouse-spaceflight",
        guestName: "Ward D.",
        rating: 4,
        comment: "This is a wonderful place to visit! The lighthouse is located next to Hangar C on Lighthouse Road on Cape Canaveral so access is limited. However you get there, the restoration of this lighthouse is truly impressive. There are at least 4 distinct areas to see for the lighthouse and each one has informational signs or a guide located nearby. The guides were all very friendly and knowledgeable. The buildings looked well-kept and the walkway and informational signs appeared brand new.",
        date: "Apr 26, 2022",
        isVerified: "true",
        platform: "yelp"
      },
      {
        id: "yelp-6",
        tourId: "lighthouse-spaceflight",
        guestName: "Tc H.",
        rating: 5,
        comment: "Enjoyed our informative tour led by Shelly and Karen. Their knowledge of the area, along with their enthusiasm for the space program, provided a delightful morning. Loved getting on to the base and seeing the inside of the blockhouse, which was like taking a quick trip back in time. The lighthouse is an integral part of the area's history so we're happy we finally took a tour. Definitely recommend whether you're from the area or from out of town.",
        date: "Feb 18, 2023",
        isVerified: "true",
        platform: "yelp"
      },
      {
        id: "yelp-7",
        tourId: "lighthouse-spaceflight",
        guestName: "Melody L.",
        rating: 4,
        comment: "I enjoyed visiting this Lighthouse in 2012. My only disappointment was that the tour is limited to the 5th level due to safety reasons. I wanted to climb to the top. Other than that it's a nice Lighthouse. I liked hearing about the history of the lighthouse and seeing the old Lighthouse keeper's furniture inside the lighthouse. I took some great photos. I need to visit again soon since it was raining when we last visited.",
        date: "Jun 20, 2017",
        isVerified: "true",
        platform: "yelp"
      },
      {
        id: "yelp-8",
        tourId: "lighthouse-spaceflight",
        guestName: "Greta S.",
        rating: 5,
        comment: "This was a great tour! Not only do you get to tour the lighthouse but it is a behind the scenes bus tour of historic sites on the cape launch area and current day launch pads. The tour guide was incredible. Very knowledgeable and entertaining. He shared historical magazines and National Geographic issues related to the 60's space program. TAKE THIS TOUR!!!! Well worth the price.",
        date: "Sep 15, 2018",
        isVerified: "true",
        platform: "yelp"
      },
      {
        id: "yelp-9",
        tourId: "lighthouse-spaceflight",
        guestName: "Chip M.",
        rating: 5,
        comment: "Better than expected. The lighthouse is run by volunteers who have done a remarkable job of getting it to a condition where people can actually climb the narrow stairway to the 5th floor. Lots of history is included in the tour. After the tour a bus ride takes you all over the USAF Station where most of the old launch pads for NASA can be seen. The tour guide (Doug) was excellent and gave us so much history of the space era that my mind was swimming at the end. Great deal!",
        date: "Jun 5, 2017",
        isVerified: "true",
        platform: "yelp"
      },
      {
        id: "yelp-10",
        tourId: "lighthouse-spaceflight",
        guestName: "K M.",
        rating: 5,
        comment: "Tour was terrific! What an opportunity for people to be able to go onto the Cape Canaveral Air Force base in a small tour bus and hear the stories and history of the base and current flights planned. The Lighthouse tour with museum great, but also just driving through select launch sites from the past and seeing the Air Force Museum. We were talking about the tour the next day with enthusiasm. Well recommended if this is an area of interest for you.",
        date: "Jan 24, 2020",
        isVerified: "true",
        platform: "yelp"
      }
    ];

    authenticReviews.forEach(review => {
      this.reviews.set(review.id, review);
    });
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Tour methods
  async getTours(): Promise<Tour[]> {
    return Array.from(this.tours.values()).filter(tour => tour.isActive === "true");
  }

  async getTour(id: string): Promise<Tour | undefined> {
    return this.tours.get(id);
  }

  async createTour(insertTour: InsertTour): Promise<Tour> {
    const id = randomUUID();
    const tour: Tour = { 
      ...insertTour, 
      id,
      rating: insertTour.rating ?? null,
      reviewCount: insertTour.reviewCount ?? null,
      isActive: insertTour.isActive ?? "true"
    };
    this.tours.set(id, tour);
    return tour;
  }

  // Booking methods
  async getBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = randomUUID();
    const booking: Booking = { 
      ...insertBooking, 
      id, 
      status: "pending",
      createdAt: new Date(),
      specialRequests: insertBooking.specialRequests ?? null
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async updateBookingStatus(id: string, status: string): Promise<Booking | undefined> {
    const booking = this.bookings.get(id);
    if (booking) {
      booking.status = status;
      this.bookings.set(id, booking);
      return booking;
    }
    return undefined;
  }

  // Contact message methods
  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = { 
      ...insertMessage, 
      id, 
      status: "new",
      createdAt: new Date(),
      phone: insertMessage.phone ?? null,
      tourInterest: insertMessage.tourInterest ?? null
    };
    this.contactMessages.set(id, message);
    return message;
  }

  // Review methods
  async getReviews(): Promise<Review[]> {
    return Array.from(this.reviews.values());
  }

  async getReviewsByTour(tourId: string): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(review => review.tourId === tourId);
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = randomUUID();
    const review: Review = { 
      ...insertReview, 
      id,
      tourId: insertReview.tourId ?? null,
      isVerified: insertReview.isVerified ?? "false"
    };
    this.reviews.set(id, review);
    return review;
  }
}

export const storage = new MemStorage();
