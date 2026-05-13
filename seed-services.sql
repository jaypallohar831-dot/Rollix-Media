-- Add missing columns to services table if they do not exist
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS featured boolean DEFAULT false;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS status text DEFAULT 'active';
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS seo_title text;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS seo_description text;

-- Seed data for services
INSERT INTO public.services (title, slug, description, icon, featured, status)
VALUES
  ('Luxury Wedding Films', 'wedding-films', 'Cinematic Indian love stories captured with emotional depth, artful composition, and a documentary sensibility that turns your big day into a timeless heirloom.', 'Film', true, 'active'),
  ('Pre-Wedding Narratives', 'pre-wedding', 'Emotional, visually stunning pre-wedding films shot with premium cinematography, capturing the chemistry and anticipation of your journey.', 'Video', true, 'active'),
  ('Reels & Short Films', 'reels-shorts', 'High-impact, cinematic reels and short-form storytelling designed to capture the vibrant essence of your celebrations for modern platforms.', 'Scissors', false, 'active'),
  ('Creative Production', 'creative-production', 'End-to-end creative production for luxury brands and lifestyle—bringing a premium Indian aesthetic and cinematic scale to your vision.', 'Sparkles', true, 'active'),
  ('Brand Films', 'brand-films', 'High-impact brand documentaries and commercial films that combine cinematic production quality with deeply human storytelling.', 'Megaphone', true, 'active'),
  ('Visual Identity', 'visual-identity', 'Elegant brand identities and visual systems for premium businesses, crafted with the same luxurious attention to detail as our films.', 'Layers', false, 'active'),
  ('Cinematic Campaigns', 'social-campaigns', 'Scroll-stopping social media campaigns that leverage our cinematic expertise to build luxury brands and engage premium audiences.', 'Share2', false, 'active'),
  ('Digital Experiences', 'digital-experiences', 'Minimal, premium, and immersive web design that extends your brand''s luxury narrative into the digital space.', 'TrendingUp', false, 'active')
ON CONFLICT (slug) DO NOTHING;
