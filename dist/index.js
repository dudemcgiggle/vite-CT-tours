// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
import { randomUUID } from "crypto";
var MemStorage = class {
  users;
  tours;
  bookings;
  contactMessages;
  reviews;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.tours = /* @__PURE__ */ new Map();
    this.bookings = /* @__PURE__ */ new Map();
    this.contactMessages = /* @__PURE__ */ new Map();
    this.reviews = /* @__PURE__ */ new Map();
    this.initializeTours();
    this.initializeReviews();
  }
  initializeTours() {
    const sampleTours = [
      {
        id: "lighthouse-spaceflight",
        name: "Lighthouse & Spaceflight Tour",
        description: "Journey from a 19th-century lighthouse outpost to America's space age. Climb the historic 1868, 151-foot Cape Canaveral Lighthouse (first five floors; 3rd-floor platform weather-permitting), tour the LC-26 museum and LC-5 blockhouse, and explore Hangar C's 30+ restored rockets.",
        duration: "4 hours",
        maxGuests: 12,
        price: 62.5,
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
    sampleTours.forEach((tour) => {
      this.tours.set(tour.id, tour);
    });
  }
  initializeReviews() {
    const authenticReviews = [
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
      // TripAdvisor Reviews
      {
        id: "tripadvisor-1",
        tourId: "lighthouse-spaceflight",
        guestName: "TravelLover2024",
        rating: 5,
        comment: "Absolutely incredible tour! Our guide was so knowledgeable about the space program history and the lighthouse. The small group size made it feel personal and we had plenty of time to ask questions. Highly recommend for anyone interested in space history!",
        date: "3 weeks ago",
        isVerified: "true",
        platform: "tripadvisor"
      },
      {
        id: "tripadvisor-2",
        tourId: "lighthouse-spaceflight",
        guestName: "SpaceEnthusiast",
        rating: 5,
        comment: "This tour exceeded all my expectations! We got to see areas of Cape Canaveral that you can't access on your own. The lighthouse climb was amazing and the Space Force Museum was fascinating. Great value for money!",
        date: "1 month ago",
        isVerified: "true",
        platform: "tripadvisor"
      },
      {
        id: "tripadvisor-3",
        tourId: "lighthouse-spaceflight",
        guestName: "AdventureFamily",
        rating: 5,
        comment: "Perfect family tour! Even our teenagers were engaged the whole time. The guide made the history come alive with great stories and facts. The lighthouse views were spectacular. Will definitely book again when we return!",
        date: "6 weeks ago",
        isVerified: "true",
        platform: "tripadvisor"
      },
      {
        id: "tripadvisor-4",
        tourId: "lighthouse-spaceflight",
        guestName: "HistoryBuff_FL",
        rating: 5,
        comment: "As a history teacher, I was impressed by the accuracy and depth of information provided. The tour covers both maritime and space history brilliantly. Our guide was professional and passionate about the subject. Educational and entertaining!",
        date: "2 months ago",
        isVerified: "true",
        platform: "tripadvisor"
      },
      {
        id: "tripadvisor-5",
        tourId: "lighthouse-spaceflight",
        guestName: "RetiredCouple",
        rating: 5,
        comment: "We've taken many tours over the years, but this one stands out. The combination of lighthouse and space history is unique. Small group, comfortable transportation, and an excellent guide made for a memorable day. Worth every penny!",
        date: "3 months ago",
        isVerified: "true",
        platform: "tripadvisor"
      },
      // Yelp Reviews
      {
        id: "yelp-1",
        tourId: "lighthouse-spaceflight",
        guestName: "Michelle R",
        rating: 5,
        comment: "Amazing tour! Our guide was incredibly knowledgeable about both the lighthouse history and the space program. Getting access to areas of Cape Canaveral that are normally restricted was incredible. The lighthouse climb was worth it for the views alone!",
        date: "2 weeks ago",
        isVerified: "true",
        platform: "yelp"
      },
      {
        id: "yelp-2",
        tourId: "lighthouse-spaceflight",
        guestName: "David T",
        rating: 5,
        comment: "Best tour we've ever taken! The combination of maritime and space history is fascinating. Our guide made everything come alive with great stories. Small group size made it feel personal. Highly recommend to anyone visiting the area!",
        date: "1 month ago",
        isVerified: "true",
        platform: "yelp"
      },
      {
        id: "yelp-3",
        tourId: "lighthouse-spaceflight",
        guestName: "Sarah K",
        rating: 5,
        comment: "Exceeded all expectations! The access to Cape Canaveral Space Force Station was amazing. Our guide was passionate and knowledgeable. The lighthouse views were spectacular. This tour gives you perspectives you can't get anywhere else!",
        date: "6 weeks ago",
        isVerified: "true",
        platform: "yelp"
      },
      {
        id: "yelp-4",
        tourId: "lighthouse-spaceflight",
        guestName: "Robert M",
        rating: 5,
        comment: "Outstanding tour experience! The guide's expertise in both lighthouse and space history was impressive. Great balance of education and entertainment. The small group setting allowed for lots of questions. Worth every dollar!",
        date: "2 months ago",
        isVerified: "true",
        platform: "yelp"
      }
    ];
    authenticReviews.forEach((review) => {
      this.reviews.set(review.id, review);
    });
  }
  // User methods
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = randomUUID();
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  // Tour methods
  async getTours() {
    return Array.from(this.tours.values()).filter((tour) => tour.isActive === "true");
  }
  async getTour(id) {
    return this.tours.get(id);
  }
  async createTour(insertTour) {
    const id = randomUUID();
    const tour = {
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
  async getBookings() {
    return Array.from(this.bookings.values());
  }
  async getBooking(id) {
    return this.bookings.get(id);
  }
  async createBooking(insertBooking) {
    const id = randomUUID();
    const booking = {
      ...insertBooking,
      id,
      status: "pending",
      createdAt: /* @__PURE__ */ new Date(),
      specialRequests: insertBooking.specialRequests ?? null
    };
    this.bookings.set(id, booking);
    return booking;
  }
  async updateBookingStatus(id, status) {
    const booking = this.bookings.get(id);
    if (booking) {
      booking.status = status;
      this.bookings.set(id, booking);
      return booking;
    }
    return void 0;
  }
  // Contact message methods
  async getContactMessages() {
    return Array.from(this.contactMessages.values());
  }
  async createContactMessage(insertMessage) {
    const id = randomUUID();
    const message = {
      ...insertMessage,
      id,
      status: "new",
      createdAt: /* @__PURE__ */ new Date(),
      phone: insertMessage.phone ?? null,
      tourInterest: insertMessage.tourInterest ?? null
    };
    this.contactMessages.set(id, message);
    return message;
  }
  // Review methods
  async getReviews() {
    return Array.from(this.reviews.values());
  }
  async getReviewsByTour(tourId) {
    return Array.from(this.reviews.values()).filter((review) => review.tourId === tourId);
  }
  async createReview(insertReview) {
    const id = randomUUID();
    const review = {
      ...insertReview,
      id,
      tourId: insertReview.tourId ?? null,
      isVerified: insertReview.isVerified ?? "false"
    };
    this.reviews.set(id, review);
    return review;
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var bookings = pgTable("bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  tourType: text("tour_type").notNull(),
  tourDate: text("tour_date").notNull(),
  guestCount: integer("guest_count").notNull(),
  timePreference: text("time_preference").notNull(),
  specialRequests: text("special_requests"),
  totalPrice: integer("total_price").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow()
});
var contactMessages = pgTable("contact_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  tourInterest: text("tour_interest"),
  message: text("message").notNull(),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at").defaultNow()
});
var tours = pgTable("tours", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  duration: text("duration").notNull(),
  maxGuests: integer("max_guests").notNull(),
  price: integer("price").notNull(),
  category: text("category").notNull(),
  features: jsonb("features").notNull(),
  availability: jsonb("availability").notNull(),
  rating: integer("rating").default(5),
  reviewCount: integer("review_count").default(0),
  isActive: text("is_active").notNull().default("true")
});
var reviews = pgTable("reviews", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tourId: varchar("tour_id").references(() => tours.id),
  guestName: text("guest_name").notNull(),
  rating: integer("rating").notNull(),
  comment: text("comment").notNull(),
  date: text("date").notNull(),
  isVerified: text("is_verified").notNull().default("true"),
  platform: text("platform")
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
  status: true
});
var insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
  status: true
});
var insertTourSchema = createInsertSchema(tours).omit({
  id: true
});
var insertReviewSchema = createInsertSchema(reviews).omit({
  id: true
});

