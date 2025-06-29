
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ztlcklmzepocurmshgpk.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0bGNrbG16ZXBvY3VybXNoZ3BrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5NzkyODEsImV4cCI6MjA2NjU1NTI4MX0.pI9vsJP3b21il9D_9GDZ2B1id1rmCgTut5SD8c9Olc8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
})

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          phone_number: string
          role: 'sender' | 'runner'
          nin_front_url: string | null
          nin_back_url: string | null
          profile_picture_url: string | null
          relationship_status: string
          address: string
          bio: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name: string
          phone_number: string
          role: 'sender' | 'runner'
          nin_front_url?: string | null
          nin_back_url?: string | null
          profile_picture_url?: string | null
          relationship_status: string
          address: string
          bio: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          phone_number?: string
          role?: 'sender' | 'runner'
          nin_front_url?: string | null
          nin_back_url?: string | null
          profile_picture_url?: string | null
          relationship_status?: string
          address?: string
          bio?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
