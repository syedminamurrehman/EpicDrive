export type FuelCategory = 'petrol' | 'diesel' | 'hev' | 'phev' | 'electric';
export type CarStatus = 'available' | 'rented' | 'maintenance';
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

export interface Car {
    id: string;
    name: string;
    brand: string;
    model_year: number;
    category: FuelCategory;
    daily_rate: number;
    weekly_rate: number;
    monthly_rate: number;
    status: CarStatus;
    thumbnail_image: string;
    images: string[];
    seating_capacity: number;
    airbags_count: number;
    infotainment_details?: string;
    interior_details?: string;
    exterior_details?: string;
    created_at: string;
    engine_specs?: EngineSpecs;
    hybrid_specs?: HybridSpecs;
    electric_specs?: ElectricSpecs;
}

export interface EngineSpecs {
    engine_size_cc: number;
    transmission: 'Manual' | 'Automatic';
    gears: number;
    mileage_kml: number;
    power_hp: number;
    torque_nm: number;
    adas: boolean;
}

export interface HybridSpecs {
    engine_size_cc: number;
    battery_size_kwh: number;
    ev_range_wltp: number;
    combined_range: number;
    power_hp: number;
    adas: boolean;
    charging_time_50kw_dc?: string; // required only for phev
}

export interface ElectricSpecs {
    motor_power_kw: number;
    range_wltp: number;
    charging_time_50kw_dc: string;
    adas?: boolean;
}

export interface Booking {
    id: string;
    car_id: string;
    user_id?: string;
    full_name: string;
    email: string;
    phone: string;
    pickup_date: string;
    return_date: string;
    total_cost: number;
    status: BookingStatus;
    created_at: string;
    car?: Car;
}
