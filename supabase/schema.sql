-- Use Supabase as the backend and store all database schema definitions here.
-- Table: cars
CREATE TYPE car_status AS ENUM ('available', 'rented', 'maintenance');
CREATE TYPE fuel_category AS ENUM ('petrol', 'diesel', 'hev', 'phev', 'electric');

CREATE TABLE IF NOT EXISTS cars (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    brand TEXT NOT NULL,
    model_year INTEGER NOT NULL,
    category fuel_category NOT NULL,
    daily_rate DECIMAL(12, 2) NOT NULL,
    weekly_rate DECIMAL(12, 2) NOT NULL,
    monthly_rate DECIMAL(12, 2) NOT NULL,
    status car_status NOT NULL DEFAULT 'available',
    thumbnail_image TEXT,
    images TEXT[] DEFAULT '{}',
    seating_capacity INTEGER NOT NULL,
    airbags_count INTEGER NOT NULL,
    infotainment_details TEXT,
    interior_details TEXT,
    exterior_details TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: specs_engine (for petrol, diesel, hev, phev engine-related fields)
CREATE TABLE IF NOT EXISTS specs_engine (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    car_id UUID REFERENCES cars(id) ON DELETE CASCADE,
    engine_size_cc INTEGER,
    transmission TEXT NOT NULL, -- Manual or Automatic
    gears INTEGER,
    mileage_kml DECIMAL(5, 2),
    power_hp INTEGER,
    torque_nm INTEGER,
    adas BOOLEAN DEFAULT FALSE
);

-- Table: specs_hybrid (for hev and phev battery-related fields)
CREATE TABLE IF NOT EXISTS specs_hybrid (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    car_id UUID REFERENCES cars(id) ON DELETE CASCADE,
    battery_size_kwh DECIMAL(10, 2),
    ev_range_wltp INTEGER,
    combined_range INTEGER,
    charging_time_50kw_dc TEXT -- Only for PHEV
);

-- Table: specs_electric (for EV-specific data)
CREATE TABLE IF NOT EXISTS specs_electric (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    car_id UUID REFERENCES cars(id) ON DELETE CASCADE,
    motor_power_kw INTEGER,
    range_wltp INTEGER,
    charging_time_50kw_dc TEXT,
    adas BOOLEAN DEFAULT FALSE
);

-- Table: features (ADAS and interior/exterior details - additional flexible storage)
CREATE TABLE IF NOT EXISTS features (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    car_id UUID REFERENCES cars(id) ON DELETE CASCADE,
    feature_name TEXT NOT NULL,
    feature_type TEXT NOT NULL -- 'interior', 'exterior', 'safety', etc.
);

-- Table: bookings
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'cancelled');

CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    car_id UUID REFERENCES cars(id) ON DELETE CASCADE,
    user_id UUID, -- References auth.users(id)
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    pickup_date TIMESTAMPTZ NOT NULL,
    return_date TIMESTAMPTZ NOT NULL,
    total_cost DECIMAL(12, 2) NOT NULL,
    status booking_status NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE specs_engine ENABLE ROW LEVEL SECURITY;
ALTER TABLE specs_hybrid ENABLE ROW LEVEL SECURITY;
ALTER TABLE specs_electric ENABLE ROW LEVEL SECURITY;
ALTER TABLE features ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Allow public read access to cars and specs
CREATE POLICY "Allow public read access to cars" ON cars FOR SELECT USING (true);
CREATE POLICY "Allow public read access to specs_engine" ON specs_engine FOR SELECT USING (true);
CREATE POLICY "Allow public read access to specs_hybrid" ON specs_hybrid FOR SELECT USING (true);
CREATE POLICY "Allow public read access to specs_electric" ON specs_electric FOR SELECT USING (true);
CREATE POLICY "Allow public read access to features" ON features FOR SELECT USING (true);

-- Restrict write operations to authenticated admin users only
-- Note: Simplified for this setup, assuming 'admin' role or specific UID
CREATE POLICY "Allow service role to manage everything" ON cars FOR ALL TO service_role USING (true);

-- Bookings: Anyone can insert and see (for demonstration purposes/mock admin)
CREATE POLICY "Allow public access to bookings" ON bookings FOR ALL USING (true);
CREATE POLICY "Allow public insert bookings" ON bookings FOR INSERT WITH CHECK (true);

-- Admins/Service Role can manage all bookings
CREATE POLICY "Allow service role to manage bookings" ON bookings FOR ALL TO service_role USING (true);
