import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionParticleBackground from '../components/SectionParticleBackground';
import type { Translation } from '../types';

const MembersPage: React.FC<{ translations: Translation }> = ({ translations }) => {
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) return savedTheme as 'light' | 'dark';
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return 'dark';
    });

    useEffect(() => {
        const updateTheme = () => {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                setTheme(savedTheme as 'light' | 'dark');
            } else {
                setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
            }
        };

        updateTheme();
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', updateTheme);
        const handleStorageChange = () => updateTheme();
        window.addEventListener('storage', handleStorageChange);
        document.addEventListener('themechange', handleStorageChange);

        return () => {
            mediaQuery.removeEventListener('change', updateTheme);
            window.removeEventListener('storage', handleStorageChange);
            document.removeEventListener('themechange', handleStorageChange);
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
            <div className="news-page-container relative">
                <SectionParticleBackground theme={theme} />
                <div className="relative z-10">
                    <h1 className="l-heading">
                        {translations.members as string}
                    </h1>
                </div>
            </div>
        </motion.div>
    );
};

export default MembersPage;