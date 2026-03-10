# EpicDrive | Premium Car Rental Karachi

EpicDrive is a high-performance, enterprise-grade Next.js application designed to provide a world-class car rental experience specifically tailored for the Karachi market. From luxury sedans in DHA to SUVs for long-distance travel, the platform offers automated fleet management and real-time booking tracking.

---

## Tech Stack

- **Core Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL + Real-time)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Deployment**: [Vercel](https://vercel.com/)

---

## Core Features

### 1. Public Experience
- **Cinematic Landing Page**: Premium UI with glassmorphism, dynamic blob effects, and atmospheric animations.
- **Dynamic Fleet Catalog**: Advanced filtering by category (Petrol, Diesel, Hybrid, EV), price range, and features (ADAS).
- **Infinite Search & Sort**: SEO-optimized sorting (Price/Newest) and fuzzy name searching.
- **Detailed Vehicle Profiles**: Technical spec breakdowns for Engine, Hybrid, or Electric systems, inclusive of seating, safety (airbags), and infotainment details.
- **Booking Engine**: A robust form validation system for collecting customer information and rental dates.

### 2. Administrative Experience (Vercel-Optimized)
- **Real-time Dashboard**: Overview of total fleet status (Available/Rented/Maintenance), realized revenue, and pending requests.
- **Fleet Management Terminal**: Full CRUD (Create, Read, Update, Delete) for vehicles, including technical spec management and image URL association.
- **Booking Control**: Approve, track, or cancel incoming rental requests from Karachiites.
- **Visual Analytics**: Interactive performance graphs and utilization charts.

---

## Directory Structure

```bash
├── app/                  # Next.js App Router (Routes & Server Components)
│   ├── admin/            # Protected Administrative Portal
│   ├── cars/             # Public Catalog and Detailed Car Pages
│   ├── diagnostics/      # Production environment & database checker
│   └── globals.css       # Design System & Tailwind 4 Entry
├── components/           # Reusable Atomic & Compound UI Elements
├── constants/            # Hardcoded configurations (Categories, Specs)
├── lib/                  # Initialization & Core Logic
│   ├── supabase.ts       # Global Supabase Client with failover logic
│   └── utils.ts          # Formatting (PKR currency) & UI Helpers
├── services/             # Abstraction layer for DB Queries
│   └── carService.ts     # Business logic for Cars & Bookings
├── public/               # Optimized Static Assets (Hero images, logos)
├── supabase/             # PostgreSQL Schema & SQL Migrations
└── types/                # Unified TypeScript Interfaces
```

---

## Key Modules & Functionality

### 1. `services/carService.ts`
This is the **Heart of the Data Layer**. It abstracts complex PostgreSQL joins.
- `getCars()`: Handles multi-filter querying. Uses Post-fetch filtering for specialized fields like ADAS to ensure performance.
- `getCarById()`: Fetches a single vehicle along with its specific technical sub-table (specs_engine, specs_hybrid, or specs_electric).
- `createBooking()`: Submits valid customer requests to the database.

### 2. `lib/supabase.ts`
- Initialized using **Supabase SSR**.
- Contains a **Self-Healing Loop**: If environment variables are missing (a common production issue), it logs a warning but initializes a placeholder to prevent the build from crashing, enabling better diagnostics.

### 3. `app/cars/[id]/page.tsx`
- Utilizes **Dynamic Metadata Generation**.
- Automatically creates SEO-friendly titles (e.g., *"Rent Toyota Corolla 2024 in Karachi"*) to rank high in local search results.

---

## Database Schema (PostgreSQL)

The system uses a **Polymorphic Specification Architecture**:
- `cars`: Base table for global details (Name, Model, Category, Rates).
- `specs_engine`: Specific fields for ICE vehicles (CC, Transmission, Gears).
- `specs_hybrid`: Combined metrics for HEV/PHEV (Battery kWh, EV Range).
- `specs_electric`: Pure EV metrics (Motor KW, Charging time).
- `bookings`: Tracks relationship between Car, User, and Rental Status.

---

## Production & Security

- **Environment Variables**: Managed via Vercel (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
- **Failover Pages**: Includes a `/diagnostics` route that allows devs to check production status without exposing private keys.
- **Serialization Safety**: Custom error-object handling in Server Components to prevent the "Digest Error" crash in Next.js.
- **SEO Ready**: Automated `robots.txt` and `sitemap.ts` generation to facilitate Google crawling.

---

## Local Development

1. **Clone the repo**:
   ```bash
   git clone github.com/syedminamurrehman/EpicDrive
   ```
2. **Setup environment**:
   Create a `.env.local` with your Supabase URL and **Correct** Anon Key (Starts with `eyJ...`).
3. **Install Dependencies**:
   ```bash
   npm install
   ```
4. **Run Server**:
   ```bash
   npm run dev
   ```

---
*Developed for EpicDrive Karachi Fleet Operations. Enterprise Support provided by ZEX Softwares.*   