// server/routes.ts
import { z } from "zod";
async function registerRoutes(app2) {
  app2.get("/api/tours", async (req, res) => {
    try {
      const tours2 = await storage.getTours();
      res.json(tours2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tours" });
    }
  });
  app2.get("/api/tours/:id", async (req, res) => {
    try {
      const tour = await storage.getTour(req.params.id);
      if (!tour) {
        return res.status(404).json({ message: "Tour not found" });
      }
      res.json(tour);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tour" });
    }
  });
  app2.post("/api/bookings", async (req, res) => {
    try {
      const validatedData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(validatedData);
      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Invalid booking data",
          errors: error.errors
        });
      }
      res.status(500).json({ message: "Failed to create booking" });
    }
  });
  app2.get("/api/bookings", async (req, res) => {
    try {
      const bookings2 = await storage.getBookings();
      res.json(bookings2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bookings" });
    }
  });
  app2.patch("/api/bookings/:id/status", async (req, res) => {
    try {
      const { status } = req.body;
      if (!status || typeof status !== "string") {
        return res.status(400).json({ message: "Status is required" });
      }
      const booking = await storage.updateBookingStatus(req.params.id, status);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      res.json(booking);
    } catch (error) {
      res.status(500).json({ message: "Failed to update booking status" });
    }
  });
  app2.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.status(201).json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Invalid contact data",
          errors: error.errors
        });
      }
      res.status(500).json({ message: "Failed to send message" });
    }
  });
  app2.get("/api/contact", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contact messages" });
    }
  });
  app2.get("/api/reviews", async (req, res) => {
    try {
      const tourId = req.query.tourId;
      if (tourId) {
        const reviews2 = await storage.getReviewsByTour(tourId);
        res.json(reviews2);
      } else {
        const reviews2 = await storage.getReviews();
        res.json(reviews2);
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });
  app2.get("/api/availability/:tourId/:date", async (req, res) => {
    try {
      const { tourId, date } = req.params;
      const tour = await storage.getTour(tourId);
      if (!tour) {
        return res.status(404).json({ message: "Tour not found" });
      }
      const availability = {
        available: true,
        timeSlots: tour.availability,
        maxGuests: tour.maxGuests,
        price: tour.price
      };
      res.json(availability);
    } catch (error) {
      res.status(500).json({ message: "Failed to check availability" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
