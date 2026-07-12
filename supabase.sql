-- Create portfolio_blogs table
CREATE TABLE IF NOT EXISTS public.portfolio_data (
    id TEXT PRIMARY KEY,
    data JSONB NOT NULL DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Note: The existing table is portfolio_data, where id can be 'portfolio_blogs'.
-- Since all other dynamic sections (projects, experience, education, stats, siteinfo) 
-- are stored as rows in 'portfolio_data', we can simply store the blogs array 
-- in the portfolio_data table under id = 'portfolio_blogs'!
-- This is extremely clean because it requires NO schema changes or new tables, 
-- and automatically utilizes the existing API (fetchPortfolioData, savePortfolioData)
-- which we've built, secured, and validated!
-- 
-- The blogs array structure:
-- [
--   {
--     "id": "blog-1",
--     "title": "Demystifying Cyber Defense",
--     "slug": "demystifying-cyber-defense",
--     "summary": "An introduction to foundational defensive concepts.",
--     "content": "Rich markdown content...",
--     "tags": ["Blue Team", "Pentesting"],
--     "publishedAt": "2026-07-12T00:00:00.000Z",
--     "readTime": 5,
--     "published": true
--   }
-- ]
