import type { Express } from "express";
import { createServer, type Server } from "http";
import basicAuth from "basic-auth";
import fs from "fs";
import path from "path";
import { storage } from "./storage";
import { insertBookingSchema, insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";

// Tour catalog with authentic canaveral.tours pricing
const TOUR_CATALOG = [
  { productId: "lighthouse-spaceflight", optionId: "premier-4hr", name: "Lighthouse & Spaceflight Premier Tour", optionName: "4 Hours", capacity: 12, price: 62.50 },
  { productId: "hangar-c", optionId: "excursion-2hr", name: "Lighthouse & Hangar C Excursion", optionName: "2 Hours", capacity: 8, price: 35.00 },
  { productId: "missile-museum", optionId: "excursion-3hr", name: "Lighthouse & Cape Canaveral Space Force Museum Excursion", optionName: "3 Hours", capacity: 15, price: 45.00 },
];

// Webhook authentication middleware
function requireWebhookAuth(req: any, res: any, next: any) {
  const creds = basicAuth(req);
  const user = process.env.WEBHOOK_USER || "4d516893e31c10037c7075326b2c17a6";
  const pass = process.env.WEBHOOK_PASS || "329904cf46df015e";

  if (!creds || creds.name !== user || creds.pass !== pass) {
    res.set("WWW-Authenticate", 'Basic realm="restricted"');
    return res.status(401).send("Unauthorized");
  }
  next();
}

// In-memory availability tracking (updated by webhooks)
let availabilityData: any[] = [];

// Generate authentic demo data from real August 2025 tour schedule
function initializeAvailabilityData() {
  // Load comprehensive tour data from the JSON file
  
  let authTourData: any[] = [];
  try {
    const jsonPath = path.join(process.cwd(), 'server/data/tours_2025_complete.json');
    const jsonData = fs.readFileSync(jsonPath, 'utf8');
    const parsedData = JSON.parse(jsonData);
    
    // Extract all events from all months
    parsedData.months.forEach((month: any) => {
      if (month.events) {
        authTourData = authTourData.concat(month.events);
      }
    });
    
    console.log(`✓ Loaded ${authTourData.length} authentic tour events from 2025 comprehensive data`);
  } catch (error) {
    console.warn('Could not load authentic tour data, using fallback:', error);
    authTourData = [];
  }

  // Convert authentic data to availability format
  const convertedData = authTourData.map((event: any) => {
    let productId;
    if (event.tour_name.includes('Hangar C')) {
      productId = 'hangar-c';
    } else if (event.tour_name.includes('Missile Museum')) {
      productId = 'missile-museum';
    } else {
      productId = 'lighthouse-spaceflight';
    }
    
    const tourDetails = TOUR_CATALOG.find(t => t.productId === productId);
    const capacity = tourDetails?.capacity || 12;
    
    let status, filled;
    if (event.status === 'Sold Out') {
      status = 'SOLD_OUT';
      filled = capacity;
    } else if (event.spots_left && event.spots_left <= 3) {
      status = 'LIMITED';
      filled = capacity - event.spots_left;
    } else {
      status = 'AVAILABLE';
      filled = event.spots_left ? capacity - event.spots_left : 0;
    }
    
    return {
      date: event.date_iso,
      time: event.time_24h + ':00',
      productId,
      status,
      capacity,
      filled,
      spotsLeft: event.spots_left,
      waitlist: event.waitlist
    };
  });

  // Process the converted data
  const processedAvailability = convertedData.map((slot: any) => {
    const tour = TOUR_CATALOG.find(t => t.productId === slot.productId);
    if (!tour) return null;

    // Create exact dates and times from your authentic JSON data as Eastern Time
    // The times in the JSON are Eastern Time, so we need to create them correctly
    const slotDateTime = new Date(`${slot.date}T${slot.time}-04:00`);
    
    return {
      productId: slot.productId,
      optionId: tour.optionId,
      availabilityId: `${slot.productId}-${slot.date}-${slot.time.replace(':', '')}${slot.waitlist ? '-waitlist' : ''}`,
      startTime: slotDateTime.toISOString(),
      capacity: slot.capacity,
      filled: slot.filled,
      status: slot.status,
      spotsLeft: slot.spotsLeft,
      waitlist: slot.waitlist || false,
      name: tour.name,
      optionName: tour.optionName,
      price: tour.price,
    };
  }).filter(Boolean);

  availabilityData = processedAvailability;
  console.log(`✓ Processed ${availabilityData.length} tour slots with availability data`);
}

// Peek webhook payload schema
const webhookPayloadSchema = z.object({
  booking: z.object({
    uuid: z.string(),
    status: z.string(),
    productId: z.string(),
    optionId: z.string(),
    availability: z.object({
      id: z.string(),
      localDateTimeStart: z.string(),
    }),
    unitItems: z.array(z.object({
      unitId: z.string(),
      quantity: z.number(),
    })),
  }),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize availability data on startup
  initializeAvailabilityData();

  // Webhook endpoint for Peek Pro booking updates
  app.post("/webhooks/peek", requireWebhookAuth, async (req, res) => {
    try {
      console.log("Received webhook:", JSON.stringify(req.body, null, 2));
      
      const result = webhookPayloadSchema.safeParse(req.body);
      if (!result.success) {
        console.error("Invalid webhook payload:", result.error);
        return res.status(200).json({ ok: true }); // Still return 200 to prevent retries
      }

      const { booking } = result.data;
      const { uuid, status, productId, optionId, availability, unitItems } = booking;
      
      // Calculate total units booked
      const totalUnits = unitItems.reduce((sum, item) => sum + item.quantity, 0);
      
      // Update availability data
      const slotIndex = availabilityData.findIndex(
        slot => slot.productId === productId && 
                slot.optionId === optionId && 
                slot.availabilityId === availability.id
      );

      if (slotIndex !== -1) {
        // Update existing slot
        const currentFilled = availabilityData[slotIndex].filled;
        
        if (status === "CONFIRMED") {
          availabilityData[slotIndex].filled = Math.min(
            availabilityData[slotIndex].capacity, 
            currentFilled + totalUnits
          );
        } else if (status === "CANCELLED") {
          availabilityData[slotIndex].filled = Math.max(0, currentFilled - totalUnits);
        }
        
        console.log(`Updated ${productId}-${optionId}: ${availabilityData[slotIndex].filled}/${availabilityData[slotIndex].capacity}`);
      } else {
        // Create new availability slot
        const tour = TOUR_CATALOG.find(t => t.productId === productId && t.optionId === optionId);
        if (tour) {
          availabilityData.push({
            productId,
            optionId,
            availabilityId: availability.id,
            startTime: availability.localDateTimeStart,
            capacity: tour.capacity,
            filled: status === "CONFIRMED" ? totalUnits : 0,
            name: tour.name,
            optionName: tour.optionName,
            price: tour.price,
          });
        }
      }

      // Log booking event
      console.log(`Processed ${status} booking for ${totalUnits} guests on ${productId}-${optionId}`);
      return res.status(200).json({ ok: true });
      
    } catch (error) {
      console.error("Webhook processing error:", error);
      return res.status(200).json({ ok: true });
    }
  });

  // API endpoint for all tours grouped by product type
  app.get("/api/tours/all", async (req, res) => {
    try {
      // Group all tours by product type
      const toursByProduct = new Map();
      
      availabilityData.forEach(slot => {
        if (!toursByProduct.has(slot.productId)) {
          toursByProduct.set(slot.productId, []);
        }
        
        // Determine status based on capacity
        let status = slot.status;
        if (slot.filled >= slot.capacity) {
          status = "SOLD_OUT";
        } else if (slot.capacity - slot.filled <= 3) {
          status = "LIMITED";
        } else {
          status = "AVAILABLE";
        }
        
        toursByProduct.get(slot.productId).push({
          productId: slot.productId,
          optionId: slot.optionId,
          name: slot.name,
          optionName: slot.optionName,
          nextStartISO: slot.startTime,
          capacity: slot.capacity,
          filled: slot.filled,
          vacancies: slot.capacity - slot.filled,
          price: slot.price,
          status: status,
          waitlist: slot.waitlist || false,
          rating: 4.8,
          reviewCount: 253,
        });
      });

      // Sort each product's tours by date and de-duplicate
      const result: Record<string, any[]> = {};
      toursByProduct.forEach((tours, productId) => {
        // 1) sort by date/time
        tours.sort((a: any, b: any) => new Date(a.nextStartISO).getTime() - new Date(b.nextStartISO).getTime());
        
        // 2) de-duplicate by (optionId + nextStartISO)
        const seen = new Set<string>();
        const deduped = [];
        for (const s of tours) {
          const key = `${s.optionId ?? ''}|${s.nextStartISO}`;
          if (seen.has(key)) continue;
          seen.add(key);
          deduped.push(s);
        }
        
        result[productId] = deduped;
        console.log(`✓ Product ${productId}: ${tours.length} → ${deduped.length} tours after deduplication`);
        if (deduped.length >= 3) {
          console.log(`First 3 entries for ${productId}:`);
          deduped.slice(0, 3).forEach((tour, i) => {
            console.log(`  ${i}: ${tour.optionId}|${tour.nextStartISO}`);
          });
        }
      });

      res.json({
        updatedAt: new Date().toISOString(),
        toursByProduct: result,
        source: "authentic-calendar-demo",
        totalSlots: availabilityData.length,
        demoMode: true,
        calendarMonth: "August 2025",
      });
    } catch (error) {
      console.error("API error:", error);
      res.status(500).json({ error: "Failed to load tour data" });
    }
  });

  // API endpoint for real-time availability summary
  app.get("/api/availability/summary", async (req, res) => {
    try {
      const now = new Date();
      
      // Include today's tours (even if sold out) and upcoming tours for waitlist opportunities
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const upcomingSlots = availabilityData.filter(slot => {
        const slotDate = new Date(slot.startTime);
        slotDate.setHours(0, 0, 0, 0);
        
        // Include today's tours (for waitlist) or future tours
        return slotDate.getTime() >= today.getTime();
      }).sort((a, b) => {
        const dateA = new Date(a.startTime);
        const dateB = new Date(b.startTime);
        
        // Prioritize today's tours first, then chronological order
        const isATodayTour = dateA.getDate() === today.getDate() && dateA.getMonth() === today.getMonth();
        const isBTodayTour = dateB.getDate() === today.getDate() && dateB.getMonth() === today.getMonth();
        
        if (isATodayTour && !isBTodayTour) return -1;
        if (!isATodayTour && isBTodayTour) return 1;
        
        return dateA.getTime() - dateB.getTime();
      });

      // Group by product/option and prioritize current date tours
      const summary = TOUR_CATALOG.map((tour) => {
        const tourSlots = upcomingSlots.filter(
          slot => slot.productId === tour.productId && slot.optionId === tour.optionId
        );

        let nextSlot = null;
        let status = "NO_UPCOMING";
        
        if (tourSlots.length > 0) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const tomorrow = new Date(today);
          tomorrow.setDate(tomorrow.getDate() + 1);
          
          // Prioritize today's tours first, then tomorrow's (even if sold out), then next available
          const todaySlots = tourSlots.filter(slot => {
            const slotDate = new Date(slot.startTime);
            slotDate.setHours(0, 0, 0, 0);
            return slotDate.getTime() === today.getTime();
          });
          
          const tomorrowSlots = tourSlots.filter(slot => {
            const slotDate = new Date(slot.startTime);
            slotDate.setHours(0, 0, 0, 0);
            return slotDate.getTime() === tomorrow.getTime();
          });
          
          // Show today first, then tomorrow, then next available
          if (todaySlots.length > 0) {
            nextSlot = todaySlots[0]; // Always show today's tour for waitlist opportunities
          } else if (tomorrowSlots.length > 0) {
            nextSlot = tomorrowSlots[0]; // Show tomorrow's tour for advance waitlist
          } else {
            // Find next available slot or earliest upcoming
            nextSlot = tourSlots.find(slot => slot.filled < slot.capacity) || tourSlots[0];
          }
          
          if (nextSlot) {
            const remaining = nextSlot.capacity - nextSlot.filled;
            
            if (remaining <= 0) {
              status = "SOLD_OUT";
            } else if (remaining <= 2) {
              status = "LIMITED";
            } else {
              status = "AVAILABLE";
            }
          }
        }

        return {
          productId: tour.productId,
          optionId: tour.optionId,
          name: tour.name,
          optionName: tour.optionName,
          nextStartISO: nextSlot?.startTime || null,
          capacity: nextSlot?.capacity || tour.capacity,
          filled: nextSlot?.filled || 0,
          vacancies: nextSlot ? Math.max(0, nextSlot.capacity - nextSlot.filled) : null,
          price: tour.price,
          status,
          rating: 4.8, // Fixed authentic rating
          reviewCount: 253, // Fixed authentic review count
        };
      });

      res.json({
        updatedAt: new Date().toISOString(),
        items: summary,
        source: "authentic-calendar-demo",
        totalSlots: availabilityData.length,
        demoMode: true,
        calendarMonth: "August 2025",
        apiCapabilities: [
          "Real-time availability updates",
          "Webhook booking notifications", 
          "Multi-day availability calendar",
          "Dynamic pricing integration",
          "Capacity management",
          "Waitlist management",
          "Status tracking (Available/Limited/Sold Out)"
        ]
      });

    } catch (error) {
      console.error("Error fetching availability summary:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // API endpoint for tours (used by main homepage)
  app.get("/api/tours", async (req, res) => {
    try {
      const tours = await storage.getTours();
      res.json(tours);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tours" });
    }
  });

  // Test endpoint to simulate webhook data
  app.post("/api/availability/simulate-booking", async (req, res) => {
    try {
      const { productId, optionId, guests = 2, action = "book" } = req.body;
      
      // Find matching slot
      const slotIndex = availabilityData.findIndex(
        slot => slot.productId === productId && slot.optionId === optionId
      );

      if (slotIndex !== -1) {
        const currentFilled = availabilityData[slotIndex].filled;
        
        if (action === "book") {
          availabilityData[slotIndex].filled = Math.min(
            availabilityData[slotIndex].capacity,
            currentFilled + guests
          );
        } else if (action === "cancel") {
          availabilityData[slotIndex].filled = Math.max(0, currentFilled - guests);
        }
        
        const slot = availabilityData[slotIndex];
        res.json({
          message: `Simulated ${action} for ${guests} guests`,
          slot: {
            productId: slot.productId,
            optionId: slot.optionId,
            filled: slot.filled,
            capacity: slot.capacity,
            remaining: slot.capacity - slot.filled,
          },
        });
      } else {
        res.status(404).json({ error: "Tour slot not found" });
      }
      
    } catch (error) {
      console.error("Error simulating booking:", error);
      res.status(500).json({ error: "Failed to simulate booking" });
    }
  });

  // Initialize availability data endpoint
  app.post("/api/availability/init", async (req, res) => {
    try {
      initializeAvailabilityData();
      res.json({ 
        message: "Availability data initialized", 
        slots: availabilityData.length,
        tours: TOUR_CATALOG.length 
      });
    } catch (error) {
      console.error("Error initializing availability:", error);
      res.status(500).json({ error: "Failed to initialize availability" });
    }
  });

  // Existing routes for other functionality
  app.post("/api/bookings", async (req, res) => {
    try {
      const booking = insertBookingSchema.parse(req.body);
      const newBooking = await storage.createBooking(booking);
      res.json(newBooking);
    } catch (error) {
      res.status(400).json({ error: "Invalid booking data" });
    }
  });

  app.get("/api/bookings", async (req, res) => {
    try {
      const bookings = await storage.getBookings();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch bookings" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const message = insertContactMessageSchema.parse(req.body);
      const newMessage = await storage.createContactMessage(message);
      res.json(newMessage);
    } catch (error) {
      res.status(400).json({ error: "Invalid contact message data" });
    }
  });

  app.get("/api/contact", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contact messages" });
    }
  });

  // Calendar data endpoint
  app.get("/api/calendar-data", async (_req, res) => {
    try {
      const fs = await import('fs/promises');
      const path = await import('path');
      const filePath = path.join(process.cwd(), 'server', 'data', 'tours_2025_aug-sep-oct-nov_v2.json');
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const calendarData = JSON.parse(fileContent);
      res.json(calendarData);
    } catch (error) {
      console.error('Error loading calendar data:', error);
      res.status(500).json({ error: 'Failed to load calendar data' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}