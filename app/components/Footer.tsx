'use client';

import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <footer className="mt-3 bg-gray-900 border-t border-gray-800">
            <div className="w-full px-4 sm:px-6 lg:px-44 py-8">
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <motion.p
                        className="text-gray-400 text-sm"
                        whileHover={{ color: "#34d399" }}
                        transition={{ duration: 0.3 }}
                    >
                        Copyright © 2025 Navoda Chathurya
                    </motion.p>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;