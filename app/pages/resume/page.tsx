'use client';

import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import {
    User,
    Briefcase,
    GraduationCap,
    Code,
    Target,
    Lightbulb,
    Zap,
} from 'lucide-react';
import EducationSection from '@/app/components/Education';
import type { Variants } from "framer-motion";
import TechStackSection from '@/app/components/Skill';
import AboutMe from '@/app/components/AboutMe';
import MobilePageNavigation from '@/app/components/MobilePageNavigation';
import { usePathname } from 'next/navigation';

const WhyHireMeSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const mainControls = useAnimation();
    const [activeTab, setActiveTab] = useState('Education');
    const pathname = usePathname();

    useEffect(() => {
        if (isInView) {
            mainControls.start('visible');
        }
    }, [isInView, mainControls]);

    const tabs = [
        {
            name: 'Education',
            icon: GraduationCap,
            content: null, // handled separately
        },
        {
            name: 'Skills',
            icon: Code,
            content: null,
        },
        {
            name: 'About me',
            icon: User,
            content: null,
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { x: -50, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15,
            },
        },
    };

    const tabContentVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: 'easeOut',
            },
        },
    };

    return (
        <section ref={ref} className="py-20 min-h-screen bg-gray-900 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 bg-emerald-400/50"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            height: `${Math.random() * 100 + 50}px`,
                            transform: `rotate(${Math.random() * 360}deg)`,
                        }}
                        animate={{
                            opacity: [0.2, 0.8, 0.2],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: Math.random() * 3 + 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={mainControls}
                    className="space-y-12"
                >


                    {/* Tab Navigation and Content */}
                    <motion.div
                        variants={itemVariants}
                        className="lg:flex lg:space-x-5 space-y-6 lg:space-y-0"
                    >
                        {/* Left: Tabs */}
                        <div className="lg:w-1/3 flex flex-col space-y-6">
                            {/* Header */}
                            <motion.div variants={itemVariants} className="space-y-4">
                                <div className="flex items-center space-x-4">
                                    <motion.div
                                        className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center"
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        transition={{ type: 'spring', stiffness: 400 }}
                                    >
                                        <Target className="text-emerald-400" size={24} />
                                    </motion.div>
                                    <motion.h2
                                        className="text-4xl lg:text-5xl font-bold text-white"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 }}
                                        style={{ lineHeight: 1.1 }} // helps vertical alignment if needed
                                    >
                                        Why hire me?
                                    </motion.h2>
                                </div>

                                <motion.p
                                    className="text-gray-300 text-lg leading-relaxed max-w-2xl"
                                    variants={itemVariants}
                                    style={{ marginLeft: '56px' }} // indent paragraph to align under the text, matches icon width + space
                                >
                                    Hire me for my proven ability to deliver innovative, high-quality solutions with passion, precision, and a continuous drive to exceed expectations.
                                </motion.p>
                            </motion.div>

                            {tabs.map((tab, index) => (
                                <motion.button
                                    key={tab.name}
                                    onClick={() => setActiveTab(tab.name)}
                                    className={`group relative flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 ${activeTab === tab.name
                                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                                        : 'bg-gray-800/50 text-gray-300 hover:bg-gray-800 hover:text-white'
                                        }`}
                                    whileHover={{ x: 5 }}
                                    whileTap={{ scale: 0.98 }}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 + index * 0.1 }}
                                >
                                    <motion.div
                                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300 ${activeTab === tab.name
                                            ? 'bg-white/20'
                                            : 'bg-emerald-500/10 group-hover:bg-emerald-500/20'
                                            }`}
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <tab.icon size={20} />
                                    </motion.div>

                                    <span className="font-semibold text-lg">{tab.name}</span>

                                    {activeTab === tab.name && (
                                        <motion.div
                                            className="absolute right-4 w-2 h-2 bg-white rounded-full"
                                            layoutId="activeIndicator"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: 'spring', stiffness: 400 }}
                                        />
                                    )}

                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 p-2 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        initial={false}
                                    />
                                </motion.button>
                            ))}
                        </div>


                        {/* Right: Tab Content */}
                        <div className="lg:w-2/3">
                            <motion.div
                                key={activeTab}
                                variants={tabContentVariants}
                                initial="hidden"
                                animate="visible"
                                className="bg-gray-800/5 backdrop-blur-sm rounded-2xl border border-gray-700/50"
                            >
                                <div className="space-y-1 ">

                                    {activeTab === 'Education' && <EducationSection />}
                                    {activeTab === 'Skills' && <TechStackSection />}
                                    {activeTab === 'About me' && <AboutMe />}


                                    {/* Decorative Element */}
                                    <div className="absolute top-4 right-4 opacity-10">
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                        >
                                            <Zap size={40} className="text-emerald-400" />
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
            <MobilePageNavigation currentPath={pathname} />
        </section>
    );
};

export default WhyHireMeSection;
