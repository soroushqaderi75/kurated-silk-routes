export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      bales: {
        Row: {
          arrival_date: string | null
          bale_code: string
          country: string | null
          created_at: string
          id: string
          notes: string | null
          products_extracted: number
          products_remaining: number
          purchase_cost_usd: number | null
          supplier: string | null
          updated_at: string
          weight_kg: number | null
        }
        Insert: {
          arrival_date?: string | null
          bale_code: string
          country?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          products_extracted?: number
          products_remaining?: number
          purchase_cost_usd?: number | null
          supplier?: string | null
          updated_at?: string
          weight_kg?: number | null
        }
        Update: {
          arrival_date?: string | null
          bale_code?: string
          country?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          products_extracted?: number
          products_remaining?: number
          purchase_cost_usd?: number | null
          supplier?: string | null
          updated_at?: string
          weight_kg?: number | null
        }
        Relationships: []
      }
      brands: {
        Row: {
          created_at: string
          description: string | null
          featured: boolean
          id: string
          logo_url: string | null
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          featured?: boolean
          id?: string
          logo_url?: string | null
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          description?: string | null
          featured?: boolean
          id?: string
          logo_url?: string | null
          name?: string
          slug?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string
          gender: Database["public"]["Enums"]["gender_type"]
          id: string
          name: string
          name_fa: string | null
          slug: string
          sort_order: number
        }
        Insert: {
          created_at?: string
          gender: Database["public"]["Enums"]["gender_type"]
          id?: string
          name: string
          name_fa?: string | null
          slug: string
          sort_order?: number
        }
        Update: {
          created_at?: string
          gender?: Database["public"]["Enums"]["gender_type"]
          id?: string
          name?: string
          name_fa?: string | null
          slug?: string
          sort_order?: number
        }
        Relationships: []
      }
      order_items: {
        Row: {
          brand_name: string | null
          created_at: string
          id: string
          image_url: string | null
          order_id: string
          product_code: string
          product_id: string | null
          quantity: number
          title: string
          unit_price: number
        }
        Insert: {
          brand_name?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          order_id: string
          product_code: string
          product_id?: string | null
          quantity?: number
          title: string
          unit_price: number
        }
        Update: {
          brand_name?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          order_id?: string
          product_code?: string
          product_id?: string | null
          quantity?: number
          title?: string
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          address: string
          city: string
          created_at: string
          email: string | null
          full_name: string
          id: string
          notes: string | null
          order_number: string
          phone: string
          postal_code: string | null
          shipping: number
          status: Database["public"]["Enums"]["order_status"]
          subtotal: number
          total: number
          tracking_code: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          address: string
          city: string
          created_at?: string
          email?: string | null
          full_name: string
          id?: string
          notes?: string | null
          order_number?: string
          phone: string
          postal_code?: string | null
          shipping?: number
          status?: Database["public"]["Enums"]["order_status"]
          subtotal?: number
          total?: number
          tracking_code?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          address?: string
          city?: string
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          notes?: string | null
          order_number?: string
          phone?: string
          postal_code?: string | null
          shipping?: number
          status?: Database["public"]["Enums"]["order_status"]
          subtotal?: number
          total?: number
          tracking_code?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      product_images: {
        Row: {
          created_at: string
          id: string
          image_url: string
          product_id: string
          sort_order: number
        }
        Insert: {
          created_at?: string
          id?: string
          image_url: string
          product_id: string
          sort_order?: number
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          product_id?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "product_images_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          bale_id: string | null
          box: string | null
          brand_id: string | null
          category_id: string | null
          chest_cm: number | null
          color: string | null
          condition: Database["public"]["Enums"]["condition_grade"]
          country_of_origin: string | null
          created_at: string
          description: string | null
          gender: Database["public"]["Enums"]["gender_type"] | null
          hero_image: string | null
          id: string
          is_available: boolean
          is_featured: boolean
          length_cm: number | null
          material: string | null
          product_code: string
          purchase_price: number | null
          season: string | null
          selling_price: number
          shelf: string | null
          size: string | null
          sleeve_cm: number | null
          sold_at: string | null
          title: string
          title_fa: string | null
          updated_at: string
          video_url: string | null
          waist_cm: number | null
          warehouse: string | null
        }
        Insert: {
          bale_id?: string | null
          box?: string | null
          brand_id?: string | null
          category_id?: string | null
          chest_cm?: number | null
          color?: string | null
          condition?: Database["public"]["Enums"]["condition_grade"]
          country_of_origin?: string | null
          created_at?: string
          description?: string | null
          gender?: Database["public"]["Enums"]["gender_type"] | null
          hero_image?: string | null
          id?: string
          is_available?: boolean
          is_featured?: boolean
          length_cm?: number | null
          material?: string | null
          product_code: string
          purchase_price?: number | null
          season?: string | null
          selling_price: number
          shelf?: string | null
          size?: string | null
          sleeve_cm?: number | null
          sold_at?: string | null
          title: string
          title_fa?: string | null
          updated_at?: string
          video_url?: string | null
          waist_cm?: number | null
          warehouse?: string | null
        }
        Update: {
          bale_id?: string | null
          box?: string | null
          brand_id?: string | null
          category_id?: string | null
          chest_cm?: number | null
          color?: string | null
          condition?: Database["public"]["Enums"]["condition_grade"]
          country_of_origin?: string | null
          created_at?: string
          description?: string | null
          gender?: Database["public"]["Enums"]["gender_type"] | null
          hero_image?: string | null
          id?: string
          is_available?: boolean
          is_featured?: boolean
          length_cm?: number | null
          material?: string | null
          product_code?: string
          purchase_price?: number | null
          season?: string | null
          selling_price?: number
          shelf?: string | null
          size?: string | null
          sleeve_cm?: number | null
          sold_at?: string | null
          title?: string
          title_fa?: string | null
          updated_at?: string
          video_url?: string | null
          waist_cm?: number | null
          warehouse?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_bale_id_fkey"
            columns: ["bale_id"]
            isOneToOne: false
            referencedRelation: "bales"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          city: string | null
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
          postal_code: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          city?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          phone?: string | null
          postal_code?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          city?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          postal_code?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "customer"
      condition_grade: "cream" | "grade_a" | "grade_b"
      gender_type: "men" | "women" | "accessories" | "unisex"
      order_status:
        | "pending"
        | "paid"
        | "processing"
        | "shipped"
        | "delivered"
        | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "customer"],
      condition_grade: ["cream", "grade_a", "grade_b"],
      gender_type: ["men", "women", "accessories", "unisex"],
      order_status: [
        "pending",
        "paid",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ],
    },
  },
} as const
