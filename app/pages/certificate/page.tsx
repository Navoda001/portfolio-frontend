'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Award, Trophy, BookOpen, Calendar, ExternalLink, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import MobilePageNavigation from '@/app/components/MobilePageNavigation';
import { usePathname } from 'next/navigation';

interface Certificate {
    id: string;
    title: string;
    issuer: string;
    date: string;
    type: 'competition' | 'learning';
    description: string;
    credentialId?: string;
    credentialUrl?: string;
    skills: string[];
    image?: string;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: (delay = 0) => ({
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: delay,
        },
    }),
};

const popItemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 300, damping: 20 },
    },
    exit: { opacity: 0, scale: 0.8, y: 20 },
};


const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const CertificatesComponent = () => {
    const [filter, setFilter] = useState<'competition' | 'learning'>('competition');
    const [currentPage, setCurrentPage] = useState(0);
    const [maxVisible, setMaxVisible] = useState(3);
    const pathname = usePathname();

    const certificates: Certificate[] = [
        {
            id: '1',
            title: 'Innovate with Ballerina Coding Challenge',
            issuer: 'WSO2',
            date: '2024',
            type: 'competition',
            description: 'Participated in the "Innovate with Ballerina" Coding Challenge organized by the IEEE Student Branch of the University of Moratuwa in collaboration with WSO2. Worked as part of a four-member team to develop an innovative solution using Ballerina Swan Lake, enhancing skills in creative problem-solving, teamwork, and collaborative software development.',
            credentialId: '',
            credentialUrl: 'https://certificates.ballerina.io/IWB24P-tcBH7IGJsu',
            skills: ['React + Vite', 'Ballerina', 'MongoDB', 'Firebase'],
            image: '/certificate/competition1.png',
        },
        {
            id: '2',
            title: ' MoraXtreme 9.0',
            issuer: 'IEEE Student Branch University of Moratuwa',
            date: '2024-11-19',
            type: 'competition',
            description: 'Participated in MoraXtreme 9.0, a premier national-level coding competition organized by the IEEE Student Branch of the University of Moratuwa. Solved challenging algorithmic problems under time constraints, strengthening skills in problem-solving, teamwork, and competitive programming.',
            credentialId: '',
            skills: [
                'Algorithms',
                'Problem Solving',
                'Time Management',
                'Teamwork',
                'Competitive Programming'
            ],
            image: '/certificate/competition2.jpeg',
        },
        {
            id: '3',
            title: 'AlgoXplore 1.0',
            issuer: 'Hackathon Hub of NSBM Green University',
            date: '2025',
            type: 'competition',
            description: 'Participated in AlgoXplore 1.0, organized by the Hackathon Hub of NSBM Green University. Competed as part of a team to solve algorithmic challenges and Capture The Flag (CTF) tasks, enhancing technical knowledge, problem-solving abilities, and collaboration skills.',
            credentialId: '',
            credentialUrl: '',
            skills: ['Algorithms', 'CTF Challenges', 'Cybersecurity', 'Problem Solving', 'Teamwork', 'Analytical Thinking'],
            image: '/certificate/competition3.jpeg',
        },
        {
            id: '4',
            title: ' Python for Beginners',
            issuer: 'Centre for Open & Distance Learning (CODL) University of Moratuwa, Sri Lanka',
            date: '2023-07-19',
            type: 'learning',
            description: "Completed the 'Python for Beginners' course offered by the Centre for Open & Distance Learning (CODL) at the University of Moratuwa, Sri Lanka. Gained foundational knowledge of Python programming, including syntax, control structures, functions, and basic problem-solving techniques.",
            credentialId: 'PtDIcBxDTS',
            credentialUrl: 'https://open.uom.lk/lms/mod/customcert/verify_certificate.php',
            skills: ['Python', 'Problem Solving'],
            image: '/certificate/learning1.png',
        },
        {
            id: '5',
            title: 'Web Design for Beginners',
            issuer: 'Centre for Open & Distance Learning (CODL) University of Moratuwa, Sri Lanka',
            date: '2023-09',
            type: 'learning',
            description: "Completed the 'Web Design for Beginners' course offered by the Centre for Open & Distance Learning (CODL) at the University of Moratuwa, Sri Lanka. Learned the fundamentals of web design, including HTML, CSS, responsive layouts, and best practices for creating user-friendly websites.",
            skills: ['HTML', 'CSS', 'Responsive Design', 'UI Design', 'Web Accessibility'],
            credentialId: 'zhUKF5f0Ai',
            credentialUrl: 'https://open.uom.lk/verify',
            image: '/certificate/learning2.jpeg',
        },
    ];

    // Responsive maxVisible cards (1 on mobile, 3 on desktop)
    useEffect(() => {
        const handleResize = () => {
            setMaxVisible(window.innerWidth < 768 ? 1 : 3);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const filteredCertificates = certificates.filter(
        (cert) => cert.type === filter
    );


    const totalPages = Math.ceil(filteredCertificates.length / maxVisible);
    const startIndex = currentPage * maxVisible;
    const visibleCertificates = filteredCertificates.slice(startIndex, startIndex + maxVisible);

    const next = () => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
    };

    const prev = () => {
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    };

    const goToPage = (pageIndex: number) => {
        setCurrentPage(pageIndex);
    };
    type FilterType = 'competition' | 'learning';

    const handleFilterChange = (newFilter: FilterType) => {
        setFilter(newFilter);
        setCurrentPage(0);
    };

    const filterButtons: { key: FilterType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
        { key: 'competition', label: 'Competitions', icon: Trophy },
        { key: 'learning', label: 'Learning', icon: BookOpen },
    ];


    const getTypeIcon = (type: string) => {
        return type === 'competition' ? <Trophy className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />;
    };

    const getTypeColor = (type: string) => {
        return type === 'competition'
            ? 'from-gray-500/20 to-emerald-800/20 border-emerald-500/30'
            : 'from-emerald-400/20 to-emerald-800/20 border-emerald-500/30';
    };

    return (
        <section className="py-20 pt-28 bg-gray-900 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 bg-emerald-400/20"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            height: `${Math.random() * 80 + 40}px`,
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

            {/* Blur circle */}
            <div className="absolute inset-0">
                <motion.div
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Award className="w-8 h-8 text-emerald-400" />
                        <h1 className="text-4xl md:text-5xl font-bold text-white">
                            Certificates & <span className="text-emerald-400">Achievements</span>
                        </h1>
                    </div>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Continuous learning through courses, certifications, and active participation in tech events
                    </p>
                </motion.div>

                {/* Filter */}

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="flex flex-wrap items-center justify-center gap-4 mb-12"
                >
                    <div className="flex items-center gap-2 text-emerald-400">
                        <Filter className="w-5 h-5" />
                        <span className="font-medium">Filter by:</span>
                    </div>
                    {filterButtons.map(({ key, label, icon: Icon }) => (
                        <motion.button
                            key={key}
                            onClick={() => handleFilterChange(key)}  
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`flex items-center gap-2 px-6 py-3 rounded-full border-2 transition-all duration-300 ${filter === key
                                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                                    : 'bg-slate-800/50 border-slate-700 text-gray-400 hover:border-emerald-500/50 hover:text-emerald-400'
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            <span className="font-medium">{label}</span>
                        </motion.button>
                    ))}
                </motion.div>


                {/* Certificates Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    custom={0.3}
                    className={`relative grid gap-8 ${maxVisible === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'
                        } min-h-[600px]`}
                >
                    <AnimatePresence mode="popLayout">
                        {visibleCertificates.map((cert) => (
                            <motion.div
                                key={cert.id}
                                variants={popItemVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                layout
                                className={`group relative bg-gradient-to-br ${getTypeColor(cert.type)} bg-slate-800/80 backdrop-blur-sm border rounded-xl overflow-hidden hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500`}
                            >
                                {/* Image */}
                                {cert.image && (
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={cert.image}
                                            alt={cert.title}
                                            className="w-full h-full object-fill transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                                        <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 rounded-full backdrop-blur-sm border bg-emerald-500/20 border-emerald-500/40 text-emerald-300">
                                            {getTypeIcon(cert.type)}
                                            <span className="text-xs font-medium capitalize">{cert.type}</span>
                                        </div>
                                        {cert.date && (
                                            <div className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1 bg-slate-900/60 backdrop-blur-sm border border-emerald-600/40 rounded-full text-emerald-300">
                                                <Calendar className="w-3 h-3" />
                                                <span className="text-xs">{cert.date}</span>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors duration-300">
                                        {cert.title}
                                    </h3>
                                    <p className="text-emerald-400 font-medium mb-3">{cert.issuer}</p>
                                    <p className="text-gray-400 text-sm mb-4">{cert.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {cert.skills.map((skill, idx) => (
                                            <span
                                                key={idx}
                                                className="px-3 py-1 bg-emerald-700/20 text-emerald-400 text-xs rounded-full border border-emerald-500/20"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-between pt-4 border-t border-emerald-700/50">
                                        {cert.credentialId && (
                                            <span className="text-xs text-emerald-500/70 font-mono">Credential ID: {cert.credentialId}</span>
                                        )}
                                        {cert.credentialUrl && (
                                            <a
                                                href={cert.credentialUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1 px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full hover:bg-emerald-500/30 transition-colors duration-300"
                                            >
                                                <span>View</span>
                                                <ExternalLink className="w-3 h-3" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Navigation Arrows */}
                {totalPages > 1 && (
                    <div className="flex justify-end space-x-2 mt-6">
                        <motion.button
                            onClick={prev}
                            disabled={totalPages <= 1}
                            className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-110 active:scale-95"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <ChevronLeft size={20} />
                        </motion.button>
                        <motion.button
                            onClick={next}
                            disabled={totalPages <= 1}
                            className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-110 active:scale-95"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <ChevronRight size={20} />
                        </motion.button>
                    </div>
                )}

                {/* Dots Navigation */}
                {totalPages > 1 && (
                    <div className="flex justify-center space-x-3 mt-6">
                        {Array.from({ length: totalPages }).map((_, idx) => (
                            <motion.button
                                key={idx}
                                onClick={() => goToPage(idx)}
                                className={`h-3 rounded-full transition-all duration-300 hover:scale-125 ${currentPage === idx ? 'bg-emerald-400 w-8' : 'bg-emerald-600/40 w-3 hover:bg-emerald-500/60'
                                    }`}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.8 }}
                            />
                        ))}
                    </div>
                )}
                <div className="mt-10 flex justify-center">
                    <motion.a
                        href="https://www.linkedin.com/in/navoda001"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View All Certifications on LinkedIn"
                        className="flex max-w-4xl items-center space-x-2 bg-emerald-600/50 text-gray-300 px-6 py-3 rounded-full font-semibold border border-slate-700 transition-all duration-300 hover:border-emerald-500 hover:text-emerald-400"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span>View All Certifications</span>
                    </motion.a>
                </div>
            </div>
            <MobilePageNavigation currentPath={pathname} />
        </section>
    );
};

export default CertificatesComponent;
