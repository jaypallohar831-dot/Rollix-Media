-- Users (Profiles) Table (Optional extension of auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  email text UNIQUE NOT NULL,
  full_name text,
  role text DEFAULT 'admin'
);

-- Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  status text DEFAULT 'active'
);

-- Portfolio Projects Table
CREATE TABLE IF NOT EXISTS public.portfolio_projects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  thumbnail text,
  gallery_images text[] DEFAULT '{}'::text[],
  category_id uuid REFERENCES public.categories(id) ON DELETE SET NULL,
  tags text[] DEFAULT '{}'::text[],
  featured boolean DEFAULT false,
  status text DEFAULT 'published',
  seo_title text,
  seo_description text
);

-- Services Table
CREATE TABLE IF NOT EXISTS public.services (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text NOT NULL,
  icon text,
  featured boolean DEFAULT false,
  status text DEFAULT 'active',
  seo_title text,
  seo_description text
);

-- Testimonials Table
CREATE TABLE IF NOT EXISTS public.testimonials (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  name text NOT NULL,
  role text,
  company text,
  content text NOT NULL,
  rating integer DEFAULT 5,
  avatar_url text,
  status text DEFAULT 'published'
);

-- Contact Leads Table
CREATE TABLE IF NOT EXISTS public.contact_leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  service_interest text,
  message text,
  status text DEFAULT 'new' -- new, contacted, resolved
);

-- Media Assets Table (Cloudinary references)
CREATE TABLE IF NOT EXISTS public.media_assets (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  public_id text NOT NULL UNIQUE,
  url text NOT NULL,
  format text,
  bytes integer,
  width integer,
  height integer,
  folder text,
  resource_type text DEFAULT 'image'
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;

-- Read policies (Public Access)
DROP POLICY IF EXISTS "Allow public read access to categories" ON public.categories;
CREATE POLICY "Allow public read access to categories" ON public.categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access to portfolio_projects" ON public.portfolio_projects;
CREATE POLICY "Allow public read access to portfolio_projects" ON public.portfolio_projects FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access to services" ON public.services;
CREATE POLICY "Allow public read access to services" ON public.services FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access to testimonials" ON public.testimonials;
CREATE POLICY "Allow public read access to testimonials" ON public.testimonials FOR SELECT USING (true);

-- Write policies (Admin only - using auth.role() = 'authenticated')
DROP POLICY IF EXISTS "Allow authenticated access to profiles" ON public.profiles;
CREATE POLICY "Allow authenticated access to profiles" ON public.profiles FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow authenticated full access to categories" ON public.categories;
CREATE POLICY "Allow authenticated full access to categories" ON public.categories FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow authenticated full access to portfolio_projects" ON public.portfolio_projects;
CREATE POLICY "Allow authenticated full access to portfolio_projects" ON public.portfolio_projects FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow authenticated full access to services" ON public.services;
CREATE POLICY "Allow authenticated full access to services" ON public.services FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow authenticated full access to testimonials" ON public.testimonials;
CREATE POLICY "Allow authenticated full access to testimonials" ON public.testimonials FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow authenticated full access to contact_leads" ON public.contact_leads;
CREATE POLICY "Allow authenticated full access to contact_leads" ON public.contact_leads FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow public insert to contact_leads" ON public.contact_leads;
CREATE POLICY "Allow public insert to contact_leads" ON public.contact_leads FOR INSERT WITH CHECK (true); -- Public can submit leads

DROP POLICY IF EXISTS "Allow authenticated full access to media_assets" ON public.media_assets;
CREATE POLICY "Allow authenticated full access to media_assets" ON public.media_assets FOR ALL USING (auth.role() = 'authenticated');
