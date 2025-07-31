'use client';

import { motion } from 'framer-motion';

const AboutMe = () => {
    const info = {
        name: 'Navoda Chathurya',
        phone: '+94 76 208 5246',
        nationality: 'Sri Lankan',
        language: 'English, Sinhala',
        email: 'navodachathurya2001@gmail.com',
    };

    return (
        <section className="rounded-lg text-white bg-gray-900/10 relative">
            <div className="max-w-6xl mx-auto px-6 sm:px-6 lg:px-8 py-32">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >
                    <h2 className="text-4xl lg:text-5xl font-bold text-white">
                        About <span className="text-emerald-400">Me</span>
                    </h2>
                    <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                        Get to know me beyond the code – a brief glance into who I am.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Left */}
                    <div className="space-y-4">
                        {[
                            { label: 'Name', value: info.name },
                            { label: 'Nationality', value: info.nationality },
                            { label: 'Email', value: info.email },
                        ].map(({ label, value }, i) => (
                            <motion.div
                                key={label}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * i, duration: 0.5 }}
                                className="flex items-center space-x-2"
                            >
                                <h3 className="font-semibold text-emerald-400 min-w-[110px]">{label}:</h3>
                                <p className="text-lg">{value}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right */}
                    <div className="space-y-4">
                        {[
                            { label: 'Phone', value: info.phone },
                            { label: 'Language', value: info.language },
                        ].map(({ label, value }, i) => (
                            <motion.div
                                key={label}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * i, duration: 0.5 }}
                                className="flex items-center space-x-2"
                            >
                                <h3 className="font-semibold text-emerald-400 min-w-[110px]">{label}:</h3>
                                <p className="text-lg">{value}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="mt-10 h-1 w-24 bg-gradient-to-r from-emerald-400/50 to-transparent rounded-full mx-auto opacity-60" />
            </div>
        </section>

    );
};

export default AboutMe;
