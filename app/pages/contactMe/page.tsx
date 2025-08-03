'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView, Variants } from 'framer-motion';
import Select from 'react-select';
import { Send, User, Mail, Phone, MessageSquare, Briefcase, MapPin } from 'lucide-react';
import MobilePageNavigation from '@/app/components/MobilePageNavigation';
import { usePathname } from 'next/navigation';

import { FaLinkedinIn, FaGithub, FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";

const socialLinks = [
  { icon: FaLinkedinIn, href: "https://www.linkedin.com/in/navoda001", color: "bg-[#0077B5]" },
  { icon: FaFacebook, href: "https://www.facebook.com/share/1BsnzU3eni/?mibextid=wwXIfr", color: "bg-[#1877F2]" },
  { icon: FaWhatsapp, href: "https://api.whatsapp.com/send/?phone=94762085246&text&type=phone_number&app_absent=0", color: "bg-[#25D366]" },
  { icon: FaInstagram, href: "https://www.instagram.com/navoda_c001?igsh=MXVkeGpzYXJ3NHF3bg%3D%3D&utm_source=qr", color: "bg-[#E4405F]" }, 
];

// Types
interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

interface ContactSectionProps {
  onSubmit?: (data: ContactFormData) => Promise<void>;
}

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const inputVariants: Variants = {
  hover: { scale: 1.0, boxShadow: '0 0 4px rgba(20, 184, 166, 0.4)' }, // softer emerald shadow
  tap: { scale: 1.00 },
};


const buttonVariants: Variants = {
  hover: { scale: 1.03, boxShadow: '0 0 15px rgba(20, 184, 166, 0.8)' },
  tap: { scale: 0.97 },
};

const statusVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ContactSection: React.FC<ContactSectionProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const services = [
    'Web Development',
    'Mobile App Development',
    'UI/UX Design',
    'E-commerce Solutions',
    'Consulting',
    'Other',
  ];

  const contactInfo = {
    phone: '(+94) 76 208 5246',
    email: 'navodachathurya2001@gmail.com',
    address: 'Moratuwa, Sri Lanka',
    whatsapp: '076 208 5246',
  };

  // Animation controls for section fade in on scroll
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();
  const pathname = usePathname();

  useEffect(() => {
    if (isInView) {
      mainControls.start('visible');
    }
  }, [isInView, mainControls]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // React Select onChange handler
  const handleServiceChange = (selectedOption: { value: string; label: string } | null) => {
    setFormData((prev) => ({
      ...prev,
      service: selectedOption ? selectedOption.value : '',
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
        console.log('Form submitted:', formData);
      }

      setSubmitStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        service: '',
        message: '',
      });
    } catch (error) {
      setSubmitStatus('error');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Map your services to react-select options
  const serviceOptions = services.map((service) => ({ value: service, label: service }));

  // Custom react-select styles to match your dark theme + emerald accents
  const customSelectStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: 'rgba(31, 41, 55, 0.5)', // Tailwind gray-800/50
      borderColor: state.isFocused ? '#10B981' : '#374151', // emerald-500 or gray-700
      boxShadow: state.isFocused ? '0 0 0 2px rgba(16, 185, 129, 0.4)' : 'none',
      borderRadius: '0.75rem', // rounded-xl
      paddingLeft: '0.5rem',
      paddingRight: '0.5rem',
      color: 'white',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      minHeight: '44px', // align with input height
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#10B981' : 'transparent', // emerald-400 on hover
      color: state.isFocused ? 'white' : 'white',
      cursor: 'pointer',
      padding: '12px 15px',
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: 'white',
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: '#1F2937', // Tailwind gray-800
      borderRadius: '0.75rem',
      marginTop: '0.25rem',
      zIndex: 9999,
    }),
    dropdownIndicator: (provided: any, state: any) => ({
      ...provided,
      color: state.isFocused ? '#10B981' : '#6B7280', // emerald-400 or gray-400
      padding: '8px',
      transition: 'color 0.2s',
    }),
    indicatorSeparator: (provided: any) => ({
      ...provided,
      backgroundColor: 'transparent',
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: '#9CA3AF', // gray-400
    }),
  };

  return (
    <motion.section
      ref={ref}
      className="py-20 px-4 bg-gray-900 pt-28"
      variants={containerVariants}
      initial="hidden"
      animate={mainControls}
    >
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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Let&apos;s work <span className="text-emerald-400">together</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have a project in mind? I&apos;d love to hear about it. Let&apos;s discuss how we can bring
            your vision to life.
          </p>
        </motion.div>

        {/* Contact Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <motion.div
            className="lg:sticky lg:top-8 space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Get in Touch</h3>
              <p className="text-gray-400 leading-relaxed">
                Ready to start your next project? Let&apos;s discuss how I can help bring your ideas to life.
              </p>
            </div>

            <div className="space-y-6">
              {/* Phone */}
              <div className="flex items-center space-x-4 group">
                <div className="p-3 bg-emerald-500/20 rounded-xl group-hover:bg-emerald-500/30 transition-colors duration-300">
                  <Phone className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Phone</p>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="text-white font-medium hover:text-emerald-400 transition-colors duration-200"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-4 group">
                <div className="p-3 bg-emerald-500/20 rounded-xl group-hover:bg-emerald-500/30 transition-colors duration-300">
                  <Mail className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Email</p>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-white font-medium hover:text-emerald-400 transition-colors duration-200"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-center space-x-4 group">
                <div className="p-3 bg-emerald-500/20 rounded-xl group-hover:bg-emerald-500/30 transition-colors duration-300">
                  <MapPin className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Address</p>
                  <p className="text-white font-medium">{contactInfo.address}</p>
                </div>
              </div> 
            </div>
            <div className="flex flex-col items-center gap-6 mt-20">
              {/* Heading */}
              <h2 className="text-xl font-semibold text-white">
                Connect with me on{" "}
                <span className="bg-gradient-to-r from-emerald-200 to-emerald-600 text-transparent bg-clip-text">
                  Social Media
                </span>
              </h2>

              {/* Icons */}
              <div className="flex gap-6">
                {socialLinks.map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${social.color} w-12 h-12 flex items-center justify-center rounded-full text-white shadow-lg`}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="bg-gray-900/5 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {['firstName', 'lastName'].map((name) => (
                <motion.div
                  key={name}
                  className="space-y-2 p-2 rounded-2xl"
                  variants={inputVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <label htmlFor={name} className="block text-sm font-medium text-gray-300 capitalize">
                    {name === 'firstName' ? 'First Name' : 'Last Name'}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      id={name}
                      name={name}
                      value={formData[name as keyof ContactFormData] as string}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-gray-800/10 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 outline-none"
                      placeholder={name === 'firstName' ? 'John' : 'Doe'}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { id: 'email', label: 'Email Address', icon: Mail, type: 'email', required: true, placeholder: 'john@example.com' },
                { id: 'phone', label: 'Phone Number', icon: Phone, type: 'tel', required: false, placeholder: '+1 (555) 123-4567' },
              ].map(({ id, label, icon: Icon, type, required, placeholder }) => (
                <motion.div
                  key={id}
                  className="space-y-2 p-2 rounded-2xl"
                  variants={inputVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <label htmlFor={id} className="block text-sm font-medium text-gray-300">
                    {label}
                  </label>
                  <div className="relative">
                    <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={type}
                      id={id}
                      name={id}
                      value={formData[id as keyof ContactFormData] as string}
                      onChange={handleInputChange}
                      required={required}
                      className="w-full pl-10 pr-4 py-3 bg-gray-800/10 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 outline-none"
                      placeholder={placeholder}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Service Selection with React Select */}
            <motion.div
              className="space-y-2 p-2 rounded-2xl"
              variants={inputVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-1">
                Select a Service
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                <div style={{ marginLeft: 40 /* leave space for icon */ }}>
                  <Select
                    inputId="service"
                    name="service"
                    options={serviceOptions}
                    value={serviceOptions.find((opt) => opt.value === formData.service) || null}
                    onChange={handleServiceChange}
                    styles={customSelectStyles}
                    placeholder="Choose a service..."
                    isSearchable={false}
                    menuPortalTarget={document.body}
                    menuPosition={'fixed'}
                  />
                </div>
              </div>
            </motion.div>

            {/* Message */}
            <motion.div
              className="space-y-2 p-2 rounded-2xl"
              variants={inputVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                Message
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange(e)}
                  rows={5}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/10 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 outline-none resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${isSubmitting
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-emerald-500 hover:bg-emerald-400 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40'
                }`}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <div className="flex items-center justify-center space-x-2">
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </div>
            </motion.button>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <motion.div
                className="p-4 bg-emerald-500/20 border border-emerald-500/50 rounded-xl"
                variants={statusVariants}
                initial="hidden"
                animate="visible"
              >
                <p className="text-emerald-300 text-center">
                  Thank you! Your message has been sent successfully.
                </p>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl"
                variants={statusVariants}
                initial="hidden"
                animate="visible"
              >
                <p className="text-red-300 text-center">
                  Sorry, there was an error sending your message. Please try again.
                </p>
              </motion.div>
            )}
          </motion.form>
        </div>
      </div>
      <MobilePageNavigation currentPath={pathname} />
    </motion.section>
  );
};

export default ContactSection;
