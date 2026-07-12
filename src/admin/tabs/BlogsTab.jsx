import { useState, useEffect } from 'react';
import { Save, Plus, Edit2, Trash2, Check, RefreshCw, X, Eye, FileText, ToggleLeft, ToggleRight } from 'lucide-react';
import { BLOGS_KEY, defaultBlogs } from '../../sections/Blog';
import { fetchPortfolioData, savePortfolioData } from '../../lib/api';

const BlogsTab = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saved, setSaved] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null); // null means list view, object means editing/creating

    useEffect(() => {
        fetchPortfolioData(BLOGS_KEY, defaultBlogs).then(res => {
            setBlogs(Array.isArray(res) ? res : defaultBlogs);
            setLoading(false);
        });
    }, []);

    const commit = async (updatedBlogs) => {
        setBlogs(updatedBlogs);
        const success = await savePortfolioData(BLOGS_KEY, updatedBlogs);
        if (success) {
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        }
    };

    const handleSaveForm = (e) => {
        e.preventDefault();
        
        let updated;
        if (editingBlog.id) {
            // Update existing
            updated = blogs.map(b => b.id === editingBlog.id ? editingBlog : b);
        } else {
            // Add new
            const newBlog = {
                ...editingBlog,
                id: 'blog-' + Date.now(),
                publishedAt: new Date().toISOString()
            };
            updated = [newBlog, ...blogs];
        }

        commit(updated);
        setEditingBlog(null);
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this blog post?')) {
            const updated = blogs.filter(b => b.id !== id);
            commit(updated);
        }
    };

    const handleCreateNew = () => {
        setEditingBlog({
            title: '',
            summary: '',
            content: '',
            tags: [],
            readTime: 5,
            published: true
        });
    };

    const handleReset = () => {
        if (confirm('Reset to default blogs? All custom posts will be overwritten.')) {
            commit(defaultBlogs);
        }
    };

    const handleTogglePublish = (blog) => {
        const updated = blogs.map(b => b.id === blog.id ? { ...b, published: !b.published } : b);
        commit(updated);
    };

    const inputCls = "w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500 text-sm placeholder-gray-700";

    if (loading) return <div className="text-gray-500 animate-pulse">Loading blog posts...</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-white">Blog Manager</h2>
                    <p className="text-xs text-gray-500 mt-1">Create, edit, and publish writeups or technical articles.</p>
                </div>
                {editingBlog === null && (
                    <div className="flex gap-2">
                        <button onClick={handleReset} className="text-xs text-gray-500 hover:text-gray-300 transition-colors px-3 py-1.5 bg-gray-800 rounded-lg">Reset Defaults</button>
                        <button onClick={handleCreateNew} className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/30 transition-all text-xs font-semibold">
                            <Plus size={14} /> New Post
                        </button>
                    </div>
                )}
            </div>

            {saved && (
                <div className="flex items-center gap-1.5 text-xs text-green-400 bg-green-950/20 border border-green-500/20 px-3 py-2 rounded-lg w-fit">
                    <Check size={14} /> Changes synced and saved successfully!
                </div>
            )}

            {/* List View */}
            {editingBlog === null ? (
                <div className="bg-gray-900/60 border border-gray-800 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-800 text-xs font-mono text-gray-500 uppercase bg-gray-950/50">
                                    <th className="p-4">Post Info</th>
                                    <th className="p-4">Tags</th>
                                    <th className="p-4">Read Time</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {blogs.map((blog, idx) => (
                                    <tr key={blog.id || idx} className="border-b border-gray-800/40 hover:bg-gray-950/20 text-sm">
                                        <td className="p-4">
                                            <p className="font-bold text-white leading-tight mb-1">{blog.title}</p>
                                            <p className="text-xs text-gray-500 line-clamp-1">{blog.summary}</p>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex gap-1 flex-wrap">
                                                {(blog.tags || []).map(t => (
                                                    <span key={t} className="px-2 py-0.5 rounded text-[10px] bg-slate-900 border border-white/5 text-gray-400">{t}</span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="p-4 font-mono text-xs text-gray-400">{blog.readTime} mins</td>
                                        <td className="p-4">
                                            <button onClick={() => handleTogglePublish(blog)} className="focus:outline-none">
                                                {blog.published ? (
                                                    <span className="flex items-center gap-1 text-xs text-green-400 font-semibold"><Eye size={12} /> Published</span>
                                                ) : (
                                                    <span className="flex items-center gap-1 text-xs text-gray-500 font-semibold"><X size={12} /> Draft</span>
                                                )}
                                            </button>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button onClick={() => setEditingBlog(blog)} className="p-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors" title="Edit Post">
                                                    <Edit2 size={13} />
                                                </button>
                                                <button onClick={() => handleDelete(blog.id)} className="p-1.5 bg-red-950/30 hover:bg-red-900/30 text-red-400 rounded-lg transition-colors border border-red-500/10" title="Delete Post">
                                                    <Trash2 size={13} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {blogs.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="p-8 text-center text-gray-500 italic">No blog posts found. Create one to begin!</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                /* Edit/Create Form */
                <form onSubmit={handleSaveForm} className="bg-gray-900/60 p-6 rounded-2xl border border-gray-800 space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-800 mb-4">
                        <h3 className="text-sm font-bold text-white flex items-center gap-1.5"><FileText size={15} /> {editingBlog.id ? 'Edit Blog Post' : 'Create New Blog Post'}</h3>
                        <button type="button" onClick={() => setEditingBlog(null)} className="p-1 hover:bg-white/5 rounded-lg text-gray-500 hover:text-white transition-colors">
                            <X size={16} />
                        </button>
                    </div>

                    <div>
                        <label className="text-xs text-gray-400 mb-1.5 block">Post Title</label>
                        <input required value={editingBlog.title} onChange={e => setEditingBlog({ ...editingBlog, title: e.target.value })} className={inputCls} placeholder="e.g., Intro to Penetration Testing" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs text-gray-400 mb-1.5 block">Read Time (minutes)</label>
                            <input required type="number" min={1} value={editingBlog.readTime} onChange={e => setEditingBlog({ ...editingBlog, readTime: Number(e.target.value) })} className={inputCls} />
                        </div>
                        <div>
                            <label className="text-xs text-gray-400 mb-1.5 block">Tags (comma-separated)</label>
                            <input value={editingBlog.tags.join(', ')} onChange={e => setEditingBlog({ ...editingBlog, tags: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} className={inputCls} placeholder="Cybersecurity, Pentesting" />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs text-gray-400 mb-1.5 block">Summary (Short Excerpt)</label>
                        <textarea required rows={2} value={editingBlog.summary} onChange={e => setEditingBlog({ ...editingBlog, summary: e.target.value })} className={`${inputCls} resize-none`} placeholder="Write a short hook for the card display..." />
                    </div>

                    <div>
                        <label className="text-xs text-gray-400 mb-1.5 block">Content (Markdown/Text)</label>
                        <textarea required rows={10} value={editingBlog.content} onChange={e => setEditingBlog({ ...editingBlog, content: e.target.value })} className={inputCls} placeholder="Write the main body of your article..." />
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                        <label className="flex items-center gap-2 text-xs text-gray-400 font-semibold cursor-pointer select-none">
                            <button type="button" onClick={() => setEditingBlog({ ...editingBlog, published: !editingBlog.published })} className="focus:outline-none text-[rgb(var(--theme-primary-400))]">
                                {editingBlog.published ? <ToggleRight size={28} /> : <ToggleLeft size={28} className="text-gray-600" />}
                            </button>
                            Publish directly on portfolio site
                        </label>
                        <div className="flex gap-2">
                            <button type="button" onClick={() => setEditingBlog(null)} className="px-4 py-2 border border-gray-800 hover:bg-slate-900 rounded-lg text-xs font-semibold text-gray-400 hover:text-white transition-colors">Cancel</button>
                            <button type="submit" className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg text-xs font-bold hover:shadow-lg hover:shadow-cyan-500/25 transition-all">
                                <Save size={14} /> Save Post
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
};

export default BlogsTab;
