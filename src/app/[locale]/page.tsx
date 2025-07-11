"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, 
  Palette, 
  Rocket, 
  Brain, 
  Mail, 
  Github, 
  Linkedin, 
  ExternalLink,
  ChevronDown,
  Users,
  Shield,
  Mic,
  Calendar,
  Briefcase,
  GraduationCap,
  School,
  Wrench,
  Cloud as CloudIcon,
  Sparkles,
  Globe,
  Home as HomeIcon,
  Building2
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import LanguageToggle from '../../components/LanguageToggle';
import PodcastSection from '../../components/PodcastSection';
import { PodcastEpisode } from '../../types/podcast';
import { useContactForm } from '@/hooks/useContactForm';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

interface BlogPost {
  title: string;
  excerpt: string;
  readTime: string;
  tags: string[];
  date: string;
  category: string;
  url: string;
}

export default function Home() {
  const t = useTranslations();
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isAtTop, setIsAtTop] = useState<boolean>(true);
  const { sendWhatsApp, sendEmail } = useContactForm();

  const toggleCard = (key: string) => {
    setExpandedCard(expandedCard === key ? null : key);
  };

  // Effect para detectar seção ativa e posição do scroll
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Detectar se está no topo (com margem de 100px)
      setIsAtTop(scrollY < 100);
      
      // Detectar seção ativa
      const sections = ['about', 'career', 'skills', 'projects', 'podcasts', 'blog', 'contact'];
      const scrollPosition = scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Effect para fechar menu mobile quando clicar fora
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuOpen && !(event.target as Element).closest('.mobile-menu')) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileMenuOpen]);

  // Exemplo de dados de podcasts
  const podcastEpisodes: PodcastEpisode[] = [
    {
      id: "copilot-184",
      embedUrl: "https://open.spotify.com/embed/episode/1jddVtYxTc0NHkQ60a0P2U?utm_source=generator&theme=0"
    },
    {
      id: "ddd-181",
      embedUrl: "https://open.spotify.com/embed/episode/2Bq6Of15RCYUrGT0VdyzrS?utm_source=generator&theme=0"
    },
    {
      id: "clean-179",
      embedUrl: "https://open.spotify.com/embed/episode/6Nj3KlF2z5V5n1I3pLpywE?utm_source=generator&theme=0"
    },
    {
      id: "ops-177",
      embedUrl: "https://open.spotify.com/embed/episode/1W9WTWZW2qZA5hUoAxz3Xv?utm_source=generator&theme=0"
    },
    {
      id: "opentelemetry-171",
      embedUrl: "https://open.spotify.com/embed/episode/7mszNxKgO6suP8DoWWvUSb?utm_source=generator&theme=0"
    },
    {
      id: "microservices-167",
      embedUrl: "https://open.spotify.com/embed/episode/4GPvd8VeSGSDuJquy6fNPm?utm_source=generator&theme=0"
    },
    {
      id: "sre-164",
      embedUrl: "https://open.spotify.com/embed/episode/6YqOGmqatuRRelTpBs8FyM?utm_source=generator&theme=0"
    },
    {
      id: "chatbots-20",
      embedUrl: "https://open.spotify.com/embed/episode/5qLKkWQULsPmNKMQjI98B9?utm_source=generator&theme=0"
    },
    {
      id: "kafka-173",
      embedUrl: "https://open.spotify.com/embed/episode/11l0xTs7300mAT875Vm5CM?utm_source=generator&theme=0"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <motion.nav 
        className="fixed top-4 w-full z-50 h-16 flex items-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto px-6 w-full">
          <div className="flex justify-between items-center h-full">
            {/* Logo + Nome à esquerda - visível apenas no topo */}
            <AnimatePresence>
              {isAtTop && (
                <motion.div 
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                >
              <div className="flex items-center justify-center w-10 h-10">
                <Image
                  src="/mbm.png"
                  alt="MBM Logo"
                  width={40}
                  height={40}
                  className="w-10 h-10 object-contain"
                />
              </div>
              <span className="text-lg font-bold text-white uppercase tracking-wide">{t('navigation.name')}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Spacer quando logo não está visível */}
            {!isAtTop && <div></div>}

            {/* Opções à direita - visível apenas no topo */}
            <AnimatePresence>
              {isAtTop && (
                <motion.div 
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
              <LanguageToggle />
              
              {/* Menu mobile */}
              <div className="md:hidden">
                <motion.button
                  className="p-2 rounded-full hover:bg-white/10 transition-all duration-300 mobile-menu"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </motion.button>
              </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.nav>

      {/* Navegação central com glassmorfismo - posicionada absolutamente no centro */}
      <motion.div 
        className="fixed top-12 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 hidden md:block"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center bg-white/15 backdrop-blur-sm border border-white/25 rounded-2xl p-2 shadow-2xl gap-1">
          {[
            { key: 'about', section: 'about', icon: HomeIcon },
            { key: 'career', section: 'career', icon: Briefcase },
            { key: 'skills', section: 'skills', icon: Wrench },
            { key: 'projects', section: 'projects', icon: Rocket },
            { key: 'podcasts', section: 'podcasts', icon: Mic },
            { key: 'blog', section: 'blog', icon: Sparkles },
            { key: 'contact', section: 'contact', icon: Mail }
          ].map((item) => {
            const isActive = activeSection === item.section;
            return (
              <motion.a
                key={item.key}
                href={`#${item.section}`}
                className={`relative p-3 rounded-xl transition-all duration-300 group ${
                  isActive ? 'bg-white shadow-lg shadow-white/30' : 'hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title={t(`navigation.${item.key}`)}
              >
                <item.icon 
                  size={18} 
                  className={`transition-colors duration-300 ${
                    isActive ? 'text-black' : 'text-gray-300 group-hover:text-white'
                  }`} 
                />
              </motion.a>
            );
          })}
        </div>
      </motion.div>

      {/* Menu Mobile */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-30 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            
                      {/* Menu Content */}
          <motion.div
            className="fixed top-20 left-0 right-0 z-40 md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
              <div className="glass m-4 rounded-2xl p-4 border border-white/10 mobile-menu">
                              <div className="grid grid-cols-4 gap-4">
                {[
                  { key: 'about', section: 'about', icon: HomeIcon },
                  { key: 'career', section: 'career', icon: Briefcase },
                  { key: 'skills', section: 'skills', icon: Wrench },
                  { key: 'projects', section: 'projects', icon: Rocket },
                  { key: 'podcasts', section: 'podcasts', icon: Mic },
                  { key: 'blog', section: 'blog', icon: Sparkles },
                  { key: 'contact', section: 'contact', icon: Mail }
                ].map((item) => {
                    const isActive = activeSection === item.section;
                    return (
                      <motion.a
                        key={item.key}
                        href={`#${item.section}`}
                        className={`flex flex-col items-center p-3 rounded-xl transition-all duration-300 ${
                          isActive ? 'bg-white/90' : 'hover:bg-white/10'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <item.icon 
                          size={20} 
                          className={`transition-colors duration-300 mb-1 ${
                            isActive ? 'text-black' : 'text-gray-400'
                          }`} 
                        />
                        <span className={`text-xs ${
                          isActive ? 'text-black' : 'text-gray-400'
                        }`}>
                          {t(`navigation.${item.key}`)}
                        </span>
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden enhanced-animated-bg">
        {/* Enhanced Floating Elements with Multiple Colors */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Purple Light - Top Left */}
          <motion.div
            className="absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(84, 13, 110, 0.4) 0%, rgba(84, 13, 110, 0.1) 50%, transparent 100%)' }}
            animate={{
              y: [-15, 15, -15],
              x: [-8, 8, -8],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Pink/Red Light - Top Right */}
          <motion.div
            className="absolute top-32 right-24 w-80 h-80 rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(238, 66, 102, 0.3) 0%, rgba(238, 66, 102, 0.1) 50%, transparent 100%)' }}
            animate={{
              y: [12, -12, 12],
              x: [6, -6, 6],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Yellow Light - Center */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-60 h-60 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"
            style={{ background: 'radial-gradient(circle, rgba(255, 210, 63, 0.2) 0%, rgba(255, 210, 63, 0.05) 50%, transparent 100%)' }}
            animate={{
              y: [-18, 18, -18],
              x: [-10, 10, -10],
              scale: [1, 0.95, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Teal Light - Bottom Left */}
          <motion.div
            className="absolute bottom-24 left-32 w-96 h-96 rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(59, 206, 172, 0.25) 0%, rgba(59, 206, 172, 0.08) 50%, transparent 100%)' }}
            animate={{
              y: [16, -16, 16],
              x: [8, -8, 8],
              scale: [1, 1.06, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Green Light - Bottom Right */}
          <motion.div
            className="absolute bottom-16 right-16 w-64 h-64 rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(14, 173, 105, 0.3) 0%, rgba(14, 173, 105, 0.1) 50%, transparent 100%)' }}
            animate={{
              y: [-14, 14, -14],
              x: [-12, 12, -12],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Additional Subtle Lights */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full blur-2xl"
            style={{ background: 'radial-gradient(circle, rgba(84, 13, 110, 0.15) 0%, transparent 70%)' }}
            animate={{
              y: [8, -8, 8],
              x: [4, -4, 4],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            className="absolute bottom-1/3 right-1/3 w-48 h-48 rounded-full blur-2xl"
            style={{ background: 'radial-gradient(circle, rgba(238, 66, 102, 0.12) 0%, transparent 70%)' }}
            animate={{
              y: [-10, 10, -10],
              x: [5, -5, 5],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {/* Profile Photo */}
            <motion.div 
              className="mb-8"
              variants={fadeInUp}
            >
              <div className="relative inline-block">
                <motion.div
                  className="w-40 h-40 md:w-48 md:h-48 rounded-full mx-auto overflow-hidden border-4 border-white shadow-2xl"
                  style={{
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -5,
                    boxShadow: '0 35px 60px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src="/lucas-avatar.jpg"
                    alt="Lucas Campregher"
                    width={192}
                    height={192}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6"
              variants={fadeInUp}
            >
              <span className="text-white">{t('hero.greeting')}</span>
              <span className="text-white">{t('hero.name')}</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto"
              variants={fadeInUp}
            >
              {t('hero.description')}
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              variants={fadeInUp}
            >
              <motion.a
                href="#projects"
                className="px-8 py-4 bg-white text-black rounded-full font-semibold shadow-lg shadow-white/30 border border-white/20"
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                {t('hero.viewWork')}
              </motion.a>
              <motion.a
                href="#contact"
                className="px-8 py-4 glass text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-150"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('hero.getInTouch')}
              </motion.a>
            </motion.div>

            <motion.div 
              className="flex justify-center space-x-6"
              variants={fadeInUp}
            >
              {[
                { Icon: Github, href: "https://github.com/Guimma", label: "GitHub" },
                { Icon: Linkedin, href: "https://www.linkedin.com/in/lucas-campregher/", label: "LinkedIn" },
                { Icon: Mail, href: "mailto:lucas@campregher.com", label: "Email" }
              ].map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 glass rounded-full hover:bg-white/20 transition-all duration-150"
                  whileHover={{ scale: 1.1, rotate: 5, transition: { duration: 0.15 } }}
                  whileTap={{ scale: 0.9 }}
                  title={item.label}
                >
                  <item.Icon size={24} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={32} className="text-gray-300/70" />
        </motion.div>
        
        {/* Smooth transition gradient to About section */}
        <div className="absolute bottom-0 left-0 right-0 h-80 pointer-events-none" style={{
          background: 'linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8), #000000)'
        }} />
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative" style={{ backgroundColor: '#000000' }}>
        
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-white">{t('about.title')}</span>
            </motion.h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-lg text-gray-200 mb-6 leading-relaxed">
                  {t('about.paragraph1')}
                </p>
                <p className="text-lg text-gray-200 mb-6 leading-relaxed">
                  {t('about.paragraph2')}
                </p>
                <p className="text-lg text-gray-200 mb-8 leading-relaxed">
                  {t('about.paragraph3')}
                </p>
                <div className="flex flex-wrap gap-3">
                  {['Java', '.Net', 'C#', 'Azure', 'TypeScript', 'Python', 'Flutter', 'SQL', 'Spring Boot', 'AI'].map((tech, index) => (
                    <motion.span
                      key={tech}
                      className="about-tech-tag"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="grid grid-cols-2 gap-6"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {[
                  { icon: Code2, key: 'backend' },
                  { icon: Palette, key: 'frontend' },
                  { icon: Users, key: 'leadership' },
                  { icon: Rocket, key: 'cloud' },
                  { icon: Shield, key: 'privacy' },
                  { icon: Mic, key: 'communication' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="about-card-gradient"
                    whileHover={{ 
                      transition: { duration: 0.3 } 
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <item.icon className="w-8 h-8 text-white mb-4" />
                    <h3 className="font-semibold mb-2 text-white">{t(`about.cards.${item.key}.title`)}</h3>
                    <p className="text-sm text-gray-300">{t(`about.cards.${item.key}.description`)}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Career Section */}
      <section id="career" className="py-20 relative" style={{ backgroundColor: '#000000' }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-6">
              <div className="section-icon-container">
                <div className="section-icon-glow"></div>
                <motion.div
                  className="flex items-center justify-center w-16 h-16 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full shadow-2xl relative z-10"
                >
                  <Briefcase className="w-8 h-8 text-white" />
                </motion.div>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
              <span className="text-white">{t('career.title')}</span>
            </h2>
            <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
              {t('career.description')}
            </p>
            
            <div className="relative max-w-4xl mx-auto pr-[104px] md:pr-[112px]">
              {/* Enhanced Timeline Line */}
              <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
              
              {/* Progressive Timeline Fill with rainbow gradient */}
              <motion.div
                className="absolute left-6 md:left-8 top-0 w-px career-timeline-line"
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
              
              {/* Timeline Items */}
              <div className="space-y-20">
                {[
                  { 
                    key: 'devpro', 
                    techs: ['Microservices', 'Global Scale', 'C#', '.NET', 'Azure', 'Kubernetes'],
                    clients: [
                      { 
                        key: 'starbucks',
                        name: t('career.experiences.devpro.clients.starbucks.name'), 
                        logo: '/sbux.png',
                        description: t('career.experiences.devpro.clients.starbucks.description')
                      }
                    ]
                  },
                  { 
                    key: 'dti', 
                    techs: ['Java', 'C#', '.NET', 'Angular', 'Flutter', 'AWS', 'Azure'],
                    clients: [
                      { 
                        key: 'bancoInter',
                        name: t('career.experiences.dti.clients.bancoInter.name'), 
                        logo: '/inter.png',
                        description: t('career.experiences.dti.clients.bancoInter.description')
                      },
                      { 
                        key: 'landor',
                        name: 'Landor & Fitch',
                        logo: '/landor.png',
                        description: t('career.experiences.dti.clients.landor.description')
                      },
                      { 
                        key: 'valeGeotec',
                        name: t('career.experiences.dti.clients.valeGeotec.name'), 
                        logo: '/vale.png',
                        description: t('career.experiences.dti.clients.valeGeotec.description')
                      },
                      { 
                        key: 'valeGcm',
                        name: t('career.experiences.dti.clients.valeGcm.name'), 
                        logo: '/vale.png',
                        description: t('career.experiences.dti.clients.valeGcm.description')
                      },
                      { 
                        key: 'bancoBS2',
                        name: t('career.experiences.dti.clients.bancoBS2.name'), 
                        logo: '/bs2.png',
                        description: t('career.experiences.dti.clients.bancoBS2.description')
                      },
                      { 
                        key: 'entreChaves',
                        name: t('career.experiences.dti.clients.entreChaves.name'), 
                        logo: '/ec.jpg',
                        description: t('career.experiences.dti.clients.entreChaves.description')
                      }
                    ]
                  },
                  { 
                    key: 'anp', 
                    techs: ['Visual Basic', 'Excel', 'Data Processing'],
                    clients: [
                      { 
                        key: 'anp',
                        name: t('career.experiences.anp.clients.anp.name'), 
                        logo: '/anp.png',
                        description: t('career.experiences.anp.clients.anp.description')
                      }
                    ]
                  }
                ].map((item, index) => (
                  <motion.div
                    key={item.key}
                    className="relative flex items-start"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ 
                      duration: 0.3,
                      delay: index * 0.05,
                      ease: "easeOut"
                    }}
                  >
                    {/* Enhanced Timeline Node */}
                    <motion.div
                      className="absolute left-6 md:left-8 career-timeline-node transform -translate-x-1/2 z-10"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.4, 
                        delay: index * 0.05 + 0.3,
                        type: "spring",
                        stiffness: 300
                      }}
                      whileHover={{ 
                        scale: 1.2,
                        transition: { duration: 0.2 }
                      }}
                    />



                    {/* Redesigned Content Card */}
                    <motion.div
                      className={`ml-20 flex-1 group ${
                        expandedCard && expandedCard !== item.key ? 'opacity-50' : 'opacity-100'
                      }`}
                    >
                      <div className="relative">
                        <motion.div 
                          className={`career-card ${item.clients ? 'cursor-pointer' : ''}`}
                          onClick={() => item.clients && toggleCard(item.key)}
                        >
                          
                          {/* Topbar com badge de data no topo esquerdo */}
                          <div className="flex items-start w-full mb-2">
                            <motion.div 
                              className="career-period-badge"
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.4, delay: index * 0.05 + 0.8 }}
                            >
                              <Calendar size={16} className="inline mr-1" />
                              {t(`career.experiences.${item.key}.period`)}
                            </motion.div>
                          </div>
                          {/* Logo, nome, cargo, etc. */}
                          <div className="career-header w-full">
                            <motion.div 
                              className="career-logo-container"
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.2, delay: index * 0.05 + 0.9 }}
                            >
                              <a 
                                href={
                                  item.key === 'devpro' ? 'https://dev.pro/' :
                                  item.key === 'dti' ? 'https://www.dtidigital.com.br/' :
                                  item.key === 'anp' ? 'https://www.gov.br/anp/pt-br' : 
                                  'https://www.dtidigital.com.br/'
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="career-logo"
                              >
                                <Image 
                                  src={
                                    item.key === 'devpro' ? '/devpro.png' :
                                    item.key === 'dti' ? '/dti.png' :
                                    item.key === 'anp' ? '/anp.png' : 
                                    '/dti.png'
                                  }
                                  alt={t(`career.experiences.${item.key}.company`)}
                                  width={120}
                                  height={120}
                                  className={
                                    (item.key === 'devpro' || item.key === 'anp' || item.key === 'dti') 
                                      ? 'w-46 h-24 object-contain company-logo-white' 
                                      : 'w-24 h-24 object-contain'
                                  }
                                />
                              </a>
                            </motion.div>
                            <motion.h3 
                              className="text-3xl font-bold text-white mb-2 text-center"
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.2, delay: index * 0.05 + 1.0 }}
                            >
                              {t(`career.experiences.${item.key}.company`)}
                            </motion.h3>
                            <motion.div 
                              className="flex items-center justify-center gap-2 text-xl text-gray-300 mb-1"
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.2, delay: index * 0.05 + 1.1 }}
                            >
                              <Briefcase size={18} />
                              <span>{t(`career.experiences.${item.key}.title`)}</span>
                            </motion.div>
                          </div>

                          {/* Description */}
                          <motion.p 
                            className="text-gray-300 leading-relaxed mb-4 text-base flex-shrink-0 text-center"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.2, delay: index * 0.05 + 1.1 }}
                          >
                            {t(`career.experiences.${item.key}.description`)}
                          </motion.p>

                          {/* Technologies Section */}
                          <motion.div 
                            className="flex flex-wrap gap-3 justify-center mb-4 flex-shrink-0"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.2, delay: index * 0.05 + 1.3 }}
                          >
                            {item.techs.map((tech: string, techIndex: number) => (
                              <motion.span
                                key={tech}
                                className="tech-tag-glow"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ 
                                  duration: 0.2, 
                                  delay: index * 0.05 + 1.3 + techIndex * 0.05
                                }}
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </motion.div>

                          {/* Client Logos Section */}
                          {item.clients && (
                            <motion.div 
                              className="flex flex-wrap gap-3 justify-center mb-6 flex-shrink-0"
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.2, delay: index * 0.05 + 1.4 }}
                            >
                              {item.clients.slice(0, 4).map((client, clientIndex) => (
                                <motion.div
                                  key={client.name}
                                  className="client-preview-item client-logo-bg-glass"
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  whileInView={{ opacity: 1, scale: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ 
                                    duration: 0.2, 
                                    delay: index * 0.05 + 1.4 + clientIndex * 0.05
                                  }}
                                  title={client.name}
                                >
                                  <Image 
                                    src={client.logo}
                                    alt={client.name}
                                    width={36}
                                    height={36}
                                    className={`w-9 h-9 object-contain ${(client.logo === '/landor.png' ) ? 'company-logo-white' : ''}`}
                                  />
                                </motion.div>
                              ))}
                              {item.clients.length > 4 && (
                                <motion.div
                                  className="client-preview-item bg-white/5"
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  whileInView={{ opacity: 1, scale: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ 
                                    duration: 0.2, 
                                    delay: index * 0.05 + 1.4 + 4 * 0.05
                                  }}
                                >
                                  <span className="text-xs font-medium text-white">
                                    +{item.clients.length - 4}
                                  </span>
                                </motion.div>
                              )}
                            </motion.div>
                          )}

                          {/* Expand Arrow */}
                          <motion.div
                            className="flex justify-center"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.2, delay: index * 0.05 + 1.5 }}
                          >
                            <motion.button
                              className="p-4 rounded-xl hover:bg-white/15 transition-all duration-300 flex items-center justify-center"
                              onClick={() => item.clients && toggleCard(item.key)}
                              whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                              whileTap={{ scale: 0.95 }}
                              disabled={!item.clients}
                            >
                              <motion.div
                                animate={{ rotate: expandedCard === item.key ? 180 : 0 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                              >
                                <ChevronDown size={20} className="text-gray-400 hover:text-white transition-colors duration-300" />
                              </motion.div>
                            </motion.button>
                          </motion.div>

                          {/* Expanded Clients Section */}
                          <AnimatePresence initial={false}>
                            {item.clients && expandedCard === item.key && (
                              <motion.div
                                key="expanded-clients"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2, ease: 'easeInOut' }}
                                style={{ overflow: 'hidden' }}
                              >
                                <div className="space-y-5 mt-2">
                                  {item.clients.map((client, clientIndex) => (
                                    <motion.div
                                      key={client.name}
                                      initial={{ opacity: 0, y: 20 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ duration: 0.2, delay: clientIndex * 0.1 }}
                                      className="flex flex-row items-center gap-6 w-full bg-transparent border-none shadow-none min-h-0"
                                      style={{ minHeight: 'unset', boxShadow: 'none', background: 'none' }}
                                    >
                                      {/* Client Logo */}
                                      <div className="flex items-center justify-center w-16 h-16 flex-shrink-0">
                                        <a 
                                          href={
                                            client.logo === '/sbux.png' ? 'https://www.starbucks.com.br/' :
                                            client.logo === '/inter.png' ? 'https://www.bancointer.com.br/' :
                                            client.logo === '/vale.png' ? 'https://vale.com/' :
                                            client.logo === '/bs2.png' ? 'https://www.bancobs2.com.br/' :
                                            client.logo === '/landor.png' ? 'https://landor.com/' :
                                            client.logo === '/ec.jpg' ? 'https://open.spotify.com/show/1ub9YZKamdMKdKbLia4YrX?si=fc775f395d994ae8' :
                                            '#'
                                          }
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="block hover:scale-105 transition-transform duration-300"
                                        >
                                          <Image 
                                            src={client.logo}
                                            alt={client.name}
                                            width={56}
                                            height={56}
                                            className={`w-14 h-14 object-contain ${(client.logo === '/landor.png' || client.logo === '/anp.png') ? 'company-logo-white' : ''}`}
                                          />
                                        </a>
                                      </div>
                                      
                                      {/* Client Info */}
                                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                                        <h5 className="font-semibold text-white mb-1 text-base text-left">{client.name}</h5>
                                        <p className="text-sm text-gray-300 leading-relaxed text-left m-0">{client.description}</p>
                                      </div>
                                    </motion.div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Education Section (Timeline) */}
      <section id="education" className="py-20 relative" style={{ backgroundColor: '#000000' }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-6">
              <div className="section-icon-container">
                <div className="section-icon-glow"></div>
                <motion.div
                  className="flex items-center justify-center w-16 h-16 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full shadow-2xl relative z-10"
                >
                  <GraduationCap className="w-8 h-8 text-white" />
                </motion.div>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
              <span className="text-white">{t('education.title')}</span>
            </h2>
            <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
              {t('education.description')}
            </p>
            
            <div className="relative max-w-4xl mx-auto pr-[104px] md:pr-[112px]">
              {/* Enhanced Timeline Line - same as career */}
              <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
              
              {/* Progressive Timeline Fill with rainbow gradient - same as career */}
              <motion.div
                className="absolute left-6 md:left-8 top-0 w-px career-timeline-line"
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
              
              {/* Timeline Items */}
              <div className="space-y-20">
                {[
                  {
                    key: 'puc',
                    icon: GraduationCap,
                    degree: t('education.items.puc.degree'),
                    institution: t('education.items.puc.name'),
                    period: t('education.items.puc.period'),
                  },
                  {
                    key: 'magnum',
                    icon: School,
                    degree: t('education.items.magnum.degree'),
                    institution: t('education.items.magnum.name'),
                    period: t('education.items.magnum.period'),
                  }
                ].map((edu, index) => (
                  <motion.div
                    key={edu.key}
                    className="relative flex items-start"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ 
                      duration: 0.3,
                      delay: index * 0.05,
                      ease: "easeOut"
                    }}
                  >
                    {/* Enhanced Timeline Node - same as career */}
                    <motion.div
                      className="absolute left-6 md:left-8 career-timeline-node transform -translate-x-1/2 z-10"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.4, 
                        delay: index * 0.05 + 0.3,
                        type: "spring",
                        stiffness: 300
                      }}
                      whileHover={{ 
                        scale: 1.2,
                        transition: { duration: 0.2 }
                      }}
                    />

                    {/* Education Card - simplified version of career card */}
                    <motion.div
                      className="ml-20 flex-1 group"
                    >
                      <div className="relative">
                        <motion.div className="education-card">
                          
                          {/* Topbar com badge de data no topo esquerdo */}
                          <div className="flex items-start w-full mb-2">
                            <motion.div 
                              className="career-period-badge"
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.4, delay: index * 0.05 + 0.8 }}
                            >
                                                             <Calendar size={16} className="inline mr-1" />
                               {edu.period}
                            </motion.div>
                          </div>

                          {/* Education Icon and Institution */}
                          <div className="career-header w-full">
                            <motion.div 
                              className="career-logo-container"
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.2, delay: index * 0.05 + 0.9 }}
                            >
                              <div className="career-logo bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3">
                                <edu.icon className="w-10 h-10 text-white" />
                              </div>
                            </motion.div>
                            <motion.h3 
                              className="text-2xl font-bold text-white mb-1 text-center"
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.2, delay: index * 0.05 + 1.0 }}
                            >
                              {edu.degree}
                            </motion.h3>
                            <motion.div 
                              className="flex items-center justify-center gap-2 text-lg text-gray-300 mb-2"
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.2, delay: index * 0.05 + 1.1 }}
                            >
                              <Building2 size={16} />
                              <span>{edu.institution}</span>
                            </motion.div>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative" style={{ backgroundColor: '#000000' }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-6">
              <div className="section-icon-container">
                <div className="section-icon-glow"></div>
                <motion.div
                  className="flex items-center justify-center w-16 h-16 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full shadow-2xl relative z-10"
                >
                  <Wrench className="w-8 h-8 text-white" />
                </motion.div>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
              <span className="text-white">{t('skills.title')}</span>
            </h2>
            <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
              {t('skills.description')}
            </p>
            <div className="grid md:grid-cols-2 gap-10">
              {/* Programming Languages */}
              <motion.div
                className="glass rounded-2xl p-8 border border-white/10 backdrop-blur-sm group"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <h3 className="text-xl font-semibold mb-6 text-white group-hover:text-blue-300 flex items-center gap-2 transition-colors duration-300">
                  <Code2 className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                  {t('skills.areas.languages')}
                </h3>
                {[
                  { name: 'Java', value: 100 },
                  { name: 'C#', value: 100 },
                  { name: 'Javascript', value: 90 },
                  { name: 'Python', value: 85 },
                  { name: 'Dart', value: 70 },
                  { name: 'SQL', value: 85 },
                ].map(skill => (
                  <SkillBar key={skill.name} name={skill.name} value={skill.value} />
                ))}
              </motion.div>
              {/* Frameworks & Dev Tools */}
              <motion.div
                className="glass rounded-2xl p-8 border border-white/10 backdrop-blur-sm group"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <h3 className="text-xl font-semibold mb-6 text-white group-hover:text-blue-300 flex items-center gap-2 transition-colors duration-300">
                  <Wrench className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                  {t('skills.areas.frameworks')}
                </h3>
                {[
                  { name: 'Spring Boot', value: 100 },
                  { name: 'Micronaut', value: 90 },
                  { name: '.NET', value: 100 },
                  { name: 'Flutter', value: 70 },
                  { name: 'Angular', value: 80 },
                  { name: 'Vue', value: 70 },
                  { name: 'Next.js', value: 60 },
                  { name: 'NoSQL', value: 80 },
                  { name: 'Event Streaming', value: 80 },
                  { name: 'Logs & Monitoring', value: 90 },
                  { name: 'AI', value: 90 },
                ].map(skill => (
                  <SkillBar key={skill.name} name={skill.name} value={skill.value} />
                ))}
              </motion.div>
              {/* Cloud & DevOps */}
              <motion.div
                className="glass rounded-2xl p-8 border border-white/10 backdrop-blur-sm group"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <h3 className="text-xl font-semibold mb-6 text-white group-hover:text-blue-300 flex items-center gap-2 transition-colors duration-300">
                  <CloudIcon className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                  {t('skills.areas.cloud')}
                </h3>
                {[
                  { name: 'Azure Cloud', value: 80 },
                  { name: 'AWS Cloud', value: 70 },
                  { name: 'Cloud', value: 80 },
                  { name: 'Devops', value: 75 },
                  { name: 'Agile', value: 95 },
                  { name: 'Cost-Effective Thinking', value: 85 },
                ].map(skill => (
                  <SkillBar key={skill.name} name={skill.name} value={skill.value} />
                ))}
              </motion.div>
              {/* Software & Solution Skills */}
              <motion.div
                className="glass rounded-2xl p-8 border border-white/10 backdrop-blur-sm group"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <h3 className="text-xl font-semibold mb-6 text-white group-hover:text-blue-300 flex items-center gap-2 transition-colors duration-300">
                  <Brain className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                  {t('skills.areas.software')}
                </h3>
                {[
                  { name: 'Software Architecture', value: 80 },
                  { name: 'Clean Code & Design Patterns', value: 90 },
                  { name: 'Creativity & Innovation', value: 100 },
                  { name: 'Communication', value: 100 },
                ].map(skill => (
                  <SkillBar key={skill.name} name={skill.name} value={skill.value} />
                ))}
              </motion.div>
              {/* AI & Productivity */}
              <motion.div
                className="glass rounded-2xl p-8 border border-white/10 backdrop-blur-sm md:col-span-1 group"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <h3 className="text-xl font-semibold mb-6 text-white group-hover:text-blue-300 flex items-center gap-2 transition-colors duration-300">
                  <Sparkles className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                  {t('skills.areas.ai')}
                </h3>
                {[
                  { name: 'Cursor', value: 90 },
                  { name: 'Copilot', value: 80 },
                  { name: 'Data Privacy', value: 90 },
                ].map(skill => (
                  <SkillBar key={skill.name} name={skill.name} value={skill.value} />
                ))}
              </motion.div>
              {/* Spoken Languages */}
              <motion.div
                className="glass rounded-2xl p-8 border border-white/10 backdrop-blur-sm md:col-span-1 group"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <h3 className="text-xl font-semibold mb-6 text-white group-hover:text-blue-300 flex items-center gap-2 transition-colors duration-300">
                  <Globe className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                  {t('skills.areas.spokenTitle')}
                </h3>
                {[
                  { name: t('spoken.portuguese'), value: 100 },
                  { name: t('spoken.english'), value: 100 },
                ].map(skill => (
                  <SkillBar key={skill.name} name={skill.name} value={skill.value} />
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative" style={{ backgroundColor: '#000000' }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-6">
              <div className="section-icon-container">
                <div className="section-icon-glow"></div>
                <motion.div
                  className="flex items-center justify-center w-16 h-16 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full shadow-2xl relative z-10"
                >
                  <Rocket className="w-8 h-8 text-white" />
                </motion.div>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
              <span className="text-white">{t('projects.title')}</span>
            </h2>
            <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
              {t('projects.description')}
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* BetterBet */}
              <motion.div
                className="group glass rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-150 flex flex-col"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0 }}
                whileHover={{ scale: 1.02, y: -5, transition: { duration: 0.15 } }}
              >
                <div className="flex items-center justify-center h-48 bg-white dark:bg-gray-900">
                  <Image src="/betterbet.svg" alt="BetterBet Logo" width={180} height={60} className="object-contain h-20" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold mb-3">{t('projects.items.betterbet.title')}</h3>
                  <p className="text-gray-300 mb-4">{t('projects.items.betterbet.description')}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {Array.isArray(t.raw && t.raw('projects.items.betterbet.tags')) ? t.raw('projects.items.betterbet.tags').map((tech: string) => (
                      <span key={tech} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">{tech}</span>
                    )) : null}
                  </div>
                  <div className="flex justify-center gap-3 mt-auto">
                    <motion.a 
                      href="https://github.com/Guimma/betterbet" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-4 py-2 glass rounded-lg border border-white/20 hover:border-white/40 text-white text-sm font-medium flex items-center gap-2 transition-all duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={16}/>View Code
                    </motion.a>
                  </div>
                </div>
              </motion.div>
              {/* Glenio Campregher - Fotografia */}
              <motion.div
                className="group glass rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-150 flex flex-col"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.02, y: -5, transition: { duration: 0.15 } }}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image src="/glenio.png" alt="Glenio Campregher" fill className="object-cover" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold mb-3">{t('projects.items.glenio.title')}</h3>
                  <p className="text-gray-300 mb-4">{t('projects.items.glenio.description')}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {Array.isArray(t.raw && t.raw('projects.items.glenio.tags')) ? t.raw('projects.items.glenio.tags').map((tech: string) => (
                      <span key={tech} className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">{tech}</span>
                    )) : null}
                  </div>
                  <div className="flex justify-center gap-3 mt-auto">
                    <motion.a 
                      href="https://guimma.github.io/vue-photosite/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:shadow-lg transition-all duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink size={16}/>Visit Site
                    </motion.a>
                    <motion.a 
                      href="https://github.com/Guimma/vue-photosite" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-4 py-2 glass rounded-lg border border-white/20 hover:border-white/40 text-white text-sm font-medium flex items-center gap-2 transition-all duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={16}/>View Code
                    </motion.a>
                  </div>
                </div>
              </motion.div>
              {/* 433 Fantasy */}
              <motion.div
                className="group glass rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-150 flex flex-col"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ scale: 1.02, y: -5, transition: { duration: 0.15 } }}
              >
                <div className="relative h-48 bg-black">
                  <Image src="/433.jpg" alt="433 Fantasy" fill className="object-cover" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold mb-3">{t('projects.items.433.title')}</h3>
                  <p className="text-gray-300 mb-4">{t('projects.items.433.description')}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {Array.isArray(t.raw && t.raw('projects.items.433.tags')) ? t.raw('projects.items.433.tags').map((tech: string) => (
                      <span key={tech} className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm">{tech}</span>
                    )) : null}
                  </div>
                  <div className="flex justify-center gap-3 mt-auto">
                    <motion.a 
                      href="https://guimma.github.io/fantasy-web/#/home" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:shadow-lg transition-all duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink size={16}/>Visit Site
                    </motion.a>
                    <motion.a 
                      href="https://github.com/Guimma/fantasy-web" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-4 py-2 glass rounded-lg border border-white/20 hover:border-white/40 text-white text-sm font-medium flex items-center gap-2 transition-all duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={16}/>View Code
                    </motion.a>
                  </div>
                </div>
              </motion.div>
              {/* Christmas Cats */}
              <motion.div
                className="group glass rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-150 flex flex-col"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ scale: 1.02, y: -5, transition: { duration: 0.15 } }}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image src="/cats.png" alt="Christmas Cats" fill className="object-cover" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold mb-3">{t('projects.items.cats.title')}</h3>
                  <p className="text-gray-300 mb-4">{t('projects.items.cats.description')}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {Array.isArray(t.raw && t.raw('projects.items.cats.tags')) ? t.raw('projects.items.cats.tags').map((tech: string) => (
                      <span key={tech} className="px-3 py-1 bg-pink-500/20 text-pink-400 rounded-full text-sm">{tech}</span>
                    )) : null}
                  </div>
                  <div className="flex justify-center gap-3 mt-auto">
                    <motion.a 
                      href="https://guimma.github.io/Christmas-Cats/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:shadow-lg transition-all duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink size={16}/>Visit Site
                    </motion.a>
                    <motion.a 
                      href="https://github.com/Guimma/Christmas-Cats" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-4 py-2 glass rounded-lg border border-white/20 hover:border-white/40 text-white text-sm font-medium flex items-center gap-2 transition-all duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={16}/>View Code
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Podcasts Section */}
      <PodcastSection episodes={podcastEpisodes} />

      {/* Blog Section */}
      <section id="blog" className="py-20 relative" style={{ backgroundColor: '#000000' }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-6">
              <div className="section-icon-container">
                <div className="section-icon-glow"></div>
                <motion.div
                  className="flex items-center justify-center w-16 h-16 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full shadow-2xl relative z-10"
                >
                  <Sparkles className="w-8 h-8 text-white" />
                </motion.div>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
              <span className="text-white">{t('blog.title')}</span>
            </h2>
            <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
              {t('blog.subtitle')}
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(t.raw('blog.posts')).map(([key, post], index) => {
                // Map blog post keys to their respective images
                const blogImages: { [key: string]: string } = {
                  aiAbstraction: '/ai.jpeg',
                  enzimasPrivacy: '/enzimas.jpg',
                  techshotPrivacy: '/privacidade.png',
                  techshotWallE: '/caseWalle.png',
                  socialDilemma: '/dilema.jpg',
                  privacyByDesign: '/insta_privacy.png'
                };
                
                const postData = post as BlogPost;
                const isPrivacyByDesign = key === 'privacyByDesign';
                
                return (
                  <motion.a
                    key={key}
                    href={postData.url}
                    target={isPrivacyByDesign ? undefined : "_blank"}
                    rel={isPrivacyByDesign ? undefined : "noopener noreferrer"}
                    download={isPrivacyByDesign ? true : undefined}
                    className="group glass rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 cursor-pointer block flex flex-col h-full"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5, transition: { duration: 0.2 } }}
                  >
                    {/* Blog post image/header */}
                    <div className="h-48 relative overflow-hidden flex-shrink-0">
                      <Image
                        src={blogImages[key] || '/ai.jpeg'}
                        alt={postData.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4 z-10">
                        <div className="flex items-center justify-between text-sm text-white mb-2">
                          <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium backdrop-blur-sm">
                            {postData.category}
                          </span>
                          {postData.category !== 'Podcast' && (
                            <span className="px-2 py-1 bg-black/30 rounded text-xs backdrop-blur-sm">
                              {postData.readTime} {t('blog.readTime')}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Blog post content */}
                    <div className="p-6 flex flex-col flex-1 min-h-0">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-blue-300 transition-colors duration-300">
                          {postData.title}
                        </h3>
                        <p className="text-gray-300 mb-4 leading-relaxed line-clamp-3 overflow-hidden">
                          {postData.excerpt}
                        </p>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {postData.tags.map((tag: string) => (
                            <span key={tag} className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Bottom section with date and read more button */}
                      <div className="mt-auto pt-4 border-t border-white/10">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">
                            {new Date(postData.date).toLocaleDateString(
                              t('navigation.name').includes('Lucas') ? 'en-US' : 'pt-BR',
                              { year: 'numeric', month: 'short', day: 'numeric' }
                            )}
                          </span>
                          <motion.button
                            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-sm font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
                            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {t('blog.readMore')}
                            <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative" style={{ backgroundColor: '#000000' }}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Section Header */}
            <div className="text-center mb-16">
                              <div className="flex items-center justify-center mb-6">
                  <div className="section-icon-container">
                    <div className="section-icon-glow"></div>
                    <motion.div
                      className="flex items-center justify-center w-16 h-16 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full shadow-2xl relative z-10"
                    >
                      <Mail className="w-8 h-8 text-white" />
                    </motion.div>
                  </div>
                </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-white">{t('contact.title')}</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                {t('contact.description')}
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Contact Information */}
              <motion.div
                className="lg:col-span-1"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="glass p-8 rounded-2xl h-full">
                  <h3 className="text-2xl font-semibold mb-4 text-white">{t('contact.info.title')}</h3>
                  <p className="text-gray-300 mb-8 leading-relaxed">
                    {t('contact.info.description')}
                  </p>
                  
                  {/* Contact Details */}
                  <div className="space-y-6">
                    {/* Email */}
                    <motion.a
                      href="mailto:lucas@campregher.com"
                      className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-150 group"
                      whileHover={{ scale: 1.02, x: 5, transition: { duration: 0.15 } }}
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-blue-600/30 transition-all duration-150">
                        <Mail className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 font-medium">Email</p>
                        <p className="text-white font-medium">{t('contact.info.email')}</p>
                      </div>
                    </motion.a>

                    {/* Phone */}
                    <motion.a
                      href="tel:+5531996964056"
                      className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-150 group"
                      whileHover={{ scale: 1.02, x: 5, transition: { duration: 0.15 } }}
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg flex items-center justify-center group-hover:from-green-500/30 group-hover:to-green-600/30 transition-all duration-150">
                        <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 font-medium">Phone</p>
                        <p className="text-white font-medium">{t('contact.info.phone')}</p>
                      </div>
                    </motion.a>

                    {/* Location */}
                    <motion.div
                      className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 font-medium">Location</p>
                        <p className="text-white font-medium">{t('contact.info.location')}</p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Social Links */}
                  <div className="mt-8 pt-8 border-t border-white/10">
                    <p className="text-sm text-gray-400 font-medium mb-4">Follow me</p>
                    <div className="flex space-x-4">
                      {[
                        { Icon: Linkedin, href: 'https://www.linkedin.com/in/lucas-campregher/', color: 'text-blue-400 hover:text-blue-300' },
                        { Icon: Github, href: 'https://github.com/Guimma', color: 'text-gray-400 hover:text-white' }
                      ].map((social, index) => (
                        <motion.a
                          key={index}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center ${social.color} transition-all duration-150 hover:bg-white/10`}
                          whileHover={{ scale: 1.1, transition: { duration: 0.15 } }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <social.Icon className="w-5 h-5" />
                        </motion.a>
                      ))}
                      <motion.a
                        href="https://api.whatsapp.com/send?phone=5531996964056"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-green-400 hover:text-green-300 transition-all duration-150 hover:bg-white/10"
                        whileHover={{ scale: 1.1, transition: { duration: 0.15 } }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787z"/>
                        </svg>
                      </motion.a>
                    </div>
                  </div>

                  {/* Availability Status */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl border border-green-500/20">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <p className="text-sm text-green-300 font-medium">{t('contact.info.availability')}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                className="lg:col-span-2"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="glass p-8 rounded-2xl h-full">
                  <h3 className="text-2xl font-semibold mb-6 text-white">{t('contact.form.title')}</h3>
                  
                  <form id="contact-form" className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-3 text-gray-300">{t('contact.form.name')}</label>
                        <input
                          type="text"
                          name="fullname"
                          className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-teal-400 focus:bg-white/10 transition-all duration-150 text-white placeholder-gray-400"
                          placeholder={t('contact.form.namePlaceholder')}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-3 text-gray-300">{t('contact.form.email')}</label>
                        <input
                          type="email"
                          name="email"
                          className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-teal-400 focus:bg-white/10 transition-all duration-150 text-white placeholder-gray-400"
                          placeholder={t('contact.form.emailPlaceholder')}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-3 text-gray-300">{t('contact.form.subject')}</label>
                      <input
                        type="text"
                        name="subject"
                        className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-teal-400 focus:bg-white/10 transition-all duration-150 text-white placeholder-gray-400"
                        placeholder={t('contact.form.subjectPlaceholder')}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-3 text-gray-300">{t('contact.form.message')}</label>
                      <textarea
                        rows={6}
                        name="message"
                        className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-teal-400 focus:bg-white/10 transition-all duration-150 resize-none text-white placeholder-gray-400"
                        placeholder={t('contact.form.messagePlaceholder')}
                        required
                      ></textarea>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <motion.button
                        type="button"
                        onClick={sendWhatsApp}
                        className="flex-1 px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:shadow-2xl transition-all duration-150 flex items-center justify-center gap-3 hover:from-green-600 hover:to-green-700"
                        whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -12px rgba(34, 197, 94, 0.5)", transition: { duration: 0.15 } }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787z"/>
                        </svg>
                        {t('contact.form.sendWhatsApp')}
                      </motion.button>
                      
                      <motion.button
                        type="button"
                        onClick={sendEmail}
                        className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-2xl transition-all duration-150 flex items-center justify-center gap-3"
                        whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.5)", transition: { duration: 0.15 } }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                        </svg>
                        {t('contact.form.sendEmail')}
                      </motion.button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 glass mt-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-400">
            {t('footer.copyright')}
          </p>
        </div>
      </footer>
    </div>
  );
}

// SkillBar component
function SkillBar({ name, value }: { name: string; value: number }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-gray-200 font-medium">{name}</span>
        <span className="text-gray-400 font-mono text-sm">{value}%</span>
      </div>
      <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg"
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
} 

