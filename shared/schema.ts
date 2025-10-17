import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const bookings = pgTable("bookings", {
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
  createdAt: timestamp("created_at").defaultNow(),
});

export const contactMessages = pgTable("contact_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  tourInterest: text("tour_interest"),
  message: text("message").notNull(),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const tours = pgTable("tours", {
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
  isActive: text("is_active").notNull().default("true"),
});

export const reviews = pgTable("reviews", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tourId: varchar("tour_id").references(() => tours.id),
  guestName: text("guest_name").notNull(),
  rating: integer("rating").notNull(),
  comment: text("comment").notNull(),
  date: text("date").notNull(),
  isVerified: text("is_verified").notNull().default("true"),
  platform: text("platform"),
});

// Webhook-based availability tracking
export const availabilityCounts = pgTable("availability_counts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  productId: text("product_id").notNull(),
  optionId: text("option_id").notNull(),
  availabilityId: text("availability_id").notNull(),
  startTime: timestamp("start_time").notNull(),
  capacity: integer("capacity"), // Optional - may not be known from webhooks
  filled: integer("filled").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Webhook booking events log for debugging and audit trail
export const bookingEvents = pgTable("booking_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  bookingUuid: text("booking_uuid").notNull(),
  status: text("status").notNull(), // CONFIRMED, CANCELLED, etc.
  productId: text("product_id").notNull(),
  optionId: text("option_id").notNull(),
  availabilityId: text("availability_id").notNull(),
  startTime: timestamp("start_time").notNull(),
  unitsBooked: integer("units_booked").notNull(),
  receivedAt: timestamp("received_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
  status: true,
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
  status: true,
});

export const insertTourSchema = createInsertSchema(tours).omit({
  id: true,
});

export const insertReviewSchema = createInsertSchema(reviews).omit({
  id: true,
});

export const insertAvailabilityCountSchema = createInsertSchema(availabilityCounts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertBookingEventSchema = createInsertSchema(bookingEvents).omit({
  id: true,
  receivedAt: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type Tour = typeof tours.$inferSelect;
export type InsertTour = z.infer<typeof insertTourSchema>;
export type Review = typeof reviews.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;
export type AvailabilityCount = typeof availabilityCounts.$inferSelect;
export type InsertAvailabilityCount = z.infer<typeof insertAvailabilityCountSchema>;
export type BookingEvent = typeof bookingEvents.$inferSelect;
export type InsertBookingEvent = z.infer<typeof insertBookingEventSchema>;
