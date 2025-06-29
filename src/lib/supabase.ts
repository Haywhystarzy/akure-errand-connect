
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://your-project-id.supabase.co'
const supabaseAnonKey = 'your-anon-public-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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
