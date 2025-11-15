import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Translation } from '../types';

// Component to highlight keywords with animated red underline
const HighlightedText: React.FC<{ text: string }> = ({ text }) => {
    const keywords = [
        'کارگاه',
        'سمینار',
        'تحقیقاتی',
        'توانمندسازی',
        'توانمند سازی',
        'آکادمیک',
        'صنعت'
    ];

    // Sort keywords by length (longest first) to match longer phrases first
    const sortedKeywords = [...keywords].sort((a, b) => b.length - a.length);
    
    const parts: Array<{ text: string; isKeyword: boolean }> = [];
    let remainingText = text;

    // Find all keyword matches with their positions
    const matches: Array<{ keyword: string; index: number; length: number }> = [];
    sortedKeywords.forEach(keyword => {
        let searchIndex = 0;
        while (true) {
            const index = remainingText.indexOf(keyword, searchIndex);
            if (index === -1) break;
            matches.push({ keyword, index, length: keyword.length });
            searchIndex = index + 1;
        }
    });

    // Sort matches by position
    matches.sort((a, b) => a.index - b.index);

    // Remove overlapping matches (keep first match if overlap)
    const nonOverlappingMatches: Array<{ keyword: string; index: number; length: number }> = [];
    matches.forEach(match => {
        const overlaps = nonOverlappingMatches.some(existing => 
            (match.index >= existing.index && match.index < existing.index + existing.length) ||
            (match.index + match.length > existing.index && match.index + match.length <= existing.index + existing.length) ||
            (match.index <= existing.index && match.index + match.length >= existing.index + existing.length)
        );
        if (!overlaps) {
            nonOverlappingMatches.push(match);
        }
    });

    // Build parts array
    let currentIndex = 0;
    nonOverlappingMatches.forEach(match => {
        // Add text before keyword
        if (match.index > currentIndex) {
            parts.push({ text: remainingText.substring(currentIndex, match.index), isKeyword: false });
        }
        // Add keyword
        parts.push({ text: remainingText.substring(match.index, match.index + match.length), isKeyword: true });
        currentIndex = match.index + match.length;
    });

    // Add remaining text
    if (currentIndex < remainingText.length) {
        parts.push({ text: remainingText.substring(currentIndex), isKeyword: false });
    }

    // If no keywords found, return original text
    if (parts.length === 0) {
        parts.push({ text, isKeyword: false });
    }

    let keywordIndex = 0;

    return (
        <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="block"
        >
            {parts.map((part, index) => {
                if (part.isKeyword) {
                    const currentKeywordIndex = keywordIndex++;
                    return (
                        <motion.span
                            key={index}
                            className="relative inline-block text-white font-semibold"
                        >
                            {part.text}
                            <motion.span
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 dark:bg-red-400"
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 1 + currentKeywordIndex * 0.15, ease: "easeOut" }}
                                style={{ transformOrigin: "left" }}
                            />
                        </motion.span>
                    );
                }
                return <span key={index} className="text-white">{part.text}</span>;
            })}
        </motion.span>
    );
};

interface InnovationSectionProps {
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
        className="text-center p-8 rounded-2xl shadow-lg relative overflow-hidden group backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/30 dark:border-white/20"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ 
            duration: 0.6, 
            delay,
            type: "spring",
            stiffness: 100
        }}
        whileHover={{ 
            scale: 1.05,
            y: -10,
            transition: { duration: 0.3 }
        }}
    >
        {/* Animated background gradient */}
        <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            initial={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.2, opacity: 1 }}
        />
        
        {/* Shine effect on hover */}
        <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
        />
        
        <div className="relative z-10">
            <motion.div 
                className="text-primary mx-auto mb-4 w-16 h-16"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ 
                    duration: 0.6, 
                    delay: delay + 0.2,
                    type: "spring",
                    stiffness: 150
                }}
                whileHover={{ 
                    rotate: 360,
                    scale: 1.1,
                    transition: { duration: 0.5 }
                }}
            >
                {icon}
            </motion.div>
            <motion.p 
                className="text-4xl md:text-5xl font-extrabold text-foreground mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                    duration: 0.5, 
                    delay: delay + 0.3,
                    type: "spring",
                    stiffness: 200
                }}
            >
                {count}{suffix}
            </motion.p>
            <motion.p 
                className="text-muted-foreground text-lg font-medium"
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

const InnovationSection: React.FC<InnovationSectionProps> = ({ translations: t }) => {
    return (
        <section className="py-20 sm:py-28 innovation-parallax-section relative overflow-hidden" style={{ isolation: 'isolate' }}>
            {/* Solid background to completely hide particles */}
            <div className="absolute inset-0 bg-background" style={{ zIndex: 0 }} />
            {/* Overlay to hide particle animation behind this section - matches parallax background */}
            <div className="absolute inset-0 pointer-events-none innovation-parallax-overlay" style={{ zIndex: 1 }} />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative" style={{ zIndex: 10 }}>
                <motion.div
                    className="text-center max-w-3xl mx-auto mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
                        {t.innovationTitle as string}
                    </h2>
                    <p className="text-lg text-white font-medium leading-relaxed">
                        <HighlightedText text={t.innovationDescription as string} />
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
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

export default InnovationSection;
