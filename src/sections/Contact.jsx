
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Send, CheckCircle2, MapPin, Mail, AlertCircle } from 'lucide-react';
import { SITE, STORAGE_KEYS } from '../lib/constants';

export const MESSAGES_KEY = STORAGE_KEYS.messages;

const EMAIL_RE = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

const Contact = () => {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
            setError('Please fill in all required fields.');
            return;
        }
        if (!EMAIL_RE.test(form.email)) {
            setError('Please enter a valid email address.');
            return;
        }
        setError('');
        setLoading(true);

        setTimeout(() => {
            try {
                const messages = JSON.parse(localStorage.getItem(MESSAGES_KEY) || '[]');
                messages.unshift({ ...form, id: Date.now(), date: new Date().toISOString(), read: false });
                localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
            } catch (err) {
                console.warn('Could not save message to localStorage:', err);
            }
            setForm({ name: '', email: '', subject: '', message: '' });
            setLoading(false);
            setSent(true);
        }, 900);
    };

    return (
        <section id="contact" className="py-28 relative">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

            {/* Background glows */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-64 -z-10 opacity-20"
                style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.3), transparent)', filter: 'blur(60px)' }} />

            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <p className="text-purple-400 text-sm font-semibold uppercase tracking-widest mb-3">Let's Talk</p>
                    <h2 className="text-4xl md:text-5xl font-archivo font-black text-white mb-4">
                        Get In{' '}
                        <span className="bg-gradient-to-br from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                            Touch
                        </span>
                    </h2>
                    <div className="w-16 h-1 rounded-full mx-auto bg-gradient-to-r from-blue-500 to-cyan-500" />
                    <p className="text-gray-400 mt-5 max-w-lg mx-auto text-base">
                        Have a project in mind or want to collaborate? I'd love to hear from you.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
                    {/* Info panel */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2 space-y-6"
                    >
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">Say Hello 👋</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Whether it's a freelance gig, a full-time role, or just a good technical conversation — reach out!
                            </p>
                        </div>

                        {[
                            { icon: Mail, label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
                            { icon: MapPin, label: 'Location', value: SITE.location, href: null },
                        ].map(({ icon: Icon, label, value, href }) => (
                            <div key={label} className="flex items-start gap-4 p-4 rounded-xl bg-white/3 border border-white/8 hover:border-white/15 transition-all group">
                                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                                    <Icon size={17} />
                                </div>
                                <div>
                                    <p className="text-gray-600 text-xs uppercase tracking-wider mb-0.5">{label}</p>
                                    {href ? (
                                        <a href={href} className="text-gray-300 text-sm font-medium hover:text-purple-400 transition-colors break-all">{value}</a>
                                    ) : (
                                        <p className="text-gray-300 text-sm font-medium">{value}</p>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Availability badge */}
                        <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                                </span>
                                <span className="text-emerald-400 text-sm font-semibold">Available for Work</span>
                            </div>
                            <p className="text-gray-500 text-xs">Open to freelance and full-time roles</p>
                        </div>
                    </motion.div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="lg:col-span-3"
                    >
                        {sent ? (
                            <div className="h-full flex flex-col items-center justify-center text-center p-12 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
                                <CheckCircle2 size={48} className="text-emerald-400 mb-4" />
                                <h4 className="text-white text-2xl font-bold mb-2">Message Sent!</h4>
                                <p className="text-gray-400 mb-6">Thanks for reaching out. I'll get back to you soon.</p>
                                <button onClick={() => setSent(false)}
                                    className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white transition-all">
                                    Send Another
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="p-7 rounded-2xl bg-white/3 border border-white/8 space-y-5">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {[
                                        { name: 'name', placeholder: 'Your Name *', type: 'text' },
                                        { name: 'email', placeholder: 'Email Address *', type: 'email' },
                                    ].map(field => (
                                        <div key={field.name}>
                                            <input
                                                type={field.type}
                                                name={field.name}
                                                value={form[field.name]}
                                                onChange={handleChange}
                                                placeholder={field.placeholder}
                                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-purple-500/50 focus:bg-white/8 transition-all"
                                            />
                                        </div>
                                    ))}
                                </div>

                                <input
                                    type="text"
                                    name="subject"
                                    value={form.subject}
                                    onChange={handleChange}
                                    placeholder="Subject"
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-purple-500/50 focus:bg-white/8 transition-all"
                                />

                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder="Your message *"
                                    rows={5}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-purple-500/50 focus:bg-white/8 transition-all resize-none"
                                />

                                {error && (
                                    <p className="flex items-center gap-2 text-red-400 text-sm">
                                        <AlertCircle size={14} />{error}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full cursor-pointer inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white transition-colors duration-200 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] disabled:opacity-60 disabled:cursor-not-allowed"
                                    style={{ background: 'linear-gradient(135deg,#8b5cf6,#06b6d4)' }}
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={16} /> Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
