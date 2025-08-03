'use client';

import { motion, useAnimation, useInView } from 'framer-motion';
import type { Variants } from "framer-motion";
import { useEffect, useRef, useState, createRef } from 'react';
import Image from 'next/image';
import {
    Github,
    Linkedin,
    Mail,
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
import dynamic from "next/dynamic";
import Footer from '@/app/components/Footer';

const CountUp = dynamic(() => import("react-countup"), { ssr: false });

const Introduction = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const mainControls = useAnimation();
    const pathname = usePathname();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

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
        { icon: Facebook, href: "https://www.facebook.com/share/1BsnzU3eni/?mibextid=wwXIfr", label: "Facebook" },
    ];

    const stats = [
        { number: "10 +", label: "Projects\ncompleted", icon: Code },
        { number: "723 +", label: "Code\ncommits", icon: GitCommit },
        { number: "104 +", label: "Total\npull requests", icon: Briefcase },
        { number: "20 +", label: "Technologies\nused", icon: Layers },
    ];

    const roles = [
        "Software Developer",
        "Full Stack Developer",
        "Embedded Systems Enthusiast",
        "React & Spring Boot Developer",
        "ASP.NET Developer",
        "Tech Explorer",
    ];

    const statRefs = useRef<React.RefObject<HTMLDivElement | null>[]>([]);
    
    if (statRefs.current.length !== stats.length) {
        statRefs.current = Array.from({ length: stats.length }, () => createRef<HTMLDivElement>());
    }
    
    // Call useInView for each ref individually (manual)
    const inView0 = useInView(statRefs.current[0], { once: true });
    const inView1 = useInView(statRefs.current[1], { once: true });
    const inView2 = useInView(statRefs.current[2], { once: true });
    const inView3 = useInView(statRefs.current[3], { once: true });
    
    const statInViews = [inView0, inView1, inView2, inView3];

    return (
        <section ref={ref} className="min-h-screen bg-gray-900 relative overflow-hidden">
            {/* Animated Background */}
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
                        animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.2, 1] }}
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

                        <motion.p
                            variants={itemVariants}
                            className="text-gray-300 text-lg leading-relaxed max-w-xl"
                        >
                            A third-year undergraduate at the Faculty of Information Technology, University of Moratuwa, with hands-on experience in full-stack development and embedded systems. Skilled in Java, JavaScript, and C, with a strong interest in building real-time web applications and hardware-integrated solutions. Passionate about solving practical problems through technology and eager to contribute in dynamic, team-oriented environments.
                        </motion.p>

                        {/* CTA + Social Links */}
                        <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-6">
                            <motion.button
                                className="group relative px-8 py-4 bg-transparent border-2 border-emerald-400 text-emerald-400 font-semibold rounded-full overflow-hidden transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    const link = document.createElement("a");
                                    link.href = "/Navoda_Chathurya_CV.pdf";
                                    link.download = "Navoda_Chathurya_CV.pdf";
                                    document.body.appendChild(link);
                                    link.click();
                                    document.body.removeChild(link);
                                }}
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

                    {/* Right Content */}
                    <motion.div variants={itemVariants} className="relative flex justify-center lg:justify-end mt-3">
                        <div className="relative flex items-center justify-center">
                            <svg
                                className="absolute w-[320px] h-[320px] lg:w-[420px] lg:h-[420px]"
                                viewBox="0 0 420 420"
                                fill="none"
                            >
                                <motion.circle
                                    cx="210"
                                    cy="210"
                                    r="206"
                                    stroke="#34d399"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    initial={{ strokeDasharray: "24 10 0 0" }}
                                    animate={{
                                        strokeDasharray: ["15 120 25 25", "16 25 92 72", "4 250 22 22"],
                                        rotate: [120, 360],
                                    }}
                                    transition={{
                                        duration: 10,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                    }}
                                />
                            </svg>

                            <motion.div
                                className="relative w-72 h-72 lg:w-96 lg:h-96 rounded-full overflow-hidden"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.8, duration: 0.8 }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <Image
                                    src="/Profile.jpg"
                                    alt="Navoda Chathurya"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </motion.div>

                            {[...Array(8)].map((_, i) => (
                                <motion.div
                                    key={`sparkle-${i}`}
                                    className="absolute w-1 h-1 bg-white rounded-full"
                                    style={{
                                        left: `${Math.random() * 100}%`,
                                        top: `${Math.random() * 100}%`,
                                    }}
                                    animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
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
                    {stats.map((stat, index) => {
                        const delay = 0.5 + index * 0.2;
                        const isVisible = statInViews[index];
                    
                        return (
                            <motion.div
                                key={stat.label}
                                variants={itemVariants}
                                className="text-center group"
                                whileHover={{ y: -5 }}
                                ref={statRefs.current[index]}
                            >
                                <div className="flex flex-col items-center space-y-2">
                                    {/* Icon */}
                                    <motion.div
                                        className="w-12 h-12 rounded-full bg-emerald-400/10 flex items-center justify-center mb-2 group-hover:bg-emerald-400/20 transition-colors duration-300"
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <stat.icon className="text-emerald-400" size={24} />
                                    </motion.div>

                                    {/* Number + CountUp */}
                                    <motion.h3
                                        className="text-4xl lg:text-5xl font-bold text-white"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay, duration: 0.6, ease: "easeOut" }}
                                    >
                                        {isClient && isVisible && (
                                            <CountUp
                                                start={0}
                                                end={parseInt(stat.number.replace(/[^0-9]/g, ""))}
                                                duration={2}
                                                suffix={stat.number.includes("+") ? "+" : ""}
                                            />
                                        )}
                                    </motion.h3>

                                    {/* Label */}
                                    <motion.p
                                        className="text-gray-400 text-sm whitespace-pre-line"
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: delay + 0.3, duration: 0.5 }}
                                    >
                                        {stat.label}
                                    </motion.p>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
            <MobilePageNavigation currentPath={pathname} />
            <Footer/>
        </section>
    );
};

export default Introduction;
