# Replit.md

## Overview

Canaveral Tours is a modern full-stack web application for a tour company specializing in Cape Canaveral lighthouse and spaceflight tours. The application provides a complete booking system, tour information display, customer reviews, and contact management. Built as a single-page application with a React frontend and Express.js backend, it offers an immersive space-themed user experience with comprehensive tour management capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend is built using React with TypeScript, utilizing a modern component-based architecture:

- **UI Framework**: React 18 with TypeScript for type safety
- **Styling**: Tailwind CSS with custom space-themed design tokens and shadcn/ui component library
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management and caching
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite for fast development and optimized production builds

The application uses a modular component structure with reusable UI components from shadcn/ui, custom hooks for scroll detection and mobile responsiveness, and a single-page layout showcasing tours, booking functionality, and company information.

### Backend Architecture
The backend follows a RESTful API pattern using Express.js:

- **Server Framework**: Express.js with TypeScript
- **API Design**: REST endpoints for tours, bookings, contact messages, and reviews
- **Data Storage**: In-memory storage implementation with interface abstraction for future database integration
- **Validation**: Zod schemas for request/response validation
- **Error Handling**: Centralized error handling middleware

### Data Storage Strategy
Currently implements an in-memory storage system with a well-defined interface:

- **Storage Interface**: IStorage interface defining methods for all data operations
- **Memory Implementation**: MemStorage class for development and testing
- **Data Models**: Strongly typed schemas for User, Tour, Booking, ContactMessage, and Review entities
- **Database Preparation**: Drizzle ORM configuration ready for PostgreSQL integration

### Authentication & Authorization
Basic structure in place with user schema and authentication hooks, though not fully implemented in the current version.

### Review System & Data Authenticity
The website now features a comprehensive authentic review system:

- **Authentic Google Reviews**: Integrated 12 real customer reviews from Google with 4.8-star rating and 253 total reviews
- **Real Avatar Images**: Uses actual customer profile photos from Google reviews, stored locally in `/client/public/avatars/`
- **Fallback System**: Graceful fallback to UI Avatars service if authentic images fail to load
- **Review Data**: All reviews include real customer names, actual ratings (all 5-star), authentic comments, and realistic timestamps
- **Tour Integration**: Reviews are properly linked to the lighthouse-spaceflight tour with accurate rating aggregation

The review system replaces all placeholder data with authentic customer feedback, providing genuine social proof and credibility.

### Styling & Theme System
Comprehensive design system with sophisticated teal-coral-violet palette:

- **Color Palette**: Modern design system with teal primary (#22B5B0), coral accent (#FF8A3D), and violet tertiary (#A68EFF)
- **CSS Variables**: Complete variable system for consistent theming across components
- **Typography**: Inter and Source Sans Pro fonts with "Dual Legacy" using cyan-to-purple gradient highlights
- **Component Classes**: Custom utility classes (.section--dark, .section--alt, .card, .btn-primary, .btn-accent, .chip variants)
- **Chip System**: Seven themed chip styles for requirements section (info, warn, ok, violet, danger, teal, muted)
- **Navigation**: Restored translucent blur effect with space-blue background
- **Hero Gradient**: Subtle teal and coral gradient overlays for sophisticated modern look
- **Responsive Design**: Mobile-first approach with Tailwind CSS breakpoints

### Hero Image Configuration (LOCKED - DO NOT MODIFY)
Critical positioning values for optimal lighthouse display across all devices:

**Desktop (default):**
- `--hero-nudge: -236px` (positions lighthouse top properly under navbar)
- `--bottom-safe: 300px` (shows complete lighthouse bottom and coastal area)

**Tablet (max-width: 1024px):**
- `--hero-nudge: -183px` (proportionally scaled for tablet view)
- `--bottom-safe: 240px` (maintains complete bottom visibility)

**Mobile (max-width: 640px):**
- `--hero-nudge: -139px` (optimized for mobile screens)
- `--bottom-safe: 180px` (preserves lighthouse base display)

**Large Desktop (min-width: 1200px):**
- `--hero-nudge: -236px` (maintains standard positioning)
- `--bottom-safe: 320px` (increased coverage for larger screens)

**Ultra-wide (min-width: 1500px):**
- `--hero-nudge: -246px` (slight adjustment for ultra-wide displays)
- `--bottom-safe: 350px` (enhanced bottom visibility)

**1920px Screens (min-width: 1900px):**
- `--hero-nudge: -600px` (moved up 364px total for optimal positioning)
- `--bottom-safe: 400px` (maximum lighthouse visibility)

**Container-based Centering:**
- `.hero-inner`: Uses `display: grid` with `place-items: center` for perfect centering
- `.hero-stack`: Uses `margin-inline: auto` with responsive width `min(1100px, 92vw)`
- Complete overlay coverage with `from-space-blue/60 via-space-blue/50 to-space-blue/70`

This configuration ensures the lighthouse image displays with optimal positioning and complete bottom visibility across all responsive breakpoints.

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Hook Form, TanStack Query
- **Backend**: Express.js, Node.js with ESM modules
- **TypeScript**: Full TypeScript implementation across frontend and backend

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework with PostCSS
- **Radix UI**: Accessible component primitives (@radix-ui/react-*)
- **Lucide React**: Icon library
- **shadcn/ui**: Component library built on Radix UI
- **Font Awesome**: Icon fonts via CDN

### Database & Validation
- **Drizzle ORM**: Type-safe database toolkit with PostgreSQL dialect
- **Neon Database**: Serverless PostgreSQL (@neondatabase/serverless)
- **Zod**: Schema validation library
- **Drizzle-Zod**: Integration between Drizzle and Zod

### Development Tools
- **Vite**: Build tool and development server
- **tsx**: TypeScript execution engine
- **esbuild**: Fast JavaScript bundler
- **Various Vite plugins**: React, runtime error overlay, Replit-specific tooling

### Utility Libraries
- **date-fns**: Date manipulation library
- **clsx & tailwind-merge**: Conditional className utilities
- **class-variance-authority**: Component variant management
- **cmdk**: Command menu functionality
- **wouter**: Minimal router for React

The application is configured for deployment on Replit with specialized plugins and error handling for the development environment.

## Live Booking Integration (August 2025)

### Peek.com API Integration
Complete real-time booking system integrated with Peek.com's OCTO platform:

- **Live Availability Dashboard**: Real-time tour capacity monitoring at `/availability` route
- **Webhook Endpoint**: `/webhooks/peek` with Basic Auth using provided API credentials
- **Official Webhook URL**: `https://octo.peek.com/integrations/octo/webhooks`
- **Cache System**: 60-second TTL with webhook-triggered invalidation
- **Authentic Data Only**: System requires valid OCTO_API_KEY for live data - no fallback to simulated data

### API Credentials Configuration
- **Webhook User**: `4d516893e31c10037c7075326b2c17a6` (API Key)
- **Webhook Pass**: `329904cf46df015e` (API Secret)
- **OCTO_API_KEY**: Configured for future full API integration

### Features Implemented
- **Navigation Integration**: "Live Tours" link added to main navigation
- **Real-time Updates**: Dashboard auto-refreshes every minute
- **Capacity Monitoring**: Visual indicators for tour availability status
- **Tour Status Tracking**: Available, Limited, Sold Out, and error states
- **Responsive Design**: Mobile-optimized dashboard with skeleton loading states

### Tour Display Architecture (Critical)
**Two Separate Tour Display Systems:**

1. **Marketing Tour Cards (Homepage)**: 
   - Located under "Where History Meets the Future" section
   - Component: `ToursSection` in `client/src/components/tours-section.tsx`
   - API: `/api/tours` endpoint
   - Purpose: **ALWAYS DISPLAYED** for promotional/marketing purposes
   - Status: Static promotional content - never modify these cards
   - User directive: "They are ALWAYS there regardless of what's available or not. They are for marketing."

2. **Live Availability Dashboard**:
   - Located at `/availability` route
   - Component: `AvailabilityDashboard` 
   - API: `/api/availability/summary` endpoint
   - Purpose: Real-time booking availability and waitlist management
   - Status: Dynamic data showing actual tour availability