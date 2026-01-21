
import { motion } from 'framer-motion';

const skillsData = [
    {
        category: "Programming",
        items: [
            { name: "C", level: 90 },
            { name: "C++", level: 85 },
            { name: "Python", level: 80 }
        ]
    },
    {
        category: "Web Development",
        items: [
            { name: "HTML5 & CSS3", level: 90 },
            { name: "JavaScript", level: 85 },
            { name: "React", level: 75 }
        ]
    },
    {
        category: "Database & Concepts",
        items: [
            { name: "MySQL", level: 80 },
            { name: "DBMS", level: 85 },
            { name: "OOPS & SDLC", level: 85 }
        ]
    },
    {
        category: "Tools & Soft Skills",
        items: [
            { name: "Problem Solving", level: 90 },
            { name: "Git & GitHub", level: 80 },
            { name: "Team Leadership", level: 85 }
        ]
    }
];

const Skills = () => {
    return (
        <section id="skills" className="py-20 bg-gray-900/30">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Skills</h2>
                    <div className="w-20 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-x-12 gap-y-10">
                    {skillsData.map((category, catIndex) => (
                        <motion.div
                            key={category.category}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-gray-800/20 rounded-2xl p-6 border border-gray-700/50 backdrop-blur-sm"
                        >
                            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                                {category.category}
                            </h3>
                            <div className="space-y-6">
                                {category.items.map((skill) => (
                                    <div key={skill.name}>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-gray-300 font-medium">{skill.name}</span>
                                            <span className="text-gray-500 text-sm">{skill.level}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.level}%` }}
                                                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                                                viewport={{ once: true }}
                                                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                                            ></motion.div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
