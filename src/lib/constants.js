/**
 * Shared site-wide constants — single source of truth.
 * All storage keys, social links, and contact info live here.
 */

export const SITE = {
    name: 'Shanjai S',
    title: 'Shanjai S | Full-Stack Developer',
    email: 'shanjaisenthilkumar03@gmail.com',
    location: 'Coimbatore, Tamil Nadu, India',
    github: 'https://github.com/Shanjai110603',
    linkedin: 'https://www.linkedin.com/in/shanjaisenthilkumar/',
    githubUsername: 'Shanjai110603',
};

/**
 * localStorage keys — all in one place to prevent typos and case-mismatch bugs.
 * NOTE: 'portfolio_siteinfo' is lowercase to match existing stored data.
 */
export const STORAGE_KEYS = {
    hero: 'portfolio_hero',
    about: 'portfolio_about',
    skills: 'portfolio_skills',
    projects: 'portfolio_projects',
    experience: 'portfolio_experience',
    education: 'portfolio_education',
    certifications: 'portfolio_certifications',
    stats: 'portfolio_stats',
    siteInfo: 'portfolio_siteinfo',   // lowercase — matches SiteInfoTab existing data
    media: 'portfolio_media',
    messages: 'portfolio_messages',
    testimonials: 'portfolio_testimonials',
    blogs: 'portfolio_blogs',
};
