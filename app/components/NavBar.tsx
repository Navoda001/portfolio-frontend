'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Introduction', href: '/' },
    { name: 'Resume', href: '/pages/resume' },
    { name: 'Projects', href: '/projects' },
    { name: 'Certifications', href: '/certifications' },
    { name: 'Testimonials', href: '/services' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-gray-900/10 backdrop-blur-md border-b border-gray-800/50'
          : 'bg-gray-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="group flex items-center space-x-2"
          >
            <span className="text-2xl lg:text-3xl font-bold text-white group-hover:text-emerald-400 transition-colors duration-300">
              Navoda Chathurya<span className="text-emerald-400 group-hover:text-white transition-colors duration-300">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-3 py-2 text-sm font-medium tracking-wide transition-all duration-300 group ${
                  isActive(item.href)
                    ? 'text-emerald-400'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.name}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-emerald-400 transition-all duration-300 ${
                    isActive(item.href)
                      ? 'w-full'
                      : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Hire Me Button */}
          <div className="hidden lg:block">
            <Link
              href="/contact"
              className="relative px-6 py-2.5 bg-emerald-500 text-white text-sm font-semibold rounded-full overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 hover:-translate-y-0.5"
            >
              <span className="relative z-10">Hire Me</span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative w-6 h-6 flex flex-col justify-center items-center space-y-1 group"
            aria-label="Toggle mobile menu"
          >
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 origin-center ${
                isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 origin-center ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-2 pt-2 pb-6 space-y-1 bg-gray-900/95 backdrop-blur-md rounded-lg mt-2 border border-gray-800/50">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 text-base font-medium rounded-lg transition-all duration-300 ${
                  isActive(item.href)
                    ? 'text-emerald-400 bg-emerald-500/10'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 px-4">
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center px-6 py-3 bg-emerald-500 text-white text-sm font-semibold rounded-full hover:bg-emerald-600 transition-colors duration-300"
              >
                Hire Me
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;