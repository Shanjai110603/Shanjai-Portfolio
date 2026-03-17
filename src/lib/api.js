import { supabase } from './supabase';

/**
 * Fetch portfolio data — reads localStorage first (instant), then validates against Supabase if table exists.
 * Falls back gracefully when Supabase table is not set up.
 */
export const fetchPortfolioData = async (id, defaultData = {}) => {
    // 1. Try localStorage first — always works, instant
    try {
        const local = localStorage.getItem(id);
        if (local) {
            const parsed = JSON.parse(local);
            // Background-sync from Supabase (non-blocking)
            syncFromSupabase(id, defaultData).then(remote => {
                if (remote) localStorage.setItem(id, JSON.stringify(remote));
            });
            return parsed;
        }
    } catch {}

    // 2. Try Supabase if nothing in localStorage
    const remote = await syncFromSupabase(id, defaultData);
    if (remote) {
        localStorage.setItem(id, JSON.stringify(remote));
        return remote;
    }

    return defaultData;
};

const syncFromSupabase = async (id, defaultData) => {
    try {
        const { data, error } = await supabase
            .from('portfolio_data')
            .select('data')
            .eq('id', id)
            .single();

        if (error) return null; // Table might not exist
        return data?.data || null;
    } catch {
        return null;
    }
};

/**
 * Save portfolio data — always writes to localStorage instantly,
 * and also tries to sync to Supabase (best effort).
 */
export const savePortfolioData = async (id, payload) => {
    // 1. Always save to localStorage — instant and reliable
    try {
        localStorage.setItem(id, JSON.stringify(payload));
    } catch (e) {
        console.error('localStorage save failed:', e);
        return false;
    }

    // 2. Best-effort sync to Supabase
    try {
        const { error } = await supabase
            .from('portfolio_data')
            .upsert({ id, data: payload, updated_at: new Date().toISOString() });

        if (error) {
            console.warn(`Supabase sync skipped for ${id} (table may not exist):`, error.message);
        }
    } catch {}

    return true; // localStorage save succeeded, that's what matters
};
/**
 * Upload a file to Supabase Storage and return its public URL.
 * bucket: 'portfolio-assets'
 * folder: 'images' | 'resumes'
 */
export const uploadFile = async (file, folder) => {
    const ext = file.name.split('.').pop();
    const filename = `${folder}/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;

    const { error } = await supabase.storage
        .from('portfolio-assets')
        .upload(filename, file, { cacheControl: '3600', upsert: false });

    if (error) {
        console.error('Upload failed:', error.message);
        return null;
    }

    const { data } = supabase.storage
        .from('portfolio-assets')
        .getPublicUrl(filename);

    return data?.publicUrl || null;
};

/**
 * Delete a file from Supabase Storage by its public URL.
 */
export const deleteFile = async (publicUrl) => {
    try {
        // Extract path after the bucket name in the public URL
        const parts = publicUrl.split('/portfolio-assets/');
        if (parts.length < 2) return false;
        const path = parts[1];
        const { error } = await supabase.storage.from('portfolio-assets').remove([path]);
        if (error) { console.warn('Delete failed:', error.message); return false; }
        return true;
    } catch { return false; }
};
