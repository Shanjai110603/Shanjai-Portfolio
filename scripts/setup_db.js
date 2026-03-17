import { Client } from 'pg';
import fs from 'fs';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    console.error('Error: DATABASE_URL environment variable is required.');
    process.exit(1);
}

const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
});

async function main() {
    try {
        await client.connect();
        console.log('Connected to Supabase PostgreSQL database.');

        const sql = `
            -- 1. Create the settings table
            CREATE TABLE IF NOT EXISTS public.portfolio_data (
                id TEXT PRIMARY KEY,
                data JSONB NOT NULL DEFAULT '{}'::jsonb,
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
            );

            -- 2. Insert default rows for all our sections
            INSERT INTO public.portfolio_data (id, data) VALUES 
            ('portfolio_siteinfo', '{}'::jsonb),
            ('portfolio_hero', '{}'::jsonb),
            ('portfolio_about', '{}'::jsonb),
            ('portfolio_experience', '[]'::jsonb),
            ('portfolio_education', '[]'::jsonb),
            ('portfolio_stats', '[]'::jsonb),
            ('portfolio_projects', '[]'::jsonb),
            ('portfolio_skills', '[]'::jsonb),
            ('portfolio_messages', '[]'::jsonb)
            ON CONFLICT (id) DO NOTHING;

            -- 3. Set up Row Level Security (RLS)
            ALTER TABLE public.portfolio_data ENABLE ROW LEVEL SECURITY;

            -- 4. Create policies
            DO $$
            BEGIN
              IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'portfolio_data' AND policyname = 'Enable read access for all users') THEN
                  CREATE POLICY "Enable read access for all users" ON public.portfolio_data FOR SELECT USING (true);
              END IF;
              IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'portfolio_data' AND policyname = 'Enable update access for all users') THEN
                  CREATE POLICY "Enable update access for all users" ON public.portfolio_data FOR UPDATE USING (true);
              END IF;
              IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'portfolio_data' AND policyname = 'Enable insert access for all users') THEN
                  CREATE POLICY "Enable insert access for all users" ON public.portfolio_data FOR INSERT WITH CHECK (true);
              END IF;
            END
            $$;
        `;

        await client.query(sql);
        console.log('Successfully created tables and policies!');
    } catch (err) {
        console.error('Database setup failed:', err);
    } finally {
        await client.end();
    }
}

main();
