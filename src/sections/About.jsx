
import { motion } from 'framer-motion';


const About = () => {
    return (
        <section id="about" className="py-20 relative">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-12 text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
                    <div className="w-20 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <p className="text-gray-300 text-lg leading-relaxed mb-6 text-center">
                        I am a motivated <span className="text-cyan-400 font-medium">Computer Science Graduate (2024)</span> with a CGPA of 8.49 from Karpagam Academy of Higher Education.
                        I am passionate about software development, problem-solving, and building scalable applications.
                    </p>
                    <p className="text-gray-300 text-lg leading-relaxed mb-10 text-center">
                        My expertise lies in <span className="text-blue-400 font-medium">C, C++, Python</span>, and full-stack web technologies.
                        I enjoy working on backend logic, data validation, and optimization, creating impactful software solutions that solve real-world problems.
                    </p>


                </motion.div>
            </div>
        </section>
    );
};

export default About;
