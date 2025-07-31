'use client';

import { motion, useAnimation, useInView, Variants } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { 
  ExternalLink, 
  Github, 
  Filter,
  Grid3X3,
  List,
  Search,
  ArrowUpRight,
  Code2,
  Palette,
  Smartphone,
  Globe
} from 'lucide-react';

const ProjectGrid = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();
  const [activeFilter, setActiveFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  const projects = [
    {
      id: 1,
      title: "FurnShop E-commerce",
      category: "Frontend",
      description: "Modern furniture e-commerce platform with stunning UI/UX design and smooth animations.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      image: "/api/placeholder/400/300",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
      featured: true,
      year: "2024"
    },
    {
      id: 2,
      title: "Creative Portfolio",
      category: "Full Stack",
      description: "Personal portfolio website with CMS integration and dynamic content management.",
      technologies: ["Next.js", "Sanity", "SCSS", "Node.js"],
      image: "/api/placeholder/400/300",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
      featured: false,
      year: "2024"
    },
    {
      id: 3,
      title: "Task Management App",
      category: "Mobile",
      description: "Cross-platform mobile app for task management with real-time collaboration features.",
      technologies: ["React Native", "Firebase", "Redux", "Expo"],
      image: "/api/placeholder/400/300",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
      featured: true,
      year: "2023"
    },
    {
      id: 4,
      title: "Brand Identity Design",
      category: "Design",
      description: "Complete brand identity package including logo, color palette, and design guidelines.",
      technologies: ["Figma", "Adobe Illustrator", "Photoshop"],
      image: "/api/placeholder/400/300",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
      featured: false,
      year: "2023"
    },
    {
      id: 5,
      title: "Dashboard Analytics",
      category: "Frontend",
      description: "Advanced analytics dashboard with interactive charts and real-time data visualization.",
      technologies: ["Vue.js", "D3.js", "Chart.js", "API Integration"],
      image: "/api/placeholder/400/300",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
      featured: false,
      year: "2023"
    },
    {
      id: 6,
      title: "Social Media Platform",
      category: "Full Stack",
      description: "Social networking platform with real-time messaging and content sharing capabilities.",
      technologies: ["MERN", "Socket.io", "AWS", "Redis"],
      image: "/api/placeholder/400/300",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
      featured: true,
      year: "2024"
    }
  ];

  const filters = [
    { name: 'All', icon: Globe, count: projects.length },
    { name: 'Frontend', icon: Code2, count: projects.filter(p => p.category === 'Frontend').length },
    { name: 'Full Stack', icon: Globe, count: projects.filter(p => p.category === 'Full Stack').length },
    { name: 'Mobile', icon: Smartphone, count: projects.filter(p => p.category === 'Mobile').length },
    { name: 'Design', icon: Palette, count: projects.filter(p => p.category === 'Design').length }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesFilter = activeFilter === 'All' || project.category === activeFilter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants:Variants = {
    hidden: { y: 30, opacity: 0 },
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Frontend': return Code2;
      case 'Full Stack': return Globe;
      case 'Mobile': return Smartphone;
      case 'Design': return Palette;
      default: return Code2;
    }
  };

  return (
    <section ref={ref} className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={mainControls}
          className="space-y-12"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center space-y-6">
            <motion.h2 
              className="text-4xl lg:text-6xl font-bold"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-white">My </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
                Projects
              </span>
            </motion.h2>
            
            <motion.p 
              className="text-gray-300 text-lg max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Explore my latest work and creative projects. Each piece represents a unique challenge 
              and solution in modern web development.
            </motion.p>
          </motion.div>

          {/* Controls */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Search and View Toggle */}
            <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
              {/* Search */}
              <motion.div 
                className="relative max-w-md w-full"
                whileFocus={{ scale: 1.02 }}
              >
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                />
              </motion.div>

              {/* View Toggle */}
              <div className="flex items-center space-x-2 bg-gray-800/50 rounded-xl p-1 border border-gray-700/50">
                <motion.button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    viewMode === 'grid' 
                      ? 'bg-emerald-500 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Grid3X3 size={20} />
                </motion.button>
                <motion.button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    viewMode === 'list' 
                      ? 'bg-emerald-500 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <List size={20} />
                </motion.button>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-3 justify-center">
              {filters.map((filter) => {
                const IconComponent = filter.icon;
                return (
                  <motion.button
                    key={filter.name}
                    onClick={() => setActiveFilter(filter.name)}
                    className={`group flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                      activeFilter === filter.name
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                        : 'bg-gray-800/50 text-gray-300 hover:bg-gray-800 hover:text-white border border-gray-700/50'
                    }`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * filters.indexOf(filter) }}
                  >
                    <IconComponent size={18} />
                    <span>{filter.name}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      activeFilter === filter.name
                        ? 'bg-white/20 text-white'
                        : 'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {filter.count}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Projects Grid/List */}
          <motion.div
            layout
            className={`grid gap-8 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                : 'grid-cols-1'
            }`}
          >
            {filteredProjects.map((project, index) => {
              const CategoryIcon = getCategoryIcon(project.category);
              
              return (
                <motion.div
                  key={project.id}
                  layout
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                  className={`group relative bg-gray-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-emerald-500/50 transition-all duration-500 ${
                    viewMode === 'list' ? 'lg:flex lg:items-center' : ''
                  }`}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  {/* Image */}
                  <div className={`relative overflow-hidden ${
                    viewMode === 'list' ? 'lg:w-1/2' : 'aspect-video'
                  }`}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={false}
                    />

                    {/* Featured Badge */}
                    {project.featured && (
                      <motion.div
                        className="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        Featured
                      </motion.div>
                    )}

                    {/* Quick Actions */}
                    <motion.div
                      className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ scale: 0.8 }}
                      whileHover={{ scale: 1 }}
                    >
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-emerald-500/50 transition-colors duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ExternalLink size={16} />
                      </motion.a>
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-emerald-500/50 transition-colors duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Github size={16} />
                      </motion.a>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className={`p-6 ${viewMode === 'list' ? 'lg:w-1/2' : ''}`}>
                    <div className="space-y-4">
                      {/* Category and Year */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-emerald-400">
                          <CategoryIcon size={16} />
                          <span className="text-sm font-medium">{project.category}</span>
                        </div>
                        <span className="text-gray-400 text-sm">{project.year}</span>
                      </div>

                      {/* Title */}
                      <motion.h3 
                        className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors duration-300"
                        whileHover={{ x: 5 }}
                      >
                        {project.title}
                      </motion.h3>

                      {/* Description */}
                      <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((tech, techIndex) => (
                          <motion.span
                            key={tech}
                            className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded text-xs font-medium"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 + techIndex * 0.1 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded text-xs font-medium">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Action Button */}
                      <motion.div
                        className="pt-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-2 text-emerald-400 hover:text-emerald-300 font-medium text-sm group/link"
                          whileHover={{ x: 5 }}
                        >
                          <span>View Project</span>
                          <ArrowUpRight 
                            size={16} 
                            className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform duration-300" 
                          />
                        </motion.a>
                      </motion.div>
                    </div>

                    {/* Hover Glow Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                      initial={false}
                    />
                  </div>

                  {/* Project Number */}
                  <motion.div
                    className="absolute bottom-4 right-4 text-6xl font-bold text-gray-800/20 select-none"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    {String(project.id).padStart(2, '0')}
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* No Results */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="space-y-4">
                <motion.div
                  className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Search className="text-gray-400" size={24} />
                </motion.div>
                <h3 className="text-xl font-semibold text-white">No projects found</h3>
                <p className="text-gray-400">Try adjusting your search or filter criteria</p>
                <motion.button
                  onClick={() => {
                    setActiveFilter('All');
                    setSearchTerm('');
                  }}
                  className="px-6 py-2 bg-emerald-500 text-white rounded-full font-medium hover:bg-emerald-600 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Clear Filters
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Load More Button */}
          {filteredProjects.length > 0 && (
            <motion.div 
              variants={itemVariants}
              className="text-center pt-8"
            >
              <motion.button
                className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 25px 50px -12px rgba(16, 185, 129, 0.25)" 
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center space-x-2">
                  <span>Load More Projects</span>
                  <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" size={18} />
                </span>
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectGrid;