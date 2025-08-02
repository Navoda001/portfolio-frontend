'use client';

import { motion, useAnimation, useInView } from 'framer-motion';
import type { Variants } from "framer-motion";
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import {
    Github,
    Linkedin,
    Youtube,
    Mail,
    Twitter,
    Download,
    Code,
    Briefcase,
    Layers,
    GitCommit,
    Facebook
} from 'lucide-react';
import { Typewriter } from 'react-simple-typewriter';
import MobilePageNavigation from '@/app/components/MobilePageNavigation';
import { usePathname } from 'next/navigation';

const Introduction = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const mainControls = useAnimation();
    const pathname = usePathname();

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
        }
    }, [isInView, mainControls]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
            },
        },
    };
    const socialLinks = [
        { icon: Github, href: "https://github.com/Navoda001", label: "GitHub" },
        { icon: Linkedin, href: "https://www.linkedin.com/in/navoda001", label: "LinkedIn" },
        { icon: Mail, href: "mailto:navodachathurya2001@gmail.com", label: "Gmail" },
        { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    ];

    const stats = [
        { number: "9", label: "Years of\nexperience", icon: Code },
        { number: "20", label: "Projects\ncompleted", icon: Briefcase },
        { number: "6", label: "Technologies\nmastered", icon: Layers },
        { number: "378", label: "Code\ncommits", icon: GitCommit },
    ];

    const roles = [
        "Software Developer",
        "Full Stack Developer",
        "Embedded Systems Enthusiast",
        "React & Spring Boot Developer",
        "ASP.NET Developer",
        "Tech Explorer",
    ];


    return (
        <section ref={ref} className="min-h-screen bg-gray-900 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 bg-emerald-400/20"
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

            <div className="relative z-10 w-full px-4 sm:px-6 lg:px-44 pt-20 lg:pt-24">

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={mainControls}
                    className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-5rem)]"
                >
                    {/* Left Content */}
                    <div className="space-y-8">
                        <motion.div variants={itemVariants} className="space-y-4">
                            <motion.p
                                className="text-emerald-400 text-lg font-medium tracking-wide"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <Typewriter
                                    words={roles}
                                    loop={0}
                                    cursor
                                    cursorStyle="|"
                                    typeSpeed={70}
                                    deleteSpeed={50}
                                    delaySpeed={1500}
                                />

                            </motion.p>

                            <div className="space-y-2">
                                <motion.h1
                                    className="text-5xl lg:text-7xl font-bold text-white leading-tight"
                                    variants={itemVariants}
                                >
                                    Hello I'm
                                </motion.h1>
                                <motion.h1
                                    className="text-5xl lg:text-6xl font-bold text-emerald-400 leading-tight"
                                    variants={itemVariants}
                                >
                                    Navoda Chathurya
                                </motion.h1>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-4">
                            <motion.p className="text-gray-300 text-lg leading-relaxed max-w-xl">
                                A third-year undergraduate at the Faculty of Information Technology, University of Moratuwa, with hands-on experience in full-stack development and embedded systems. Skilled in Java, JavaScript, and C, with a strong interest in building real-time web applications and hardware-integrated solutions. Passionate about solving practical problems through technology and eager to contribute in dynamic, team-oriented environments.</motion.p>
                        </motion.div>

                        {/* CTA and Social Links */}
                        <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-6">
                            <motion.button
                                className="group relative px-8 py-4 bg-transparent border-2 border-emerald-400 text-emerald-400 font-semibold rounded-full overflow-hidden transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    <Download size={20} />
                                    DOWNLOAD CV
                                </span>
                                <motion.div
                                    className="absolute inset-0 bg-emerald-400"
                                    initial={{ x: "-100%" }}
                                    whileHover={{ x: 0 }}
                                    transition={{ type: "tween", duration: 0.3 }}
                                />
                                <motion.span
                                    className="absolute inset-0 flex items-center justify-center text-gray-900 font-semibold"
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <Download size={20} className="mr-2" />
                                    DOWNLOAD CV
                                </motion.span>
                            </motion.button>

                            <div className="flex gap-4">
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        className="w-12 h-12 rounded-full border-2 border-gray-600 flex items-center justify-center text-gray-400 hover:border-emerald-400 hover:text-emerald-400 transition-all duration-300"
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        whileTap={{ scale: 0.9 }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1 + index * 0.1 }}
                                    >
                                        <social.icon size={20} />
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Content - Profile Image */}
                    <motion.div
                        variants={itemVariants}
                        className="relative flex justify-center lg:justify-end mt-3"
                    >
                        <div className="relative">
                            {/* Outer Glow Ring */}
                            <motion.div
                                className="absolute inset-0 rounded-full opacity-50"
                                style={{
                                    background: "radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%)",
                                    filter: "blur(20px)",
                                    transform: "scale(1.3)",
                                }}
                                animate={{
                                    opacity: [0.3, 0.8, 0.3],
                                    scale: [1.3, 1.5, 1.3],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />

                            {/* Primary Rotating Border */}
                            <motion.div
                                className="absolute inset-0 rounded-full p-1"
                                style={{
                                    background: "conic-gradient(from 0deg, #10b981 0%, #059669 25%, #047857 50%, #065f46 75%, #10b981 100%)",
                                }}
                                animate={{ rotate: 360 }}
                                transition={{
                                    duration: 6,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            >
                                <div className="w-full h-full bg-gray-900 rounded-full" />
                            </motion.div>

                            {/* Secondary Counter-Rotating Border */}
                            <motion.div
                                className="absolute inset-0 rounded-full p-2"
                                style={{
                                    background: "conic-gradient(from 180deg, transparent 0%, #10b981 20%, transparent 40%, #10b981 60%, transparent 80%, #10b981 100%)",
                                }}
                                animate={{ rotate: -360 }}
                                transition={{
                                    duration: 10,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            >
                                <div className="w-full h-full bg-transparent rounded-full" />
                            </motion.div>

                            {/* Pulsing Inner Ring */}
                            <motion.div
                                className="absolute inset-2 rounded-full border-2 border-emerald-400/30"
                                animate={{
                                    scale: [1, 1.05, 1],
                                    borderColor: ["rgba(16, 185, 129, 0.3)", "rgba(16, 185, 129, 0.8)", "rgba(16, 185, 129, 0.3)"],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />

                            {/* Profile Image */}
                            <motion.div
                                className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden"
                                style={{ margin: "8px" }}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.8, duration: 0.8 }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <Image
                                    src="/Profile.jpg"
                                    alt="Luke Coleman"
                                    fill
                                    className="object-cover"
                                    priority
                                />

                                {/* Image Overlay Effect */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 via-transparent to-emerald-600/20 rounded-full"
                                    animate={{
                                        opacity: [0, 0.3, 0],
                                    }}
                                    transition={{
                                        duration: 5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                />
                            </motion.div>



                            {/* Sparkle Effects */}
                            {[...Array(8)].map((_, i) => (
                                <motion.div
                                    key={`sparkle-${i}`}
                                    className="absolute w-1 h-1 bg-white rounded-full"
                                    style={{
                                        left: `${Math.random() * 100}%`,
                                        top: `${Math.random() * 100}%`,
                                    }}
                                    animate={{
                                        scale: [0, 1, 0],
                                        opacity: [0, 1, 0],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: Math.random() * 3,
                                        ease: "easeInOut",
                                    }}
                                />
                            ))}
                        </div>
                    </motion.div>
                </motion.div>

                {/* Stats Section */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={mainControls}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-16 border-t border-gray-800 mt-16"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            variants={itemVariants}
                            className="text-center group"
                            whileHover={{ y: -5 }}
                        >
                            <div className="flex flex-col items-center space-y-2">
                                <motion.div
                                    className="w-12 h-12 rounded-full bg-emerald-400/10 flex items-center justify-center mb-2 group-hover:bg-emerald-400/20 transition-colors duration-300"
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <stat.icon className="text-emerald-400" size={24} />
                                </motion.div>
                                <motion.h3
                                    className="text-4xl lg:text-5xl font-bold text-white"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.5 + index * 0.1 }}
                                >
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 1.8 + index * 0.1 }}
                                    >
                                        {stat.number}
                                    </motion.span>
                                </motion.h3>
                                <p className="text-gray-400 text-sm whitespace-pre-line">
                                    {stat.label}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
            <MobilePageNavigation currentPath={pathname} />
        </section>
    );
};

export default Introduction;