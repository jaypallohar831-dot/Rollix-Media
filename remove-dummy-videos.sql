-- Removes the dummy placeholder videos from your portfolio projects
UPDATE public.portfolio_projects 
SET video_url = NULL 
WHERE video_url IN (
  '/assets/portfolio/videos/reel2.mp4', 
  '/assets/portfolio/14652279_3840_2160_50fps.mp4'
);
