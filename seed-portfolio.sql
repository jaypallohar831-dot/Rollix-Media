-- Add missing columns to portfolio_projects table if they do not exist
ALTER TABLE public.portfolio_projects ADD COLUMN IF NOT EXISTS video_url text;
ALTER TABLE public.portfolio_projects ADD COLUMN IF NOT EXISTS location text;
ALTER TABLE public.portfolio_projects ADD COLUMN IF NOT EXISTS status text DEFAULT 'published';
ALTER TABLE public.portfolio_projects ADD COLUMN IF NOT EXISTS seo_title text;
ALTER TABLE public.portfolio_projects ADD COLUMN IF NOT EXISTS seo_description text;

-- Seed data for portfolio_projects
INSERT INTO public.portfolio_projects (title, slug, description, seo_title, thumbnail, video_url, location, featured)
VALUES
  ('Eternal Vows', 'eternal-vows', 'An intimate cinematic journey capturing the union of two souls. Shot across golden-hour landscapes and candlelit interiors, every frame breathes emotion. This film weaves together candid moments and choreographed sequences to tell a story of love that transcends time.', 'A love story told through light and silence.', '/assets/portfolio/wedding.png', NULL, 'Udaipur, India', true),
  ('LUXE Noir', 'luxe-noir', 'A high-end commercial for a luxury fragrance brand. Deep blacks, shimmering golds, and slow-motion textures create an unforgettable sensory experience. Every frame is meticulously color-graded to evoke opulence and desire.', 'Luxury redefined in sixty seconds.', '/assets/portfolio/commercial.png', NULL, 'Mumbai, India', true),
  ('Ember & Oak', 'ember-and-oak', 'A documentary-style brand film following three generations of artisan woodworkers. Raw textures, warm tones, and honest storytelling create an intimate portrait of dedication and craft.', 'Craft born from generations of quiet devotion.', '/assets/portfolio/brand.png', NULL, 'Jaipur, India', true),
  ('Velocity', 'velocity', 'A high-octane compilation reel showcasing speed, motion, and dynamic camera work. Drone aerials and stabilized tracking shots at their finest, capturing the raw energy of movement.', 'Motion as emotion. Speed as poetry.', '/assets/portfolio/reel.png', NULL, 'Goa, India', false),
  ('Cinematic Flow', 'cinematic-flow', 'A breathtaking visual experience showcasing cinematic motion, vivid colors, and dynamic flow. Perfect for high-end digital marketing and brand storytelling.', 'A seamless journey space and time.', '/assets/portfolio/reel.png', NULL, 'Global', false),
  ('Bloom', 'bloom', 'A high-end editorial photography campaign designed for a lifestyle brand. Vibrant visuals and medium-format crispness that drove 3x engagement over the previous quarter.', 'A season of growth, captured in golden light.', '/assets/portfolio/social.png', NULL, 'Delhi, India', true),
  ('Pulse', 'pulse', 'A motion graphics package for a music festival brand. Pulsing geometries, synchronized typography, and reactive particle systems create an audiovisual experience that lives and breathes.', 'Where sound meets shape and rhythm finds form.', '/assets/portfolio/motion.png', NULL, 'Bangalore, India', false)
ON CONFLICT (slug) DO NOTHING;
