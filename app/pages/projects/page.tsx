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
      title: "PresCrypt",
      category: "Web Development",
      description: "PresCrypt is a comprehensive healthcare management system designed to improve the efficiency and security of doctor-patient interactions. It enables patients to easily book and manage appointments, while doctors can create, update, and share prescriptions securely. The platform also provides an admin portal for overseeing system activities, managing user accounts, and approving doctor registrations. With features like prescription history tracking, real-time notifications, and appointment-based secure messaging, PresCrypt ensures smooth communication, accurate medical record management, and improved patient care.",
      technologies: ["Next.js", "Asp.Net", "OpenMRS", "SQL Server", "Flask", "Gemini", "Tailwind CSS", "Material UI", "Docker"],
      image: "/project/project1.jpg",
      liveUrl: "",
      githubUrl: "",
      frontEnd: "https://github.com/TechGenPioneers/PresCrypt",
      backEnd: "https://github.com/TechGenPioneers/PresCrypt-Backend",
      type: "Full Stack",
      type2: "Level 2 - Software Group Project",
      year: "2025",
      featured: true
    },
    {
      id: "02",
      title: "TrackMyItem",
      category: "Web Development",
      description: "TrackMyItem is a web-based Lost and Found management system designed to streamline the process of reporting, tracking, and reclaiming lost or found items within an organization or community. The platform allows users to securely register and log in, report items with detailed descriptions and images, search and filter items by status (Lost, Found, Claimed), and request claims for matching found items. An integrated admin panel enables administrators to manage users, item statuses, and claim requests efficiently, ensuring smooth operations and transparent communication.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Spring Boot", "Spring Security", "JWT", "Spring Data JPA", "MySQL"],
      image: "/project/project2.png",
      liveUrl: "",
      githubUrl: "",
      frontEnd: "https://github.com/Navoda001/Lost-and-Found-Application-Frontend",
      backEnd: "https://github.com/Navoda001/Lost-and-Found-Application-backend",
      type: "Full Stack",
      type2: "Individual Project",
      year: "2025",
      featured: true
    },
    {
      id: "03",
      title: "EventUni",
      category: "Web Development",
      description: "EventUni is an innovative event management platform tailored for Sri Lankan universities and institutes, providing a centralized hub for browsing, creating, and managing campus events. It addresses the problem of fragmented event communication across platforms like WhatsApp and social media by centralizing event details, ensuring students, faculty, and the wider community stay informed and engaged. The platform enables event creation, ticket registration or purchase, tag-based searching, and booking management through personalized dashboards, while administrators have tools to review creator requests and monitor event activities efficiently.",
      technologies: ["React + Vite", "Tailwind CSS", "Ballerina", "MongoDB", "Firebase"],
      image: "/project/project5.png",
      liveUrl: "",
      githubUrl: "https://github.com/nethmalgunawardhana/iwb124-the-404s",
      frontEnd: "",
      backEnd: "",
      video: "https://www.youtube.com/watch?v=zQuUNHkk42E&t=2s",
      type: "Full Stack",
      type2: "Group Project",
      year: "2024",
      featured: true
    },
    {
      id: "04",
      title: "Course Management System",
      category: "Desktop App",
      description: "Course Management System is a desktop-based application designed to streamline course enrollment, student management, and reporting for educational institutions. It enables students, faculty, and administrators to securely log in, manage courses, register for classes, and generate enrollment reports. The system supports role-based access control (RBAC) to ensure that each user type—student, faculty, or admin—can perform only their authorized tasks. Core features include creating and updating course and student records, enrolling or dropping courses, viewing real-time course availability, and generating statistical reports for administrators.",
      technologies: ["Java", "JavaFX", "Layered Architecture", "MySQL", "Scene Builder"],
      image: "/project/project3.png",
      liveUrl: "",
      githubUrl: "https://github.com/Navoda001/Course-Registration-System",
      type: "Desktop App",
      type2: "Individual Project",
      year: "2025",
      featured: true
    },
    {
      id: "05",
      title: "Place Order Application",
      category: "Desktop App",
      description: "Place Order Application is a Java-based desktop solution designed to simplify customer order processing and inventory management for businesses. The system allows users to search for customers and items, create orders, and automatically update inventory levels. It features an intuitive interface where users can enter order details, review items in an order summary table, and finalize orders seamlessly.",
      technologies: ["Java", "Swing", "MVC Architecture", "MySQL", "JDBC"],
      image: "/project/project4.png",
      liveUrl: "",
      githubUrl: "https://github.com/Navoda001/Place-Order-Application",
      type: "Desktop App",
      type2: "Individual Project",
      year: "2024",
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

const maxVisibleDots = 4;

// Calculate the first index to show
const startIndex = Math.min(
  Math.max(currentProject - Math.floor(maxVisibleDots / 2), 0),
  Math.max(projects.length - maxVisibleDots, 0)
);

const visibleProjects = projects.slice(startIndex, startIndex + maxVisibleDots);


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
              <h2 className="text-8xl lg:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-200 select-none">
                {currentProjectData.id}
              </h2>
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
                  {currentProjectData.liveUrl && (
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
                  )}

                  {currentProjectData.video && (
                    <motion.a
                      href={currentProjectData.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center space-x-2 bg-emerald-500 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/25"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink size={18} />
                      <span>Video Demo</span>
                    </motion.a>
                  )}

                  {currentProjectData.frontEnd && (
                    <motion.a
                      href={currentProjectData.frontEnd}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center space-x-2 bg-gray-800 text-gray-300 px-6 py-3 rounded-full font-semibold border border-gray-700 transition-all duration-300 hover:bg-gray-700 hover:text-white"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={18} />
                      <span>View FrontEnd Code</span>
                    </motion.a>
                  )}
                  {currentProjectData.backEnd && (
                    <motion.a
                      href={currentProjectData.backEnd}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center space-x-2 bg-gray-800 text-gray-300 px-6 py-3 rounded-full font-semibold border border-gray-700 transition-all duration-300 hover:bg-gray-700 hover:text-white"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={18} />
                      <span>View BackEnd Code</span>
                    </motion.a>
                  )}
                  {currentProjectData.githubUrl && (
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
                  )}

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
            <motion.div
              className="inline-flex mb-6 items-center space-x-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-semibold"
              whileHover={{ scale: 1.05 }}
            >
              <span>
                {currentProjectData.type2}
              </span>
            </motion.div>
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
                  {/* <motion.div
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
                  </motion.div> */}
                </motion.div>

                {/* Floating Elements */}


                {/* Project Type Indicator */}
                <motion.div
                  className="absolute -bottom-4 -left-4 bg-gray-800/90 backdrop-blur-md rounded-full px-4 py-2 border border-gray-700/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center space-x-2 text-emerald-400">
                    {currentProjectData.type === 'Frontend' && <Monitor size={16} />}
                    {currentProjectData.type === 'Desktop App' && <Monitor size={16} />}
                    {currentProjectData.type === 'Mobile' && <Smartphone size={16} />}
                    {currentProjectData.type === 'Full Stack' && <Layers size={16} />}
                    <span className="text-sm font-medium">{currentProjectData.type}</span>
                  </div>
                </motion.div>

              </motion.div>

            </AnimatePresence>
            {/* Navigation Arrows */}
            <div className="flex pt-5 justify-end space-x-2">
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
  {visibleProjects.map((_, index) => {
    const actualIndex = startIndex + index;
    return (
      <motion.button
        key={actualIndex}
        onClick={() => setCurrentProject(actualIndex)}
        className={`w-3 h-3 rounded-full transition-all duration-300 ${
          currentProject === actualIndex
            ? 'bg-emerald-400 w-8'
            : 'bg-gray-600'
        }`}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
      />
    );
  })}
</motion.div>

      </div>
    </section>
  );
};

export default ProjectShowcase;