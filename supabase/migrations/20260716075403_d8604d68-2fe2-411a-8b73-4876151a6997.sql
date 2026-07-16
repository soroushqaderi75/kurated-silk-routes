
-- ============ ENUMS ============
CREATE TYPE public.app_role AS ENUM ('admin', 'customer');
CREATE TYPE public.condition_grade AS ENUM ('cream', 'grade_a', 'grade_b');
CREATE TYPE public.gender_type AS ENUM ('men', 'women', 'accessories', 'unisex');
CREATE TYPE public.order_status AS ENUM ('pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled');

-- ============ UPDATED_AT HELPER ============
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

-- ============ PROFILES ============
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  postal_code TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own profile" ON public.profiles FOR ALL
  USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE TRIGGER trg_profiles_updated BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''))
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============ USER ROLES ============
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own roles" ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;
GRANT EXECUTE ON FUNCTION public.has_role(UUID, app_role) TO authenticated, anon;

-- ============ BRANDS ============
CREATE TABLE public.brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  logo_url TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.brands TO anon, authenticated;
GRANT ALL ON public.brands TO service_role;
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Brands public read" ON public.brands FOR SELECT USING (true);
CREATE POLICY "Admins manage brands" ON public.brands FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ============ CATEGORIES ============
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  name_fa TEXT,
  slug TEXT NOT NULL UNIQUE,
  gender gender_type NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.categories TO anon, authenticated;
GRANT ALL ON public.categories TO service_role;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Categories public read" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Admins manage categories" ON public.categories FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ============ BALES ============
CREATE TABLE public.bales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bale_code TEXT NOT NULL UNIQUE,
  supplier TEXT,
  country TEXT,
  arrival_date DATE,
  weight_kg NUMERIC(10,2),
  purchase_cost_usd NUMERIC(12,2),
  products_extracted INT NOT NULL DEFAULT 0,
  products_remaining INT NOT NULL DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.bales TO authenticated;
GRANT ALL ON public.bales TO service_role;
ALTER TABLE public.bales ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage bales" ON public.bales FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_bales_updated BEFORE UPDATE ON public.bales
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ PRODUCTS ============
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_code TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  title_fa TEXT,
  description TEXT,
  brand_id UUID REFERENCES public.brands(id) ON DELETE SET NULL,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  bale_id UUID REFERENCES public.bales(id) ON DELETE SET NULL,
  gender gender_type,
  size TEXT,
  color TEXT,
  material TEXT,
  season TEXT,
  country_of_origin TEXT,
  condition condition_grade NOT NULL DEFAULT 'grade_a',
  -- Measurements (cm)
  chest_cm NUMERIC(5,1),
  length_cm NUMERIC(5,1),
  sleeve_cm NUMERIC(5,1),
  waist_cm NUMERIC(5,1),
  -- Inventory
  warehouse TEXT DEFAULT 'Warehouse A',
  shelf TEXT,
  box TEXT,
  -- Pricing (Toman)
  purchase_price BIGINT,
  selling_price BIGINT NOT NULL,
  -- Media
  video_url TEXT,
  hero_image TEXT,
  -- Availability
  is_available BOOLEAN NOT NULL DEFAULT true,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  sold_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.products TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Products public read" ON public.products FOR SELECT USING (true);
CREATE POLICY "Admins manage products" ON public.products FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_products_updated BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX idx_products_brand ON public.products(brand_id);
CREATE INDEX idx_products_category ON public.products(category_id);
CREATE INDEX idx_products_available ON public.products(is_available);

-- ============ PRODUCT IMAGES ============
CREATE TABLE public.product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.product_images TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.product_images TO authenticated;
GRANT ALL ON public.product_images TO service_role;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Product images public read" ON public.product_images FOR SELECT USING (true);
CREATE POLICY "Admins manage product images" ON public.product_images FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ============ ORDERS ============
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT NOT NULL UNIQUE DEFAULT ('AB-' || to_char(now(),'YYMMDD') || '-' || upper(substr(md5(random()::text),1,6))),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status order_status NOT NULL DEFAULT 'pending',
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  postal_code TEXT,
  notes TEXT,
  subtotal BIGINT NOT NULL DEFAULT 0,
  shipping BIGINT NOT NULL DEFAULT 0,
  total BIGINT NOT NULL DEFAULT 0,
  tracking_code TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own orders" ON public.orders FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "Users create own orders" ON public.orders FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins update orders" ON public.orders FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(),'admin'))
  WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_orders_updated BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ ORDER ITEMS ============
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_code TEXT NOT NULL,
  title TEXT NOT NULL,
  brand_name TEXT,
  image_url TEXT,
  unit_price BIGINT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.order_items TO authenticated;
GRANT ALL ON public.order_items TO service_role;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own order items" ON public.order_items FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.orders o WHERE o.id = order_id AND (o.user_id = auth.uid() OR public.has_role(auth.uid(),'admin'))));
CREATE POLICY "Users create own order items" ON public.order_items FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM public.orders o WHERE o.id = order_id AND o.user_id = auth.uid()));

-- ============ SEED DATA ============
INSERT INTO public.brands (name, slug, description, featured) VALUES
  ('Ralph Lauren', 'ralph-lauren', 'American heritage classics.', true),
  ('Stone Island', 'stone-island', 'Italian technical outerwear.', true),
  ('Nike', 'nike', 'Archive sportswear.', true),
  ('Carhartt WIP', 'carhartt-wip', 'Workwear reimagined.', true),
  ('Uniqlo', 'uniqlo', 'Japanese minimalism.', true),
  ('Barbour', 'barbour', 'British wax jackets.', false),
  ('C.P. Company', 'cp-company', 'Sportswear engineering.', false),
  ('Levi''s', 'levis', 'Original denim.', true);

INSERT INTO public.categories (name, name_fa, slug, gender, sort_order) VALUES
  ('Jackets', 'کاپشن', 'men-jackets', 'men', 1),
  ('Hoodies', 'هودی', 'men-hoodies', 'men', 2),
  ('Sweatshirts', 'سویشرت', 'men-sweatshirts', 'men', 3),
  ('Shirts', 'پیراهن', 'men-shirts', 'men', 4),
  ('Jeans', 'جین', 'men-jeans', 'men', 5),
  ('Pants', 'شلوار', 'men-pants', 'men', 6),
  ('Shoes', 'کفش', 'men-shoes', 'men', 7),
  ('Jackets', 'کاپشن', 'women-jackets', 'women', 1),
  ('Coats', 'پالتو', 'women-coats', 'women', 2),
  ('Hoodies', 'هودی', 'women-hoodies', 'women', 3),
  ('Dresses', 'پیراهن مجلسی', 'women-dresses', 'women', 4),
  ('Jeans', 'جین', 'women-jeans', 'women', 5),
  ('Shoes', 'کفش', 'women-shoes', 'women', 6),
  ('Bags', 'کیف', 'bags', 'accessories', 1),
  ('Hats', 'کلاه', 'hats', 'accessories', 2),
  ('Belts', 'کمربند', 'belts', 'accessories', 3);

-- Seed a sample bale
INSERT INTO public.bales (bale_code, supplier, country, arrival_date, weight_kg, purchase_cost_usd, products_extracted, products_remaining, notes) VALUES
  ('KR-2026-001', 'Seoul Vintage Co.', 'South Korea', '2026-01-15', 80.00, 500.00, 42, 8, 'Premium mixed grade bale.'),
  ('JP-2026-002', 'Tokyo Threads', 'Japan', '2026-02-10', 65.50, 620.00, 38, 12, 'Uniqlo & Muji heavy.');

-- Seed sample products
DO $$
DECLARE
  b_ralph UUID := (SELECT id FROM public.brands WHERE slug='ralph-lauren');
  b_stone UUID := (SELECT id FROM public.brands WHERE slug='stone-island');
  b_nike UUID := (SELECT id FROM public.brands WHERE slug='nike');
  b_carhartt UUID := (SELECT id FROM public.brands WHERE slug='carhartt-wip');
  b_uniqlo UUID := (SELECT id FROM public.brands WHERE slug='uniqlo');
  b_levi UUID := (SELECT id FROM public.brands WHERE slug='levis');
  c_mj UUID := (SELECT id FROM public.categories WHERE slug='men-jackets');
  c_mh UUID := (SELECT id FROM public.categories WHERE slug='men-hoodies');
  c_ms UUID := (SELECT id FROM public.categories WHERE slug='men-sweatshirts');
  c_mp UUID := (SELECT id FROM public.categories WHERE slug='men-pants');
  c_mje UUID := (SELECT id FROM public.categories WHERE slug='men-jeans');
  c_wc UUID := (SELECT id FROM public.categories WHERE slug='women-coats');
  c_ba UUID := (SELECT id FROM public.categories WHERE slug='bags');
  bale1 UUID := (SELECT id FROM public.bales WHERE bale_code='KR-2026-001');
BEGIN
  INSERT INTO public.products
    (product_code, title, brand_id, category_id, bale_id, gender, size, color, material, season, country_of_origin, condition, chest_cm, length_cm, sleeve_cm, shelf, box, purchase_price, selling_price, is_available, is_featured, description) VALUES
  ('RL-KNT-000101', 'Vintage Cable Knit Sweater', b_ralph, c_ms, bale1, 'men', 'M', 'Cream', '100% Wool', 'Autumn/Winter', 'USA', 'cream', 54, 68, 62, '3', '12', 400000, 1850000, true, true, 'Hand-knit cable pattern, tagged Polo Ralph Lauren, retains original softness.'),
  ('CH-JKT-000102', 'Detroit Jacket 90s', b_carhartt, c_mj, bale1, 'men', 'XL', 'Brown', 'Cotton Canvas', 'Autumn/Winter', 'Mexico', 'grade_a', 62, 64, 60, '3', '12', 550000, 3400000, true, true, 'Classic Carhartt Detroit with corduroy collar and blanket lining. Beautifully broken in.'),
  ('NK-JKT-000103', 'ACG Clima-Fit Anorak', b_nike, c_mj, bale1, 'men', 'L', 'Navy', 'Nylon', 'All Season', 'Vietnam', 'grade_b', 58, 72, 61, '4', '05', 320000, 2100000, true, true, 'Late 90s ACG anorak in technical navy nylon. Some fade at cuffs, otherwise solid.'),
  ('UN-PNT-000104', 'U Chino Wide Trousers', b_uniqlo, c_mp, bale1, 'men', '32', 'Olive', 'Cotton Twill', 'All Season', 'Japan', 'cream', NULL, 74, NULL, '2', '08', 180000, 950000, true, true, 'Uniqlo U by Lemaire wide-leg chinos, essentially unworn.'),
  ('SI-JKT-000105', 'Ghost Piece Resin Jacket', b_stone, c_mj, bale1, 'men', 'L', 'Black', 'Resin Coated Cotton', 'Autumn/Winter', 'Italy', 'cream', 60, 72, 65, '1', '02', 3500000, 12500000, true, true, 'Ghost Piece from Stone Island archive. Tonal badge, immaculate condition.'),
  ('RL-HDY-000106', 'Polo Bear Hoodie', b_ralph, c_mh, bale1, 'men', 'M', 'Grey', 'Cotton Fleece', 'Autumn/Winter', 'Pakistan', 'grade_a', 56, 70, 62, '3', '11', 350000, 2400000, true, true, 'Iconic Polo Bear graphic hoodie in heather grey.'),
  ('LV-JNS-000107', '501 Original Selvedge', b_levi, c_mje, bale1, 'men', '32', 'Indigo', 'Selvedge Denim', 'All Season', 'USA', 'grade_a', NULL, 78, NULL, '5', '03', 280000, 1650000, true, true, 'Made in USA 501 with selvedge outseam, natural fade.'),
  ('RL-BAG-000108', 'Leather Weekender', b_ralph, c_ba, bale1, 'unisex', 'One Size', 'Tan', 'Full Grain Leather', 'All Season', 'Italy', 'grade_a', NULL, NULL, NULL, '6', '01', 900000, 4200000, true, true, 'Full grain leather weekender, brass hardware, patina developing beautifully.');
END $$;
