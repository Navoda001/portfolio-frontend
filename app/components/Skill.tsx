'use client';

import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const flatSkills = [
    { name: 'Next.js', devicon: 'devicon-nextjs-plain' },
    { name: 'React.js', devicon: 'devicon-react-original' },
    { name: 'JavaScript', devicon: 'devicon-javascript-plain' },
    { name: 'HTML5', devicon: 'devicon-html5-plain' },
    { name: 'CSS3', devicon: 'devicon-css3-plain' },
    { name: 'Tailwind CSS', devicon: 'devicon-tailwindcss-plain' },
    { name: 'Material-UI', devicon: 'devicon-materialui-plain' },
    { name: 'Node.js', devicon: 'devicon-nodejs-plain-wordmark' },
    { name: 'Java', devicon: 'devicon-java-plain' },
    { name: 'C#', devicon: 'devicon-csharp-plain' },
    { name: '.NET Core', devicon: 'devicon-dotnetcore-plain' },
    { name: 'C', devicon: 'devicon-c-line' },
    { name: 'PHP', devicon: 'devicon-php-plain' },
    { name: 'SQL Server', devicon: 'devicon-microsoftsqlserver-plain' },
    { name: 'MySQL', devicon: 'devicon-mysql-plain-wordmark' },
    { name: 'Azure Sql Database', devicon: 'devicon-azure-plain' },
    { name: 'Linux', devicon: 'devicon-linux-plain' },
    { name: 'Git', devicon: 'devicon-git-plain' },
    { name: 'Github', devicon: 'devicon-github-original' },
];

const TechStackSection = () => {
    const row1Ref = useRef<HTMLDivElement>(null);
    const row2Ref = useRef<HTMLDivElement>(null);
    const isDraggingRef = useRef(false);
    const animationRef = useRef<number | null>(null);

    const [isDragging, setIsDragging] = useState(false);
    const [hasUserInteracted, setHasUserInteracted] = useState(false); // NEW

    const startXRef = useRef(0);
    const scrollLeftRef = useRef(0);

    const half = Math.ceil(flatSkills.length / 2);
    const row1 = flatSkills.slice(0, half);
    const row2 = flatSkills.slice(half);

    const autoScroll = () => {
        // Stop auto scroll if user has interacted
        if (!row1Ref.current || !row2Ref.current || isDraggingRef.current || hasUserInteracted) return;

        row1Ref.current.scrollLeft += 0.5;
        row2Ref.current.scrollLeft += 0.5;

        if (
            row1Ref.current.scrollLeft >= row1Ref.current.scrollWidth - row1Ref.current.clientWidth
        ) {
            row1Ref.current.scrollLeft = 0;
            row2Ref.current.scrollLeft = 0;
        }

        animationRef.current = requestAnimationFrame(autoScroll);
    };

    useEffect(() => {
        animationRef.current = requestAnimationFrame(autoScroll);
        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [hasUserInteracted]); // re-run if hasUserInteracted changes

    const handleDragStart = (e: React.MouseEvent) => {
        isDraggingRef.current = true;
        setIsDragging(true);
        setHasUserInteracted(true); // USER INTERACTION: stop future auto scrolls
        startXRef.current = e.pageX;
        scrollLeftRef.current = row1Ref.current?.scrollLeft || 0;
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };

    const handleDragging = (e: React.MouseEvent) => {
        if (!isDraggingRef.current) return;
        const x = e.pageX;
        const walk = (x - startXRef.current) * 1.5;
        if (row1Ref.current && row2Ref.current) {
            row1Ref.current.scrollLeft = scrollLeftRef.current - walk;
            row2Ref.current.scrollLeft = scrollLeftRef.current - walk;
        }
    };

    const handleDragEnd = () => {
        isDraggingRef.current = false;
        setIsDragging(false);
        // NO autoScroll restart here anymore
    };

    return (
        <section className="py-16 bg-gray-900/10 relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >
                    <h2 className="text-4xl lg:text-5xl font-bold text-white">
                        Technical <span className="text-emerald-400">Skills</span>
                    </h2>
                    <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                        Technologies and tools I work with across full-stack development
                    </p>
                </motion.div>

                {/* Two scrollable rows */}
                {[row1, row2].map((row, rowIndex) => (
                    <div key={rowIndex} className="relative mb-8">
                        <div className="pointer-events-none absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-gray-900 to-transparent z-20" />
                        <div className="pointer-events-none absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-gray-900 to-transparent z-20" />

                        <div
                            ref={rowIndex === 0 ? row1Ref : row2Ref}
                            onMouseDown={handleDragStart}
                            onMouseMove={handleDragging}
                            onMouseUp={handleDragEnd}
                            onMouseLeave={handleDragEnd}
                            className={`flex gap-6 overflow-x-auto no-scrollbar px-2 pb-4 cursor-grab active:cursor-grabbing ${isDragging ? 'select-none' : 'select-auto'
                                }`}
                        >
                            {row.map((skill, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ scale: 1.1 }}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.03 * i }}
                                    className="min-w-[100px] flex flex-col items-center justify-center p-4 bg-gray-800/40 border border-gray-700/50 hover:bg-gray-800/60 rounded-2xl transition-all duration-300 relative overflow-hidden group"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                                    <div className="relative z-10 flex flex-col items-center space-y-2">
                                        <i className={`${skill.devicon} text-4xl text-white group-hover:text-emerald-400 transition-colors`} />
                                        <span className="text-sm text-white group-hover:text-emerald-400 transition-colors">
                                            {skill.name}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TechStackSection;