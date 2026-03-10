import { supabase } from '@/lib/supabase';
import { Car } from '@/types';

export const carService = {
    async getCars(filters?: {
        category?: string;
        minPrice?: number;
        maxPrice?: number;
        adas?: string;
        query?: string;
        sort?: string;
    }) {
        let query = supabase
            .from('cars')
            .select(`
                *,
                specs_engine(*),
                specs_hybrid(*),
                specs_electric(*)
            `);

        if (filters?.category) {
            query = query.eq('category', filters.category);
        }
        if (filters?.minPrice) {
            query = query.gte('daily_rate', filters.minPrice);
        }
        if (filters?.maxPrice) {
            query = query.lte('daily_rate', filters.maxPrice);
        }
        if (filters?.query) {
            query = query.or(`name.ilike.%${filters.query}%,brand.ilike.%${filters.query}%`);
        }

        // Sorting
        if (filters?.sort === 'price_asc') {
            query = query.order('daily_rate', { ascending: true });
        } else if (filters?.sort === 'price_desc') {
            query = query.order('daily_rate', { ascending: false });
        } else {
            query = query.order('created_at', { ascending: false });
        }

        const { data, error } = await query;
        if (error) {
            console.error('DATABASE QUERY ERROR:', error);
            throw new Error(`Database error: ${error.message}`);
        }

        if (!data) return [];

        let filteredData = (data as any[]).map(car => ({
            ...car,
            engine_specs: car.specs_engine?.[0],
            hybrid_specs: car.specs_hybrid?.[0],
            electric_specs: car.specs_electric?.[0]
        })) as Car[];

        // Post-fetch ADAS filtering
        if (filters?.adas === 'true') {
            filteredData = filteredData.filter(car =>
                car.engine_specs?.adas || car.electric_specs?.adas
            );
        } else if (filters?.adas === 'false') {
            filteredData = filteredData.filter(car =>
                !car.engine_specs?.adas && !car.electric_specs?.adas
            );
        }

        return filteredData;
    },

    async getCarById(id: string) {
        // Basic UUID format check to avoid database errors with invalid IDs during build/static analysis
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(id)) {
            console.warn(`Invalid car ID format: ${id}`);
            return null;
        }

        const { data, error } = await supabase
            .from('cars')
            .select(`
                *,
                specs_engine(*),
                specs_hybrid(*),
                specs_electric(*),
                features(*)
            `)
            .eq('id', id)
            .single();

        if (error) {
            console.error(`Error fetching car by ID: ${id}`, error);
            return null;
        }

        if (!data) return null;

        const car = data as any;
        return {
            ...car,
            engine_specs: car.specs_engine?.[0],
            hybrid_specs: car.specs_hybrid?.[0],
            electric_specs: car.specs_electric?.[0]
        } as Car;
    },

    async createBooking(bookingData: any) {
        const { error } = await supabase
            .from('bookings')
            .insert([bookingData]);

        if (error) throw error;
    }
};
