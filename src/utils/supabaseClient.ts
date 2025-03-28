import { createClient } from "@supabase/supabase-js";

// Get Supabase URL and Anon Key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase environment variables are not set.");
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Simplified database type definition
export type Database = {
  public: {
    Tables: {
      // Users table definition
      users: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          profile_image: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name?: string | null;
          profile_image?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          profile_image?: string | null;
          created_at?: string;
        };
      };
      // Videos table definition
      videos: {
        Row: {
          id: string;
          title: string;
          description: string;
          category: string;
          user_id: string;
          video_url: string;
          thumbnail_url: string;
          copyright: string;
          views: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          category: string;
          user_id: string;
          video_url: string;
          thumbnail_url: string;
          copyright: string;
          views?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          category?: string;
          user_id?: string;
          video_url?: string;
          thumbnail_url?: string;
          copyright?: string;
          views?: number;
          created_at?: string;
        };
      };
    };
    // Functions definition
    Functions: {
      // View count increment function
      increment_view_count: {
        Args: {
          video_id: string;
        };
        Returns: void;
      };
    };
  };
};
