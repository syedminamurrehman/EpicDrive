-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.bookings (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  car_id uuid,
  user_id uuid,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  pickup_date timestamp with time zone NOT NULL,
  return_date timestamp with time zone NOT NULL,
  total_cost numeric NOT NULL,
  status USER-DEFINED NOT NULL DEFAULT 'pending'::booking_status,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT bookings_pkey PRIMARY KEY (id),
  CONSTRAINT bookings_car_id_fkey FOREIGN KEY (car_id) REFERENCES public.cars(id)
);
CREATE TABLE public.cars (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  brand text NOT NULL,
  model_year integer NOT NULL,
  category USER-DEFINED NOT NULL,
  daily_rate numeric NOT NULL,
  weekly_rate numeric NOT NULL,
  monthly_rate numeric NOT NULL,
  status USER-DEFINED NOT NULL DEFAULT 'available'::car_status,
  thumbnail_image text,
  images ARRAY DEFAULT '{}'::text[],
  seating_capacity integer NOT NULL,
  airbags_count integer NOT NULL,
  infotainment_details text,
  interior_details text,
  exterior_details text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT cars_pkey PRIMARY KEY (id)
);
CREATE TABLE public.features (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  car_id uuid,
  feature_name text NOT NULL,
  feature_type text NOT NULL,
  CONSTRAINT features_pkey PRIMARY KEY (id),
  CONSTRAINT features_car_id_fkey FOREIGN KEY (car_id) REFERENCES public.cars(id)
);
CREATE TABLE public.specs_electric (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  car_id uuid,
  motor_power_kw integer,
  range_wltp integer,
  charging_time_50kw_dc text,
  adas boolean DEFAULT false,
  CONSTRAINT specs_electric_pkey PRIMARY KEY (id),
  CONSTRAINT specs_electric_car_id_fkey FOREIGN KEY (car_id) REFERENCES public.cars(id)
);
CREATE TABLE public.specs_engine (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  car_id uuid,
  engine_size_cc integer,
  transmission text NOT NULL,
  gears integer,
  mileage_kml numeric,
  power_hp integer,
  torque_nm integer,
  adas boolean DEFAULT false,
  CONSTRAINT specs_engine_pkey PRIMARY KEY (id),
  CONSTRAINT specs_engine_car_id_fkey FOREIGN KEY (car_id) REFERENCES public.cars(id)
);
CREATE TABLE public.specs_hybrid (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  car_id uuid,
  battery_size_kwh numeric,
  ev_range_wltp integer,
  combined_range integer,
  charging_time_50kw_dc text,
  CONSTRAINT specs_hybrid_pkey PRIMARY KEY (id),
  CONSTRAINT specs_hybrid_car_id_fkey FOREIGN KEY (car_id) REFERENCES public.cars(id)
);