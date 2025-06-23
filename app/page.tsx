'use client';

import { useState, useEffect } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import Navbar from '@/components/Navbar/Navbar';
import Hero from '@/components/Hero/Hero';
import FeaturedSection from '@/components/Featured/FeaturedSection';
import SecuritySection from '@/components/SecuritySection/SecuritySection';
import How from '@/components/How/How';
import Footer from '@/components/Footer/Footer';
import LandingPageSkeleton from '@/components/LandinPageSkeleton/LandingPageSkeleton';
// import { set } from 'mongoose';

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  useEffect(() => {
    // Check authentication status
    const checkAuth = async () => {
      try {
        const user = await fetch('/api/me');
        if (user.ok) {
          const userData = await user.json();
          console.log('User data:', userData);
          setIsAuthenticated(true);
          setIsLoading(false);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error checking authentication status:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    window.scrollTo(0, 0);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    checkAuth();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) {
    return <LandingPageSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 text-neutral-900 overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Navbar isAuthenticated={isAuthenticated} isScrolled={isScrolled} />
        <Hero heroY={heroY} opacity={opacity} />
        <FeaturedSection />
        <How />
        <SecuritySection />
        <Footer />
      </div>
    </div>
  );
}
