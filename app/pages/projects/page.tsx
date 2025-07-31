'use client';

import { motion, useAnimation, useInView, AnimatePresence, Variants } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  ExternalLink,
  Github,
  ChevronLeft,
  ChevronRight,
  Code,
  Monitor,
  Smartphone,
  Layers,
  Play,
  Eye
} from 'lucide-react';

const ProjectShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();
  const [currentProject, setCurrentProject] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  const projects = [
    {
      id: "01",
      title: "Frontend Project",
      category: "Web Development",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque consequat, faucibus et, et.",
      technologies: ["Html 5", "Css 3", "Javascript"],
      image: "/api/placeholder/600/400",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
      type: "Frontend",
      year: "2024",
      featured: true
    },
    {
      id: "02",
      title: "E-Commerce Platform",
      category: "Full Stack",
      description: "Modern e-commerce solution with advanced features and seamless user experience.",
      technologies: ["React", "Node.js", "MongoDB"],
      image: "/api/placeholder/600/400",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
      type: "Full Stack",
      year: "2024",
      featured: false
    },
    {
      id: "03",
      title: "Mobile App Design",
      category: "UI/UX Design",
      description: "Clean and intuitive mobile application design with modern user interface elements.",
      technologies: ["React Native", "TypeScript", "Firebase"],
      image: "/api/placeholder/600/400",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
      type: "Mobile",
      year: "2023",
      featured: true
    }
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

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const currentProjectData = projects[currentProject];

  return (
    <section ref={ref} className="py-20 mt-10 bg-gray-900 relative overflow-hidden">
      {/* Background Effects */}
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
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={mainControls}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Project Number */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h2 className="text-8xl lg:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-700 select-none">
                {currentProjectData.id}
              </h2>
              <motion.div
                className="absolute inset-0 text-8xl lg:text-9xl font-bold text-emerald-400/20"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                {currentProjectData.id}
              </motion.div>
            </motion.div>

            {/* Project Info */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProject}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Category Badge */}
                <motion.div
                  className="inline-flex items-center space-x-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-semibold"
                  whileHover={{ scale: 1.05 }}
                >
                  <Code size={16} />
                  <span>{currentProjectData.category}</span>
                </motion.div>

                {/* Title */}
                <motion.h3
                  className="text-4xl lg:text-5xl font-bold text-white leading-tight"
                  layoutId="projectTitle"
                >
                  {currentProjectData.title}
                </motion.h3>

                {/* Description */}
                <motion.p
                  className="text-gray-300 text-lg leading-relaxed"
                  layoutId="projectDescription"
                >
                  {currentProjectData.description}
                </motion.p>

                {/* Technologies */}
                <div className="space-y-3">
                  <h4 className="text-emerald-400 font-semibold">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentProjectData.technologies.map((tech, index) => (
                      <motion.span
                        key={tech}
                        className="px-3 py-1 bg-gray-800/50 text-gray-300 rounded-full text-sm font-medium border border-gray-700/50"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * index }}
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: "rgba(16, 185, 129, 0.1)",
                          color: "rgb(52, 211, 153)"
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-4 pt-4">
                  <motion.a
                    href={currentProjectData.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center space-x-2 bg-emerald-500 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/25"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink size={18} />
                    <span>Live Demo</span>
                  </motion.a>

                  <motion.a
                    href={currentProjectData.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center space-x-2 bg-gray-800 text-gray-300 px-6 py-3 rounded-full font-semibold border border-gray-700 transition-all duration-300 hover:bg-gray-700 hover:text-white"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github size={18} />
                    <span>View Code</span>
                  </motion.a>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Right Content - Project Image */}
          <motion.div
            variants={itemVariants}
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProject}
                initial={{ opacity: 0, scale: 0.9, rotateY: 45 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotateY: -45 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="relative group"
              >
                {/* Main Project Image */}
                <motion.div
                  className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50"
                  whileHover={{ y: -10, rotateX: 5, rotateY: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Image
                    src={currentProjectData.image}
                    alt={currentProjectData.title}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                  />

                  {/* Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-emerald-900/50 via-transparent to-transparent"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Hover Actions */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1 }}
                  >
                    <motion.button
                      className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-emerald-500/50 transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Play size={20} />
                    </motion.button>
                    <motion.button
                      className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-emerald-500/50 transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Eye size={20} />
                    </motion.button>
                  </motion.div>
                </motion.div>

                {/* Floating Elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-20 h-20 bg-emerald-500/10 rounded-full backdrop-blur-md border border-emerald-500/20 flex items-center justify-center"
                  animate={{
                    rotate: 360,
                    scale: isHovered ? 1.1 : 1
                  }}
                  transition={{
                    rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                    scale: { duration: 0.3 }
                  }}
                >
                  <Layers className="text-emerald-400" size={24} />
                </motion.div>

                {/* Project Type Indicator */}
                <motion.div
                  className="absolute -bottom-4 -left-4 bg-gray-800/90 backdrop-blur-md rounded-full px-4 py-2 border border-gray-700/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center space-x-2 text-emerald-400">
                    {currentProjectData.type === 'Frontend' && <Monitor size={16} />}
                    {currentProjectData.type === 'Mobile' && <Smartphone size={16} />}
                    {currentProjectData.type === 'Full Stack' && <Layers size={16} />}
                    <span className="text-sm font-medium">{currentProjectData.type}</span>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <div className="absolute bottom-6 right-6 flex space-x-2">
              <motion.button
                onClick={prevProject}
                className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-emerald-600 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft size={20} />
              </motion.button>
              <motion.button
                onClick={nextProject}
                className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-emerald-600 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight size={20} />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Project Indicators */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center space-x-3 mt-12"
        >
          {projects.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentProject(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${currentProject === index ? 'bg-emerald-400 w-8' : 'bg-gray-600'
                }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectShowcase;