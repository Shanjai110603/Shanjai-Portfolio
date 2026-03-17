import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const defaultTestimonials = [
    {
        name: "Priya R.",
        role: "Project Manager",
        company: "Tech Startup",
        text: "Shanjai delivered an exceptional full-stack solution on time and exceeded every expectation. His attention to detail and clean code made the handover seamless.",
        rating: 5,
        avatar: "PR"
    },
    {
        name: "Arun K.",
        role: "Co-founder",
        company: "SaaS Product",
        text: "Working with Shanjai was a pleasure. He tackled complex backend problems efficiently and his communication throughout the project was top notch.",
        rating: 5,
        avatar: "AK"
    },
    {
        name: "Meera S.",
        role: "UI/UX Lead",
        company: "Digital Agency",
        text: "Shanjai's React skills are impressive. He translated our designs pixel-perfectly and added thoughtful micro-animations that elevated the product.",
        rating: 5,
        avatar: "MS"
    }
];

const STORAGE_KEY = 'portfolio_testimonials';

const getTestimonials = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : defaultTestimonials;
    } catch {
        return defaultTestimonials;
    }
};

const Testimonials = () => {
    const testimonials = getTestimonials();

    return (
        <section id="testimonials" className="py-20 relative bg-gray-900/20">
            {/* Background glow */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-purple-500/5 blur-[120px] rounded-full -z-10" />

            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">What People Say</h2>
                    <div className="w-20 h-1.5 bg-gradient-to-r from-purple-400 to-cyan-500 mx-auto rounded-full" />
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {testimonials.map((t, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="relative group p-6 rounded-2xl bg-gray-900/60 border border-gray-800 hover:border-purple-500/40 backdrop-blur-sm hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300"
                        >
                            {/* Glow bg on hover */}
                            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 transition-opacity duration-300" />

                            {/* Quote icon */}
                            <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                                <Quote size={14} className="text-white" />
                            </div>

                            {/* Stars */}
                            <div className="flex gap-1 mb-4">
                                {Array.from({ length: t.rating }).map((_, i) => (
                                    <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                                ))}
                            </div>

                            <p className="text-gray-300 leading-relaxed mb-6 text-sm relative z-10">"{t.text}"</p>

                            <div className="flex items-center gap-3 relative z-10">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                                    {t.avatar}
                                </div>
                                <div>
                                    <p className="font-semibold text-white text-sm">{t.name}</p>
                                    <p className="text-gray-500 text-xs">{t.role} · {t.company}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export { defaultTestimonials, STORAGE_KEY as TESTIMONIALS_KEY };
export default Testimonials;
