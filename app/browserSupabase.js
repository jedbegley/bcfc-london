"use client";
import {createClient} from '@supabase/supabase-js';

// One session client across app tracking, notifications, login and player features.
export const supabase=createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL,
 process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
