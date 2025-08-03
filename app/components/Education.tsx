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
    Zap,
    Check
} from 'lucide-react';
import type { Variants } from "framer-motion";
import Image from 'next/image';

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
            year: '2017',
            title: 'GCE Ordinary Level',
            institution: 'Mr/ Siddhartha College',
            type: 'Matara, Sri Lanka',
            duration: '',
            skills: [],
            color: 'from-emerald-500 to-teal-600',
            info: "I completed my GCE Ordinary Level examinations with Commerce, Information Technology, and Music as my basket subjects. This combination allowed me to develop both analytical and creative skills, strengthening my understanding of business concepts, technology, and artistic expression.",
            result: "A8 C1",
            img: '/education/education1.jpeg',
        },
        {
            year: '2021',
            title: 'Advanced Level',
            institution: 'Mahinda College Galle',
            type: 'Galle, Sri Lanka',
            duration: '',
            skills: [],
            info: "I completed my GCE Advanced Level in the Science stream with Biology, Chemistry, and Physics, gaining a strong foundation in scientific principles, analytical thinking, and problem-solving skills.",
            result: "ABB passes",
            color: 'from-blue-500 to-cyan-600',
            img: '/education/education2.jpeg',

        },
        {
            year: '2025',
            title: 'software development Course',
            institution: 'IJSE - Institute of Software Engineering',
            type: 'Galle, Sri Lanka',
            duration: '6 month',
            skills: [
                'Java',
                'Swing',
                'JavaFX',
                'MVC Architecture',
                'Layered Architecture',
                'MySQL',
                'HTML',
                'CSS',
                'JavaScript',
                'Spring Boot',
                'React',
                'MongoDB',
                'Node.js',
                'Express.js'
            ],
            result: "Passed",
            color: 'from-purple-500 to-indigo-600',
            img: '/education/education3.jpeg',
        },
        {
            year: '2023-2027',
            title: 'Bsc (Hons) in Information Technology',
            institution: 'UOM - University of Moratuwa',
            type: 'Moratuwa,Sri Lanka',
            duration: '',
            skills: [],
            color: 'from-orange-500 to-red-600',
            info: "I am a third-year undergraduate at the Faculty of Information Technology, University of Moratuwa, with a strong passion for software development and innovative problem-solving. My academic journey has equipped me with solid technical skills and hands-on experience in building practical solutions across various technologies.",
            result: "",
            img: '/education/education4.jpg',
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
        const card = scrollRef.current.querySelector<HTMLElement>('.education-card');
        if (!card) return;

        const gap = 24; // gap-6
        const cardWidth = card.offsetWidth + gap;

        const index = Math.round(scrollLeft / cardWidth);
        setCurrentIndex(index);
    };



    const scrollToIndex = (i: number) => {
        if (!scrollRef.current) return;

        const card = scrollRef.current.querySelector<HTMLElement>('.education-card');
        if (!card) return;

        const gap = 24; // gap-6
        const cardWidth = card.offsetWidth + gap;

        scrollRef.current.scrollTo({
            left: i * cardWidth,
            behavior: 'smooth'
        });
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
                            An overview of my academic background, from school to university, highlighting the key milestones that shaped my path in technology.
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
                        className={`flex overflow-x-auto overflow-y-hidden no-scrollbar snap-x snap-mandatory gap-6 pl-3 py-6 cursor-grab active:cursor-grabbing ${isDragging ? 'select-none' : 'select-auto'
                            }`}
                    >


                        {educationData.map((item, index) => (
                            <motion.div
                                key={index}
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="education-card snap-center min-w-[90%] sm:min-w-[80%] lg:min-w-[70%] xl:min-w-[60%] bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 group relative hover:bg-gray-800/70 transition-all duration-300"
                                whileHover={{ scale: 1.02, y: -5 }}
                            >

                                {/* Background gradient hover */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
                                />

                                <div className="relative space-y-6">
                                    <div className="flex justify-between items-center">
                                        <motion.div
                                            className="inline-flex p-1 items-center bg-emerald-500/10 border-2 border-emerald-400 rounded-full"
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            <div className="relative w-12 h-12">
                                                <Image
                                                    className="rounded-full object-cover"
                                                    src={item.img}
                                                    alt="Education"
                                                    fill
                                                    sizes="48px"
                                                />
                                            </div>
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
                                        <div className="flex items-start space-x-4 text-gray-400 text-lg">
                                            <div className="flex items-start space-x-1">
                                                <GraduationCap size={14} className="mt-1 flex-shrink-0" />
                                                <div className="leading-tight">
                                                    {item.institution.includes(' - ') ? (
                                                        <>
                                                            <div>{item.institution.split(' - ')[0]}</div>
                                                            <div className="text-sm opacity-80">{item.institution.split(' - ')[1]}</div>
                                                        </>
                                                    ) : (
                                                        <span>{item.institution}</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <MapPin size={14} />
                                                <span>{item.type}</span>
                                            </div>
                                        </div>
                                    </div>
                                    {(item.skills.length > 0) && (
                                        <div>
                                            <div className="flex items-center space-x-2 text-gray-300 text-sm">
                                                <BookOpen size={14} />
                                                <span className="font-medium">Key Skills:</span>
                                            </div>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {item.skills.map((skill, i) => (
                                                    <motion.span
                                                        key={i}
                                                        className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded-full text-xs font-medium hover:bg-emerald-500/20 hover:text-emerald-400 transition-all duration-300"
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
                                    )}

                                    {(item.info && item.info.length > 0) && (
                                        <div className="flex items-center space-x-2 text-gray-300 text-md">
                                            <Star size={14} />
                                            <span className="font-medium">{item.info}</span>
                                        </div>
                                    )}

                                    {(item.duration.length > 0) && (
                                        <div className="flex items-center space-x-2 text-emerald-400 text-sm">
                                            <Star size={14} />
                                            <span className="font-medium">Duration: {item.duration}</span>
                                        </div>
                                    )}

                                    {(item.result && item.result.length > 0) && (
                                        <div className="inline-flex items-center gap-2 rounded-md bg-emerald-500/15 px-3 py-1 border border-emerald-500/30 shadow-sm hover:shadow-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300">
                                            <div className="flex items-center justify-center w-4 h-4 rounded-full bg-emerald-500 text-gray-900 shadow-sm">
                                                <Check size={8} strokeWidth={3} />
                                            </div>
                                            <span className="text-sm font-medium text-emerald-400">{item.result}</span>
                                        </div>
                                    )}
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
                                onClick={() => scrollToIndex(i)}
                                className={`w-3 h-3 rounded-full cursor-pointer ${i === currentIndex ? 'bg-emerald-400 scale-110' : 'bg-gray-600'
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
