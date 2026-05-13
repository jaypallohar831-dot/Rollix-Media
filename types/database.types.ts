export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          email: string
          full_name: string | null
          role: string | null
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          email: string
          full_name?: string | null
          role?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          email?: string
          full_name?: string | null
          role?: string | null
        }
      }
      categories: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          slug: string
          description: string | null
          status: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          slug: string
          description?: string | null
          status?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          slug?: string
          description?: string | null
          status?: string | null
        }
      }
      portfolio_projects: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          slug: string
          description: string | null
          thumbnail: string | null
          gallery_images: string[] | null
          category_id: string | null
          tags: string[] | null
          featured: boolean | null
          status: string | null
          seo_title: string | null
          seo_description: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          slug: string
          description?: string | null
          thumbnail?: string | null
          gallery_images?: string[] | null
          category_id?: string | null
          tags?: string[] | null
          featured?: boolean | null
          status?: string | null
          seo_title?: string | null
          seo_description?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          slug?: string
          description?: string | null
          thumbnail?: string | null
          gallery_images?: string[] | null
          category_id?: string | null
          tags?: string[] | null
          featured?: boolean | null
          status?: string | null
          seo_title?: string | null
          seo_description?: string | null
        }
      }
      services: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          slug: string
          description: string
          icon: string | null
          featured: boolean | null
          status: string | null
          seo_title: string | null
          seo_description: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          slug: string
          description: string
          icon?: string | null
          featured?: boolean | null
          status?: string | null
          seo_title?: string | null
          seo_description?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          slug?: string
          description?: string
          icon?: string | null
          featured?: boolean | null
          status?: string | null
          seo_title?: string | null
          seo_description?: string | null
        }
      }
      testimonials: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          role: string | null
          company: string | null
          content: string
          rating: number | null
          avatar_url: string | null
          status: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          role?: string | null
          company?: string | null
          content: string
          rating?: number | null
          avatar_url?: string | null
          status?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          role?: string | null
          company?: string | null
          content?: string
          rating?: number | null
          avatar_url?: string | null
          status?: string | null
        }
      }
      contact_leads: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          email: string
          phone: string | null
          service_interest: string | null
          message: string | null
          status: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          email: string
          phone?: string | null
          service_interest?: string | null
          message?: string | null
          status?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          email?: string
          phone?: string | null
          service_interest?: string | null
          message?: string | null
          status?: string | null
        }
      }
      media_assets: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          public_id: string
          url: string
          format: string | null
          bytes: number | null
          width: number | null
          height: number | null
          folder: string | null
          resource_type: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          public_id: string
          url: string
          format?: string | null
          bytes?: number | null
          width?: number | null
          height?: number | null
          folder?: string | null
          resource_type?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          public_id?: string
          url?: string
          format?: string | null
          bytes?: number | null
          width?: number | null
          height?: number | null
          folder?: string | null
          resource_type?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
