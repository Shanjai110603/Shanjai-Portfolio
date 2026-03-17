import { useState, useEffect, useRef } from 'react';
import { Upload, Trash2, Check, Image as ImageIcon, FileText, Star, AlertCircle } from 'lucide-react';
import { uploadFile, deleteFile, fetchPortfolioData, savePortfolioData } from '../../lib/api';

const MEDIA_KEY = 'portfolio_media';
const MAX_FILES = 5;

const defaultMedia = {
    images: [],        // [ { url, name, uploadedAt } ]
    activeImageIndex: 0,
    resumes: [],       // [ { url, name, uploadedAt } ]
    activeResumeIndex: 0,
};

export const MEDIA_KEY_EXPORT = MEDIA_KEY;

const getMediaData = () => {
    try {
        const stored = localStorage.getItem(MEDIA_KEY);
        return stored ? { ...defaultMedia, ...JSON.parse(stored) } : defaultMedia;
    } catch { return defaultMedia; }
};

const MediaTab = () => {
    const [media, setMedia] = useState(defaultMedia);
    const [uploading, setUploading] = useState({ image: false, resume: false });
    const [error, setError] = useState({ image: null, resume: null });
    const [saved, setSaved] = useState(false);
    const imageInputRef = useRef(null);
    const resumeInputRef = useRef(null);

    useEffect(() => {
        fetchPortfolioData(MEDIA_KEY, defaultMedia).then(data => {
            setMedia({ ...defaultMedia, ...data });
        });
    }, []);

    const save = async (updated) => {
        setMedia(updated);
        await savePortfolioData(MEDIA_KEY, updated);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (media.images.length >= MAX_FILES) {
            setError(p => ({ ...p, image: `Max ${MAX_FILES} images allowed. Delete one first.` }));
            return;
        }
        setError(p => ({ ...p, image: null }));
        setUploading(p => ({ ...p, image: true }));

        const url = await uploadFile(file, 'images');
        setUploading(p => ({ ...p, image: false }));

        if (!url) {
            setError(p => ({ ...p, image: 'Upload failed. Check Supabase bucket "portfolio-assets" exists and is public.' }));
            return;
        }
        const updated = {
            ...media,
            images: [...media.images, { url, name: file.name, uploadedAt: new Date().toISOString() }],
            activeImageIndex: media.images.length, // auto-select newest
        };
        await save(updated);
        if (imageInputRef.current) imageInputRef.current.value = '';
    };

    const handleResumeUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (media.resumes.length >= MAX_FILES) {
            setError(p => ({ ...p, resume: `Max ${MAX_FILES} resumes allowed. Delete one first.` }));
            return;
        }
        setError(p => ({ ...p, resume: null }));
        setUploading(p => ({ ...p, resume: true }));

        const url = await uploadFile(file, 'resumes');
        setUploading(p => ({ ...p, resume: false }));

        if (!url) {
            setError(p => ({ ...p, resume: 'Upload failed. Check Supabase bucket "portfolio-assets" exists and is public.' }));
            return;
        }
        const updated = {
            ...media,
            resumes: [...media.resumes, { url, name: file.name, uploadedAt: new Date().toISOString() }],
            activeResumeIndex: media.resumes.length, // auto-select newest
        };
        await save(updated);
        if (resumeInputRef.current) resumeInputRef.current.value = '';
    };

    const setActive = async (type, index) => {
        const updated = { ...media, [type === 'image' ? 'activeImageIndex' : 'activeResumeIndex']: index };
        await save(updated);
    };

    const handleDelete = async (type, index) => {
        const field = type === 'image' ? 'images' : 'resumes';
        const activeField = type === 'image' ? 'activeImageIndex' : 'activeResumeIndex';
        const item = media[field][index];
        if (!item) return;

        await deleteFile(item.url);

        const newArr = media[field].filter((_, i) => i !== index);
        const currentActive = media[activeField];
        let newActive = currentActive;
        if (index < currentActive) newActive = currentActive - 1;
        else if (index === currentActive) newActive = Math.max(0, currentActive - 1);

        const updated = { ...media, [field]: newArr, [activeField]: newArr.length === 0 ? 0 : newActive };
        await save(updated);
    };

    const FileGrid = ({ type }) => {
        const isImage = type === 'image';
        const items = isImage ? media.images : media.resumes;
        const activeIndex = isImage ? media.activeImageIndex : media.activeResumeIndex;
        const isUploading = isImage ? uploading.image : uploading.resume;
        const err = isImage ? error.image : error.resume;
        const inputRef = isImage ? imageInputRef : resumeInputRef;
        const accept = isImage ? 'image/png,image/jpeg,image/webp' : 'application/pdf';

        return (
            <div className="bg-gray-900/60 border border-gray-700/40 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                        {isImage ? <ImageIcon size={15} className="text-cyan-400" /> : <FileText size={15} className="text-purple-400" />}
                        {isImage ? 'Profile Images' : 'Resumes / CVs'}
                        <span className="ml-1 text-xs text-gray-500 font-normal">({items.length}/{MAX_FILES})</span>
                    </h3>
                    {items.length < MAX_FILES && (
                        <button
                            onClick={() => inputRef.current?.click()}
                            disabled={isUploading}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-xs text-gray-300 hover:text-white transition-colors disabled:opacity-50 cursor-pointer"
                        >
                            <Upload size={12} />
                            {isUploading ? 'Uploading...' : 'Upload'}
                        </button>
                    )}
                    <input
                        ref={inputRef}
                        type="file"
                        accept={accept}
                        className="hidden"
                        onChange={isImage ? handleImageUpload : handleResumeUpload}
                    />
                </div>

                {err && (
                    <div className="flex items-start gap-2 text-red-400 text-xs p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <AlertCircle size={13} className="mt-0.5 shrink-0" />
                        {err}
                    </div>
                )}

                {items.length === 0 ? (
                    <div
                        onClick={() => inputRef.current?.click()}
                        className="border-2 border-dashed border-gray-700 rounded-xl p-8 text-center cursor-pointer hover:border-gray-500 hover:bg-gray-800/30 transition-colors"
                    >
                        <Upload size={24} className="mx-auto mb-2 text-gray-600" />
                        <p className="text-gray-500 text-sm">Click to upload your first {isImage ? 'profile image' : 'resume'}</p>
                        <p className="text-gray-600 text-xs mt-1">{isImage ? 'PNG, JPG, WEBP up to 5MB' : 'PDF only'}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-3">
                        {items.map((item, i) => (
                            <div
                                key={item.url}
                                className={`relative group rounded-xl border-2 overflow-hidden transition-all duration-200 ${
                                    i === activeIndex
                                        ? 'border-cyan-500 shadow-[0_0_14px_rgba(6,182,212,0.25)]'
                                        : 'border-gray-700/60 hover:border-gray-500'
                                }`}
                            >
                                {isImage ? (
                                    <img
                                        src={item.url}
                                        alt={item.name}
                                        className="w-full h-28 object-cover object-top"
                                    />
                                ) : (
                                    <div className="w-full h-28 bg-gray-800 flex flex-col items-center justify-center gap-2">
                                        <FileText size={28} className="text-purple-400" />
                                        <p className="text-gray-400 text-xs text-center px-2 truncate w-full text-center">{item.name}</p>
                                    </div>
                                )}
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                                    <button
                                        onClick={() => setActive(type, i)}
                                        title="Set as active"
                                        className="p-1.5 bg-cyan-500 rounded-lg text-white hover:bg-cyan-400 transition-colors cursor-pointer"
                                    >
                                        <Star size={13} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(type, i)}
                                        title="Delete"
                                        className="p-1.5 bg-red-600 rounded-lg text-white hover:bg-red-500 transition-colors cursor-pointer"
                                    >
                                        <Trash2 size={13} />
                                    </button>
                                </div>
                                {/* Active badge */}
                                {i === activeIndex && (
                                    <div className="absolute top-1.5 left-1.5 flex items-center gap-1 px-1.5 py-0.5 bg-cyan-500 rounded text-white text-[10px] font-semibold">
                                        <Check size={9} /> Active
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {items.length > 0 && (
                    <p className="text-xs text-gray-600">
                        Hover a card → ⭐ to make it active, 🗑️ to delete.
                        {isImage && activeIndex != null && items[activeIndex] && (
                            <span className="ml-1 text-cyan-600">Active: {items[activeIndex]?.name}</span>
                        )}
                    </p>
                )}
            </div>
        );
    };

    return (
        <div className="max-w-3xl space-y-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-white mb-1">Media Manager</h2>
                    <p className="text-xs text-gray-500">Upload, switch, and manage your profile photos and CV files. Files are stored in Supabase Storage.</p>
                </div>
                {saved && (
                    <span className="flex items-center gap-1 text-green-400 text-sm">
                        <Check size={14} /> Saved!
                    </span>
                )}
            </div>

            <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl text-amber-400 text-xs leading-relaxed">
                <strong>Setup Required:</strong> Make sure you have a public Supabase Storage bucket named <code className="bg-black/30 px-1 py-0.5 rounded">portfolio-assets</code> in your project. Files uploaded here will be publicly accessible.
            </div>

            <FileGrid type="image" />
            <FileGrid type="resume" />
        </div>
    );
};

export default MediaTab;
