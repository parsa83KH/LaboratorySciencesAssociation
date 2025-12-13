import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Translation } from '../types';

// Simple text component without highlighting
const HighlightedText: React.FC<{ text: string }> = ({ text }) => {
    return (
        <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="block"
        >
            {text}
        </motion.span>
    );
};

interface IntroductionSectionProps {
    translations: Translation;
}

// Counter hook for animated numbers
const useCounter = (targetValue: number, duration: number = 2000, delay: number = 0) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            const startTime = Date.now();
            const startValue = 0;
            const endValue = parseInt(targetValue.toString().replace(/\D/g, '')) || 0;
            const suffix = targetValue.toString().replace(/\d/g, '') || '';

            const animate = () => {
                const now = Date.now();
                const progress = Math.min((now - startTime) / duration, 1);
                
                // Easing function for smooth animation
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutQuart);
                
                setCount(currentValue);
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    setCount(endValue);
                }
            };
            
            animate();
        }, delay);

        return () => clearTimeout(timer);
    }, [targetValue, duration, delay]);

    return count;
};

const StatCard: React.FC<{ icon: React.ReactNode; value: string; label: string; delay: number }> = ({ icon, value, label, delay }) => {
    const numericValue = parseInt(value.replace(/\D/g, '')) || 0;
    const suffix = value.replace(/\d/g, '') || '';
    const count = useCounter(numericValue, 2000, delay * 1000);
    
    return (
    <motion.div
        className="text-center p-4 sm:p-6 md:p-8 rounded-xl md:rounded-2xl shadow-lg relative overflow-hidden backdrop-blur-md bg-white/5 dark:bg-black/5 border border-white/20 dark:border-white/10"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ 
            duration: 0.6, 
            delay,
            type: "spring",
            stiffness: 100
        }}
    >
        
        <div className="relative z-10">
            <motion.div 
                className="text-primary mx-auto mb-3 md:mb-4 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ 
                    duration: 0.6, 
                    delay: delay + 0.2,
                    type: "spring",
                    stiffness: 150
                }}
            >
                {icon}
            </motion.div>
            <motion.p 
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground mb-1 md:mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ 
                    duration: 0.3, 
                    delay: delay + 0.3
                }}
            >
                {count}{suffix}
            </motion.p>
            <motion.p 
                className="text-muted-foreground text-sm sm:text-base md:text-lg font-medium"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: delay + 0.4 }}
            >
                {label}
            </motion.p>
        </div>
        
        {/* Decorative border */}
        <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: delay + 0.5 }}
        />
    </motion.div>
    );
};

const IntroductionSection: React.FC<IntroductionSectionProps> = ({ translations: t }) => {
    return (
        <section className="py-12 sm:py-16 md:py-20 lg:py-28 introduction-parallax-section relative overflow-hidden" style={{ isolation: 'isolate' }}>
            {/* Solid background to completely hide particles */}
            <div className="absolute inset-0 bg-background" style={{ zIndex: 0 }} />
            {/* Overlay to hide particle animation behind this section - matches parallax background */}
            <div className="absolute inset-0 pointer-events-none introduction-parallax-overlay" style={{ zIndex: 1 }} />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative" style={{ zIndex: 10 }}>
                <motion.div
                    className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <motion.h2 
                        className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 md:mb-4 px-2" 
                        style={{ color: '#F37021' }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    >
                        {t.introductionTitle as string}
                    </motion.h2>
                    <motion.p 
                        className="text-sm sm:text-base md:text-lg text-white font-medium leading-relaxed px-2"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    >
                        <HighlightedText text={t.introductionDescription as string} />
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
                    <StatCard
                        delay={0.2}
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        }
                        value="10"
                        label={t.statMembers as string}
                    />
                    <StatCard
                        delay={0.4}
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        }
                        value="20+"
                        label={t.statEvents as string}
                    />
                    <StatCard
                        delay={0.6}
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                               <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        }
                        value="15+"
                        label={t.statPublications as string}
                    />
                </div>
            </div>
        </section>
    );
};

export default IntroductionSection;

