"use client";

import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react"; 

const navItems = [
  { name: "Introduction", href: "/" },
  { name: "Resume", href: "/pages/resume" },
  { name: "Projects", href: "/pages/projects" },
  { name: "Certifications", href: "/pages/certificate" },
  { name: "Hire Me", href: "/pages/contactMe" },
];

export default function MobilePageNavigation({ currentPath }: { currentPath: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [showButtons, setShowButtons] = useState(false);

  const currentIndex = navItems.findIndex((item) => item.href === pathname);
  
  // Ensure we have a valid index
  const isValidIndex = currentIndex !== -1;
  const isFirstPage = currentIndex === 0;
  const isLastPage = currentIndex === navItems.length - 1;

  const goPrev = () => {
    if (currentIndex > 0) {
      router.push(navItems[currentIndex - 1].href);
    }
  };

  const goNext = () => {
    if (currentIndex < navItems.length - 1) {
      router.push(navItems[currentIndex + 1].href);
    }
  };

  // Show buttons only after scrolling down a bit
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 550) {
        setShowButtons(true);
      } else {
        setShowButtons(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide on desktop or if page not found in navItems
  if (typeof window !== "undefined" && window.innerWidth >= 1024) return null;
  if (!isValidIndex) return null;

  return (
    showButtons && (
      <div className="fixed bottom-5 left-0 w-full flex justify-between px-6 lg:hidden z-50">
        {/* Prev Button - Hidden on Introduction page */}
        {!isFirstPage && (
          <motion.button
            onClick={goPrev}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-gray-800 text-gray-300 rounded-full border border-gray-700 hover:bg-gray-700 hover:text-white transition-all duration-300"
          >
            ← Prev
          </motion.button>
        )}

        {/* Spacer to keep gap */}
        <div className="flex-1" />

        {/* Next Button - Hidden on Hire Me page */}
        {!isLastPage && (
          <motion.button
            onClick={goNext}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-all duration-300"
          >
            Next →
          </motion.button>
        )}
      </div>
    )
  );
}