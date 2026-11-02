-- ==============================================================================
-- Ampledia Rebrand Database Migration Script (DO NOT RUN AUTOMATICALLY)
-- ==============================================================================
-- Target: Supabase PostgreSQL database
-- Scope: Replace legacy "Rollix Media" / "Rollix" content in text & JSON fields.
-- Instructions: Review this file manually, test on a staging/backup instance,
-- and execute in the Supabase SQL Editor only after code deployment.
-- ==============================================================================

BEGIN;

-- 1. Update Services table SEO and Descriptions
UPDATE services
SET 
  description = REPLACE(description, 'Rollix Media', 'Ampledia'),
  seo_title = REPLACE(seo_title, 'Rollix Media', 'Ampledia'),
  seo_description = REPLACE(seo_description, 'Rollix Media', 'Ampledia')
WHERE 
  description ILIKE '%rollix%'
  OR seo_title ILIKE '%rollix%'
  OR seo_description ILIKE '%rollix%';

-- 2. Update Portfolio Projects (Text & SEO)
UPDATE portfolio_projects
SET 
  title = REPLACE(title, 'Rollix Media', 'Ampledia'),
  description = REPLACE(description, 'Rollix Media', 'Ampledia'),
  seo_title = REPLACE(seo_title, 'Rollix Media', 'Ampledia'),
  seo_description = REPLACE(seo_description, 'Rollix Media', 'Ampledia')
WHERE 
  title ILIKE '%rollix%'
  OR description ILIKE '%rollix%'
  OR seo_title ILIKE '%rollix%'
  OR seo_description ILIKE '%rollix%';

-- 3. Update Portfolio Projects JSON fields (Strategy & Deliverables)
UPDATE portfolio_projects
SET 
  strategy = REPLACE(strategy::text, 'Rollix Media', 'Ampledia')::jsonb
WHERE 
  strategy::text ILIKE '%rollix%';

UPDATE portfolio_projects
SET 
  deliverables = REPLACE(deliverables::text, 'Rollix Media', 'Ampledia')::jsonb
WHERE 
  deliverables::text ILIKE '%rollix%';

-- 4. Update Testimonials content
UPDATE testimonials
SET 
  content = REPLACE(content, 'Rollix Media', 'Ampledia')
WHERE 
  content ILIKE '%rollix%';

-- 5. Update Categories descriptions
UPDATE categories
SET 
  description = REPLACE(description, 'Rollix Media', 'Ampledia')
WHERE 
  description ILIKE '%rollix%';

COMMIT;

