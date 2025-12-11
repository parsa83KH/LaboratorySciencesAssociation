import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionParticleBackground from '../components/SectionParticleBackground';
import type { Translation } from '../types';

const MembersPage: React.FC<{ translations: Translation }> = ({ translations }) => {
    // Always use dark theme, ignore system preference
    const theme: 'light' | 'dark' = 'dark';

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