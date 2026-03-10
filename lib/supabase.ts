import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Supabase credentials missing! Queries will fail.');
    console.log('Available Env Keys:', Object.keys(process.env).filter(key => key.includes('SUPABASE')));
} else {
    console.log('✅ Supabase initialized. URL:', supabaseUrl.substring(0, 25) + '...');
}

export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder'
);

