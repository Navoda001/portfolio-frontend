'use client';

import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import {
    GraduationCap,
    Calendar,
    MapPin,
    Award,
    BookOpen,
    Star,
    Zap
} from 'lucide-react';
import type { Variants } from "framer-motion";
import { img } from 'motion/react-client';
const EducationSection = () => {
    const ref = useRef(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true });
    const mainControls = useAnimation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const isDraggingRef = useRef(false);
    const startXRef = useRef(0);
    const scrollLeftRef = useRef(0);
    const [isDragging, setIsDragging] = useState(false);


    const handleDragStart = (e: React.MouseEvent) => {
        isDraggingRef.current = true;
        setIsDragging(true);
        startXRef.current = e.pageX - (scrollRef.current?.offsetLeft || 0);
        scrollLeftRef.current = scrollRef.current?.scrollLeft || 0;
    };

    const handleDragging = (e: React.MouseEvent) => {
        if (!isDraggingRef.current) return;
        e.preventDefault(); // Prevent text selection
        const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
        const walk = (x - startXRef.current) * 1.5;
        if (scrollRef.current) {
            scrollRef.current.scrollLeft = scrollLeftRef.current - walk;
        }
    };

    const handleDragEnd = () => {
        isDraggingRef.current = false;
        setIsDragging(false);
    };


    const educationData = [
        {
            year: '2023',
            title: 'Full Stack Web Development Bootcamp',
            institution: 'Online Course Platform',
            type: 'Bootcamp',
            duration: '6 months',
            skills: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
            color: 'from-emerald-500 to-teal-600',
            img: 'https://uom.lk/assets/images/Uni_emblem.jpg',
        },
        {
            year: '2022',
            title: 'Front-end Track',
            institution: 'Codecademy',
            type: 'Certification',
            duration: '4 months',
            skills: ['HTML5', 'CSS3', 'JavaScript', 'React'],
            color: 'from-blue-500 to-cyan-600',
            img: 'https://uom.lk/assets/images/Uni_emblem.jpg',

        },
        {
            year: '2020 - 2021',
            title: 'Programming Course',
            institution: 'Online Course',
            type: 'Certificate',
            duration: '1 year',
            skills: ['Python', 'Java', 'Data Structures', 'Algorithms'],
            color: 'from-purple-500 to-indigo-600',
            img: 'https://uom.lk/assets/images/Uni_emblem.jpg',
        },
        {
            year: '2019',
            title: 'Certified Web Developer',
            institution: 'Tech Institute',
            type: 'Professional',
            duration: '8 months',
            skills: ['PHP', 'MySQL', 'WordPress', 'jQuery'],
            color: 'from-orange-500 to-red-600',
            img: 'https://uom.lk/assets/images/Uni_emblem.jpg',
        }
    ];

    useEffect(() => {
        if (isInView) {
            mainControls.start('visible');
        }
    }, [isInView, mainControls]);

    const handleScroll = () => {
        if (!scrollRef.current) return;
        const scrollLeft = scrollRef.current.scrollLeft;
        const cardWidth = scrollRef.current.clientWidth;
        const index = Math.round(scrollLeft / cardWidth);
        setCurrentIndex(index);
    };

    const cardVariants: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 20
            }
        }
    };

    return (
        <section
            ref={ref}
            className="py-10 bg-gray-900/10 relative overflow-visible"
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <motion.div
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.2,
                                delayChildren: 0.1
                            }
                        }
                    }}
                    initial="hidden"
                    animate={mainControls}
                    className="space-y-6"
                >
                    {/* Header */}
                   <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >
                    <h2 className="text-4xl lg:text-5xl font-bold text-white">
                        My <span className="text-emerald-400">Education</span>
                    </h2>
                    <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                        Technologies and tools I work with across full-stack development
                    </p>
                </motion.div>

                    {/* Scrollable cards */}
                    <motion.div
                        ref={scrollRef}
                        onScroll={handleScroll}
                        onMouseDown={handleDragStart}
                        onMouseUp={handleDragEnd}
                        onMouseLeave={handleDragEnd}
                        onMouseMove={handleDragging}
                        className={`flex overflow-x-auto overflow-y-hidden no-scrollbar snap-x snap-mandatory gap-6 pb-6 cursor-grab active:cursor-grabbing ${isDragging ? 'select-none' : 'select-auto'
                            }`}
                    >


                        {educationData.map((item, index) => (
                            <motion.div
                                key={index}
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="snap-center min-w-[90%] sm:min-w-[80%] lg:min-w-[70%] xl:min-w-[60%] bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 group relative hover:bg-gray-800/70 transition-all duration-300"
                                whileHover={{ scale: 1.02, y: -5 }}
                            >
                                {/* Background gradient hover */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
                                />

                                <div className="relative space-y-6">
                                    <div className="flex justify-between items-center">
                                        <motion.div
                                            className="inline-flex items-center bg-emerald-500/10 border-2 border-emerald-400 rounded-full"
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            <img className="w-12 h-12 rounded-full object-cover" src={item.img} alt="Profile" />
                                        </motion.div>


                                        <motion.div
                                            className="inline-flex items-center space-x-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-semibold"
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            <Calendar size={16} />
                                            <span>{item.year}</span>
                                        </motion.div>
                                    </div>



                                    <div className="space-y-2">
                                        <motion.h3
                                            className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors duration-300"
                                            whileHover={{ x: 4 }}
                                        >
                                            {item.title}
                                        </motion.h3>
                                        <div className="flex items-center space-x-4 text-gray-400 text-sm">
                                            <div className="flex items-center space-x-1">
                                                <MapPin size={14} />
                                                <span>{item.institution}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Award size={14} />
                                                <span>{item.type}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center space-x-2 text-gray-300 text-sm">
                                            <BookOpen size={14} />
                                            <span className="font-medium">Key Skills:</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {item.skills.map((skill, i) => (
                                                <motion.span
                                                    key={i}
                                                    className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-xs font-medium hover:bg-emerald-500/20 hover:text-emerald-400 transition-all duration-300"
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    whileInView={{ opacity: 1, scale: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: 0.2 + i * 0.1 }}
                                                    whileHover={{ scale: 1.1 }}
                                                >
                                                    {skill}
                                                </motion.span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2 text-emerald-400 text-sm">
                                        <Star size={14} />
                                        <span className="font-medium">Duration: {item.duration}</span>
                                    </div>
                                </div>

                                {/* Decorative icon */}
                                <motion.div
                                    className="absolute top-4 right-4 w-6 h-6 opacity-20"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                                >
                                    <Zap className="text-emerald-400" />
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Dot indicators */}
                    <motion.div
                        className="flex justify-center gap-2 mt-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        {educationData.map((_, i) => (
                            <motion.div
                                key={i}
                                className={`w-3 h-3 rounded-full ${i === currentIndex ? 'bg-emerald-400 scale-110' : 'bg-gray-600'
                                    } transition-all duration-300`}
                                layout
                            />
                        ))}
                    </motion.div>
                </motion.div >
            </div >
        </section >
    );
};

export default EducationSection;
